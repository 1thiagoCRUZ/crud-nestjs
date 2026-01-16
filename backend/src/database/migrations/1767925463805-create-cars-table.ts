import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCarsTable1767925463805 implements MigrationInterface {
    name = 'CreateCarsTable1767925463805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "car"`);
    }

}
