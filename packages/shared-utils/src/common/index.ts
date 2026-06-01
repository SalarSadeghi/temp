import BigJson from "json-bigint"

export const jsonToBigInt = (data: any) => BigJson({ storeAsString: true }).parse(data);