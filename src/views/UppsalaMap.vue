<template>
  <div id="map-view-container"></div>
</template>

<script lang="ts">
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { defineComponent, ref, Ref, onMounted } from "vue";

export default defineComponent({
    name: 'Map',

  setup() {
    let layer: Ref<FeatureLayer | null> = ref(null);
    let view: Ref<MapView | null> = ref(null);

    //same issues with reactive object as well
    ///let app = reactive({ zones: null, view:null });

    const setupMap = () => {
      
      const map = new Map({
        // basemap: "topo-vector",
        // basemap: "hybrid",
        // basemap: "gray-vector",
        basemap: "streets-vector",
        // basemap: "terrain",
        // basemap: "streets-night-vector"
        // basemap: "dark-gray-vector"
      });

      view.value = new MapView({
        container: "map-view-container",
        map,
        zoom: 14,
        center: [17.644621, 59.858131],
        popup: {
          autoOpenEnabled: false,
        },
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
    return { setupMap, view, layer };
  },
});
</script>

<style scoped>
#map-view-container{
  padding:0;
  margin:0 auto;
  width: 80vw;
  height:600px;
}
</style>
