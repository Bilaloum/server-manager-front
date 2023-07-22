import { ServerState } from "../enumeration/server-state.enum";

export interface Server{
    id:number,
    ipAddress: string,
    name: string,
    status: ServerState,
    type: string,
    memory: string,
    imageUrl: string,

}