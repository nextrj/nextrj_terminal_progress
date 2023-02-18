// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/** Terminal progress bar */

export type Options = {
  value?: number
  total?: number
}

/** Use a cache {@link TextEncoder} instance to encode content. */
const encoder = new TextEncoder()
const encode = (content: string) => encoder.encode(content)

export class TerminalProgress {
  value: number
  total: number
  /** Indicate wherther progress to the max value. */
  get completed(): boolean {
    return this.value >= this.total
  }
  /** The Previous rendered content. */
  #lastContent?: string
  /** The default options get from constructor. */
  #defaultOptions: {
    value: number
    total: number
  }
  /**
   * Instance a TerminalProgress.
   * > Notes: The `number` argument is used to set the {@link TerminalProgress.value} property.
   */
  constructor(options?: Options | number) {
    // initial properties
    if (typeof options === "number") {
      this.value = Math.max(0, options)
      this.total = 100
    } else if (typeof options === "undefined") {
      this.value = 0
      this.total = 100
    } else throw Error("Not implements yet.")

    // keep the default state
    this.#defaultOptions = {
      value: this.value,
      total: this.total,
    }
  }
  /**
   * Step to the specific {@link TerminalProgress.value} property or {@link Options}.
   *
   * > Notes: The `number` argument is used to set the {@link TerminalProgress.value} property.
   */
  to(options: Options | number): TerminalProgress {
    if (typeof options === "number") {
      this.value = Math.min(this.total, options)
    } else throw Error("Not implements")

    // generate the content
    const content = `${this.value}/${this.total}`

    // only render when content changed
    if (this.#lastContent !== content) {
      this.#lastContent = content
      // write text to console
      // 1. `\r` - move cursor to the left egde
      // 2. `\x1b[?25l` - hide the cursor
      // 3. `\x1b[0K` - clear from the content tail to the right edge
      Deno.stdout.writeSync(encode(`\r${content}\x1b[?25l\x1b[0K`))
    }
    return this
  }
  /**
   * End the progress-bar with the current state then reset to default state.
   *
   * @param keepState Whether keep the last rendered content. Default true.
   */
  end(keepState = true): TerminalProgress {
    // end with current state
    if (keepState) {
      // keep the last content. Add break line and then show cursor.
      // 1. `\n` - break line
      // 2. `\r` - move cursor to left edge
      // 3. `\x1b[?25h` - show cursor (h-height bit, l-low bit)
      Deno.stdout.writeSync(encode(`\n\r\x1b[?25h`))
    } else {
      // clear content and show cursor.
      // 1. `\x1b[2K` - clear content from left edge to right edge
      // 2. `\r` - move cursor to left edge
      // 3. `\x1b[?25h` - show cursor (h-height bit, l-low bit)
      Deno.stdout.writeSync(encode("\x1b[2K\r\x1b[?25h"))
    }

    // reset to default state
    return this.#reset()
  }
  /** Reset to default state */
  #reset(): TerminalProgress {
    // reset to default value
    this.value = this.#defaultOptions.value
    this.total = this.#defaultOptions.total

    // clear last content
    this.#lastContent = undefined

    return this
  }
}
