import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOptionsForCard1648544621244 implements MigrationInterface {
  name = 'AddOptionsForCard1648544621244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cards" DROP CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ALTER COLUMN "column_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ALTER COLUMN "column_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ADD CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa" FOREIGN KEY ("column_id") REFERENCES "columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cards" DROP CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ALTER COLUMN "column_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ALTER COLUMN "column_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ADD CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa" FOREIGN KEY ("column_id") REFERENCES "columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
