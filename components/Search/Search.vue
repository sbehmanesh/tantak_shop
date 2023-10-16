<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        placeholder="نام کالا، برند و یا دسته مورد نظر خود را جستجو کنید..."
        background-color="background1"
        append-icon="mdi-magnify"
        class="font_14"
        v-model="search"
        hide-details
        height="36"
        v-bind="attrs"
        v-on="on"
        solo
        flat
      ></v-text-field>
    </template>
    <div>
      <v-card v-if="show_search" class="pa-3">
        <!-- loading -->
        <v-row v-if="loading" no-gutters class="flex-column">
          <v-col class="mb-3 text-center text--secondary">
            <v-progress-circular indeterminate></v-progress-circular>
          </v-col>
        </v-row>
        <!-- loading end-->

        <!-- no result -->
        <v-row
          v-if="
            product_categories.length == 0 && products.length == 0 && !loading
          "
          no-gutters
          class="flex-column"
        >
          <v-col class="mb-3 text-center text--secondary">
            موردی یافت نشد
          </v-col>
        </v-row>
        <!-- no result end-->

        <!-- categorys -->
        <v-row
          v-if="product_categories.length != 0"
          no-gutters
          class="flex-column"
        >
          <v-col
            v-for="item in product_categories"
            :key="item.slug"
            @click="$router.push('/product-category/' + item.slug)"
            class="mb-3"
            style="cursor: pointer"
          >
            <v-row no-gutters class="flex-column">
              <v-col>
                <span>{{ item.title }}</span>
                <v-icon>mdi-chevron-left</v-icon>
              </v-col>
              <v-col class="font_12 text--secondary">در دسته بندی</v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- categorys end-->

        <v-divider
          v-if="product_categories.length != 0"
          class="py-2"
        ></v-divider>

        <!-- product -->
        <v-row v-if="products.length != 0" no-gutters class="flex-column">
          <v-col
            v-for="item in products"
            :key="item.slug"
            @click="$router.push('/product/' + item.slug)"
            class="mb-3"
            style="cursor: pointer"
          >
            <v-row no-gutters class="flex-column">
              <v-col>
                <span>{{ item.name }}</span>
                <v-icon>mdi-chevron-left</v-icon>
              </v-col>
              <v-col class="font_12 text--secondary">در محصولات</v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- product end -->
      </v-card>
    </div>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    search: null,
    loading: false,
    show_search: false,
    products: [],
    product_categories: [],
  }),
  watch: {
    search(value) {
      if (value.length > 2) {
        this.searchInput();
        this.show_search = true;
      } else {
        this.show_search = false;
      }
    },
  },
  methods: {
    searchInput() {
      this.loading = true;
      this.$reqApi("/search", { text: this.search }).then((res) => {
        this.loading = false;
        this.products = res.products;
        this.product_categories = res.product_categories;
      });
    },
  },
};
</script>
