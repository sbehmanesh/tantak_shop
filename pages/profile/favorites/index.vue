<template>
    <div>
      <v-card v-if="comments.length == 0" class="pb-8 box-shadow-none rounded-lg">
        <div class="text-center">
          <v-icon class="mt-8" size="60">comment</v-icon>
          <div class="font_14">
            شما تاکنون دیدگاهی برای محصولات و یا مقالات تن تاک ثبت نکرده اید.
          </div>
        </div>
      </v-card>
    </div>
  </template>
  <script>
  export default {
    layout: "profile",
    data() {
      return {
        title: "دیدگاه ها",
        loading: false,
        comments: [],
        comments_id: [],
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
          for (let f = 0; f < response.model.length; f++) {
            this.favorites.push({
              id: response.model[f].id,
              product_id: response.model[f].product_id
            });
          }
          for (let i = 0; i < this.favorites.length; i++) {
            if (this.product.id == this.favorites[i].product_id) {
              this.favorite = true;
              this.favorite_id = this.favorites[i].id
              break
            }
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
  