// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { format } from "./deps.ts"

/** Initial options */
export type Options = {
  start?: number
  end?: number
  /**
   * Whether auto end the progress when step to the end.
   *
   * True means reset the state to the initial options
   * when step to the end.
   *
   * When invoke the `to(value)` method, and the `value` matches the `end` number,
   * it call the `end()` method to reset the state to the initial options.
   */
  auto?: boolean
  /**
   * Whether clear the progress when step to the end number.
   *
   * True means remove the last progress content when invoke the `end()` method.
   */
  clear?: boolean
  /** The progress title. */
  title?: string
  /**
   * Custom template for the progress content.
   *
   * Use key work `value, end, percent, title, bar` to generate the template, such as:
   * 1. `"${value}/${end}"` - the default template, such as `"50/100"`.
   * 2. `"${title} ${pencent} (${value}/${end})"`, such as `"Downloading http://www.example.com 50.00% (50/100)""`.
   */
  template?: string
  /**
   * Declare some extra key that can bu use in the template.
   *
   * Its value can be any type such as function or object depends on how to use in the template.
   */
  extra?: Record<string, unknown>
  /** The percent precision. Default 2. */
  percentPrecision?: number
}

export const DEFAULT_INIT_OPTIONS = {
  start: 0,
  end: 100,
  auto: true,
  clear: false,
  title: "",
  template: "${value}/${end}",
  extra: {},
  percentPrecision: 2,
}

/** Use a cache {@link TextEncoder} instance to encode content. */
const encoder = new TextEncoder()
const encode = (content: string) => encoder.encode(content)

export class TerminalProgress {
  /** The current value. */
  #value: number
  /** The readonly current value. */
  get value(): number {
    return this.#value
  }
  /** The initial options. */
  options: Required<Options>
  /** Dynamic set the title. */
  set title(newTitle: string) {
    this.options.title = newTitle
  }
  /** Whether stepped to the end. */
  get completed(): boolean {
    return this.#value >= this.options.end
  }
  /** The previous rendered content. */
  #lastContent?: string
  /** Instance with {@link DEFAULT_INIT_OPTIONS}. */
  constructor(options?: Options) {
    this.options = Object.assign({}, DEFAULT_INIT_OPTIONS, options)
    this.#value = this.options.start
  }
  /**
   * Step to the specific {@link value}.
   *
   * When invoke this method, and the {@link value} argument matches the `end` number,
   * it call the `end()` method to reset the state to the initial options.
   */
  to(value: number): TerminalProgress {
    this.#value = value

    // generate the content
    const content = this.#generateContent()

    // only render when content changed
    if (this.#lastContent !== content) {
      this.#lastContent = content
      // write text to console
      // 1. `\r` - move cursor to the left egde
      // 2. `\x1b[?25l` - hide the cursor
      // 3. `\x1b[0K` - clear from the content tail to the right edge
      Deno.stdout.writeSync(encode(`\r${content}\x1b[?25l\x1b[0K`))
    }

    // auto finish
    if (this.completed && this.options.auto) this.end()

    return this
  }
  /** End the progress and reset the state to the initial options. */
  end(): TerminalProgress {
    if (!this.options.clear) {
      // keep the last content, add break line and then show cursor.
      // 1. `\n` - break line
      // 2. `\r` - move cursor to left edge
      // 3. `\x1b[?25h` - show cursor (h-height bit, l-low bit)
      Deno.stdout.writeSync(encode(`\n\r\x1b[?25h`))
    } else {
      // clear the last content and show cursor.
      // 1. `\x1b[2K` - clear content from left edge to right edge
      // 2. `\r` - move cursor to left edge
      // 3. `\x1b[?25h` - show cursor (h-height bit, l-low bit)
      Deno.stdout.writeSync(encode("\x1b[2K\r\x1b[?25h"))
    }

    // reset to default state
    return this.#reset()
  }
  /** Reset the state to the initial options. */
  #reset(): TerminalProgress {
    // reset to start value
    this.#value = this.options.start

    // clear last content
    this.#lastContent = undefined

    return this
  }
  /** Generate the content by the current state. */
  #generateContent(): string {
    // return `${this.#value}/${this.options.end}`
    return format(this.options.template, {
      value: this.#value,
      end: this.options.end,
      title: this.options.title,
      percent: (this.#value / this.options.end * 100).toFixed(this.options.percentPrecision) + "%",
      ...this.options.extra,
    })
  }
  /**
   * Step by step to the end with the specific {@link delay} milliseconds.
   *
   * Default {@link delay} value is 100.
   *
   * This convenience async method is use for a time-base-progress.
   * It call `to(value)` method every {@link delay} milliseconds until to the end.
   */
  stepToEnd(delay = 100, step = 1): Promise<void> {
    return new Promise((resolve) => {
      this.to(0)
      let count = 0
      const intervalId = setInterval(() => {
        count = count + step
        this.to(count)
        if (count >= this.options.end) {
          clearInterval(intervalId)
          if (!this.options.auto) this.end()
          resolve()
        }
      }, delay)
    })
  }
}
