import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as D3 from 'd3';
import {Data} from '../../../model/data.model';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit, AfterViewInit {

  svg: D3.Selection<D3.BaseType, unknown, HTMLElement, any>;

  margin = { top: 60, right: 60, bottom: 60, left: 120 };

  innerWidth: number;

  innerHeight: number;

  xScale: D3.ScaleLinear<number, number>;

  yScale: D3.ScaleBand<string>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.svg = D3.select('#bar-chart');
    D3.csv('assets/data.csv').then((data) => {
      const normalized = data.map((d) => ({ country: d.country, population: +d.population * 1000}))
        .sort((f, s) => s.population - f.population);
      this.render(normalized);
    });
  }

  private render(data: Data[]): void {
    this.innerWidth = +this.svg.attr('width') - this.margin.left - this.margin.right;

    this.innerHeight = +this.svg.attr('height') - this.margin.top - this.margin.bottom;

    this.xScale = D3.scaleLinear()
      .domain([0, D3.max(data, this.xValue)])
      .range([0, this.innerWidth]).nice();

    this.yScale = D3.scaleBand()
      .domain(data.map(this.yValue))
      .range([0, this.innerHeight])
      .padding(0.1);

    const yAxis = D3.axisLeft(this.yScale);

    const xAxis = D3.axisBottom(this.xScale).tickFormat(this.xAxisFormat);

    const graphic = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    graphic.append('text')
      .attr('y', -15)
      .attr('class', 'graphic-title')
      .text('Top 10 most populous countries');

    const yAxisG = graphic.append('g').call(yAxis).selectAll('.domain, .tick line').remove();

    const xAxisG = graphic.append('g').call(xAxis).attr('transform', `translate(0, ${this.innerHeight})`);

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('fill', 'black')
      .attr('y', 50)
      .attr('x', this.innerWidth / 2)
      .text('Population');

    this.renderBarchart(graphic, data);
  }

  private renderBarchart(
    graphic: D3.Selection<D3.BaseType, unknown, HTMLElement, any>,
    data: Data[]
  ): void {
    graphic.selectAll('rect').data(data).enter()
      .append('rect')
      .attr('y', d => this.yScale(this.yValue(d)))
      .attr('width', d => this.xScale(this.xValue(d)))
      .attr('height', this.yScale.bandwidth());
  }

  private xAxisFormat(n: number): string {
    return D3.format('.3s')(n).replace('G', 'B');
  }

  private xValue(d: Data): number {
    return d.population;
  }

  private yValue(d: Data): string {
    return d.country;
  }
}
