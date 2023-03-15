import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameColumnsToSnakeCase1648209615425 implements MigrationInterface {
    name = 'RenameColumnsToSnakeCase1648209615425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "columns" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "columns" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "columns" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "columns" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
