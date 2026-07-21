import type { DockState } from "./DockState"

export interface DockActions {
	show(): void

	hide(): void

	toggle(): void
}

export interface DockContextValue {
	state: DockState

	actions: DockActions
}
