import { createRoot } from "react-dom/client"
import App from "./App"

export function mountSearchy() {
	// Create the host element for Searchy.
	const host = document.createElement("div")
	const HOST_ID = "searchy-root"
	host.id = HOST_ID

	// Prevent mounting multiple instances.
	if (document.getElementById(HOST_ID)) {
		return
	}

	// Add the host to the page.
	document.body.append(host)

	// Create an isolated Shadow DOM.
	const shadowRoot = host.attachShadow({
		mode: "open",
	})

	// React renders into a regular DOM element.
	const container = document.createElement("div")
	shadowRoot.append(container)

	// Mount the React application.
	const root = createRoot(container)
	root.render(<App />)

	// Return a cleanup function.
	return () => {
		root.unmount()
		host.remove()
	}
}
