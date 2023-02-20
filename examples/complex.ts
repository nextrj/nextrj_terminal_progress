// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { TerminalProgress } from "../mod.ts"

const step = (value: number, end: number) => `[${value}/${end}]`
await new TerminalProgress({
  start: 0,
  end: 200,
  extra: { step },
  template: "Download ${title} ${value}/${end}=${percent} ${step(value, end)}",
  title: "http:/www.example.com/x",
}).stepToEnd(100)
