import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '', component: ContactmanagerAppComponent,
    children: [
      { path: ':id', component: MainContentComponent },
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    MainContentComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,

    RouterModule.forChild(routes)
  ]
})
export class ContactmanagerModule { }
