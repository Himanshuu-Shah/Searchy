import { createRoot } from "react-dom/client"
import App from "./App"
import searchyStyles from "./styles/searchy.css?inline"
import { initiateSession } from "./sendIntent"

export async function mountSearchy() {
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

	const style = document.createElement("style")
	style.textContent = searchyStyles

	shadowRoot.append(style)

	// React renders into a regular DOM element.
	const container = document.createElement("div")
	shadowRoot.append(container)

	// Fetch initial search session from the background script
	const response = await initiateSession()
	if ("error" in response) {
		throw new Error(response.error)
	}

	// Mount the React application.
	const root = createRoot(container)
	console.log(response.searchSession)
	root.render(<App initialSession={response.searchSession} />)

	// Return a cleanup function.
	return () => {
		root.unmount()
		host.remove()
	}
}
