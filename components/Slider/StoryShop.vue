<template>
  <div class="mt-2">
    <v-col cols="12" v-if="!loading">
      <SlickSlider>
        <v-col
          v-for="(x, i) in resultData"
          :key="i"
          cols="12"
          md="12"
          class="pa-0 text-center"
        >
          <v-row class="d-flex justify-center ma-2">
            <v-avatar size="75" class="d-flex align-center justify-center pa-1 bg-color">
              <v-avatar size="71" color="white">
                <v-avatar size="66">
                  <v-img contin :src="$getImage(x?.url_img)" />
                </v-avatar>
              </v-avatar>
            </v-avatar>
            <v-col cols="12" class="text-center pt-0">
              <small>
                {{ x.title }}
              </small>
            </v-col>
          </v-row>
        </v-col>
      </SlickSlider>
    </v-col>
  </div>
</template>
<script>
import SlickSlider from "./SlickSlider.vue";
export default {
  components: {
    SlickSlider,
  },
  data() {
    return {
      resultData: [],
      loading: true,
    };
  },
  beforeMount() {
    this.loadList();
  },
  methods: {
    loadList() {
      this.$reqApi("shop/story/public-list", { row_number: 800 })
        .then((res) => {
          this.resultData = res.model.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
.bg-color {
  background: linear-gradient(45deg, #833ab4, #dc1a1ad9, #f56040, #fcaf45) !important;
  border-radius: 100%;
}
</style>
