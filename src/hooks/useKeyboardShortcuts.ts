/**
 * Registers the global keyboard shortcuts for Searchy.
 *
 * The event listener is recreated whenever values used by the handler
 * change so the browser always invokes a handler with the latest React
 * state rather than a stale closure.
 */

import { useEffect } from "react"
import { useView } from "../ui/view/useView"

export function useKeyboardShortcuts() {
	const { viewState, viewActions } = useView()

	/**
	 * The handler closes over React state.
	 * The effect is recreated whenever those values change so the
	 * browser's event listener always references the latest closure.
	 */
	function handler(event: KeyboardEvent) {
		if (event.ctrlKey && event.key.toLowerCase() === "f") {
			event.preventDefault()
			if (!viewState.searchyVisible) {
				viewActions.show()
			}
			viewActions.requestFocus()
		}

		if (event.key === "Escape") {
			viewActions.hide()
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handler)

		return () => {
			window.removeEventListener("keydown", handler)
		}
	}, [viewState.searchyVisible, viewActions])
}
