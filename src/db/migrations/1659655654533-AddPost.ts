import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPost1659655654533 implements MigrationInterface {
  name = 'AddPost1659655654533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`posts\``);
  }
}
