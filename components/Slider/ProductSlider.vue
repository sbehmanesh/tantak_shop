<template>
  <v-sheet class="pb-8 pb-md-8 mt-5 mt-md-10">
    <!-- slider title mobile -->
    <!-- <v-row v-if="!$vuetify.breakpoint.mdAndUp" no-gutters class="justify-start mb-3 mr-3 mr-sm-6 ">{{title}}</v-row> -->
    <!-- slider title mobile end -->

    <v-row no-gutters class="">
      <!-- slider title -->
      <v-col cols="12" class="d-flex align-center justify-center py-6">
        <v-divider
          color="primary lighten-2"
          :class="$vuetify.breakpoint.mdAndUp ? 'mx-8' : 'mx-3'"
        ></v-divider>
        <div :class="$vuetify.breakpoint.mdAndUp ? 'font_24' : 'font_18'">
          {{ title }}
        </div>
        <v-divider
          color="primary lighten-2"
          :class="$vuetify.breakpoint.mdAndUp ? 'mx-8' : 'mx-3'"
        ></v-divider>
        <!-- <v-btn v-if="url" nuxt :to="url" class="rounded-0" outlined color="blackd" style="letter-spacing:unset ;" >مشاهده همه</v-btn> -->
      </v-col>
      <!-- slider title end -->

      <!-- slider row -->
      <v-col class="pr-3 pr-sm-6 overflow-hidden">
        <v-row no-gutters v-if="loading" class="justify-center">
          <v-skeleton-loader
            v-for="i in $vuetify.breakpoint.mdAndUp ? 5 : 2"
            :key="i"
            class="mx-auto"
            :width="$vuetify.breakpoint.mdAndUp ? 240 : 140"
            type="card, text"
          ></v-skeleton-loader>
        </v-row>
        <!-- <div v-if="loading" class="d-flex justify-center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div> -->
        <SlickSlider v-if="products && products.length > 0">
          <ProductCard
            v-for="(product, index) in products"
            :key="index"
            :data="product"
            :infinite="infinite"
            :cardHeight="$vuetify.breakpoint.mdAndUp ? 350 : 306"
          />
        </SlickSlider>
      </v-col>
      <!-- slider row end -->
    </v-row>
  </v-sheet>
</template>

<script>
import SlickSlider from "./SlickSlider.vue";
import ProductCard from "../Card/ProductCard.vue";
export default {
  components: { SlickSlider, ProductCard },
  props: {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    products: {
      type: Array,
      require: true,
    },
    infinite: {
      type: Boolean,
      default: true,
    },
    loading: {},
  },
  data: () => ({
    slider_item: [
      {
        src: "/image/product1.jpg",
        alt: "alt",
      },
      {
        src: "/image/product2.jpeg",
        alt: "alt",
      },
      {
        src: "/image/product3.jpeg",
        alt: "alt",
      },
      {
        src: "/image/product4.jpg",
        alt: "alt",
      },
      {
        src: "/image/product4.jpg",
        alt: "alt",
      },
      {
        src: "/image/product4.jpg",
        alt: "alt",
      },
      {
        src: "/image/product4.jpg",
        alt: "alt",
      },
    ],
    current_item: 0,
  }),
  mounted() {},
};
</script>
