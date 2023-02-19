// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertEquals, assertStrictEquals } from "./deps.ts"
import { DEFAULT_INIT_OPTIONS, TerminalProgress } from "./terminal_progress.ts"

Deno.test("1. default: auto end and not clear", () => {
  console.log(">>>>")
  const progress = new TerminalProgress()
  assertEquals(progress.options, DEFAULT_INIT_OPTIONS)
  assertStrictEquals(progress.value, 0)
  assertStrictEquals(progress.completed, false)

  progress.to(50)
  assertEquals(progress.options, DEFAULT_INIT_OPTIONS)
  assertStrictEquals(progress.value, 50)
  assertStrictEquals(progress.completed, false)

  progress.to(100) // default auto end and reset
  assertEquals(progress.options, DEFAULT_INIT_OPTIONS)
  assertStrictEquals(progress.value, 0)
  assertStrictEquals(progress.completed, false)
  console.log("<<<<")
})

Deno.test("2. auto end and clear", () => {
  console.log(">>>>")
  const initOptions = { auto: true, clear: true }
  const progress = new TerminalProgress(initOptions)
  const options = Object.assign({}, DEFAULT_INIT_OPTIONS, initOptions)
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 0)
  assertStrictEquals(progress.completed, false)

  progress.to(50)
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 50)
  assertStrictEquals(progress.completed, false)

  progress.to(100)
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 0)
  assertStrictEquals(progress.completed, false)
  console.log("<<<<")
})

Deno.test("3. manual end and not clear", () => {
  console.log(">>>>")
  const initOptions = { auto: false, clear: false }
  const progress = new TerminalProgress(initOptions)
  const options = Object.assign({}, DEFAULT_INIT_OPTIONS, initOptions)
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 0)
  assertStrictEquals(progress.completed, false)

  progress.to(50)
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 50)
  assertStrictEquals(progress.completed, false)

  progress.to(100)
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 100)
  assertStrictEquals(progress.completed, true)

  // manual end
  progress.end()
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 0)
  assertStrictEquals(progress.completed, false)
  console.log("<<<<")
})

Deno.test("4. manual end and clear", () => {
  console.log(">>>>")
  const initOptions = { auto: false, clear: true }
  const progress = new TerminalProgress(initOptions)
  const options = Object.assign({}, DEFAULT_INIT_OPTIONS, initOptions)
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 0)
  assertStrictEquals(progress.completed, false)

  progress.to(50)
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 50)
  assertStrictEquals(progress.completed, false)

  progress.to(100)
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 100)
  assertStrictEquals(progress.completed, true)

  // manual end
  progress.end()
  assertEquals(progress.options, options)
  assertStrictEquals(progress.value, 0)
  assertStrictEquals(progress.completed, false)
  console.log("<<<<")
})
