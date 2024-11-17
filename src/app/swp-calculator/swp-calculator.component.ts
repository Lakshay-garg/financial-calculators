import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-swp-calculator',
  templateUrl: './swp-calculator.component.html',
  styleUrls: ['./swp-calculator.component.css']
})
export class SwpCalculatorComponent {

  @ViewChild('myChart', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;

  totalInvestment: number = 500000;
  monthyWithdrawal:number = 10000;
  expectedReturnRate: number = 12;
  timePeriod: number = 10;
  totalWithdrawn:number | string = 0;
  remainingInvestment:number |string = 0;
  investedAmount:number = this.totalInvestment;

  graphData: number[] = [0, 0]; // Default empty data array
  chart:any

  ngOnInit(): void {
    this.calculator()
  }

  ngAfterViewInit(): void {
    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Money invested', 'Money Withdrawn'],
          datasets: [{
            data: this.graphData,
            backgroundColor: [
              '#ed1c24',
              '#F7C5CC'
            ],
          }]
        },
      });
    }
  }

  changeTotalInvestmentValue(value: number) {
    this.totalInvestment = value;
  }

  changeMonthlyWithdrawnValue(value:number){
    this.monthyWithdrawal = value;
  }

  changeExpectedReturnValue(value: number) {
    this.expectedReturnRate = value;
  }

  changeTimePeriodValue(value: number) {
    this.timePeriod = value;
  }

  calculator() {
      // Input Variables
      let principalAmount = this.totalInvestment; // Initial investment
      let annualReturnRate = this.expectedReturnRate / 100; // Convert percentage to decimal
      let withdrawalAmount = this.monthyWithdrawal; // Periodic withdrawal
      let compoundingFrequency = 12; // Monthly compounding
      let timePeriodInYears = this.timePeriod; // Total time in years
  
      // Derived Variables
      let periodicReturnRate = annualReturnRate / compoundingFrequency; // Periodic return rate
      let totalPeriods = timePeriodInYears * compoundingFrequency; // Total number of periods
  
      // SWP Formula
      let futureValue =
          principalAmount * Math.pow(1 + periodicReturnRate, totalPeriods) -
          (withdrawalAmount * (Math.pow(1 + periodicReturnRate, totalPeriods) - 1)) / periodicReturnRate;
  
      // Calculate Total Withdrawal Amount
      this.totalWithdrawn = withdrawalAmount * totalPeriods;
  
      // Calculate Remaining Investment
      this.remainingInvestment = Math.max(futureValue, 0); // Ensure no negative value

      this.graphData = [Math.round(this.totalInvestment), Math.round(this.totalWithdrawn)];
  
      // Formatting Results
      this.totalWithdrawn = Math.round(this.totalWithdrawn).toLocaleString('en-IN');
      this.remainingInvestment = Math.round(this.remainingInvestment).toLocaleString('en-IN');
  
      // Prepare Graph Data
      this.updateChart()
      
  }


  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.graphData;
      this.chart.update(); // This re-renders the chart with updated data
    }
  }

}
