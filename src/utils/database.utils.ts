export const excludeFields = (excludedFields: string[], object: any) => excludedFields.forEach((field) => delete object[field])
