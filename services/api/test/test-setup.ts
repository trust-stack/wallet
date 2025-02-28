import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import { Client } from 'pg';
import { promisify } from 'util';

dotenv.config({ path: '.env.test' });

const execAsync = promisify(exec);

const DATABASE_URL = `postgresql://trust-stack:password@localhost:5432/trust-stack?schema=public`;

async function waitForPostgres(retries = 10, delay = 2000): Promise<boolean> {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  for (let i = 0; i < retries; i++) {
    try {
      await client.connect();
      await client.query('SELECT 1');
      await client.end();
      console.log('Postgres is ready!');
      return true;
    } catch (error) {
      console.log(`Waiting for Postgres... (attempt ${i + 1}/${retries})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error('Postgres failed to become ready');
}

module.exports = async () => {
  // Start Docker containers
  await execAsync('pnpm run docker:up');

  // Wait for Postgres to be ready
  await waitForPostgres();

  // Apply Prisma schema
  await execAsync('pnpm run prisma:generate');
  await execAsync('pnpm run prisma:push', {
    env: {
      ...process.env,
      DATABASE_URL,
    },
  });
};
