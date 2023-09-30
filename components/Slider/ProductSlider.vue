<template>
  <v-sheet class="py-5 py-md-10 mt-5 mt-md-10">
    <!-- slider title mobile -->
    <v-row v-if="!$vuetify.breakpoint.mdAndUp" no-gutters class="justify-start mb-3 mr-3 mr-sm-6 ">{{title}}</v-row>
    <!-- slider title mobile end -->

    <v-row no-gutters class="flex-nowrap">

      <!-- slider title -->
      <v-col v-if="$vuetify.breakpoint.mdAndUp" class="flex-grow-0 d-flex flex-column justify-space-between align-center pr-16 pl-8 pt-4" style="height:300px">
        <div class="font_24">{{title}}</div>
        <v-btn v-if="url" nuxt :to="url" class="rounded-0" outlined color="blackd" style="letter-spacing:unset ;" >مشاهده همه</v-btn>
      </v-col>
      <!-- slider title end -->

      <!-- slider row -->
      <v-col class="pr-3 pr-sm-6 overflow-hidden ">
        <SlickSlider v-if="products">
          <ProductCard 
          v-for="(product,index) in products" 
          :key="index" 
          :data="product"
          :infinite="infinite" 
          />
        </SlickSlider>
      </v-col>
      <!-- slider row end -->

    </v-row>

  </v-sheet>
</template>

<script>
import SlickSlider from './SlickSlider.vue';
import ProductCard from '../Card/ProductCard.vue';
export default {
  components: { SlickSlider, ProductCard },
  props:{
    title:{
      type:String,
    },
    url:{
      type:String,
    },
    products:{
      type:Array,
      require:true,
    },
    infinite:{
      type: Boolean,
      default: true,
    }
  },
  data: () => ({
      slider_item: [
          {
              src: "/image/product1.jpg",
              alt: "alt"
          },
          {
              src: "/image/product2.jpeg",
              alt: "alt"
          },
          {
              src: "/image/product3.jpeg",
              alt: "alt"
          },
          {
            src:"/image/product4.jpg",
            alt:"alt"
          },
          {
            src:"/image/product4.jpg",
            alt:"alt"
          },
          {
            src:"/image/product4.jpg",
            alt:"alt"
          },
          {
            src:"/image/product4.jpg",
            alt:"alt"
          },
      ],
      current_item: 0,
  }),
  mounted(){
  }
}
</script>