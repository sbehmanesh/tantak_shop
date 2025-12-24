<template>
  <div class="mt-2">
    <SlickSlider>
      <v-col v-for="(x, i) in story" :key="i" cols="12" md="12" class="pa-0 text-center">
        <v-row class="d-flex justify-center ma-2">
          <v-avatar size="75" class="d-flex align-center justify-center pa-1 bg-color">
            <v-avatar size="65">
              <v-img contin :src="x.value"></v-img>
            </v-avatar>
          </v-avatar>
          <v-col cols="12" class="text-center pt-0">
            <small>
              {{ x.text }}
            </small>
          </v-col>
        </v-row>
      </v-col>
    </SlickSlider>
  </div>
</template>
<script>
import SlickSlider from "./SlickSlider.vue";
export default {
  components: {
    SlickSlider,
  },
  data() {
    return {
      story: [
        { text: "text  ", value: "/image/blog1.jpg" },
        { text: "text  ", value: "/image/blog1.jpg" },
        { text: "text  ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
        { text: "text 1 ", value: "/image/blog1.jpg" },
      ],
    };
  },
};
</script>
<style scoped>
.bg-color {
  background: linear-gradient(45deg, #833ab4, #fd1d1d, #f56040, #fcaf45) !important;
  border-radius: 100%;
}
</style>
