import { createContext } from "react"

import type { SearchSessionContextValue } from "./SearchSessionContextValue"

export const SearchSessionContext =
	createContext<SearchSessionContextValue | null>(null)
