<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'pa-3' : ''">
    <!-- loading -->
    <!-- <Loading v-if="loading"/> -->
    <!-- loading end -->
    <v-card class="ma-6 border12 " v-if="$vuetify.breakpoint.mdAndUp">
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
            <div class="whited pa-3 border12" v-if="loading_category">
              <v-skeleton-loader
                v-for="item in 7"
                :key="item"
                type="paragraph"
                class="my-3"
              ></v-skeleton-loader>
            </div>
            <div class="whited pa-3 border12" v-else>
              <v-list>
                <v-subheader>دسته بندی</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item link value="all">
                    <v-list-item-title>همه محصولات</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    link
                    :value="category.slug"
                    v-for="(category, index) in single_categorys"
                    :key="index + 5000"
                  >
                    <v-list-item-title>{{ category.title }}</v-list-item-title>
                  </v-list-item>
                  <v-list-group
                    no-action
                    v-for="(category, index) in group_categorys"
                    :key="index"
                  >
                    <template v-slot:activator>
                      <v-list-item link :value="category.slug">
                        <v-list-item-title>{{
                          category.title
                        }}</v-list-item-title>
                      </v-list-item>
                    </template>
                    <template>
                      <v-list-item
                        link
                        v-for="(sub_category, index) in category.sub_category"
                        :key="index"
                      >
                        <v-list-item-title>{{
                          sub_category.title
                        }}</v-list-item-title>
                        <v-list-item
                          link
                          v-for="(
                            sub_category, index
                          ) in sub_category.sub_category"
                          :key="index"
                        >
                          <v-list-item-title>{{
                            sub_category.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list-item>
                    </template>
                  </v-list-group>
                </v-list-item-group>
              </v-list>
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
      <v-col class="col-12 col-md-9 d-flex flex-column" v-if="loading_product">
        <v-card
          class="mx-3 mr-md-4 ml-md-6 py-3 border12 "
        >
          <v-row no-gutters class="pr-2 pr-sm-6">
            <v-col
              class="col-6 col-sm-4 col-md-3 pb-2 pb-sm-6"
              v-for="item in 8"
              :key="item"
            >
              <v-skeleton-loader type="card" class="ma-4"></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-9 d-flex flex-column" v-else>
        <v-card
          class="mx-3 mr-md-4 ml-md-6 py-3 border12"
        >
          <!-- <v-row no-gutters class="pr-2 pr-sm-6" v-if="!loading"> -->
          <v-row no-gutters class="pr-2 pr-sm-6 " >
            <v-col id="firstItem" style="position: absolute"></v-col>
            <v-col
              class="col-6 col-sm-4 col-md-3 pb-2 pb-sm-6"
              v-for="(product, index) in products"
              :key="index"
            >
              <ProductCard
                :data="product"
                width="auto"
                :cardHeight="$vuetify.breakpoint.mdAndUp ? 395 : 290"
              />
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
          max-width="600"
        >
          <v-pagination
            v-if="last_page != 1"
            v-model="current_page"
            dir="ltr"
            :length="last_page"
            color="primary"
          ></v-pagination>
        </v-card>
      </v-col>
    </v-row>
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
    // active_category: '',
    single_categorys: [],
    group_categorys: [],
    products: [
      {
        main_picture_path: "/image/products/1.jpg",
        name: "کتانی زنانه دیزل",
        price: "790000",
      },
      {
        main_picture_path: "/image/products/2.jpg",
        name: "کالج مردانه اریک",
        before_price: "890000",
        price: "690000",
      },
      {
        main_picture_path: "/image/products/3.jpg",
        name: "کفش راحتی مردانه والنتی",
        before_price: "890000",
        price: "790000",
      },
      {
        main_picture_path: "/image/products/4.jpg",
        name: "کتانی مردانه اسیکس 23",
        price: "890000",
      },
      {
        main_picture_path: "/image/products/5.png",
        name: "کتانی ایر فورس",
        price: "890000",
      },
      {
        main_picture_path: "/image/products/6.jpg",
        name: "کتانی زنانه دنیز",
        before_price: "890000",
        price: "790000",
      },
    ],
  }),
  beforeMount(){
    this.current_page = localStorage.getItem('current_page')
  },
  watch: {
    current_page() {
      localStorage.setItem('current_page', this.current_page)
      this.loading_product = true;
      this.loadProduct();
      this.scrollTo();
    },
  },
  mounted() {
    this.loadCategory();
    this.loadProduct();
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
    loadProduct() {
      this.products = [];
      let url = `/shop/product?page=${this.current_page}&row_number=${20}`;
      this.$reqApi(url)
        .then((res) => {
          this.current_page = res.model.current_page;
          this.last_page = res.model.last_page;
          res.model.data.map((x) => {
            this.products.push({
              main_picture_path: x.main_image,
              name: x.name,
              price: x.base_price,
              slug: x.slug,
            });
          });
          this.loading_product = false;
        })
        .catch((err) => {
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
              sub_category: this.findParentCategory(children, element.id),
            });
          }
        });
        console.log(children);
        return children;
        // let items = [];
        // let children = [];
        // let final_data = [];
        // data.map((x) => {
        //     if (x.parent_id == id) {
        //       items.push({
        //         title: x.name,
        //         slug: x.slug,
        //         id: x.id,
        //         parent_id: x.parent_id,
        //       });
        //     } else {
        //       children.push({
        //         title: x.name,
        //         slug: x.slug,
        //         id: x.id,
        //         parent_id: x.parent_id,
        //       });
        //     }
        // });
        // items.map((y) => {
        //   final_data.push({
        //     title: y.title,
        //     slug: y.slug,
        //     id: y.id,
        //     parent_id: x.parent_id,
        //     sub_category: this.findParentCategory(children, y.id),
        //   });
        // });
        // console.log(final_data);
        // return final_data;
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
  overflow: hidden;
  overflow-x: scroll;
  overflow-y: scroll;
}
.container_product::-webkit-scrollbar {
  display: none;
}
.container_product::-webkit-scrollbar-track {
  display: none;
}
</style>
