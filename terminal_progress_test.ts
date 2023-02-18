// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { TerminalProgress } from "./terminal_progress.ts"

// A singleton bar instance */
const bar = new TerminalProgress()

Deno.test("Keep state", async () => {
  await simpleBar(true)
})

Deno.test("Not keep state", async () => {
  await simpleBar(false)
})

function simpleBar(keepState: boolean): Promise<void> {
  return new Promise((resolve) => {
    // Initial the bar
    bar.to(0)
    assertStrictEquals(bar.value, 0)
    assertStrictEquals(bar.total, 100)

    let count = 0
    const intervalId = setInterval(() => {
      // step the bar progress to specified status
      bar.to(++count)
      assertStrictEquals(bar.value, count)

      if (bar.completed) {
        clearInterval(intervalId)

        assertStrictEquals(count, 100)
        assertStrictEquals(bar.value, 100)
        assertStrictEquals(bar.total, 100)

        bar.end(keepState)
        assertStrictEquals(bar.value, 0)
        assertStrictEquals(bar.total, 100)

        resolve()
      }
    }, 1)
  })
}
