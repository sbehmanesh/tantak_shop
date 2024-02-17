<template>
  <div>
    <v-card v-if="comments.length != 0" class="box-shadow-none rounded-lg">
      <v-col cols="12" v-for="(comment, i) in comments" :key="i">
        {{comment}}
        <div class="comment_div">
          <v-row class="align-center">
            <v-col>
              <div>{{ comment.text }}</div>
            </v-col>
            <v-col class="flex-grow-0 pa-0">
              <div class="mt-n1 mr-n3">
                <span
                  @click="$router.push('/product/' + comment.slug)"
                  class="font_12 info--text pointer space-nowrap"
                  >مشاهده محصول</span
                >
              </div>
            </v-col>
          </v-row>
          <v-row v-if="comment.reply_comment_id != null">
            <v-col cols="1" class="d-flex justify-center pl-0 pt-0">
              <v-icon size="30">keyboard_return</v-icon>
            </v-col>
            <v-col cols="11" class="pr-0 pt-0">
              <div class="font_12 reply_comment_div">
                {{ comment.reply_comment_content }}
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-card>
    <v-card v-if="comments.length == 0" class="pb-8 box-shadow-none rounded-lg">
      <div class="text-center">
        <v-icon class="mt-8" size="60">comment</v-icon>
        <div class="font_14">
          شما تاکنون دیدگاهی برای محصولات تن تاک ثبت نکرده اید.
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
  watch: {
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);
      if (!this.loading) {
        this.$scrollTo(0, this.scroll_to);
      }
    },
  },

  computed: {
    scroll_to() {
      return this.$vuetify.breakpoint.mdAndUp ? 0 : 300;
    },
  },

  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    this.getcomments();
    this.$scrollTo(0, this.scroll_to);
  },
  methods: {
    getcomments() {
      this.loading = true;
      let filters = {
        user_id: this.$store.state.auth.user.id,
      };
      this.$reqApi("/comment", { filters })
        .then((response) => {
          for (let i = 0; i < response.model.data.length; i++) {
            let m = response.model.data[i];
            this.comments.push({
              id: m.id,
              text: m.text,
              parent_id: m.parent_id,
              slug: m.product.slug
              // target_id: m.target_id,
              // target_type: m.target_type,
            });
            if (m.replies.length) {
              for (let i = 0; i < m.replies.length; i++) {
                let y = m.replies[i];
                for (let z = 0; z < this.comments.length; z++) {
                  let p = this.comments[z];
                  if (p.id == m.replies[i].parent_comment_id) {
                    p.reply_comment_id = y.id;
                    p.reply_comment_content = y.content;
                  }
                }
              }
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
