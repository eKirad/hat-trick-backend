export const parseBooleanEnv = (envVariable: string): boolean => {
    if (isNotSet(envVariable)) return false

    return envVariable.toLowerCase() === "true" || envVariable === "1"
}

const isNotSet = (value: any): boolean => value === undefined || value === null || value === ""
