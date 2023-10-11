export const excludeFields = (excludedFields: string[], object: any) => excludedFields.forEach((field) => delete object[field])
export const getModelFields = (model: any) => Object.keys(model.schema.tree)
