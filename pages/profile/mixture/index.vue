<template>
  <v-card class="box-shadow-none rounded-lg">
    <v-card-title class="py-6">ترکیب های من</v-card-title>
    <div v-if="mixtures">
      <v-col v-for="item in mixtures" :key="item.id">
        <v-row no-gutters>
          <v-col class="col-12 col-md-auto flex-grow-1">
            <div class="pb-2 d-flex justify-space-between align-center">
              <span :class="{ 'mr-7': $vuetify.breakpoint.smAndDown }">{{
                item.description
              }}</span>
            </div>
            <div :class="{ 'mr-7': $vuetify.breakpoint.smAndDown }">
              <span
                v-for="each in item.items"
                :key="each.id"
                v-text="each.product.name + ' - ' + each.number + '% ,'"
                class="font_12 gray--text"
              >
              </span>
            </div>
          </v-col>
          <v-col
            class="
              col-12 col-md-auto
              flex-grow-0
              d-flex
              align-center
              justify-center
            "
          >
            <v-btn
              large
              :loading="loading"
              color="primary"
              class="ma-3"
              outlined
              style="letter-spacing: 0"
              @click="openSelectWeightDialog(item.id)"
              >اضافه کردن به سبد</v-btn
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-col>
    </div>
    <div class="text-center mt-5">
      <v-pagination
        v-if="last_page != 1"
        v-model="current_page"
        :length="last_page"
        class=""
      ></v-pagination>
    </div>

    <v-card v-if="mixtures && mixtures.length == 0" class="pb-8 box-shadow-none rounded-lg">
      <div class="text-center">
        <v-icon class="mt-1" size="60">mdi-basket</v-icon>
        <div class="font_14">شما تاکنون ترکیبی نساخته اید.</div>
      </div>
    </v-card>

    <v-dialog v-model="weight_dialog" max-width="550px">
      <v-card>
        <v-row no-gutters>
          <v-col cols="12" class="pa-3">
            <v-item-group v-model="mixture_total_amount">
              <v-row class="mx-2">
                <v-col
                  v-for="item in mixture_weight.items"
                  :key="item"
                  cols="12"
                  md="auto"
                >
                  <v-item :value="item" v-slot="{ active, toggle }">
                    <div
                      @click="toggle"
                      class="custom-border border10 py-1 px-3"
                      :class="{ 'custom-border2 success--text': active }"
                    >
                      <v-row class="pa-3">
                        <img
                          :src="
                            title == 'عرقیجات ترکیبی'
                              ? '/image/bottle.jpg'
                              : '/image/12.jpeg'
                          "
                          width="60"
                        />
                        <div class="align-self-center pr-2">
                          {{ item + mixture_weight.unit }}
                        </div>
                      </v-row>
                    </div>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-col>
          <v-col cols="12" class="pa-3">
            <amp-input
              :text="
                'چقدر از این ترکیب می خوای؟' +
                ' (' +
                min +
                ' تا ' +
                max +
                ' ' +
                mixture_weight.unit +
                ')'
              "
              v-model="mixture_total_amount"
              rules="require,number"
              type="number"
              class="pt-4"
              hideDetails
              width="50"
              is-number
            />
          </v-col>
          <v-col cols="12 d-flex align-center justify-center flex-wrap">
            <v-btn
              large
              :disabled="!chackMixture()"
              :loading="loading"
              color="success"
              class="ma-3"
              style="letter-spacing: 0"
              @click="AddMixtureToBasket"
              >اضافه کردن به سبد</v-btn
            >
            <v-btn
              large
              :loading="loading"
              color="error"
              class="ma-3"
              style="letter-spacing: 0"
              @click="weight_dialog = false"
              >بستن</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-card>
</template>
  <script>
import ProgressOrders from "@/components/orders/ProgressOrders.vue";
export default {
  layout: "profile",
  components: { ProgressOrders },
  data() {
    return {
      title: "ترکیب های من",
      loading: false,
      current_page: 1,
      last_page: 1,
      mixtures: null,
      mixture_weight: {
        items: [],
        value: null,
        unit: null,
      },
      min: null,
      max: null,
      mixture_basket_id: null,
      mixture_type: null,
      mixture_type_id: null,
      mixture_products: null,
      mixture_total_amount: 1,
      weight_dialog: false,
    };
  },
  computed: {
    scroll_to() {
      return this.$vuetify.breakpoint.mdAndUp ? 0 : 300;
    },
  },
  watch: {
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);
      if (!this.loading) {
        this.$scrollTo(0, this.scroll_to);
      }
    },
    current_page() {
      this.getMixtures();
    },
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    this.getMixtures();
    this.$scrollTo(0, this.scroll_to);
  },
  methods: {
    getMixtures() {
      let url = `/mixture?page=${this.current_page}&row_number=${5}`;
      let form = {
        orderBy: "DESC",
        sortBy: "created_at",
      };
      this.loading = true;
      this.$reqApi(url, form).then((res) => {
        this.loading = false;
        this.mixtures = res.model.data;
        this.current_page = res.model.current_page;
        this.last_page = res.model.last_page;
      });
    },
    fillMixtureDetails(mixture_type_id) {
      let mixture_type = this.$store.state.base.mixture_setting.settings.find(
        (each) => each.mixture_id == mixture_type_id
      );
      this.max = mixture_type.max;
      this.min = mixture_type.min;
      this.mixture_type_id = mixture_type.mixture_id;
      this.title = mixture_type.name;
      this.mixture_weight.items = mixture_type.weights.split(",");
    },
    openSelectWeightDialog(mixture_basket_id) {
      this.mixture_basket_id = mixture_basket_id;
      let mixture = this.mixtures.find((each) => each.id == mixture_basket_id);
      this.mixture_weight.unit = mixture.items[0].product.base_whole_sell_unit;
      this.fillMixtureDetails(mixture.mixture_type_id);
      this.weight_dialog = true;
    },
    chackMixture() {
      if (Number(this.mixture_total_amount) < Number(this.min)) {
        // this.$toast.error("تعداد را وارد کنید")
        return false;
      }
      if (Number(this.mixture_total_amount) > Number(this.max)) {
        // this.$toast.error("تعداد را وارد کنید")
        return false;
      }
      return true;
    },
    AddMixtureToBasket() {
      let form = {
        mixture_basket_id: this.mixture_basket_id,
        total_amount: this.mixture_total_amount,
      };

      this.loading = true;
      this.$reqApi("/mixture/add-to-basket", form).then((res) => {
        this.loading = false;
        this.$router.push("/basket");
      });
    },
  },
};
</script>
  