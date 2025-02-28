import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.e2e-spec.ts'],
    fileParallelism: false,
    globalSetup: './test/test-setup.ts',
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: './reports/junit/e2e-results.xml',
          suiteName: 'E2E Tests',
        },
      ],
    ],
  },
  plugins: [swc.vite()],
});
