<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'mx-6 my-9' : 'mx-2 my-6'">
    <v-card class="mx-3 border12" v-if="$vuetify.breakpoint.mdAndUp">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-left</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <Loading v-if="!mixture_products" />
    <v-col v-if="mixture_products" cols="12" class="py-0">
      <div class="pa-4 custom-border2 text-center my-3">
        <span class="font_32">{{ title }} گلقند</span>
        <span>(ترکیب مخصوص خودت رو بساز)</span>
      </div>
      <v-card class="mt-6 border10">
        <v-row>
          <!-- <v-col cols="12" md="4" class="py-0">
              <v-img
                src="/image/5.jpg"
                class="border10 mb-0"
                width="100%"
                height="auto"
              />
            </v-col> -->
          <v-col cols="12" class="pb-0">
            <div class="pa-4">
              <span class="font_20">اولین قدم</span>
              <span>- انتخاب گیاه دارویی مورد علاقه ات</span>
            </div>
            <div class="font_14 pr-3">
              میتونی حداقل 2 گیاه دارویی رو برای ترکیب دلخواه خودت انتخاب کنی.
            </div>
            <amp-autocomplete
              v-model="product_select.value"
              :items="product_select.items"
              text="جستجو محصول"
              class="px-3"
              deletableChips
              clearable
              multiple
              chips
            />
            <v-item-group multiple v-model="product_select.value">
              <v-row class="px-3">
                <v-col
                  v-for="item in mixture_products"
                  :key="item.id"
                  class="col-6 col-md-3"
                >
                  <v-item v-slot="{ active, toggle }" :value="item.id">
                    <div
                      class="custom-border pa-2 border10 dark"
                      @click="toggle"
                      :class="{ 'custom-border2 success--text': active }"
                    >
                      <v-row class="align-center justify-center">
                        <v-col
                          class="col-12 col-md-auto flex-grow-0 d-flex justify-center"
                        >
                          <v-img
                            :src="
                              $getImage($resizeImage(item.main_picture_path))
                            "
                            min-height="80px"
                            max-width="80px"
                          />
                        </v-col>
                        <v-col>
                          <div class="font_18 text-center">{{ item.name }}</div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-col>
          <v-col cols="12">
            <div class="pa-4">
              <span class="font_20">دومین قدم</span>
              <span>- ترکیب کن</span>
            </div>
            <div class="pr-4">
              <span
                >دمنوش ها یا همون گیاه های دارویی که تو قدم قبلی انتخاب کردی رو
                می تونی اینجا به مقدار دلخواهت با هم ترکیب کنی.</span
              >
              <span class="font_12 error--text"
                >(فقط توجه داشته باش که مجموع ترکیبت باید به 100% برسه)</span
              >
            </div>
            <v-col v-for="item in selected_product" :key="item.name" cols="12">
              <v-row class="pa-3">
                <span>{{ item.name }}</span>
                <v-slider
                  v-model="item.percent"
                  max="100"
                  min="5"
                  step="5"
                  hide-details
                  class="mr-5"
                >
                </v-slider>
                <div>{{ item.percent }} %</div>
              </v-row>
            </v-col>
            <v-col
              v-if="selected_product.length != 0"
              cols="12"
              class="align-last-left"
            >
              <div v-if="sum == 100">
                <span> جمع: {{ sum }} % </span>
                <br />
                <span>قیمت مجموع : {{ price.toLocaleString() }}</span>
                <span class="font_12">تومان</span>
              </div>
              <div v-else>
                <span class="error--text">جمع: {{ sum }} % </span>
                <br />
                <span>قیمت مجموع : {{ price.toLocaleString() }}</span>
                <span class="font_12">تومان</span>
                <br />
                <span class="font_12">جمع ترکیبت باید 100 درصد باشه</span>
              </div>
            </v-col>
          </v-col>
          <v-col cols="12">
            <div class="pa-4">
              <span class="font_20">سومین قدم</span>
              <span>- وزن ترکیبتو مشخص کن</span>
            </div>
            <div class="pr-3">
              میخوای بسته بندی ترکیب موردنظرت چند گرمی باشه؟
            </div>
          </v-col>
          <v-col cols="12">
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
            <v-col cols="12" md="4" class=" mt-md-n5">
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
            <v-col v-if="title != 'عرقیجات ترکیبی'" cols="12">
              <div class=" d-flex pa-3 align-center flex-wrap">
                <div class="">
                  <v-img src="/image/mill.png" width="70" />
                </div>
                <div class="">
                  <div class="align-self-center pa-3">
                    ترکیبت رو آسیاب کنیم برات؟
                  </div>  
                </div>
                <div class="">
                  <v-radio-group v-model="mill" mandatory row class="mt-6">
                    <v-radio label="بله" value="yes" color="success"></v-radio>
                    <v-radio label="خیر" value="no" color="info"></v-radio>
                  </v-radio-group>
                </div>
              </div>
            </v-col>
          </v-col>
          <v-col cols="12">
            <v-row class="px-3">
              <v-col cols="12" md="8" class="pa-0">
                <v-col cols="12" class="pt-0">
                  <div class="pa-4">
                    <span class="font_20">چهارمین قدم</span>
                    <span>- نامگذاری</span>
                  </div>
                  <div class="pr-3">
                    میتونی برای ترکیبت یه اسم دلخواه بذاری تا تو خریداری بعدی
                    بتونی راحت انتخابش کنی.
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <div class="custom-border border10 px-4 pt-4">
                    <span
                      >بهم بگو میخوای اسم این ترکیب مورد علاقه تو چی
                      بزاری:</span
                    >
                    <amp-input
                      v-model="mixture_title"
                      rules="require"
                      class="pt-4"
                    />
                  </div>
                </v-col>
              </v-col>
              <v-col cols="12" md="4" class="pa-0">
                <img src="/image/bottom4.jpg" width="100%" />
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="error" class="d-flex align-center justify-center">
            <span class="font_14 error--text">{{error}}</span>
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-center">
            <span>قیمت نهایی : {{ price.toLocaleString() }}</span>
            <span class="font_12">تومان</span>
          </v-col>
          <v-col cols="12 d-flex align-center justify-center flex-wrap">
            <v-btn
              large
              :disabled="!chackMixture()"
              :loading="loading"
              color="primary"
              class="ma-3"
              outlined
              style="letter-spacing: 0"
              @click="saveMixtureAndAddToBasket(false)"
              >ذخیره ترکیب</v-btn
            >
            <v-btn
              large
              :disabled="!chackMixture()"
              :loading="loading"
              color="primary"
              class="ma-3"
              outlined
              style="letter-spacing: 0"
              @click="saveMixtureAndAddToBasket"
              >ذخیره ترکیب و اضافه کردن به سبد</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <LoginDialog
      v-if="!$store.state.auth.user"
      v-model="show_login_dialog"
      :reload_page="false"
    />
  </div>
</template>
<script>
import Loading from "~/components/Loading/Loading.vue";
import AmpInput from "~/components/Base/AmpInput.vue";
import LoginDialog from "~/components/Auth/LoginDialog.vue";
export default {
  components: { AmpInput, Loading, LoginDialog },
  data: () => ({
    loading: false,
    title: "ترکیب ساز",
    error: '',
    mill: null,
    product_select: {
      items: [],
      value: null,
    },
    mixture_weight: {
      items: [],
      value: null,
      unit: null,
    },
    min: null,
    max: null,
    mixture_type: null,
    mixture_title: null,
    mixture_type_id: null,
    mixture_products: null,
    mixture_total_amount: 1,
    mixture_total_percent: null,
    selected_product: [],
    show_login_dialog: false,
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "ترکیب ساز",
        disabled: true,
        to: "",
      },
      {
        text: "",
        disabled: true,
        to: "",
      },
    ],
  }),
  computed: {
    sum() {
      let sum = 0;
      this.selected_product.forEach((each) => {
        sum += each.percent;
      });
      this.mixture_total_percent = sum;
      return sum;
    },
    price() {
      let price = 0;
      this.selected_product.forEach((each) => {
        price += (this.mixture_total_amount * each.percent * each.price) / 100;
      });
      return Math.ceil(price);
    },
  },
  watch: {
    "product_select.value"(value) {
      this.findSelectedProduct(value);
    },
    mixture_total_amount(value){
      if(Number(value) <= 0) {
        this.mixture_total_amount = 0;
      }
    }
  },
  mounted() {
    this.findMixtureId(this.$route.params.mixture_slug);
  },
  methods: {
    findMixtureId(slug) {
      let mixture_type = this.$store.state.base.mixture_setting.settings.find(
        (each) => each.slug == slug
      );
      this.max = mixture_type.max;
      this.min = mixture_type.min;
      this.mixture_type_id = mixture_type.mixture_id;
      this.title = mixture_type.name;
      this.mixture_weight.items = mixture_type.weights.split(",");
      this.items[2].text = mixture_type.name;
      this.setTitle();
      this.getMixtureProducts();
    },
    getMixtureProducts() {
      this.$reqApi("/mixture/products-list", {
        mixture_type_id: this.mixture_type_id,
      }).then((res) => {
        if (res.model.length < 2) {
          this.$toast.error("تعداد محصول برای ترکیب کم است");
          this.$router.push("/");
        }
        this.mixture_products = res.model;
        this.setProductSelect();
        this.mixtureSellUnit();
      });
    },
    setProductSelect() {
      this.mixture_products.forEach((each) => {
        this.product_select.items.push({ text: each.name, value: each.id });
      });
    },
    findSelectedProduct(ids) {
      this.selected_product = [];
      this.mixture_products.forEach((each) => {
        ids.forEach((id) => {
          if (each.id == id) {
            this.fillSelectedProduct(each);
          }
        });
      });
    },
    fillSelectedProduct(item) {
      this.selected_product.push({
        name: item.name,
        product_varcomb_id: item.whole_sell_variation_combinations[0].id,
        percent: 0,
        price: item.whole_sell_variation_combinations[0].price,
      });
    },
    saveMixtureAndAddToBasket(add_to_basket = true) {
      if (!this.$store.state.auth.user) {
        this.show_login_dialog = true;
        return;
      }
      if (!this.chackMixture()) return;
      let form = {
        title: this.mixture_title,
        mixture_type_id: this.mixture_type_id,
        mixture_weight: this.mixture_weight.value,
        mixture: this.selected_product,
        additional_options: JSON.stringify({ "اسیاب شود": this.mill }),
        add_to_basket: add_to_basket,
        total_amount: this.mixture_total_amount,
      };

      this.loading = true;
      this.$reqApi("/mixture/insert", form).then((res) => {
        this.loading = false;
        // this.$toast.success("ترکیب به سبد شما اضافه شد")
        if (add_to_basket) {
          this.$router.push("/basket");
        } else {
          this.$router.push("/profile/mixture");
        }
      });
    },
    chackMixture() {
      if (!this.mixture_title) {
        this.error = "نام ترکیب کامل نیست"
        // this.$toast.error("نام ترکیب کامل نیست")
        return false;
      }
      if (Number(this.mixture_total_amount) < Number(this.min)) {
        this.error = "تعداد را وارد کنید"
        // this.$toast.error("تعداد را وارد کنید")
        return false;
      }
      if (Number(this.mixture_total_amount) > Number(this.max)) {
        this.error = "تعداد را وارد کنید"
        // this.$toast.error("تعداد را وارد کنید")
        return false;
      }
      if (this.selected_product.length < 2) {
        this.error = "حداقل دو محصول را انتخاب کنید"
        // this.$toast.error("حداقل دو محصول را انتخاب کنید")
        return false;
      }
      if (this.mixture_total_percent != 100) {
        this.error = "مجموع ترکیب شما 100 نیست"
        // this.$toast.error("مجموع ترکیب شما 100 نیست")
        return false;
      }
      this.error = ""
      return true;
    },
    setTitle() {
      this.$store.dispatch("setPageTitle", this.title);
    },
    mixtureSellUnit() {
      this.mixture_weight.unit = this.mixture_products[0].base_whole_sell_unit;
      this.mixture_total_amount = this.min;
    },
    setMinAmountForSell() {
      this.mixture_products.forEach((each) => {
        let whole_sell = each.whole_sell_variation_combinations;
        if (whole_sell && whole_sell.length != 0) {
          whole_sell.forEach((each) => {
            if (Number(this.min) >= Number(each.min) || !this.min)
              this.min = each.min;
          });
        }
      });
    },
  },
};
</script>
