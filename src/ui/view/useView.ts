import { useContext } from "react"
import { ViewContext } from "./ViewContext"

export function useView() {
	const context = useContext(ViewContext)

	if (!context) {
		throw new Error("useDock must be used within a DockProvider")
	}

	return context
}
