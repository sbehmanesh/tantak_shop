<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'pa-3' : ''">
    <!-- loading -->
    <!-- <Loading v-if="loading"/> -->
    <!-- loading end -->
    <v-card class="my-6 conainer_product elevation-0 transparent">
      <v-card class="ma-6 border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items" v-if="Boolean(items)">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-row no-gutters class="mt-5 mt-md-8 mb-8">
        <v-col>
          <ProductListFilter />
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" class="col-12 col-md-3">
          <v-row no-gutters class="flex-column">
            <v-col class="mr-2 pb-6">
              <div
                class="whited pa-3 border12 mr-1 px-4"
                v-if="loading_category"
              >
                <v-skeleton-loader
                  v-for="item in 7"
                  :key="item"
                  type="paragraph"
                  class="my-3"
                ></v-skeleton-loader>
              </div>
              <v-card
                min-width="330"
                class="whited pa-3 border12 mr-4 contaienr_mnue"
                v-else
              >
                <v-list>
                  <v-list-item>
                    <v-list-item-title @click="setCategory(null, true)"
                      >همه محصولات</v-list-item-title
                    >
                  </v-list-item>

                  <v-list-group
                    v-for="node in group_categorys"
                    v-model="node.active"
                  >
                    <v-list-item slot="activator" @click="">
                      <v-list-item-title @click="setCategory(node, true)">{{
                        node.title
                      }}</v-list-item-title>
                    </v-list-item>
                    <v-list class="py-0 pl-1" v-if="node.sub_category">
                      <v-list-group
                        v-for="child in node.sub_category"
                        v-model="child.active"
                      >
                        <v-list-item slot="activator" @click="">
                          <v-list-item-title
                            @click="setCategory(child, true)"
                            >{{ child.title }}</v-list-item-title
                          >
                        </v-list-item>
                        <v-list
                          class="py-0 pl-2"
                          v-for="grandchild in child.sub_category"
                        >
                          <v-list-item @click="setCategory(grandchild, true)">
                            <v-list-item-title>{{
                              grandchild.title
                            }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-list-group>
                    </v-list>
                  </v-list-group>
                </v-list>
              </v-card>
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
        <v-col
          class="col-12 col-md-9 d-flex flex-column"
          v-if="loading_product"
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
        <v-col class="col-12 col-md-9 d-flex flex-column" v-else>
          <v-card
            :class="
              is_mobile
                ? ' mx-3 mr-md-4 ml-md-6 py-3 border12 container_product'
                : ' mx-3 mr-md-4 ml-md-6 py-3 border12'
            "
            :style="is_mobile ? 'overflow: auto;' : 'overflow:auto;'"
            :max-height="is_mobile ? '600' : 'auto'"
          >
            <!-- <v-row no-gutters class="pr-2 pr-sm-6" v-if="!loading"> -->
            <v-row
              no-gutters
              class="pr-2 pr-sm-6"
              v-if="products.length > 0"
              style="overflow: hidden"
            >
              <v-col id="firstItem" style="position: absolute"></v-col>
              <v-col
                class="col-6 col-sm-4 col-md-3 pb-2 pb-sm-6"
                v-for="(product, index) in products"
                :key="index"
              >
                <ProductCard
                  :data="product"
                  :hoverAvble="is_mobile ? false : true"
                  width="auto"
                  :cardHeight="$vuetify.breakpoint.mdAndUp ? 395 : 290"
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
                  <v-card-title class="grey--text">
                    موردی یافت نشد
                  </v-card-title>
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
    selected_mnue: "",
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
          this.loading_category = false;
        })
        .catch((err) => {
          return err;
        });
    },
    setCategory(item, clearLocalstorage) {
      if (clearLocalstorage) {
        this.current_page = 1;
        localStorage.removeItem('category')
      }
      if (item && item.id) {
        this.selected_mnue = item.id;
        localStorage.setItem("category", item.id);
        this.loadProduct(item.id);
        this.scrollTo();
      } else {
        this.loadProduct();
        this.scrollTo();
      }
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
      if (localStorage.getItem("category")) {
        fitler = {
          category_id_list: [localStorage.getItem('category')],
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
        data.forEach((element) => {
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
</style>
