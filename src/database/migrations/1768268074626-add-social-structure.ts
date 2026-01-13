import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSocialStructure1768268074626 implements MigrationInterface {
    name = 'AddSocialStructure1768268074626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "carId" integer NOT NULL, CONSTRAINT "UQ_18a5744c4ed6fde4bcd7d1423f3" UNIQUE ("userId", "carId"), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" text NOT NULL, "userId" integer NOT NULL, "carId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "urlImage" character varying NOT NULL, "year" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatarUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_89baeef0707272d8dee9e658e13" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_cb77c129bb5afaca6648b869aa2" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_6431b6fec12c4090bb357fba2c2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_6431b6fec12c4090bb357fba2c2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_cb77c129bb5afaca6648b869aa2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_89baeef0707272d8dee9e658e13"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
