import { ApiError } from "@errors/errorHandler.js";
import pb from "@helpers/pocketbase.js";
import { logger } from "@loggers/logger.js";
import { ClientResponseError } from "pocketbase";

/**
 * @async
 * @function register
 * @description Service for POST /auth/register
 * @param {Object} data
 * @returns Promise<Object>
 */
export async function register(
	payload: ICreateUserRequest
): Promise<DefaultServiceResponse> {
	payload.email = payload.email.toLowerCase();

	try {
		const user = await pb
			.collection("users")
			.create(payload)
			.then((user) => {
				if (user.created == "true") {
					pb.collection("users").requestVerification(payload.email);
				}
			});

		return {
			message:
				"User created successfully, Email verification code sent to your email",
			data: user,
		};
	} catch (error: unknown) {
		logger.error(
			"Something went wrong creating new user, Please try again"
		);
		let apiError: ClientResponseError = error as ClientResponseError;
		throw new ApiError(403, JSON.stringify(apiError.stack));
	}
}
