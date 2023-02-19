// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/**
 * A terminal progress.
 *
 * Example1: a simple time-base-progress - every 100 milliseconds step 1 until to 100
 *
 * ```ts
 * import { TerminalProgress } from "https://deno.land/x/nextrj_terminnal_progress@$VERSION/mod.ts"
 *
 * await new TerminalProgress().stepToEnd(100)
 * // console should log `0/100` step to `100/100`
 * ```
 *
 * Example2: manual control the step
 *
 * ```ts
 * import { TerminalProgress } from "https://deno.land/x/nextrj_terminnal_progress@$VERSION/mod.ts"
 * import { delay } from "https://deno.land/std@$STD_VERSION/async/mod.ts"
 * const progress = new TerminalProgress({ start: 0, total: 123, auto: true, clear: false })
 * progress.to(0) // console should log `0/123`
 * for await (const [index, _] of Array.from({ length: 123 }).entries()) {
 *   await delay(100) // every 100 milliseconds step 1
 *   progress.to(index + 1) // until 123 auto end progress
 * }
 * // console should log `0/123` step to `123/123`
 * ```
 *
 * @module
 */

export * from "./terminal_progress.ts"
