import type { Session } from "../shared/messages/intents/intent"
import type { SearchSession } from "../shared/messages/session/SearchSession"

export function publishSession(tabId: number, session: SearchSession) {
	chrome.tabs.sendMessage(tabId, {
		type: "session",
		searchSession: session,
	} satisfies Session)
}
