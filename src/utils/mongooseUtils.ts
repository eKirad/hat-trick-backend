import mongoose from "mongoose"

export const getMongooseCollectionDisplayName = (collectionName: string | undefined): string => (collectionName?.charAt(0).toUpperCase() + collectionName?.slice(1)).slice(0, -1)
export const isValidMongooseObjectId = (objectId: string): boolean => mongoose.Types.ObjectId.isValid(objectId) && new mongoose.Types.ObjectId(objectId).toString() === objectId
