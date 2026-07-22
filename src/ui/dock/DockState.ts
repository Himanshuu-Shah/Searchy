export interface DockState {
	/** Whether the search dock is currently visible. */
	visible: boolean

	/**
	 * Incremented whenever a new focus request is issued.
	 * Consumers react to changes rather than imperative calls.
	 */
	focusRequest: number
}
