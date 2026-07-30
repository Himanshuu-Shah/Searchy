import { useMemo, useState, type ReactNode } from "react"
import { SearchSessionContext } from "./SearchSessionContext"
import type {
	SearchSession,
	SearchAlgorithm,
	SearchMode,
} from "../../shared/messages/session/SearchSession"
import type {
	SearchSessionContextValue,
	SearchSessionActions,
} from "./SearchSessionContextValue"
// import type { SessionResponse } from "../../shared/messages/intents"

type SearchSessionProviderProps = {
	children: ReactNode
	initialSession: SearchSession
}

export function SearchSessionProvider({
	children,
	initialSession,
}: SearchSessionProviderProps) {
	const [session, setSession] = useState<SearchSession>(initialSession)
	const actions = useMemo<SearchSessionActions>(
		() => ({
			query: {
				change(query: string) {
					setSession((previous) => ({
						...previous,
						query,
					}))
				},
			},

			mode: {
				change(mode: SearchMode) {
					setSession((previous) => ({
						...previous,
						mode,
					}))
				},
			},

			algorithm: {
				change(algorithm: SearchAlgorithm) {
					setSession((previous) => ({
						...previous,
						algorithm,
					}))
				},
			},

			literal: {
				setWholeWord(enabled: boolean) {
					setSession((previous) => ({
						...previous,

						config: {
							...previous.config,

							literal: {
								...previous.config.literal,

								wholeWord: enabled,
							},
						},
					}))
				},

				setCaseSensitive(enabled: boolean) {
					setSession((previous) => ({
						...previous,

						config: {
							...previous.config,

							literal: {
								...previous.config.literal,

								caseSensitive: enabled,
							},
						},
					}))
				},
			},

			regex: {
				setCaseSensitive(enabled: boolean) {
					setSession((previous) => ({
						...previous,

						config: {
							...previous.config,

							regex: {
								...previous.config.regex,

								caseSensitive: enabled,
							},
						},
					}))
				},
			},
		}),
		[]
	)

	const value = useMemo<SearchSessionContextValue>(
		() => ({
			session,
			actions,
		}),
		[session, actions]
	)

	// chrome.runtime.onMessage.addListener((message: SessionResponse) => {
	// 	setSession(message.searchSession)
	// })

	return (
		<SearchSessionContext.Provider value={value}>
			{children}
		</SearchSessionContext.Provider>
	)
}
