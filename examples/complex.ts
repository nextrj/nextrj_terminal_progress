// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { TerminalProgress } from "../mod.ts"

await new TerminalProgress({
  start: 0,
  end: 200,
  template: "Download ${title} ${value}/${end}=${percent}",
  title: "http:/www.example.com/x",
}).stepToEnd(100)
