export const omitObjectProp = <T> (obj: any, prop: any): T => {
    const { [prop]: omit, ...res } = obj._doc;
    return res;
}