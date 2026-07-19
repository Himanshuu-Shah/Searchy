import { useMemo, useState, type ReactNode } from "react"
import { SearchSessionContext } from "./SearchSessionContext"
import type {
	SearchSession,
	SearchAlgorithm,
	SearchMode,
} from "./SearchSession"
import type {
	SearchSessionContextValue,
	SearchSessionActions,
} from "./SearchSessionContextValue"

const INITIAL_SESSION: SearchSession = {
	query: "",

	mode: "local",
	algorithm: "literal",

	config: {
		literal: {
			caseSensitive: false,
			wholeWord: false,
		},
		regex: {
			caseSensitive: false,
		},
	},
}

type SearchSessionProviderProps = {
	children: ReactNode
}

export function SearchSessionProvider({
	children,
}: SearchSessionProviderProps) {
	const [session, setSession] = useState<SearchSession>(INITIAL_SESSION)
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

	return (
		<SearchSessionContext.Provider value={value}>
			{children}
		</SearchSessionContext.Provider>
	)
}
