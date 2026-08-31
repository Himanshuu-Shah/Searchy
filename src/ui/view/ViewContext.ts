import { createContext } from "react"
import type { ViewContextValue } from "./ViewContextValue"

export const ViewContext = createContext<ViewContextValue | null>(null)
