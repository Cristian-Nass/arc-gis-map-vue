
<template>
  <div id="viewDiv"></div>
</template>
<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
export default {
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      loadModules(
        ["esri/Map", "esri/views/MapView", "esri/rest/locator", "esri/Graphic"],
        {
          css: true,
        }
      ).then(([ArcGISMap, MapView, Locator, Graphic]) => {
        // create map with the given options
        const map = new ArcGISMap({
          basemap: "topo-vector",
        });

        // assign map to this view
        this.view = new MapView({
          container: this.$el,
          map: map,
          center: [17.6389, 59.8586],
          zoom: 13,
        });
        const serverUrl =
          "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
        const params = {
          address: {
            address: "Fänkålsgatan 25, 754 47 Uppsala",
          },
        };

        Locator.addressToLocations(serverUrl, params).then((results) => {
          if (results.length) {
            const result = results[0];
            const resultGraphic = new Graphic({
              geometry: result.location,
              attributes: {
                title: "address",
                address: result.address,
              },
              popupTemplate: {
                title: "title",
                content: result.address,
              },
            });
            this.view.graphics.add(resultGraphic);
            this.view.goTo({
              target: resultGraphic,
              zoom: 13,
            });
          }
        });

        /////////////////////////////////////////////////////////////////
      });
    },
  },
};
</script>
<style>
/* esri styles */
@import url("https://js.arcgis.com/4.4/esri/themes/light/main.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#viewDiv {
  position: absolute;
  top: 3.5rem;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>