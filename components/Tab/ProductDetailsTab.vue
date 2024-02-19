<template>
  <div class="">
    <v-tabs optional show-arrows v-model="tab" background-color="transparent">
      <v-tab style="letter-spacing: unset">توضیحات</v-tab>
      <v-tab style="letter-spacing: unset">دیدگاه</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-tabs-items class="transparent" v-model="tab">
      <!-- <v-tab-item v-for="n in 3" :key="n">
                <BannerCardSquare/>
            </v-tab-item> -->
      <v-tab-item>
        <v-row no-gutters class="flex-column pa-3 pa-md-6" style="height: 100%">
          <v-col
            v-if="product.description"
            class="flex-grow-0 font_16 html-text text-center"
            >{{ product.description }}
          </v-col>
          <v-col
            v-if="product.product_infos.length < 1"
            class="d-flex flex-column align-center"
          >
            <div>توضیحاتی برای این محصول ثبت نشده است</div>
            <v-img src="/image/no-description.png" width="70" class="mt-3" />
          </v-col>
          <div v-if="product.product_infos.length > 0" class="mt-5">
            <v-row v-for="(item, index) in product.product_infos" :key="index">
              <v-col
                cols="4"
                md="2"
                class="d-flex flex-column align-center border_info"
              >
                <span
                  class="primary--text"
                  :class="!$vuetify.breakpoint.mdAndUp ? 'font_10' : 'font_15'"
                >
                  {{ item.key }}
                </span>
              </v-col>
              <v-col
                cols="8"
                :class="!$vuetify.breakpoint.mdAndUp ? 'font_10' : 'font_15'"
                class="d-flex flex-column align-start border_info"
              >
                {{ item.value }}
              </v-col>
            </v-row>
          </div>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <CommentSection
          :target_id="product.id"
          target_type="product"
          :comment="product.comments"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import AmpTextarea from "../Base/AmpTextarea.vue";
import BannerCardSquare from "../Card/BannerCardSquare.vue";
import CommentSection from "../Comment/CommentSection.vue";
export default {
  components: { BannerCardSquare, AmpTextarea, CommentSection },
  props: {
    product: {
      type: Object,
    },
  },
  data: () => ({
    tab: 0,
    product_property: [],
    additional_description: [],
  }),
  mounted() {
    console.log("WWW -->", this.product.product_infos);
    // if (this.product) {
    //   this.setProductProperty();
    //   this.setProductAdditionalDescription();
    // }
  },
  methods: {
    setProductProperty() {
      this.product_property = JSON.parse(
        this.product.description.specefics_table
      );
    },
    setProductAdditionalDescription() {
      this.additional_description = JSON.parse(
        this.product.description.additional_description
      );
    },
  },
};
</script>
<style scoped>
.border_info {
  border: 1px solid #00000022;
}
.key_item {
  font-size: 10px;
}
</style>