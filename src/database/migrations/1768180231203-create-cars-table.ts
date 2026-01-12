import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCarsTable1768180231203 implements MigrationInterface {
    name = 'CreateCarsTable1768180231203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "urlImage" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "urlImage"`);
    }

}
