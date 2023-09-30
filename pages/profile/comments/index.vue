<template>
  <div>
    <v-card v-if="comments.length != 0" class="box-shadow-none rounded-lg">
      <v-col cols="12" v-for="(comment, i) in comments" :key="i">
        <div class="comment_div">
          <v-row class="align-center">
            <v-col>
              <div>{{ comment.content }}</div>
            </v-col>
            <v-col class="flex-grow-0 pa-0">
              <div v-if="comment.target_type == 'post'">
                <span
                  @click="$router.push('/blog/' + comment.slug)"
                  class="font_12 info--text pointer space-nowrap"
                  >مشاهده پست</span
                >
              </div>
              <div v-else class="mt-n1 mr-n3">
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
          شما تاکنون دیدگاهی برای محصولات و یا مقالات گل قند ثبت نکرده اید.
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
      this.$reqApi("/comment/list/app", { filters })
        .then((response) => {
          for (let i = 0; i < response.model.data.length; i++) {
            let m = response.model.data[i];
            this.comments.push({
              id: m.id,
              content: m.content,
              parent_comment_id: m.parent_comment_id,
              target_id: m.target_id,
              slug: m.target.slug,
              target_type: m.target_type,
            });
            if (m.reply_comments.length) {
              for (let i = 0; i < m.reply_comments.length; i++) {
                let y = m.reply_comments[i];
                for (let z = 0; z < this.comments.length; z++) {
                  let p = this.comments[z];
                  if (p.id == m.reply_comments[i].parent_comment_id) {
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
