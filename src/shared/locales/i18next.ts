import i18next, { InitOptions } from "i18next"
import Backend from "i18next-fs-backend"
import * as i18nextMiddleware from "i18next-http-middleware"
import * as path from "path"

const i18nextOptions: InitOptions = {
    initImmediate: false,
    backend: {
        loadPath: path.join(__dirname, "/{{lng}}/{{ns}}.json")
    },
    detection: {
        lookupHeader: "accept-language"
    },
    ns: ["middleware", "error"],
    fallbackLng: "en",
    preload: ["en"]
}

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init(i18nextOptions)

export default i18next