import { useContext } from "react"
import { DockContext } from "./DockContext"

export function useDock() {
	const context = useContext(DockContext)

	if (!context) {
		throw new Error("useDock must be used within a DockProvider")
	}

	return context
}
