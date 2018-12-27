import { Component } from '@angular/core';

// import 'src/vendor/d3.geomap.dependencies.min.js';
// import 'src/vendor/d3.geomap.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'd3GeoMap';

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    var d3WithGeo = window["d3"];
    var format = function(d) {
      d = d / 1000000;
      return d3WithGeo.format(',.02f')(d) + 'M';
  }
    
    // var map = d3WithGeo.geomap()
    // .geofile('/assets/topojson/world/countries.json')
    // .draw(window["d3"].select('#map'));
    var map = d3WithGeo.geomap.choropleth()
    .geofile('/assets/topojson/world/countries.json')
    .colors(['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b'])
    .column('YR2013')
    .format(format)
    .legend(true)
    .unitId('iso3');

    d3WithGeo.csv('assets/data/geo.csv', function(error, data) {
    var selection = d3WithGeo.select('#map').datum(data);
    map.draw(selection);
});
  }
}
