import { createContext } from "react"
import type { DockContextValue } from "./DockContextValue"

export const DockContext = createContext<DockContextValue | null>(null)
