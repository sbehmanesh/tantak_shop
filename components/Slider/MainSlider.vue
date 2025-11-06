<template>
  <div>
    <v-col
      ref="sliderWrapper"
      cols="12"
      class="pa-0"
    >
      <v-carousel
        cycle
        :height="carouselHeight"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(slide, index) in slider_item"
          :key="index"
        >
          <nuxt-link
            v-if="slide.link"
            :to="slide.link"
            class="d-block"
          >
            <v-img
              :src="$getImage(getSlideImage(slide))"
              :alt="slide.title"
              :aspect-ratio="aspectRatio"
              cover
              class="main-slider__image"
            />
          </nuxt-link>
          <v-img
            v-else
            :src="$getImage(getSlideImage(slide))"
            :alt="slide.title"
            :aspect-ratio="aspectRatio"
            cover
            class="main-slider__image"
          />
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </div>
</template>

<script>
const BREAKPOINTS = {
  desktop: 1280,
  tablet: 768
};

const ASPECT_RATIOS = {
  desktop: 16 / 6,
  tablet: 3 / 2,
  mobile: 1
};

const HEIGHT_LIMITS = {
  desktop: { min: 480, max: 900 },
  tablet: { min: 420, max: 780 },
  mobile: { min: 340, max: 640 }
};

const DEFAULT_ASPECT_RATIO = 16 / 9;

export default {
  props: {
    slider_item: {
      type: Array,
      default: () => [
        {
          title: "",
          link: "",
          images: {
            desktop: "",
            tablet: "",
            mobile: ""
          }
        }
      ]
    }
  },
  data: () => ({
    windowWidth: process.client ? window.innerWidth : BREAKPOINTS.desktop,
    containerWidth: process.client ? window.innerWidth : BREAKPOINTS.desktop
  }),
  computed: {
    aspectRatio() {
      return ASPECT_RATIOS[this.currentBreakpoint] || DEFAULT_ASPECT_RATIO;
    },
    currentBreakpoint() {
      if (this.windowWidth >= BREAKPOINTS.desktop) {
        return "desktop";
      }
      if (this.windowWidth >= BREAKPOINTS.tablet) {
        return "tablet";
      }
      return "mobile";
    },
    carouselHeight() {
      const width = this.containerWidth || this.windowWidth;
      const rawHeight = Math.round(width / this.aspectRatio);
      const limits = HEIGHT_LIMITS[this.currentBreakpoint] || HEIGHT_LIMITS.mobile;
      return Math.max(limits.min, Math.min(rawHeight, limits.max));
    }
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.$nextTick(this.updateContainerWidth);
    },
    getSlideImage(slide) {
      if (slide && slide.images && slide.images[this.currentBreakpoint]) {
        return slide.images[this.currentBreakpoint];
      }
      return slide.image || "";
    },
    updateContainerWidth() {
      if (!process.client) {
        return;
      }
      if (this.$refs.sliderWrapper && this.$refs.sliderWrapper.clientWidth) {
        this.containerWidth = this.$refs.sliderWrapper.clientWidth;
      } else {
        this.containerWidth = window.innerWidth;
      }
    }
  },
  mounted() {
    if (process.client) {
      this.$nextTick(this.updateContainerWidth);
      window.addEventListener("resize", this.onResize, { passive: true });
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener("resize", this.onResize);
    }
  }
};
</script>

<style scoped>
.main-slider__image {
  width: 100%;
}
</style>
