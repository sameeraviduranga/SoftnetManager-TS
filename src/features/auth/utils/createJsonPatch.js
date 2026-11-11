import { compare } from "fast-json-patch"

export const createJsonPatch = (originalData, updatedData) => {
    return compare(originalData, updatedData);
}