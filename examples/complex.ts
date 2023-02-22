// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { TerminalProgress } from "../mod.ts"

const step = (value: number, end: number) => `[${value}/${end}]`
await new TerminalProgress({
  start: 0,
  end: 200,
  extra: { step },
  // template: "${c.green(percent)} Download ${title} (${value}/${end}) ${step(value, end)}",
  template: "${c.green(percent)} Download ${title} ${step(value, end)} ${duration}",
  title: "http:/www.example.com/x",
}).stepToEnd(100)
