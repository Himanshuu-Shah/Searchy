import { useEffect } from "react"
import { useDock } from "../ui/dock/useDock"

export function useKeyboardShortcuts() {
	const { actions } = useDock()

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key.toLowerCase() === "f") {
				event.preventDefault()
				actions.show()
			}

			if (event.key === "Escape") {
				actions.hide()
			}
		}

		window.addEventListener("keydown", handler)

		return () => {
			window.removeEventListener("keydown", handler)
		}
	}, [actions])
}
