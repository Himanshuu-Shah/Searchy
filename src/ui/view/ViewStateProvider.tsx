import { useMemo, useState, type ReactNode } from "react"
import type {
	ViewState,
	ViewActions,
	ViewContextValue,
} from "./ViewContextValue"
import { ViewContext } from "./ViewContext"

const INITIAL_STATE: ViewState = {
	searchyVisible: false,
	globalResultsVisible: false,

	// Monotonically increasing identifier used to request
	// focus without imperatively touching DOM nodes.
	focusRequest: 0,
}

type Prop = {
	children: ReactNode
}

export function ViewProvider({ children }: Prop) {
	const [viewState, setViewState] = useState<ViewState>(INITIAL_STATE)

	const viewActions = useMemo<ViewActions>(
		() => ({
			show() {
				setViewState((prev) => ({
					...prev,
					searchyVisible: true,
				}))
			},

			hide() {
				setViewState((prev) => ({
					...prev,
					searchyVisible: false,
				}))
			},

			toggle() {
				setViewState((prev) => ({
					...prev,
					searchyVisible: !prev.searchyVisible,
				}))
			},

			// Incrementing the request id causes SearchInput to
			// receive a new focus request after the next render.
			requestFocus() {
				setViewState((prev) => ({
					...prev,
					focusRequest: prev.focusRequest + 1,
				}))
			},

			toggleGlobalResults() {
				setViewState((prev) => ({
					...prev,
					globalResultsVisible: !prev.globalResultsVisible,
				}))
			},
		}),
		[]
	)

	const value = useMemo<ViewContextValue>(
		() => ({
			viewState,
			viewActions,
		}),
		[viewState, viewActions]
	)

	return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}
