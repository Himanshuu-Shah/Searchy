import type { DockState } from "./DockState"

export interface DockActions {
	show(): void

	hide(): void

	toggle(): void

	/**
	 * Requests that the search input receives focus.
	 * This does not focus the DOM directly; consumers
	 * react to changes in DockState.focusRequest.
	 */
	requestFocus(): void
}

export interface DockContextValue {
	dockState: DockState

	dockActions: DockActions
}
