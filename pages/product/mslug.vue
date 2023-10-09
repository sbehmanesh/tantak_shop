<template>
  <v-row>
    <v-col cols="1"></v-col>
    <v-col cols="10">
      <v-card class="my-6 border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>

      <v-card class="border12">
        <v-row no-gutters>
          <v-col class="col-12 col-md-6 pa-md-4">
            <ProductDetailsSlider :slider_item="product_slider" />
          </v-col>
          <v-col class="col-12 col-md-6">
            <ProductDetailsForm :product="product" />
          </v-col> </v-row
      ></v-card>
    </v-col>
    <v-col cols="1"></v-col>
  </v-row>
</template>
<script>
import ProductDetailsSlider from "~/components/Slider/ProductDetailsSlider.vue";
import ProductDetailsForm from "~/components/Product/ProductDetailsForm.vue";
export default {
  components: { ProductDetailsSlider, ProductDetailsForm },
  data() {
    return {
      product_slider: [
        {
          image: "/image/products/1.jpg",
        },
        {
          image: "/image/products/11.jpg",
        },
        {
          image: "/image/products/111.jpg",
        }
      ],
      product: {
        name: "کتانی زنانه دیزل",
        comments: [
          'کفش قشنگی است', 'از خریدم راضی هستم'
        ],
        price: '790000',
          colors: ['طوسی/سفید/بنفش', 'طوسی/سفید/مشکی', 'مشکی/سفید/قرمز'],
          sizes: ['37', '38', '39', '40']
      },
      items: [
        {
          text: "فروشگاه",
          disabled: false,
          to: "/",
        },
        {
          text: "کفش",
          disabled: false,
          to: "/product",
        },
        {
          text: "مردانه",
          disabled: true,
          to: "",
        },
      ],
    };
  },
};
</script>
