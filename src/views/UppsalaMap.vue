<template>
  <div id="map-view-container"></div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as Locator from "@arcgis/core/rest/locator";
import Graphic from "@arcgis/core/Graphic";
import AddressCandidate from "@arcgis/core/rest/support/AddressCandidate";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "Map",

  setup() {
    // let layer: Ref<FeatureLayer | null> = ref(null);
    // const viewType = ref(['topo-vector', 'hybrid', 'gray-vector', 'streets-vector', 'streets-night-vector', 'dark-gray-vector'])

    //same issues with reactive object as well
    ///let app = reactive({ zones: null, view:null });

    const setupMap = async () => {
      const map = new Map({
        basemap: "streets-navigation-vector",
      });

      const view = new MapView({
        container: "map-view-container",
        map,
        zoom: 14,
        center: [17.644621, 59.858131],
        popup: {
          autoOpenEnabled: false,
        },
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
            symbol: {
              type: "simple-marker",
              color: "red",
              size: "12px",
              outline: {
                color: "#ffffff",
                width: "2px",
              },
            },
            attributes: {
              title: "address",
              address: result.address,
            },
            popupTemplate: {
              title: "title",
              content: result.address,
            },
          });
          view.graphics.add(resultGraphic);
          view.goTo({
            target: resultGraphic,
            zoom: 13,
          });
        }
      });

      // layer.value = new FeatureLayer({
      //   portalItem: {
      //     id: "9e2f2b544c954fda9cd13b7f3e6eebce",
      //     id: "9e2f2b544c954fda9cd13b7f3e6eebce",
      //   },
      //   outFields: ["*"],
      //   title: "Recent Earthquakes",
      // });

      // try {
      //   //this will generate an error
      //   map.add(layer.value);
      // } catch (e) {
      //   console.log("error with map.add(layer)");
      //   console.log(e);
      //   map.add(layer.value.load());
      // }

      // view.value.whenLayerView(layer.value).then((layerView) => {
      //   console.log("layerview generated");
      //   console.log(layerView);
      // });
    };
    onMounted(setupMap);
    return {};
  },
});
</script>

<style scoped>
#map-view-container {
  padding: 0;
  margin: 0 auto;
  width: 90vw;
  height: 800px;
}
</style>
