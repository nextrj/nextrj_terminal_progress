// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { TerminalProgress } from "../mod.ts"

// singleton instance */
const terminalProgress = new TerminalProgress()

console.log(">>>>1")
await simpleBar()
console.log("<<<<1")
console.log(">>>>2")
await simpleBar(false)
console.log("<<<<2")
console.log(">>>>3")
await simpleBar(true)
console.log("<<<<3")

function simpleBar(keepState?: boolean): Promise<void> {
  return new Promise((resolve) => {
    // start
    terminalProgress.to(0)

    let count = 0
    const intervalId = setInterval(() => {
      // manual step to
      terminalProgress.to(++count)

      // manual finish
      if (terminalProgress.completed) {
        clearInterval(intervalId)
        terminalProgress.end(keepState)
        resolve()
      }
    }, 10)
  })
}
