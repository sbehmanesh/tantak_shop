<template>
  <v-sheet class="pb-8 pb-md-8 mt-5 mt-md-10">
    <!-- <v-col cols="12" class="text-center blue--text"> پر بازدید ترین</v-col> -->
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
  computed: {
    normalizedProducts() {
      if (!Array.isArray(this.products)) return [];
      return this.products.map((product) => ({
        ...product,
        available: typeof product.available === "boolean" ? product.available : true,
      }));
    },
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

<style scoped>
.product-slider__card-wrapper {
  position: relative;
}
.product-slider__badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  pointer-events: none;
}
</style>
