export const getMongooseCollectionDisplayName = (collectionName: string): string => (collectionName.charAt(0).toUpperCase() + collectionName.slice(1)).slice(0, -1);