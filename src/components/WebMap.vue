<template>
  <div class="web-map">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ArcGisMap from '@arcgis/core/WebMap'
import MapView from '@arcgis/core/views/MapView'

export default defineComponent({
  name: 'WebMap',
  props: {
    id: String,
  },

  mounted() {
    const map = new ArcGisMap({
      portalItem: {
        id: this.id
      }
    });

    const view = new MapView({
      map,
      container: this.$el
    });

    view.when(() => {
      console.log('view Ready');
      
    })
  }


});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://js.arcgis.com/4.22/esri/themes/light/main.css');
  .web-map {
    width: 100%;
    height: 1000px;
  }
</style>
