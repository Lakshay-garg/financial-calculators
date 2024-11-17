import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-lumpsum-calculator',
  templateUrl: './lumpsum-calculator.component.html',
  styleUrls: ['./lumpsum-calculator.component.css']
})
export class LumpsumCalculatorComponent implements AfterViewInit{

  @ViewChild('myChart', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;

  lumpsumInvestment: number = 500000;
  expectedReturnRate: number = 12;
  timePeriod: number = 10;
  totalReturnsOnMaturity: number | string = 0;
  expectedReturns:number | string= 0;
  investedAmount:number | string = this.lumpsumInvestment;
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
      });
    }
  }

  changeMonthlyInvestmentValue(value: number) {
    this.lumpsumInvestment = value;
  }

  changeExpectedReturnValue(value: number) {
    this.expectedReturnRate = value;
  }

  changeTimePeriodValue(value: number) {
    this.timePeriod = value
  }

  calculator() {
    let principalAmount = this.lumpsumInvestment
    let monthlyReturn = this.expectedReturnRate / 100 
    let timePeriodInYears = this.timePeriod;

    // Formula calculation
    let a = Math.pow(1 + monthlyReturn, timePeriodInYears); // (1 + i)^n

    this.totalReturnsOnMaturity = principalAmount * a; // P × b × (1 + i)

    this.expectedReturns = this.totalReturnsOnMaturity - this.lumpsumInvestment

    this.graphData = [Math.round(this.lumpsumInvestment), Math.round(this.expectedReturns)];

    this.expectedReturns = Math.round(this.expectedReturns).toLocaleString('en-IN')
    this.investedAmount = Math.round(this.lumpsumInvestment).toLocaleString('en-IN')
    this.totalReturnsOnMaturity = Math.round(this.totalReturnsOnMaturity).toLocaleString('en-IN');

    this.updateChart()

  }

  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.graphData;
      this.chart.update(); // This re-renders the chart with updated data
    }
  }

}
