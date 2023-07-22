import { Component, OnInit } from '@angular/core';
import { CustomResponse } from '../../interface/CustomResponse';
import { AppState } from '../../interface/app-state';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ServerService } from '../../service/server.service';
import { DataState } from '../../enumeration/data-state.enum';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
@Component({
  selector: 'app-servers-page',
  templateUrl: './servers-page.component.html',
  styleUrls: ['./servers-page.component.scss'],
})
export class ServersPageComponent implements OnInit {
  appState$!: Observable<AppState<CustomResponse>>;
  faPlus = faPlus;
  faTrash = faTrash;
  readonly dataState!: DataState.LOADED_STATE;
  constructor(
    private serverService: ServerService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
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

  openDialog() {
    this.matDialog.open(CustomDialogComponent, {
      width: '400px',
    });
  }
}
