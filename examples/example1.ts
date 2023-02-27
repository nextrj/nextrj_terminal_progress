// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { TerminalProgress } from "../mod.ts"

const progress = new TerminalProgress({ start: 0, end: 10, template: "${percent}" })
progress.stepToEnd(1, 0.01)
