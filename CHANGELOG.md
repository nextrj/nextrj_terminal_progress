# NextRJ Terminal Progress Changelog

## 2023-02-28 0.3.2

- Align deps version.

## 2023-02-28 0.3.1

- Polishing README

## 2023-02-28 0.3.0

- Control max to 100%.
- Polishing document and examples
  > Add gif to README.

![](./assets/example3.gif)

## 2023-02-22 0.2.0

- Support template key `duration`, such as:
  ```ts
  new TerminalProgress({
    template: "${duration}",
  }).stepToEnd(100)
  // output like `01:30`
  ```

## 2023-02-21 0.1.0

- Support add extra template key, such as:
  ```ts
  const step = (value: number, end: number) => `${value}/${end}`
  new TerminalProgress({
    extra: { step },
    template: "${step(value, end)}",
  }).stepToEnd(100)
  // output like `50/100`
  ```
- Add inner template key `c` for color the output text, such as:
  ```ts
  const step = (value: number, end: number) => `${value}/${end}`
  new TerminalProgress({
    template: "${c.green(percent)}",
  }).stepToEnd(100)
  // output like `50%` with green color
  ```

## 2023-02-19 0.0.4

- Fixed percent error.
- Add `example/complex.ts`.

## 2023-02-19 0.0.3

- Support template key `value`, `end`, `percent`, `title`.
  > Default `"${value}/${end}"`.

## 2023-02-19 0.0.2

- Totally refactor to new structure.
  > With a simple time-base-progress like `await new TerminalProgress().stepToEnd(100)`.

## 2023-02-18 0.0.1

- Implement a super simple progress.
  > Just show `value/total`.
