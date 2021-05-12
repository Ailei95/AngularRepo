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

  margin = { top: 60, right: 60, bottom: 60, left: 200 };

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
    const innerWidth = +this.svg.attr('width') - this.margin.left - this.margin.right;

    const innerHeight = +this.svg.attr('height') - this.margin.top - this.margin.bottom;

    const xScale = D3.scaleLinear()
      .domain([0, D3.max(data, this.xValue)])
      .range([0, innerWidth]);

    const yScale = D3.scaleBand()
      .domain(data.map(this.yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const yAxis = D3.axisLeft(yScale);

    const xAxis = D3.axisBottom(xScale).tickFormat(this.xAxisFormat);

    const graphic = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    graphic.append('text')
      .attr('y', -15)
      .attr('class', 'graphic-title')
      .text('Top 10 most populous countries');

    graphic.selectAll('rect').data(data).enter()
      .append('rect')
      .attr('y', d => yScale(this.yValue(d)))
      .attr('width', d => xScale(this.xValue(d)))
      .attr('height', yScale.bandwidth());

    const yAxisG = graphic.append('g').call(yAxis).selectAll('.domain, .tick line').remove();

    const xAxisG = graphic.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('fill', 'black')
      .attr('y', 50)
      .attr('x', innerWidth / 2)
      .text('Population');
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
