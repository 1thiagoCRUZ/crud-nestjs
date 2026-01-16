import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";
import { CreateUserDto } from "../dtos/users/create-user.dto";
import { User } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "../dtos/users/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }
    async create(createUserDto: CreateUserDto): Promise<User> {
        const userExists = await this.usersRepository.findByEmail(createUserDto.email);
        if (userExists) {
            throw new ConflictException('Este e-mail já esta em uso.');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(createUserDto.password, salt);

        const userToSave = {
            ...createUserDto,
            password: passwordHash,
        };

        return this.usersRepository.create(userToSave);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
        const user = await this.findOne(id);

        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const emailExists = await this.usersRepository.findByEmail(updateUserDto.email);
            if (emailExists) {
                throw new ConflictException('Este e-mail já está em uso.')
            }
        }

        if (updateUserDto.password) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(updateUserDto.password, salt);
            updateUserDto.password = passwordHash;
        }
        return this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: number): Promise<void> {
        return this.usersRepository.remove(id);
    }
    async findByEmailForAuth(email: string): Promise<User | null> {
        return this.usersRepository.findByEmailWithPassword(email);
    }
}