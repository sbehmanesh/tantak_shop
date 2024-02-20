<template>
  <div
    style="max-height: 300px"
    class="d-flex align-start justify-center overflow-auto"
  >
    <div
      v-if="!filtered_comment || filtered_comment.length == 0"
      class="d-flex align-center py-10"
    >
      <v-img src="/image/no-comment.png" width="50" />
      <span class="text--secondary mr-3"
        >تاکنون برای این محصول دیدگاهی ثبت نشده است
        <!-- <span
          class="primary--text"
          style="cursor: pointer"
          @click="$router.push('/auth')"
          >وارد شوید</span
        > -->
      </span>
    </div>
    <!-- <div v-else class="overflow-auto" style="height:100%"> -->
    <v-row v-else no-gutters class="flex-column pa-3 pa-md-6 overflow-auto">
      <div v-for="item in filtered_comment" :key="item.id" class="">
        <div class="d-flex">
          <div class="">
            <!-- <v-img class="rounded-circle" width="50px" :src="$getImage(item.user.avatar)" alt="user"></v-img> -->
          </div>
          <div class="d-flex flex-column flex-grow-1 pa-2">
            <div class="d-flex justify-space-between align-center">
              <span>
                <span
                  v-text="item.user.first_name ? item.user.first_name : 'کاربر'"
                ></span>
                <!-- <span
                                v-if="item.confirmed == '0' && item.type != 'admin'"
                                class="text--disabled font_10"  
                                v-text="'تائید نشده'"
                                ></span> -->
                <!-- <span
                                v-if="item.type == 'admin'"
                                class="primary--text font_10"  
                                v-text="'مدیر'"
                                ></span> -->
                <v-rating :value="item.star" size="20" />
              </span>
              <span
                class="font_12 text--secondary"
                v-text="calcPastTime(item.created_at)"
              ></span>
            </div>
            <div v-text="item.text" class="text--secondary font_14 mt-2"></div>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
    </v-row>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  props: {
    comment: {
      type: Array,
    },
  },
  data: () => ({
    filtered_comment: [],
  }),
  mounted() {
    this.filterComment();
  },
  watch: {
    comment() {
      this.filterComment();
    },
  },
  methods: {
    calcPastTime(past_time) {
      return this.$jmoment(past_time).fromNow();
    },
    filterComment() {
      this.filtered_comment = [...this.comment]
        .sort((a, b) => {
          if (a.created_at < b.created_at) {
            return 1;
          } 
          if (a.created_at > b.created_at) {
            return -1;
          } 
          return 0
        });
    },
  },
};
</script>
