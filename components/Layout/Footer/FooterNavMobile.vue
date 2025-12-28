<template>
  <!-- footer mobile -->
  <v-footer v-if="!$vuetify.breakpoint.mdAndUp" padless fixed class="elevation-3">
    <v-col cols="12">
      <p>
        <b> فروشگاه اینترنتی بانیان , انتخاب و خرید آنلاین </b>
      </p>
    </v-col>
  </v-footer>
  <!-- footer mobile end -->
</template>

<script>
export default {
  data() {
    return {
      basket_menu: false,
      basket: null,
      main_setting: null,
    };
  },
  // watch:{
  //   '$store.state.base.basket.refresh'(){
  //     this.basket = this.$store.state.base.basket.data;
  //   }
  // },
  // mounted(){
  //   if(this.$store.state.base.basket){
  //     this.basket = this.$store.state.base.basket.data;
  //   }
  //   if(this.$store.state.base.landing_page.data){
  //     let res = this.$store.state.base.landing_page.data
  //     this.setMainSetting(res.settings);
  //   }
  // },
  methods: {
    setMainSetting(settings) {
      settings?.forEach((item) => {
        if (item.key == "main_setting") this.main_setting = JSON.parse(item.value);
      });
    },
  },
};
</script>
