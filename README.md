# NextRJ Terminal Progress

A terminal progress.

> Support template key `value`, `end`, `percent`, `title`.

> TODO: support template key `bar`.

## Usage

Example 1: a simple time-base-progress - every 100 milliseconds step 1 until to 100

```ts
import { TerminalProgress } from "https://deno.land/x/nextrj_terminal_progress@$VERSION/mod.ts"

await new TerminalProgress().stepToEnd(100)
// output `0/100` to `100/100`
```

Example 2: manual control the step

```ts
import { TerminalProgress } from "https://deno.land/x/nextrj_terminal_progress@$VERSION/mod.ts"
import { delay } from "https://deno.land/std@$STD_VERSION/async/mod.ts"

const progress = new TerminalProgress({ start: 0, total: 123, auto: true, clear: false })
progress.to(0) // output `0/123`
for await (const [index, _] of Array.from({ length: 123 }).entries()) {
  await delay(100)
  progress.to(index + 1)
}
// every 100 milliseconds step 1 until 123 auto end progress
// output `0/123` to `123/123`
```

Example 3: with title, percent, value and end

```ts
import { TerminalProgress } from "https://deno.land/x/nextrj_terminal_progress@$VERSION/mod.ts"

await new TerminalProgress({
  start: 0,
  end: 200,
  template: "Downloading ${title} ${value}/${end}=${percent}",
  title: "http:/www.example.com/x",
}).stepToEnd(100)
// every 100 milliseconds step 1 until 123 auto end progress
// output `Download http:/www.example.com/x 0/200=0.00%` to `200/200=100.00%`
```
