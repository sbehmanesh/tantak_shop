<template>
  <v-hover v-slot="{ hover }">
    <div class="amp-carousel">
      <v-fade-transition>
        <div v-if="hover" class="amp-carousel-control-right">
          <v-btn
            class="elevation-0 d-flex justify-center align-center rounded-0"
            style="width: 60px; height: 60px; opacity: 60%"
            @click="showNext()"
          >
            <v-icon size="32">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-fade-transition>
      <v-fade-transition>
        <div v-if="hover" class="amp-carousel-control-left">
          <v-btn
            class="elevation-0 d-flex justify-center align-center rounded-0"
            style="width: 60px; height: 60px; opacity: 60%"
            @click="showPrev()"
          >
            <v-icon size="32">mdi-arrow-left</v-icon>
          </v-btn>
        </div>
      </v-fade-transition>
      <div v-if="settings">
        <!-- ### need to ask ssr or client only -->
        <client-only>
          <VueSlickCarouselRtl :rtl="true" ref="carousel" v-bind="settings">
            <slot></slot>
          </VueSlickCarouselRtl>
        </client-only>
      </div>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    infinite: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    settings: null,
  }),
  mounted() {
    this.settings = {
      rtl: true,
      speed: 600,
      // arrows: false,
      infinite: this.infinite,
      slidesToShow: 6,
      accessibility: true,
      variableWidth: true,
      // centerPadding: '0',
      // responsive: [
      //   {
      //     breakpoint: 1300,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //     },
      //   },
      //   {
      //     breakpoint: 900,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 2,
      //     },
      //   },

      //   {
      //     breakpoint: 600,
      //     settings: {
      //       // initialSlide: 3,
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //     },
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //     },
      //   },
      //   {
      //     breakpoint: 350,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 2,
      //     },
      //   },
      // ],
    };
  },
  methods: {
    showNext() {
      this.$refs.carousel.prev();
    },
    showPrev() {
      this.$refs.carousel.next();
    },
  },
};
</script>
<style scoped>
.amp-carousel {
  position: relative;
}
.amp-carousel-control-right,
.amp-carousel-control-left {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
}

.amp-carousel-control-right {
  right: 0;
}
.amp-carousel-control-left {
  left: 0;
}
</style>
