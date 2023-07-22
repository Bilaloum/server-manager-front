import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServersPageComponent } from './component/servers-page/servers-page.component';

const routes: Routes = [
  {path:'', component:ServersPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
