import type {
	Intent,
	Session,
	SuccessResponse,
} from "../shared/messages/intents/intent"
import type { SearchSession } from "../shared/messages/session/SearchSession"

export function processIntent(message: Intent, session: SearchSession) {
	switch (message.intent) {
		case "INITIATE_SESSION":
			return {
				type: "session",
				searchSession: session,
			} satisfies Session

		case "SET_QUERY":
			session.query = message.payload.query
			return { success: true } satisfies SuccessResponse

		case "SET_ALGORITHM":
			session.algorithm = message.payload.algorithm
			return { success: true } satisfies SuccessResponse

		case "NEXT_RESULT":
			return { success: true } satisfies SuccessResponse

		case "PREVIOUS_RESULT":
			return { success: true } satisfies SuccessResponse

		case "SET_MODE":
			session.mode = message.payload.mode
			return { success: true } satisfies SuccessResponse

		case "SET_LITERALCASESENSITIVE":
			session.config.literal.caseSensitive = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case "SET_LITERALWHOLEWORD":
			session.config.literal.wholeWord = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case "SET_REGEXCASESENSITIVE":
			session.config.regex.caseSensitive = message.payload.enabled
			return { success: true } satisfies SuccessResponse
	}
}
