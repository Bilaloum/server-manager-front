import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap,catchError } from "rxjs/operators";
import { Server } from '../interface/Server';
import { ServerState } from '../enumeration/server-state.enum';
import { CustomResponse } from '../interface/CustomResponse';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  private readonly apiUrl:string = "http://localhost:8085";
  
  constructor(private http: HttpClient) { }

  servers$ = <Observable<CustomResponse>> this.http
  .get<CustomResponse>(`${this.apiUrl}/server`)
      .pipe(
        tap(console.log),
        catchError(this.handelError)
        );

  save$ = (server: Server) => <Observable<CustomResponse>> this.http
  .post<CustomResponse>(`${this.apiUrl}/server/save`, server)
      .pipe(
        tap(console.log),
        catchError(this.handelError)
        )

  serverById$ =(id: number) => <Observable<CustomResponse>> this.http
  .get<CustomResponse>(`${this.apiUrl}/server/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handelError)
        )
  
    filter$ =(serverState: ServerState,response :CustomResponse ) => <Observable<CustomResponse>>(
      new Observable<CustomResponse>(
        subscriber => {
          subscriber.next(
            serverState === ServerState.ALL ? {...response, message:`servers filtred by ${ServerState.ALL}`}:
            {
              ...response,
              message: response.data.servers?.filter(server => server.status === serverState).length! > 0 ?
              `servers filtred by ${ServerState.SERVER_DOWN? 'SERVER DOWN': 'SERVER UP'} status`:
              `No server with ${ServerState.SERVER_DOWN? 'SERVER DOWN': 'SERVER UP'} status`,
              
              data: {servers: response.data.servers?.filter(server => server.status === serverState)}
            }
          );
            subscriber.complete();
        }
      )
    ).pipe(
      tap(console.log),
      catchError(this.handelError)
      ) 
    
    deleteServer$ =(id: number) => <Observable<CustomResponse>> this.http
    .delete<CustomResponse>(`${this.apiUrl}/server/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handelError)
        );
    
    updateServer$ =(server: Server) => <Observable<CustomResponse>> this.http
      .patch<CustomResponse>(`${this.apiUrl}/server`,server)
      .pipe(
        tap(console.log),
        catchError(this.handelError)
        )
    
  private handelError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() =>`an error has been occured ${error.status}`);
  }
}
