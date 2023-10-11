<template>
  <div class="pa-3">
    <!-- loading -->
    <!-- <Loading v-if="loading"/> -->
    <!-- loading end -->
    <v-card class="ma-6 border12" v-if="$vuetify.breakpoint.mdAndUp">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-left</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-row no-gutters class="mt-5 mt-md-8">
      <v-col>
        <ProductListFilter />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" class="col-12 col-md-3">
        <v-row no-gutters class="flex-column">
          <v-col class="pr-6 pb-6">
            <div class="whited pa-3 border12">
              <ProductCategory />
            </div>
          </v-col>

          <!-- <v-col class="pr-6 pb-6" >
            <div class="whited pa-3" >
              <FilterForm/>
            </div>
          </v-col> -->
          <!-- <v-col class="pr-6 pb-6" >
            <div class="whited" style="min-height:250px"></div>
          </v-col>
          <v-col class="pr-6 pb-6" >
            <div class="whited" style="min-height:170px"></div>
          </v-col> -->
        </v-row>
      </v-col>
      <v-col class="col-12 col-md-9 d-flex flex-column">
        <v-card class="mx-3 mr-md-4 ml-md-6 py-3 border12">
          <v-row no-gutters class="pr-2 pr-sm-6" v-if="!loading">
            <v-col
              class="col-6 col-sm-4 col-md-3 pb-2 pb-sm-6"
              v-for="(product, index) in products"
              :key="index"
            >
              <ProductCard :data="product" width="auto" />
            </v-col>
          </v-row>
        </v-card>
        <div class="text-center mt-5">
          <v-pagination
            v-if="last_page != 1"
            v-model="current_page"
            :length="last_page"
            class=""
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductCard from "~/components/Card/ProductCard.vue";
import ProductListFilter from "~/components/Product/ProductListFilter.vue";
import FilterForm from "~/components/Product/FilterForm.vue";
import ProductCategory from "~/components/Product/ProductCategory.vue";
export default {
  components: { ProductCard, ProductListFilter, FilterForm, ProductCategory },
  data: () => ({
    title: "لیست محصولات",
    loading: false,
    products: [],
    current_page: 1,
    last_page: 1,
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "فروشگاه",
        disabled: true,
        to: "",
      },
    ],
  }),
  // watch: {
  //   "$store.state.base.product_list.refresh"() {
  //     // this.getProduct();
  //     this.checkPage();
  //   },
  //   current_page() {
  //     this.getProduct();
  //     this.$scrollToTop();
  //     // بردن صفحه جاری به استور
  //     this.$store.dispatch("base/setTableInfo", {
  //       key: this.$router.currentRoute.path,
  //       page: this.current_page,
  //     });
  //   },
  //   loading() {
  //     this.$store.dispatch("setTopLoader", this.loading);
  //     if (!this.loading) {
  //       this.$scrollToTop();
  //     }
  //   },
  // },
  computed: {},
  mounted() {
    this.checkPage();
    this.$store.dispatch("setPageTitle", this.title);
    // this.getProduct();
  },
  methods: {
    getProduct() {
      this.loading = true;
      let url = `/product?page=${this.current_page}&row_number=${16}`;
      let form = {
        with_category: true,
        filters: this.$store.state.base.product_list.filter,
      };
      form.filters["status"] = "active";

      this.$reqApi(url, form).then((res) => {
        this.loading = false;
        this.products = res.model.data;
        this.current_page = res.model.current_page;
        this.last_page = res.model.last_page;
      });
    },
    checkPage() {
      let stored_page = this.$store.state.base.table_info;
      if (stored_page.key) {
        let current_path = this.$router.currentRoute.path;
        if (
          current_path == stored_page.key &&
          this.current_page != stored_page.page
        ) {
          this.current_page = stored_page.page;
          return;
        }
      }
      this.getProduct();
    },
  },
};
</script>
