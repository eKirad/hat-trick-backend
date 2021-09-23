// TODO: Check for a TS way of handling it
const i18next = require("i18next")
import * as i18nextBackend from "i18next-fs-backend"
import * as i18nextMiddleware from "i18next-http-middleware"
import * as path from "path"

i18next
    .use(i18nextBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        initImmediate: false,
        backend: {
            loadPath: path.join(__dirname, "/{{lng}}/{{ns}}.json")
        },
        detection: {
            lookupHeader: "accept-language"
        },
        ns: ["middleware"],
        fallbackLng: "en",
        preload: ["en"]
    })

export default i18next