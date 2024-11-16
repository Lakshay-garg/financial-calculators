import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto'; // Ensure you're importing the correct version of Chart.js

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.css']
})
export class SipCalculatorComponent implements AfterViewInit, OnInit {
  @ViewChild('myChart', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;

  monthlyInvestment: number = 25000;
  expectedReturnRate: number = 12;
  timePeriod: number = 10;
  totalReturnsOnMaturity: number | string = 0;
  expectedReturns:number | string= 0;
  investedAmount:number | string = this.monthlyInvestment *12;
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
          labels: ['Invested Amount', 'Expected Return'],
          datasets: [{
            data: this.graphData,
            backgroundColor: [
              '#ed1c24',
              '#F7C5CC'
            ],
          }]
        },
        options: {
          plugins: {
            tooltip: {
              enabled: false  // Disable tooltips
            }
          },
        }
      });
    }
  }

  changeMonthlyInvestmentValue(value: number) {
    this.monthlyInvestment = value;
  }

  changeExpectedReturnValue(value: number) {
    this.expectedReturnRate = value;
  }

  changeTimePeriodValue(value: number) {
    this.timePeriod = value
  }

  calculator() {
    let principalAmount = this.monthlyInvestment
    let monthlyReturn = this.expectedReturnRate / 100 /12
    let totalMonths = this.timePeriod * 12

    // Formula calculation
    let a = Math.pow(1 + monthlyReturn, totalMonths); // (1 + i)^n
    let b = (a - 1) / monthlyReturn; // {[1 + i]^n – 1} / i
    this.totalReturnsOnMaturity = principalAmount * b * (1 + monthlyReturn); // P × b × (1 + i)

    this.investedAmount = (totalMonths * principalAmount)
    this.expectedReturns = this.totalReturnsOnMaturity - this.investedAmount

    this.graphData = [Math.round(this.investedAmount), Math.round(this.expectedReturns)];

    this.expectedReturns = Math.round(this.expectedReturns).toLocaleString('en-IN')
    this.investedAmount = Math.round(this.investedAmount).toLocaleString('en-IN')
    this.totalReturnsOnMaturity = Math.round(this.totalReturnsOnMaturity).toLocaleString('en-IN');

    

  }

  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.graphData;
      this.chart.update(); // This re-renders the chart with updated data
    }
  }
}
