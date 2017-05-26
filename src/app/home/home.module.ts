import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {PopupModule} from 'ng2-opd-popup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HomeRoutingModule,
    PopupModule.forRoot()
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
