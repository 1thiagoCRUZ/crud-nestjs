import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

// PartialType pega tudo e deixa cm opcional de ser preenchido
export class UpdateUserDto extends PartialType(CreateUserDto) {}