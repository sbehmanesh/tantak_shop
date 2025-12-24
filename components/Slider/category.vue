<template>
  <div class="mt-8">
    <v-col cols="12">
      <b> دسته بندی های فروشگاه بانیان </b>
    </v-col>
    <v-card class="elevation-0">
      <v-card
        class="d-flex py-3 elevation-0"
        style="overflow-x: auto; overflow-y: hidden !important"
      >
        <v-col v-for="(x, i) in group_categorys" :key="i" cols="8" md="4" class="">
          <v-card outlined class="d-flex d-flex pa-4 align-center rounded-xl">
            <v-avatar color="grey lighten-1"> </v-avatar>
            <div class="mr-3">
              <b class="font_12">
                {{ x.title }}
              </b>
              <br />

              <small>
                {{ x.slug }}
              </small>
            </div>
          </v-card>
        </v-col>
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      group_categorys: [],
    };
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
                // sub_category: this.findParentCategory(res.model.data, x.id),
              });
            }
          });
          console.log("res >>>group_categorys>", this.group_categorys);
        })
        .catch((err) => {
          return err;
        });
    },
  },
};
</script>
