import { useMemo, useState, type ReactNode } from "react"

import type { DockState } from "./DockState"
import type { DockActions, DockContextValue } from "./DockContextValue"
import { DockContext } from "./DockContext"

const INITIAL_STATE: DockState = {
	visible: false,

	// Monotonically increasing identifier used to request
	// focus without imperatively touching DOM nodes.
	focusRequest: 0,
}
type Prop = {
	children: ReactNode
}
export function DockProvider({ children }: Prop) {
	const [dockState, setDockState] = useState<DockState>(INITIAL_STATE)

	const dockActions = useMemo<DockActions>(
		() => ({
			show() {
				setDockState((prev) => ({
					...prev,
					visible: true,
				}))
			},

			hide() {
				setDockState((prev) => ({
					...prev,
					visible: false,
				}))
			},

			toggle() {
				setDockState((prev) => ({
					...prev,
					visible: !prev.visible,
				}))
			},

			// Incrementing the request id causes SearchInput to
			// receive a new focus request after the next render.
			requestFocus() {
				setDockState((prev) => ({
					...prev,
					focusRequest: prev.focusRequest + 1,
				}))
			},
		}),
		[]
	)

	const value = useMemo<DockContextValue>(
		() => ({
			dockState,
			dockActions,
		}),
		[dockState, dockActions]
	)

	return <DockContext.Provider value={value}>{children}</DockContext.Provider>
}
