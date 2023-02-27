// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { delay } from "../deps.ts"
import { TerminalProgress } from "../mod.ts"

const progress = new TerminalProgress({
  start: 0,
  end: 100,
  template: "${duration} ${value}/${end} ${percent}",
  percentPrecision: 0,
})
// should use real business rule to control the step instead of use "for await ..." code here
for await (const [index, _] of Array.from({ length: 101 }).entries()) {
  await delay(100)
  progress.to(index) // step to
}
