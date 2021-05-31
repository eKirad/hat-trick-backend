export const omitMongooseObjectProp = <T> (obj: any, prop: string): T => {
    const { [prop]: omit, ...res } = obj._doc;
    return res;
}