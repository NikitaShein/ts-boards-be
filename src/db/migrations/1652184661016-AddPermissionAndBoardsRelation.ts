import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPermissionAndBoardsRelation1652184661016 implements MigrationInterface {
    name = 'AddPermissionAndBoardsRelation1652184661016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ADD "board_id" integer`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_3d04cede592bd30498bdb1438f4" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_3d04cede592bd30498bdb1438f4"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "board_id"`);
    }

}
