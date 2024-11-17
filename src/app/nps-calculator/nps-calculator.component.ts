import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-nps-calculator',
  templateUrl: './nps-calculator.component.html',
  styleUrls: ['./nps-calculator.component.css']
})
export class NpsCalculatorComponent {
  @ViewChild('myChart', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;

  currentAge: number = 20;
  monthlyInvestment: number = 10000;
  annualReturnRate: number = 9;
  totalCorpus: number | string = 0;
  totalInvestment: number | string = 0
  interestEarned: number | string = 0
  graphData: number[] = [0, 0]; // Default empty data array
  chart: any

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
          labels: ['Money invested', 'Interest Earned'],
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

  changeCurrentAgeValue(value: number) {
    this.currentAge = value;
  }


  changeMonthlyInvestmentValue(value: number) {
    this.monthlyInvestment = value;
  }

  changeExpectedReturnValue(value: number) {
    this.annualReturnRate = value;
  }


  calculator() {
    const timePeriod = 60 - this.currentAge; // Years left until retirement
    const annualReturnRate = this.annualReturnRate / 100; // Annual return rate as a decimal
    const compoundingPeriod = 12; // Monthly compounding
    const monthlyContribution = this.monthlyInvestment; // Monthly contribution

    // Total principal amount invested (P * 12 * years)
    this.totalInvestment = monthlyContribution * 12 * timePeriod;

    // Calculate monthly rate
    const monthlyRate = annualReturnRate / compoundingPeriod;

    // Total number of months
    const totalMonths = timePeriod * compoundingPeriod;

    // Future value of annuity for monthly contributions
    const corpus =
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
        (1 + monthlyRate);
    
    let interestEarned = corpus - this.totalInvestment

    this.graphData = [this.totalInvestment,interestEarned]

    // Format total corpus
    this.interestEarned = Math.round(corpus - this.totalInvestment).toLocaleString('en-IN');
    this.totalCorpus = Math.round(corpus).toLocaleString('en-IN');

    

    // Prepare Graph Data
    this.updateChart()

  }


  updateChart() {
    if (this.chart) {
      console.log(this.graphData)
      this.chart.data.datasets[0].data = this.graphData;
      this.chart.update(); // This re-renders the chart with updated data
    }
  }

}
