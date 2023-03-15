import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeNameInUserEntity1652693654726 implements MigrationInterface {
    name = 'ChangeNameInUserEntity1652693654726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "second_name" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_3d04cede592bd30498bdb1438f4"`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "board_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "board_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_3d04cede592bd30498bdb1438f4" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_3d04cede592bd30498bdb1438f4"`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "board_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "board_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_3d04cede592bd30498bdb1438f4" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "second_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "surname" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(20) NOT NULL`);
    }

}
