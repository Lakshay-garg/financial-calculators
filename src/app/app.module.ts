import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { SipCalculatorComponent } from './sip-calculator/sip-calculator.component';
import { LumpsumCalculatorComponent } from './lumpsum-calculator/lumpsum-calculator.component';
import { FormsModule } from '@angular/forms';
import { SwpCalculatorComponent } from './swp-calculator/swp-calculator.component';
import { NpsCalculatorComponent } from './nps-calculator/nps-calculator.component';


@NgModule({
  declarations: [
    AppComponent,
    SipCalculatorComponent,
    LumpsumCalculatorComponent,
    SwpCalculatorComponent,
    NpsCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
