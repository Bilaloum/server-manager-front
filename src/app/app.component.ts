import { Component, OnInit } from '@angular/core';
import { CustomResponse } from './interface/CustomResponse';
import { AppState } from './interface/app-state';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ServerService } from './service/server.service';
import { DataState } from './enumeration/data-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  appState$!: Observable<AppState<CustomResponse>>; 

  constructor(private serverService: ServerService){}

  ngOnInit():void {
    this.appState$ = this.serverService.servers$.pipe(
      map((response) => {
        return { dataState: DataState.LOADED_STATE, data: response };
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) =>
        of({ dataState: DataState.ERROR_STATE, error })
      )
    );
  }
}
