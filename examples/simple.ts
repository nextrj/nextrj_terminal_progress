// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { TerminalProgress } from "../mod.ts"
import { delay } from "../deps.ts"

console.log(">>>>1. default: auto end and not clear")
await new TerminalProgress().stepToEnd(10)
console.log("<<<<1")

console.log(">>>>2. auto end and clear")
await new TerminalProgress({ auto: true, clear: true }).stepToEnd(10)
console.log("<<<<2")

console.log(">>>>3. manual end and not clear")
let progress = new TerminalProgress({ auto: false, clear: false })
for await (const [index, _] of Array.from({ length: 100 }).entries()) {
  await delay(10)
  progress.to(index + 1)
}
progress.end()
console.log("<<<<3")

console.log(">>>>4. manual end and clear")
progress = new TerminalProgress({ auto: false, clear: true })
progress.to(0)
for await (const [index, _] of Array.from({ length: 100 }).entries()) {
  await delay(10)
  progress.to(index + 1)
}
progress.end()
console.log("<<<<4")
