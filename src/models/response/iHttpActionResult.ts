export interface IHttpActionResult<T>{
    data: T;
    errors: string[];
    isBusiness: boolean;
    statusCode: number;
    success: boolean;
}