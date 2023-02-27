# NextRJ Terminal Progress

A full customisable terminal progress bar.

![](./assets/example3.gif)

## 1. Usage flow

```ts
// 1. import
import { Options, TerminalProgress } from "https://deno.land/x/nextrj_terminal_progress@$VERSION/mod.ts"
// 2. define init options
const options: Options = { start, end, auto, clear, title, template, extra, percentPrecision }
// 3. instance
const progress = new TerminalProgress(options)
...
// 4. start
progress.start()
...
// 5. control how step to the fixed number
...
progress.to(60)
...
// 6. manual end progress if set `options.auto=false` explicitly
progress.end()
```

## 2. Template

### 2.1. Inner keys

| 　Key      | Remark                 |
| ---------- | ---------------------- |
| `value`    | Current value          |
| `end`      | Max value              |
| `percent`  | Percent like `60%`     |
| `duration` | Timer progress `HH:mm` |
| `title`    | Custom title           |
| `c`        | Color functions object |

Use `"${Key}"` format to define the template string. Such as:

```ts
const options: Options = {
  ...
  template: "${c.green(duration)} ${percent} ${title}", // output like "01:15 60% terminal-progress-manual.pdf"
  ...
}
```

> `"c.green(duration)"` make duration text has green color.

### 2.2. Custom extra keys

```ts
const options: Options = {
  ...
  extra: {
    url: "http://www.example.com",
    fn: (a: number, b: number) => `${a}/${b}`
  },
  template: "${fn(value, end)} ${url}", // output like "10/100 http://www.example.com"
  ...
}
```

> `value` and `end` are inner keys, `url` and `fn` are extra keys.

## 3. Examples

### 3.1. Example 1: A simple timer-progress

```ts
const progress = new TerminalProgress({ start: 0, end: 10, template: "${percent}" })
progress.stepToEnd(1, 0.01)
```

- Every 1 milliseconds step 0.01 until to 10.
- Output `"0.00%"` to `"100.00%"`

![](./assets/example1.gif)

### 3.2. Example 2: Manual control the step

```ts
import { delay } from "https://deno.land/std@$STD_VERSION/async/mod.ts"
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
```

- Output like `"00:00 0/123 0%"` to `"01:10 123/123 100%"`

![](./assets/example2.gif)

### 3.3. Example 3: Emulate download file progress

```ts
// import some extra functions
import { format as formatBytes } from "https://deno.land/std@$STD_VERSION/fmt/bytes.ts"
import { truncateFilename } from "https://deno.land/x/nextrj_utils@$VERSION/string.ts"

// assume the file size about 130 MB
const fileSize = 124.45 * 1024 * 1024

// instance
const progress = new TerminalProgress({
  start: 0,
  end: fileSize,
  percentPrecision: 0, // percent=50%
  extra: {
    // use it to format the file size to a human readable style
    step: (value: number, end: number) => `${formatBytes(value).padStart(9)}/${formatBytes(end)}`,
    // use it to truncate the very long title to the max column width
    shorten: (title: string) => truncateFilename(title, 36),
  },
  // example: "00:12  60%  78.6 MB/130 MB  terminal-progress-manualllll...l.pdf"
  template: "${c.yellow(duration + percent.padStart(5) + step(value, end))}  ${shorten(title)}",
  title: `terminal-progress-manual${"l".repeat(1000)}.pdf`, // very long title
})

// emulate from 0%~100% (should reference the guide of "Example 2" to manual control the step)
progress.stepToEnd(100, parseInt(`${fileSize / 150}`))
```

- Output like `"00:12 60% 78.6 MB/130 MB terminal-progress-manualllll...l.pdf"`

![](./assets/example3.gif)
