import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeeder1710236207260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (email, first_name, last_name, role) VALUES
                  ('admin@grocery.com', 'Admin', 'Admin', 'admin'),
                  ('ravi@grocery.com', 'Ravi', 'Patel', 'user')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "user"`);
  }
}
