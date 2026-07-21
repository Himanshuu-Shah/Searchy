import { useMemo, useState, type ReactNode } from "react"

import type { DockState } from "./DockState"
import type { DockActions, DockContextValue } from "./DockContextValue"
import { DockContext } from "./DockContext"

const INITIAL_STATE: DockState = {
	visible: false,
}
type Prop = {
	children: ReactNode
}
export function DockProvider({ children }: Prop) {
	const [state, setState] = useState<DockState>(INITIAL_STATE)

	const actions = useMemo<DockActions>(
		() => ({
			show() {
				setState((prev) => ({
					...prev,
					visible: true,
				}))
			},

			hide() {
				setState((prev) => ({
					...prev,
					visible: false,
				}))
			},

			toggle() {
				setState((prev) => ({
					...prev,
					visible: !prev.visible,
				}))
			},
		}),
		[]
	)

	const value = useMemo<DockContextValue>(
		() => ({
			state,
			actions,
		}),
		[state, actions]
	)

	return <DockContext.Provider value={value}>{children}</DockContext.Provider>
}
