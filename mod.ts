// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/**
 * A terminal progress.
 *
 * Example 1: a simple time-base-progress - every 100 milliseconds step 1 until to 100
 *
 * ```ts
 * import { TerminalProgress } from "https://deno.land/x/nextrj_terminal_progress@$VERSION/mod.ts"
 *
 * await new TerminalProgress().stepToEnd(100)
 * // every 100 milliseconds step 1 until 100 auto end progress
 * // output `0/100` step to `100/100`
 * ```
 *
 * Example 2: manual control the step
 *
 * ```ts
 * import { TerminalProgress } from "https://deno.land/x/nextrj_terminal_progress@$VERSION/mod.ts"
 * import { delay } from "https://deno.land/std@$STD_VERSION/async/mod.ts"
 * const progress = new TerminalProgress({ start: 0, total: 123, auto: true, clear: false })
 * progress.to(0) // output `0/123`
 * for await (const [index, _] of Array.from({ length: 123 }).entries()) {
 *   await delay(100)
 *   progress.to(index + 1)
 * }
 * // output `0/123` step to `123/123`
 * ```
 *
 * Example 3: with title, percent, value, end and duration
 *
 * ```ts
 * import { TerminalProgress } from "https://deno.land/x/nextrj_terminal_progress@$VERSION/mod.ts"
 *
 * await new TerminalProgress({
 *   start: 0,
 *   end: 200,
 *   template: "Download ${title} ${value}/${end}=${percent} ${duration}",
 *   title: "http:/www.example.com/x",
 * }).stepToEnd(100)
 * // output like `Download http:/www.example.com/x 0/200=0.00% 01:30`
 * ```
 *
 * Example 4: color the output text
 *
 * ```ts
 * import { TerminalProgress } from "https://deno.land/x/nextrj_terminal_progress@$VERSION/mod.ts"
 *
 * await new TerminalProgress({
 *   start: 0,
 *   end: 200,
 *   template: "${c.green(percent)}",
 * }).stepToEnd(100)
 * // output like `50%` with green color
 * ```
 *
 * Example 5: add extra template key
 *
 * ```ts
 * import { TerminalProgress } from "https://deno.land/x/nextrj_terminal_progress@$VERSION/mod.ts"
 *
 * const step = (value: number, end: number) => `[${value}/${end}]`
 * new TerminalProgress({
 *   extra: { step },
 *   template: "${step(value, end)}",
 * }).stepToEnd(100)
 * // output like `[50/100]`
 * ```
 *
 * @module
 */

export * from "./terminal_progress.ts"
