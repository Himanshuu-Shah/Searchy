/**Warning: Melted by brain lil bit
 *
 * Enables one-time element selection.
 *
 * Installs a temporary click listener that:
 * - captures the next clicked element
 * - prevents the page from handling that click
 * - removes itself after selection
 *
 * Returns a cleanup function that can be used to cancel
 * selection before the user clicks anything.
 */

export function beginElementSelection(
	onselect: (element: Element) => void
): () => void {
	function handleClick(event: MouseEvent) {
		event.preventDefault()
		event.stopPropagation()
		event.stopImmediatePropagation()

		const target = event.target

		if (!(target instanceof Element)) {
			return
		}

		document.removeEventListener("click", handleClick, true)

		onselect(target)
	}

	document.addEventListener("click", handleClick, true)

	return () => document.removeEventListener("click", handleClick, true)
}
