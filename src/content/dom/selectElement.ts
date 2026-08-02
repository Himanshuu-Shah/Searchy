/**
 * Warning: Melted by brain lil bit
 *
 * Starts a temporary element-selection session.
 *
 * During the session:
 * - The element under the cursor is previewed with an outline.
 * - The next clicked element is selected.
 * - The click is intercepted so the page does not react to it.
 *
 * After an element is selected, the session automatically ends.
 *
 * Returns a cleanup function that cancels the session before an
 * element is selected.
 */
type SelectionOptions = {
	onSelect(element: HTMLElement): void
	shouldIgnore?(event: MouseEvent): boolean
}

export function beginElementSelection(options: SelectionOptions): () => void {
	type HoverState = {
		element: HTMLElement
		outline: string
		outlineOffset: string
	} | null

	let hovered: HoverState = null

	const { onSelect, shouldIgnore } = options

	/**
	 * Restores the previously hovered element's original outline.
	 */
	function restoreHover() {
		if (!hovered) return

		hovered.element.style.outline = hovered.outline
		hovered.element.style.outlineOffset = hovered.outlineOffset

		hovered = null
	}

	function handleHover(event: MouseEvent) {
		if (shouldIgnore?.(event)) {
			restoreHover()
			return
		}
		event.preventDefault()
		event.stopPropagation()
		event.stopImmediatePropagation()

		const target = event.target

		if (!(target instanceof HTMLElement)) return
		if (hovered && hovered.element === target) return

		restoreHover()

		hovered = {
			element: target,
			outline: target.style.outline,
			outlineOffset: target.style.outlineOffset,
		}

		hovered.element.style.outline = "2px dashed #6d7178"
		hovered.element.style.outlineOffset = "2px"
	}

	/**
	 * Ends the current selection session by restoring the hovered
	 * element and removing all temporary event listeners.
	 */
	function cleanup() {
		restoreHover()
		document.removeEventListener("mouseover", handleHover, true)
		document.removeEventListener("click", handleClick, true)
	}

	function handleClick(event: MouseEvent) {
		if (shouldIgnore?.(event)) {
			return
		}

		event.preventDefault()
		event.stopPropagation()
		event.stopImmediatePropagation()

		const target = event.target

		if (!(target instanceof HTMLElement)) {
			return
		}

		cleanup()
		onSelect(target)
	}

	document.addEventListener("mouseover", handleHover, true)
	document.addEventListener("click", handleClick, true)

	return cleanup
}
