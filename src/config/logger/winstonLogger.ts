import winston, { format } from "winston"
import { isNotProd } from "../../shared/consts"

const logger = winston.createLogger()

logger.add(
    new winston.transports.File({
        level: `info`,
        filename: `backend.log`,
        format: format.combine(
            format.timestamp({
                format: `YYYY-MM-DD HH:mm:ss`,
            }),
            format.json()
        ),
    })
)

if (isNotProd) {
    logger.add(
        new winston.transports.Console({
            format: format.simple(),
        })
    )
}

export default logger
