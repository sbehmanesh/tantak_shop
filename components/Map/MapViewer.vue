<template>
  <div v-if="showMap">
    <client-only>
      <l-map :zoom="zoom" :center="[lat, long]" class="map-viewer">
        <l-tile-layer :url="url" :subdomains="subdomains" />
        <l-marker :lat-lng="[lat, long]"></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    lat: { require: String | Number },
    long: { require: String | Number },
  },
  data: () => ({
    zoom: 16,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    url: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  }),
  computed: {
    showMap() {
      return Boolean(this.lat) && Boolean(this.long)
    },
  },
}
</script>

<style scoped>
.map-viewer {
  width: 100%;
  height: 300px;
  z-index: 0;
}
</style>
