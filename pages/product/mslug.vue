<template>
  <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
    <v-col cols="1" v-if="$vuetify.breakpoint.mdAndUp"></v-col>
    <v-col cols="12" md="10" :class="$vuetify.breakpoint.smAndDown ? 'pa-3' : ''">
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
    <v-col cols="1" v-if="$vuetify.breakpoint.mdAndUp"></v-col>

    <div class="w-max background2 mt-3">
      <v-container>
        <ProductDetailsTab :product="product" />
      </v-container>
    </div>

    <div class="">
      <ProductSlider
        v-if="similar_products.length != 0"
        :products="similar_products"
        title="محصولات مشابه"
        :url="null"
      />
    </div>
  </v-row>
</template>
<script>
import ProductDetailsSlider from "~/components/Slider/ProductDetailsSlider.vue";
import ProductDetailsForm from "~/components/Product/ProductDetailsForm.vue";
import ProductDetailsTab from "~/components/Tab/ProductDetailsTab.vue";
import ProductSlider from "~/components/Slider/ProductSlider.vue";
export default {
  components: {
    ProductDetailsSlider,
    ProductDetailsForm,
    ProductDetailsTab,
    ProductSlider,
  },
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
        },
      ],
      product: {
        name: "کتانی زنانه دیزل",
        comments: ["کفش قشنگی است", "از خریدم راضی هستم"],
        // description: 'توضیحات محصول',
        price: "790000",
        colors: ["طوسی/سفید/بنفش", "طوسی/سفید/مشکی", "مشکی/سفید/قرمز"],
        sizes: ["37", "38", "39", "40"],
        comments: ['لطفا سایز 42 رو هم موجود کنید']
      },
      similar_products: [
      {
        main_picture_path: '/image/products/1.jpg',
        name: 'کتانی زنانه دیزل',
        before_price: '890000',
        price:  '790000'
      },
      {
        main_picture_path: '/image/products/2.jpg',
        name: 'کتانی زنانه دیزل',
        before_price: '890000',
        price:  '790000'
      },
      {
        main_picture_path: '/image/products/3.jpg',
        name: 'کتانی زنانه دیزل',
        before_price: '890000',
        price:  '790000'
      },
      {
        main_picture_path: '/image/products/4.jpg',
        name: 'کتانی زنانه دیزل',
        before_price: '890000',
        price:  '790000'
      },
      {
        main_picture_path: '/image/products/5.png',
        name: 'کتانی زنانه دیزل',
        before_price: '890000',
        price:  '790000'
      },
      {
        main_picture_path: '/image/products/6.jpg',
        name: 'کتانی زنانه دیزل',
        before_price: '890000',
        price:  '790000'
      },
      ],
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
