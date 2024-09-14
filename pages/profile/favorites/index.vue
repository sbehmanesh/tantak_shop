<template>
  <div>
    <v-card
      v-if="favorites.length == 0"
      class="pb-8 box-shadow-none rounded-lg"
    >
      <div class="text-center">
        <v-icon class="mt-8" size="60">comment</v-icon>
        <div class="font_14">
          شما تاکنون محصولی را به علاقه مندی های خود اضافه نکرده اید.
        </div>
      </div>
    </v-card>
    <v-card v-else class="pb-4">
      <v-row no-gutters class="justify-canter">
        <ProductCard
          v-for="(product, index) in favorites"
          :key="index"
          :data="product"
          :margin="false"
          :cardHeight="$vuetify.breakpoint.mdAndUp ? 350 : 306"
          class="col-3 d-flex flex-column align-center mt-4"
        />
      </v-row>
    </v-card>
  </div>
</template>
<script>
import ProductCard from "@/components/Card/ProductCard";
export default {
  components: { ProductCard },
  layout: "profile",
  data() {
    return {
      title: "علاقه مندی ها",
      loading: false,
      favorites: [],
    };
  },

  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    this.getFavoritesList();
  },
  methods: {
    getFavoritesList() {
      let filters = {
        user_id: this.$store.state.auth.user.id,
      };
      this.$reqApi("favoritelist/my-favorite", { filters })
        .then((response) => {
          let x = response.model;
          for (let f = 0; f < x.length; f++) {
            this.favorites.push({
              id: x[f].product.id,
              main_picture_path: x[f].product.main_image,
              price: x[f].product.base_price,
              name: x[f].product.name,
              slug: x[f].product.slug,
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
