import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPositionColumnInCard1649956957756 implements MigrationInterface {
    name = 'AddPositionColumnInCard1649956957756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ADD "position" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "position"`);
    }

}
