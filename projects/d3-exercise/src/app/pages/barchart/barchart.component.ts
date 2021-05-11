import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as D3 from 'd3';
import {Data} from '../../model/Data';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html'
})
export class BarchartComponent implements OnInit, AfterViewInit {

  svg: D3.Selection<D3.BaseType, unknown, HTMLElement, any>;

  xValue = (d: Data) => d.population;
  yValue = (d: Data) => d.country;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.svg = D3.select('#bar-chart');
    D3.csv('assets/data.csv').then((data) => {
      const normalized = data.map((d) => ({ country: d.country, population: +d.population * 1000}));
      this.render(normalized);
    });
  }

  private render(data: Data[]): void {
    const xScale = D3.scaleLinear()
      .domain([0, D3.max(data, this.xValue)])
      .range([0, +this.svg.attr('width')]);

    const yScale = D3.scaleBand()
      .domain(data.map(this.yValue))
      .range([0, +this.svg.attr('height')]);

    this.svg.selectAll('rect').data(data).enter()
      .append('rect')
        .attr('y', d => yScale(this.yValue(d)))
        .attr('width', d => xScale(this.xValue(d)))
        .attr('height', yScale.bandwidth());
  }

}
