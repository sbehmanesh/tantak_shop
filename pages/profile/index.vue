<template>
  <div>
    <v-col class="pt-0" cols="12" v-if="$store.state.auth.user">
      <v-card class="elevation-0 rounded-lg text-center pa-2 pt-4" outlined>
        <v-avatar size="80" color="grey">
          <v-img :src="$getImage($store.state.auth.user.avatar)" covaer />
        </v-avatar>
        <br />
        کاربر عزیز
        <p>
          <small>
            {{ $store.state.auth.user.first_name || "-" }}
          </small>
          <small>
            {{ $store.state.auth.user.last_name || "-" }}
          </small>
        </p>
      </v-card>
    </v-col>
    <v-col cols="12" class="my-1">
      <ProfileMenu />
    </v-col>

    <v-form v-model="valid" @submit.prevent="submit()">
      <v-row class="px-6">
        <v-col cols="12" me="6" class="py-0">
          <amp-input
            text="نام  "
            placeholder="نام   "
            textClass="font_14"
            rules="require,fa_chart"
            v-model="form.first_name"
          />
          <amp-input
            text="  نام خانوادگی"
            placeholder="  نام خانوادگی"
            textClass="font_14"
            rules="require,fa_chart"
            v-model="form.last_name"
          />
        </v-col>
        <v-col cols="12" me="6" class="py-0">
          <amp-input
            is-number
            text="شماره موبایل"
            placeholder="شماره موبایل"
            textClass="font_14"
            disabled
            v-model="form.username"
          />
        </v-col>
        <v-col cols="12" me="6" class="py-0">
          <amp-input
            text="پست الکترونیک"
            placeholder="پست الکترونیک"
            textClass="font_14"
            rules="email"
            v-model="form.email"
          />
        </v-col>
        <v-col cols="12">
          <CountryDivisionSelectInput
            text="شهر"
            v-model="form.country_division_id"
            class=""
        />
        
        </v-col>
        <v-col cols="12" class="py-0">
          <amp-textarea :rows="3" text="نشانی" v-model="form.address" />
        </v-col>
        <v-col cols="12" md="12" class="pt-0"></v-col>
        <v-col v-if="is_seller" cols="6" class="py-0">
          <amp-select
            text="نوع فروش"
            placeholder="نوع فروش"
            textClass="font_14"
            rules="require"
            :items="$store.state.static.seller_types"
            appendIcon="mdi-chevron-down"
            v-model="sell_form.sell_type"
          />
        </v-col>
        <v-col v-if="is_seller" cols="6" class="py-0">
          <amp-input
            text="شماره تلفن کسب و کار"
            placeholder="شماره تلفن کسب و کار"
            textClass="font_14"
            rules="require"
            is-number
            type="number"
            v-model="sell_form.phone"
          />
        </v-col>
        <v-col
          v-if="is_seller && sell_form.sell_type != 'real_shop'"
          cols="6"
          class="py-0"
        >
          <amp-input
            text="ادرس فضای مجازی"
            placeholder="ادرس فضای مجازی"
            rules="require"
            textClass="font_14"
            v-model="sell_form.url"
          />
        </v-col>
        <v-col v-if="is_seller" cols="12" class="py-0">
          <amp-textarea text="نشانی کسب و کار" height="60" v-model="sell_form.address" />
        </v-col>
        <v-col cols="12" md="4" class="pt-0 d-flex justify-center">
          <amp-button
            :loading="loading"
            :disabled="!valid || loading"
            text="ویرایش"
            color="success"
            width="190"
            type="submit"
          />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import CountryDivisionSelectInput from "@/components/Setting/CountryDivisionSelectInput.vue";
import Loader from "@/components/Layout/Loader.vue";
import ProfileMenu from "@/components/ProfileMenu.vue";

export default {
  layout: "profile",
  components: { CountryDivisionSelectInput, Loader, ProfileMenu },
  data() {
    return {
      title: "پروفایل",
      valid: false,
      loading: false,
      is_seller: false,
      sell_form: {
        id: null,
        url: null,
        phone: null,
        user_id: null,
        address: null,
        sell_type: null,
      },
      form: {
        sort: 11,
        person_type: "real",
        status: "active",
        id: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        address: "",
        avatar: "",
        country_division_id: "",
        email: "",
      },
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
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    this.loadinfo();
    this.$scrollTo(0, this.scroll_to);
  },
  methods: {
    loadinfo() {
      this.loading = true;
      let user = this.$store.state.auth.user;
      this.form.country_division_id = user.country_division_id;
      this.form.first_name = user.first_name;
      this.form.username = user.username;
      this.form.password = user.password;
      this.form.address = user.address;
      this.form.avatar = user.avatar;
      this.form.email = user.email;
      this.form.id = user.id;
      if (user.seller_profile) {
        this.is_seller = true;
        this.sell_form.sell_type = user.seller_profile.sell_type;
        this.sell_form.user_id = user.seller_profile.user_id;
        this.sell_form.address = user.seller_profile.address;
        this.sell_form.phone = user.seller_profile.phone;
        this.sell_form.url = user.seller_profile.url;
        this.sell_form.id = user.seller_profile.id;
      }
      this.loading = false;
    },
    submit() {
      this.loading = true;
      let form = { ...this.form };
      form.username = this.$FarsiToEnglishNumber(form.username);
      this.$reqApi("/user/profile", form)
        .then((response) => {
          this.$toast.success("اطلاعات پروفایل ویرایش شد");
          if (user.seller_profile) {
            this.submitSeller();
          }
          this.$router.go();
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    submitSeller() {
      let form = { ...this.sell_form };
      this.$reqApi("/seller-profile/update", form)
        .then((response) => {
          this.$router.go();
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
