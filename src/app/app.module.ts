import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SipCalculatorComponent } from './sip-calculator/sip-calculator.component';
import { LumpsumCalculatorComponent } from './lumpsum-calculator/lumpsum-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    SipCalculatorComponent,
    LumpsumCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
