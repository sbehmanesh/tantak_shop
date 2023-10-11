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
              <v-list>
                <v-subheader>دسته بندی</v-subheader>
                <!-- <v-list-item-group v-model="active_category" color="primary"> -->
                <v-list-item-group color="primary">
                  <v-list-item link value="all">
                    <v-list-item-title>همه محصولات</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    link
                    :value="category.slug"
                    v-for="category in single_categorys"
                    :key="category.slug"
                  >
                    <v-list-item-title>{{ category.title }}</v-list-item-title>
                  </v-list-item>
                  <v-list-group
                    no-action
                    v-for="category in group_categorys"
                    :key="category.slug"
                  >
                    <template v-slot:activator>
                      <v-list-item link :value="category.slug">
                        <v-list-item-title>{{
                          category.title
                        }}</v-list-item-title>
                      </v-list-item>
                    </template>
                    <v-list-item
                      link
                      :value="sub_category.slug"
                      v-for="(
                        sub_category, index
                      ) in category.children_categories"
                      :key="index"
                    >
                      <v-list-item-title>{{
                        sub_category.title
                      }}</v-list-item-title>
                    </v-list-item>
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
      <v-col class="col-12 col-md-9 d-flex flex-column">
        <v-card class="mx-3 mr-md-4 ml-md-6 py-3 border12">
          <!-- <v-row no-gutters class="pr-2 pr-sm-6" v-if="!loading"> -->
          <v-row no-gutters class="pr-2 pr-sm-6">
            <v-col
              class="col-6 col-sm-4 col-md-3 pb-2 pb-sm-6"
              v-for="(product, index) in products"
              :key="index"
            >
              <ProductCard :data="product" width="auto" />
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
  </div>
</template>
<script>
import ProductCard from "~/components/Card/ProductCard.vue";
export default {
  components: { ProductCard },
  data: () => ({
    title: "لیست محصولات",
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
    single_categorys: [
      {
        slug: "",
        title: "کیف",
      },
    ],
    group_categorys: [
      {
        slug: "کفش",
        title: "کفش",
        children_categories: [
          {
            slug: "زنانه",
            title: "زنانه",
          },
          {
            slug: "زنانه",
            title: "مردانه",
          },
          {
            slug: "زنانه",
            title: "بچگانه",
          },
        ],
      },
      {
        slug: "کیف",
        title: "کیف",
        children_categories: [
          {
            slug: "زنانه",
            title: "زنانه",
          },
          {
            slug: "زنانه",
            title: "اسپرت",
          },
          {
            slug: "زنانه",
            title: "بچگانه",
          },
        ],
      },
      {
        slug: "لباس",
        title: "لباس",
        children_categories: [
          {
            slug: "زنانه",
            title: "زنانه",
          },
          {
            slug: "زنانه",
            title: "مردانه",
          },
          {
            slug: "زنانه",
            title: "اسپرت",
          },
        ],
      },
      {
        slug: "اکسسوری",
        title: "اکسسوری",
        children_categories: [
          {
            slug: "زنانه",
            title: "زنانه",
          },
          {
            slug: "زنانه",
            title: "مردانه",
          },
          {
            slug: "زنانه",
            title: "بچگانه",
          },
        ],
      },
    ],
    products: [
      {
        main_picture_path: "/image/products/1.jpg",
        name: "کتانی زنانه دیزل",
        before_price: "890000",
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
        price: "890000",
      },
      {
        main_picture_path: "/image/products/4.jpg",
        name: "کتانی مردانه اسیکس 23",
        before_price: "890000",
        price: "890000",
      },
      {
        main_picture_path: "/image/products/5.png",
        name: "کتانی ایر فورس",
        before_price: "890000",
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
};
</script>
