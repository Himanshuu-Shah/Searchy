import type { SessionResponse } from "../shared/messages/intents"
import type { SearchSession } from "../shared/messages/session/SearchSession"

export function publishSession(tabId: number, session: SearchSession) {
	chrome.tabs.sendMessage(tabId, {
		success: true,
		searchSession: session,
	} satisfies SessionResponse)
}
