<template>
  <div class="pa-3">
    <!-- loading -->
    <!-- <Loading v-if="!product"/> -->
    <!-- loading end -->

    <v-card class="my-md-6 ma-3 mx-md-6 border12">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-left</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <div v-if="product && !loading" class="mx-3 mx-md-6 mt-md-8 mt-4">
      <div class="background2 border12">
        <v-container>
          <v-row no-gutters>
            <v-col class="col-12 col-md-6 pa-md-4">
              <ProductDetailsSlider :slider_item="product_slider" />
            </v-col>
            <v-col class="col-12 col-md-6">
              <ProductDetailsForm :product="product" />
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div class="background2">
        <v-container>
          <ProductDetailsTab class="background2" :product="product" />
        </v-container>
      </div>

      <div class="background2">
        <ProductSlider
          v-if="similar_products.length != 0"
          :products="similar_products"
          title="محصولات مشابه"
          :url="null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductDetailsSlider from "~/components/Slider/ProductDetailsSlider.vue";
import ProductDetailsTab from "~/components/Tab/ProductDetailsTab.vue";
import AmpSelect from "~/components/Base/AmpSelect.vue";
import ProductDetailsForm from "~/components/Product/ProductDetailsForm.vue";
import ProductSlider from "~/components/Slider/ProductSlider.vue";
export default {
  components: {
    ProductDetailsSlider,
    ProductDetailsTab,
    AmpSelect,
    ProductDetailsForm,
    ProductSlider,
  },
  data: () => ({
    loading: false,
    product: null,
    similar_products: null,
    decoded_uri: null,
    seo: {
      name: "",
      description: "",
      keywords: [],
    },
    product_slug: null,
    product_slider: null,
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "لیست محصولات",
        disabled: false,
        to: "/product",
      },
      {
        text: "",
        disabled: true,
        to: "",
      },
    ],
  }),

  head() {
    return {
      meta: [
        {
          name: "title",
          content: this.seo.name,
        },
        {
          name: "og:title",
          content: this.seo.name,
        },
        {
          name: "keywords",
          content: this.seo.keywords,
        },
        {
          name: "description",
          content: this.seo.description,
        },
        {
          name: "og:description",
          content:
            "این طبیعت توست." +
            "|" +
            "تن تاک,ادویه,عرقیجات,ادویه اصل,بهترین ادویه,زندگی سالم,ادویه خالص,",
        },
        {
          name: "url",
          content: "https://goolghand.com" + this.decoded_uri,
        },
        {
          name: "og:url",
          content: "https://goolghand.com" + this.decoded_uri,
        },
        // {
        //   name: 'article:published_time',
        //   content: this.business.created_at,
        // },
        // {
        //   name: 'article:modified_time',
        //   content: this.business.modified_time,
        // },
      ],
      // link: [
      //   { rel: 'canonical', href: 'https://rakebi.com' + this.$route.path },
      // ],
      script: [{ type: "application/ld+json", json: this.structuredData }],
    };
  },
  watch: {
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);
      if (!this.loading) {
        this.$scrollToTop();
      }
    },
  },
  created() {
    this.loading = true;
    try {
      var encoded_uri = this.$route.path;
      this.decoded_uri = decodeURI(encoded_uri);
    } catch (exception) {}

    this.$reqApi("/product/show", { slug: this.$route.params.slug })
      .then((res) => {
        this.product = res.data;
        this.similar_products = res.similar_products;
        this.seo.name = res.data.name;
        this.items[2].text = res.data.name;
        res.data.keywords.forEach((each) => {
          this.seo.keywords.push(each.value);
        });
        if (res.data.description.seo_description) {
          this.seo.description = res.data.description.seo_description;
        } else if (res.data.description.excerpt_description) {
          this.seo.description = res.data.description.excerpt_description.replace(
            /(<([^>]+)>)/gi,
            ""
            );
        }
        this.setProductSlider(res.data);
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        this.$router.push("/");
      });
  },
  mounted() {
    // if(this.$route.params){
    //     this.product_slug = this.$route.params.slug
    // }
    // this.getProductDetails()
  },
  methods: {
    getProductDetails() {
      this.$reqApi("/product/show", { slug: this.product_slug }).then((res) => {
        this.product = res.data;
        this.setProductSlider(res.data);
      });
    },
    setProductSlider(data) {
      if (data.medias && data.medias.length != 0) {
        this.product_slider = data.medias.map((each) => ({
          image: each.file_path,
          title: each.alt,
        }));
        this.product_slider.push({
          image: data.main_picture_path,
          title: data.name,
        });
        return;
      }
      this.product_slider = [
        { image: data.main_picture_path, title: data.name },
      ];
    },
  },
};
</script>