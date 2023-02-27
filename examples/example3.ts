// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { TerminalProgress } from "../mod.ts"
import { formatBytes, truncateFilename } from "../deps.ts"

const fileSize = 124.45 * 1024 * 1024
await new TerminalProgress({
  start: 0,
  end: fileSize,
  percentPrecision: 0, // percent=50%
  extra: {
    step: (value: number, end: number) => `${formatBytes(value).padStart(9)}/${formatBytes(end)}`,
    shorten: (value: string) => truncateFilename(value, 36),
  },
  // example: "00:12  60%  78.6 MB/130 MB  terminal-progress-manualllll...l.pdf"
  template: "${c.yellow(duration + percent.padStart(5) + step(value, end))}  ${shorten(title)}",
  title: `terminal-progress-manual${"l".repeat(1000)}.pdf`,
}).stepToEnd(100, parseInt(`${fileSize / 150}`))
