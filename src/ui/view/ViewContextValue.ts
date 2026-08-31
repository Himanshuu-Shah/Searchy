export interface ViewState {
	/** Whether the search dock is currently visible. */
	searchyVisible: boolean

	globalResultsVisible: boolean

	/**
	 * Incremented whenever a new focus request is issued.
	 * Consumers react to changes rather than imperative calls.
	 */
	focusRequest: number
}

export interface ViewActions {
	show(): void

	hide(): void

	toggle(): void

	/**
	 * Requests that the search input receives focus.
	 * This does not focus the DOM directly; consumers
	 * react to changes in DockState.focusRequest.
	 */
	requestFocus(): void

	toggleGlobalResults(): void
}

export interface ViewContextValue {
	viewState: ViewState
	viewActions: ViewActions
}
