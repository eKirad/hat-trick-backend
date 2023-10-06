import { EnvironmentEnum } from "../../types"

export const getMorganLoggerArgumentsForEnv = (env: EnvironmentEnum) => {
    switch (env) {
        case EnvironmentEnum.DEV:
            return {
                format: "dev",
                options: {
                    immediate: true,
                },
            }
    }
}
