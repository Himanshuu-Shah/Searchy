import { useEffect, useMemo, useState, type ReactNode } from "react"
import { SearchSessionContext } from "./SearchSessionContext"
import type { SearchSession } from "../../shared/messages/session/SearchSession"
import type { SearchSessionContextValue } from "./SearchSessionContextValue"
import type { Session } from "../../shared/messages/response/response"

type SearchSessionProviderProps = {
	children: ReactNode
	initialSession: SearchSession
}

export function SearchSessionProvider({
	children,
	initialSession,
}: SearchSessionProviderProps) {
	const [session, setSession] = useState<SearchSession>(initialSession)

	const value = useMemo<SearchSessionContextValue>(
		() => ({
			session,
		}),
		[session]
	)

	useEffect(() => {
		function handleMessage(message: Session) {
			if (message.type !== "session") return
			setSession(message.searchSession)
		}

		chrome.runtime.onMessage.addListener(handleMessage)

		return () => {
			chrome.runtime.onMessage.removeListener(handleMessage)
		}
	}, [])

	return (
		<SearchSessionContext.Provider value={value}>
			{children}
		</SearchSessionContext.Provider>
	)
}
