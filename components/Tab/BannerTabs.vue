<template>
  <div class="mt-5 mt-md-10">
    <v-tabs show-arrows="" centered v-model="tab" background-color="transparent">
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        style="letter-spacing: unset"
      >
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items class="transparent mt-3" v-model="tab">
      <v-tab-item v-for="(tab, index) in tabs" :key="index">
        <BannerCardSquare :banners="tab.children_categories" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import BannerCardSquare from "../Card/BannerCardSquare.vue";
export default {
  components: { BannerCardSquare },
  props: {
    tabs: {
      type: Array,
    },
  },
  data: () => ({
    tab: null,
  }),
};
</script>