import  {Server } from "./Server";

export interface CustomResponse{
    date:Date,
    statusCode: number,
    status: string,
    message: string,
    reason?: string,
    developerMessage?: string,
    data: {servers?: Server[], server?: Server}

}