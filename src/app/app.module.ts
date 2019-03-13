import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LineItemComponent } from './components/line-item/line-item.component';
import { SectionComponent } from './components/section/section.component';
import { SalaryComponent } from './components/salary/salary.component';
import { BalanceComponent } from './components/balance/balance.component';
import { FooterComponent } from './components/footer/footer.component';
import { ControlsComponent } from './components/controls/controls.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const appRoutes: Routes = [
  {
    path: '**',
    component: MainLayoutComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    LineItemComponent,
    SalaryComponent,
    BalanceComponent,
    FooterComponent,
    ControlsComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        newestOnTop: true,
        closeButton: false,
        progressBar: true,
        tapToDismiss: false,
        // titleClass: 'h3',
        // messageClass: 'text-uppercase'
      }
    ),
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
        scrollPositionRestoration: 'enabled'
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
