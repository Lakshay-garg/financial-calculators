import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SipCalculatorComponent } from './sip-calculator/sip-calculator.component';
import { LumpsumCalculatorComponent } from './lumpsum-calculator/lumpsum-calculator.component';
import { SwpCalculatorComponent } from './swp-calculator/swp-calculator.component';
import { NpsCalculatorComponent } from './nps-calculator/nps-calculator.component';

const routes: Routes = [
  {path:'',redirectTo:'/sip-calculator',pathMatch:'full'},
  {path:'sip-calculator',component:SipCalculatorComponent},
  {path:'lumpsum-calculator',component:LumpsumCalculatorComponent},
  {path:'swp-calculator',component:SwpCalculatorComponent},
  {path:'nps-calculator',component:NpsCalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
