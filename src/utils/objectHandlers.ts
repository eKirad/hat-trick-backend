export const omitMongooseObjectProp = <T>(obj: any, prop: string): T => {
    const { [prop]: omit, ...res } = obj

    return res
}

export const omitMultipleMongooseObjectProps = <T, U>(mongooseModel: T, props: string[]): U =>
    Object.keys(mongooseModel)
        .filter((key) => !props.includes(key))
        .reduce((result, key) => {
            result[key] = mongooseModel[key]

            return result
        }, {} as U)
