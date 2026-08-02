import type { Intent } from "../shared/messages/intents/intent"
import { IntentType } from "../shared/messages/intents/intentTypes"
import type {
	Session,
	SuccessResponse,
} from "../shared/messages/response/response"
import type { SearchSession } from "../shared/messages/session/SearchSession"

export function processIntent(
	message: Intent,
	session: SearchSession
): Session | SuccessResponse {
	switch (message.intent) {
		case IntentType.INITIATE_SESSION:
			return {
				type: "session",
				searchSession: session,
			} satisfies Session

		case IntentType.SET_QUERY:
			session.query = message.payload.query
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_ALGORITHM:
			session.algorithm = message.payload.algorithm
			return { success: true } satisfies SuccessResponse

		case IntentType.NEXT_RESULT:
			return { success: true } satisfies SuccessResponse

		case IntentType.PREVIOUS_RESULT:
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_MODE:
			session.mode = message.payload.mode
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_LITERALCASESENSITIVE:
			session.config.literal.caseSensitive = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_LITERALWHOLEWORD:
			session.config.literal.wholeWord = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_REGEXCASESENSITIVE:
			session.config.regex.caseSensitive = message.payload.enabled
			return { success: true } satisfies SuccessResponse
	}
}
