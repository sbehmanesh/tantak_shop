<template>
  <div>
    <!-- loading -->
    <!-- <Loading v-if="loading"/> -->
    <!-- loading end -->

    <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <!-- slider -->
        <MainSlider :slider_item="this.$store.state.setting.main_slider" />
        <!-- slider end -->
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <!-- product slider -->
    <ProductSlider
      :loading="loading"
      v-if="like_products"
      :infinite="false"
      :products="like_products"
      title="محصولات پرفروش"
    />
    <!-- product slider end -->

    <!-- product slider -->
    <ProductSlider
      :loading="loading"
      v-if="star_products"
      :products="star_products"
      title="محصولات برتر"
      url="/product"
    />
    <!-- product slider end -->

    <!-- product slider -->
    <ProductSlider
      :loading="loading"
      v-if="view_products"
      :products="view_products"
      title="محصولات پربازدید"
      url="/product"
    />
    <!-- product slider end -->

    <FeaturesCards />

    <!-- banner tabs -->
    <!-- <BannerTabs :tabs="product_categories" /> -->
    <!-- banner tabs end -->

    <!-- product slider -->
    <!-- <ProductSlider
      v-if="new_products"
      :products="new_products"
      title="محصولات جدید تن تاک"
      url="/product"
    /> -->
    <!-- product slider end -->

    <!-- Blog slider -->
    <!-- <BlogSlider 
      v-if="new_posts" 
      :posts="new_posts" 
      title="آخرین های نشریه"
      url="/blog"
      /> -->
    <!-- Blog slider end -->
  </div>
</template>

<script>
import MainSlider from "~/components/Slider/MainSlider.vue";
import ProductSlider from "~/components/Slider/ProductSlider.vue";
import FeaturesCards from "@/components/Card/FeaturesCards.vue";
import BlogSlider from "~/components/Slider/BlogSlider.vue";
import BannerTabs from "~/components/Tab/BannerTabs.vue";
import BannerCardCircle from "~/components/Card/BannerCardCircle.vue";
export default {
  components: {
    MainSlider,
    ProductSlider,
    FeaturesCards,
    BlogSlider,
    BannerTabs,
    BannerCardCircle,
  },
  data: () => ({
    title: "صفحه اصلی",
    main_slider: [],
    decoded_uri: null,
    seo: {
      name: "",
      description: "",
      keywords: [],
    },
    loading: false,
    new_products: null,
    new_posts: null,
    // new datas
    like_products: [],
    star_products: [],
    view_products: [],
    setproducts: false,
  }),
  // head() {
  //   return {
  //     meta: [
  //       {
  //         name: "title",
  //         content: this.seo.name,
  //       },
  //       {
  //         name: "og:title",
  //         content: this.seo.name,
  //       },
  //       {
  //         name: "keywords",
  //         content: this.seo.keywords,
  //       },
  //       {
  //         name: "description",
  //         content: this.seo.description,
  //       },
  //       {
  //         name: "og:description",
  //         content:
  //           "این طبیعت توست." +
  //           "|" +
  //           "تن تاک,ادویه,عرقیجات,ادویه اصل,بهترین ادویه,زندگی سالم,ادویه خالص,",
  //       },
  //       {
  //         name: "url",
  //         content: "https://goolghand.com" + this.decoded_uri,
  //       },
  //       {
  //         name: "og:url",
  //         content: "https://goolghand.com" + this.decoded_uri,
  //       },
  //     ],
  //     script: [{ type: "application/ld+json", json: this.structuredData }],
  //   };
  // },
  // created() {
  //   try {
  //     var encoded_uri = this.$route.path;
  //     this.decoded_uri = decodeURI(encoded_uri);
  //   } catch (exception) {}

  //   this.seo.name = "ایوان";
  //   this.seo.keywords.push("ایوان");
  //   this.seo.description = "ایوان";
  // },
  beforeMount() {},
  watch: {},
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    if (this.$store.state.base.landing_page.data) {
      this.getLandingPageData();
    }
    this.getProducts();
  },
  // watch: {
  //   "this.$store.state.base.landing_page.refresh"() {
  //     this.getLandingPageData();
  //   },

  //   loading() {
  //     this.$store.dispatch("setTopLoader", this.loading);
  //   },
  // },
  methods: {
    getLandingPageData() {
      this.loading = true;
      let res = this.$store.state.base.landing_page.data;
      this.most_sold_products = res.most_sold_products;
      this.product_categories = res.product_categories;
      this.discounted_products = res.discounted_products;
      this.new_products = res.new_products;
      this.new_posts = res.new_posts;
      this.loading = false;
    },
    getProducts() {
      this.loading = true;
      this.$reqApi("/shop/product", { row_number: 1000 })
        .then((response) => {
          let products = response.model.data;
          // let test = [];
          // محصولات شگفتانه
          for (let index = 0; index < products.length; index++) {
            if (products[index].like > 0) {
              products.map((x) => {
                this.like_products.push({
                  id: x.id,
                  main_picture_path: x.main_image,
                  price: x.base_price,
                  name: x.name,
                  slug: x.slug,
                });
              });
            }
            this.like_products.sort((a, b) => b.like - a.like);
            // محصولات محبوب
            if (products[index].star > 0) {
              products.map((x) => {
                this.star_products.push({
                  id: x.id,
                  main_picture_path: x.main_image,
                  price: x.base_price,
                  name: x.name,
                  slug: x.slug,
                });
              });
            }
            this.star_products.sort((a, b) => b.star - a.star);
            // محصولات پربازدید
            if (products[index].like > 0) {
              products.map((x) => {
                this.view_products.push({
                  id: x.id,
                  main_picture_path: x.main_image,
                  price: x.base_price,
                  name: x.name,
                  slug: x.slug,
                });
              });
              this.view_products.push(products[index]);
            }
            this.view_products.sort((a, b) => b.view - a.view);
          }
          this.setproducts = true;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
