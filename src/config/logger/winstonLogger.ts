import winston, { format } from "winston"
import dotenv from "dotenv"

dotenv.config()

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

if (process.env.NODE_ENV !== `PROD`) {
    logger.add(
        new winston.transports.Console({
            format: format.simple(),
        })
    )
}

export default logger
