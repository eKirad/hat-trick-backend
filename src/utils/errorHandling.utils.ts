import { StatusCodes } from "http-status-codes"
import { TFunction } from "i18next"

export const handleFallbackError = (error: any, t: TFunction) => {
    const errorMessage = error.message || t("error:internal_server_error")
    const errorCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

    return { errorMessage, errorCode }
}
