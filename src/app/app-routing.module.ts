import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SipCalculatorComponent } from './sip-calculator/sip-calculator.component';
import { LumpsumCalculatorComponent } from './lumpsum-calculator/lumpsum-calculator.component';

const routes: Routes = [
  {path:'sip-calculator',component:SipCalculatorComponent},
  {path:'lumpsum-calculator',component:LumpsumCalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
