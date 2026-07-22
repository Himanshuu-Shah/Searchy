/**
 * Registers the global keyboard shortcuts for Searchy.
 *
 * The event listener is recreated whenever values used by the handler
 * change so the browser always invokes a handler with the latest React
 * state rather than a stale closure.
 */

import { useEffect } from "react"
import { useDock } from "../ui/dock/useDock"

export function useKeyboardShortcuts() {
	const { dockState, dockActions } = useDock()

	/**
	 * The handler closes over React state.
	 * The effect is recreated whenever those values change so the
	 * browser's event listener always references the latest closure.
	 */
	function handler(event: KeyboardEvent) {
		if (event.ctrlKey && event.key.toLowerCase() === "f") {
			event.preventDefault()
			if (!dockState.visible) {
				dockActions.show()
			}
			dockActions.requestFocus()
		}

		if (event.key === "Escape") {
			dockActions.hide()
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handler)

		return () => {
			window.removeEventListener("keydown", handler)
		}
	}, [dockState.visible, dockActions])
}
