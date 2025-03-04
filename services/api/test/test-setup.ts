import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import { promisify } from 'util';

dotenv.config({ path: '.env.test' });

const execAsync = promisify(exec);

export async function setup() {
  // Start Docker containers
  await execAsync('pnpm run docker:up');

  // Apply Prisma schema
  await execAsync('pnpm run prisma:generate');
  await execAsync('pnpm run prisma:push', {
    env: {
      ...process.env,
      DATABASE_URL:
        'postgresql://trust-stack:password@localhost:5432/trust-stack?schema=public',
    },
  });
}

export async function teardown() {
  // Stop Docker containers
  await execAsync('pnpm run docker:down');
}
