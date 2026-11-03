import { expect } from 'vitest'
import { formatSummary, isNativeRunner, readCoverageMap, runVitest, test } from '../utils'

test('untested file is transformed by the project that contains it, not by a project whose root is a prefix of its path', async ({ skip }) => {
  skip(isNativeRunner(), 'native runner does not support plugins')

  await runVitest({
    config: '../../configs/vitest.config.prefix-projects.ts',
    coverage: {
      reporter: 'json',
      include: ['**/src/**'],
    },
    root: 'fixtures/workspaces/prefix',
  })

  const coverageMap = await readCoverageMap(
    'fixtures/workspaces/prefix/coverage/coverage-final.json',
  )
  const untested = coverageMap.fileCoverageFor(
    '<process-cwd>/fixtures/workspaces/prefix/app-utils/src/untested.ts',
  )

  // The "app" project's plugin adds a function to every untested.ts it transforms.
  // "app-utils" owns this file, so it must still have the single function.
  expect(formatSummary(untested.toSummary()).functions).toBe('0/1 (0%)')
})
