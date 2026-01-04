<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'pa-3' : ''">
    <!-- loading -->
    <!-- <Loading v-if="loading"/> -->
    <!-- loading end -->
    <v-card class="my-6 my-4 conainer_product elevation-0 transparent">
      <v-card class="ma-6 my-4 border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items" v-if="Boolean(items)">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-row no-gutters class="mt-5 mt-md-5 mb-8">
        <v-col cols="12" md="3" order-md="1">
          <ProductListFilter
            :loading="loading_category"
            :categories="group_categorys"
            :selected-id="selected_mnue"
            @select="setCategory"
          />
        </v-col>
        <v-col
          v-if="loading_product"
          cols="12"
          md="9"
          class="d-flex flex-column"
          order-md="2"
        >
          <v-card class="mx-3 mr-md-4 ml-md-6 py-3 border12 conainer_product">
            <v-row no-gutters class="pr-2 pr-sm-6">
              <v-col
                class="col-6 col-sm-4 col-md-3 pb-2 pb-sm-6"
                v-for="item in is_mobile ? 4 : 8"
                :key="item"
              >
                <v-skeleton-loader type="card" class="ma-4"></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col v-else cols="12" md="9" class="d-flex flex-column" order-md="1">
          <v-card
            min-height="350"
            :class="
              is_mobile
                ? ' mx-3 mr-md-4 ml-md-6 py-3 border12 container_product'
                : ' pa-5 border12 '
            "
            :style="is_mobile ? 'overflow: auto;' : 'overflow:auto;'"
            :max-height="is_mobile ? '800' : 'auto'"
            color="secondary darken-1"
          >
            <v-col cols="12" class="primary--text mb-2"> لیست محصولات </v-col>
            <!-- <v-row no-gutters class="pr-2 pr-sm-6" v-if="!loading"> -->
            <v-row v-if="products.length > 0" style="overflow: hidden">
              <v-col
                cols="12"
                md="4"
                v-for="(product, index) in products"
                :key="index"
                class="pa-3"
              >
                <ProductCard
                  :available="product.available"
                  :data="product"
                  :hoverAvble="is_mobile ? false : true"
                  width="auto"
                  :cardHeight="
                    $vuetify.breakpoint.lgAndUp
                      ? 440
                      : $vuetify.breakpoint.mdAndUp
                      ? 350
                      : 300
                  "
                />
              </v-col>

              <!-- </v-row> -->
            </v-row>
            <v-row
              no-gutters
              class="pr-2 pr-sm-6"
              v-if="products.length == 0 && !loading_product"
            >
              <v-col id="firstItem" style="position: absolute"></v-col>
              <v-col cols="12" md="12">
                <v-card
                  min-height="520"
                  class="elevation-0 d-flex justify-center align-center"
                >
                  <v-card-title class="grey--text"> موردی یافت نشد </v-card-title>
                </v-card>
              </v-col>

              <!-- </v-row> -->
            </v-row>
          </v-card>
          <div class="text-center mt-5">
            <!-- <v-pagination
            v-if="last_page != 1"
            v-model="current_page"
            :length="last_page"
            class=""
          ></v-pagination> -->
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="3"></v-col>
        <v-col cols="12" md="9 " class="d-flex justify-center">
          <v-card
            :disabled="loading_product"
            class="text-center elevation-0 transparent mt-3 element-0"
            :max-width="is_mobile ? '300' : '600'"
          >
            <v-pagination
              v-if="last_page != 1"
              v-model="current_page"
              dir="rtl"
              :length="last_page"
              color="primary"
            ></v-pagination>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import ProductCard from "~/components/Card/ProductCard.vue";
export default {
  components: { ProductCard },
  data: () => ({
    title: "لیست محصولات",
    drawer: true,
    current_page: 1,
    last_page: 1,
    selected_mnue: null,
    loading_category: true,
    loading_product: true,
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
    main_route: [
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
    // active_category: '',
    single_categorys: [],
    group_categorys: [],
    products: [],
  }),
  beforeMount() {
    this.current_page = localStorage.getItem("current_page");
  },
  computed: {
    is_mobile() {
      return !this.$vuetify.breakpoint.mdAndUp;
    },
  },
  watch: {
    current_page() {
      this.products = [];
      localStorage.setItem("current_page", this.current_page);
      this.loading_product = true;
      if (localStorage.getItem("category")) {
        this.setCategory(localStorage.getItem("category"));
      } else {
        this.setCategory();
      }
      this.scrollTo();
    },
  },
  mounted() {
    this.loadCategory();
  },
  methods: {
    loadCategory() {
      this.$reqApi("/shop/category", {
        row_number: 30000,
      })
        .then((res) => {
          res.model.data.map((x) => {
            if (x.parent_id == null) {
              this.group_categorys.push({
                slug: x.slug,
                title: x.name,
                id: x.id,
                sub_category: this.findParentCategory(res.model.data, x.id),
              });
            }
          });
          const savedCategory = localStorage.getItem("category");
          if (savedCategory) {
            const parsed = Number(savedCategory);
            this.selected_mnue = Number.isNaN(parsed) ? savedCategory : parsed;
          } else {
            this.selected_mnue = null;
          }
          this.loading_category = false;
        })
        .catch((err) => {
          return err;
        });
    },
    setCategory(item, clearLocalstorage) {
      if (clearLocalstorage) {
        this.current_page = 1;
        localStorage.removeItem("category");
      }

      let categoryId = null;
      if (item && typeof item === "object" && item.id) {
        categoryId = item.id;
      } else if (item) {
        categoryId = item;
      }

      if (categoryId) {
        const parsedId = Number(categoryId);
        this.selected_mnue = Number.isNaN(parsedId) ? categoryId : parsedId;
        const categoryToStore = String(this.selected_mnue);
        localStorage.setItem("category", categoryToStore);
        this.loadProduct(categoryToStore);
      } else {
        this.selected_mnue = null;
        if (clearLocalstorage) {
          localStorage.removeItem("category");
        }
        this.loadProduct();
      }
      this.scrollTo();
    },
    scrollTo() {
      try {
        let first = document.getElementById("firstItem");
        first.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      } catch (error) {
        return error;
      }
    },
    loadProduct(id) {
      this.loading_product = true;
      let fitler = {};
      this.products = [];
      let url = `/shop/product?page=${this.current_page}&row_number=${20}`;
      if (id) {
        fitler = {
          category_id_list: [String(id)],
        };
      } else if (localStorage.getItem("category")) {
        fitler = {
          category_id_list: [localStorage.getItem("category")],
        };
      }
      this.$reqApi(url, fitler)
        .then((res) => {
          this.current_page = res.model.current_page;
          this.last_page = res.model.last_page;
          this.products = [];
          res.model.data.map((x) => {
            this.products.push({
              main_picture_path: x.main_image,
              name: x.name,
              price: x.base_price,
              id: x.id,
              slug: x.slug,
              available: x.stock_pro != null && x.stock_pro > 0,
            });
          });
          this.loading_product = false;
        })
        .catch((err) => {
          this.loading_product = false;
          return err;
        });
    },
    findParentCategory(data, id) {
      if (id) {
        let children = [];
        data?.forEach((element) => {
          if (element.parent_id == id) {
            children.push({
              title: element.name,
              slug: element.slug,
              id: element.id,
              parent_id: element.parent_id,
              sub_category: this.findParentCategory(data, element.id),
            });
          }
        });
        return children;
      }
    },
  },
};
</script>
<style scoped>
* {
  behavior: smooth;
}
.container_product {
  behavior: smooth;
  backdrop-filter: blur(1px);
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: scroll;
  overflow-y: scroll;
}
.container_product::-webkit-scrollbar {
  display: none;
}
.container_product::-webkit-scrollbar-track {
  display: none;
}
.conainer_product {
  position: relative;
}
.contaienr_mnue {
  behavior: smooth;
  backdrop-filter: blur(1px);
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: scroll;
  overflow-y: scroll;
}

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
