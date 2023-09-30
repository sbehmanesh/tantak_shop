<template>
    <!-- footer mobile -->
    <v-footer v-if="!$vuetify.breakpoint.mdAndUp" padless fixed class="elevation-3">
      <v-row no-gutters class="align-center justify-space-around background2 elevation-2" style="height:56px">
        <v-col class="flex-grow-0 ">
          <v-hover v-slot="{ hover }">
            <div class="d-flex flex-column align-center" style="min-width:60px">
                <v-img width="36px" aria-label="پروفایل" @click="$router.push('/profile')" v-if="$store.state.auth.user" :src="$getImage($store.state.auth.user.avatar)" alt="user"></v-img>
                <!-- <v-icon v-if="$store.state.auth.user" size="40" color="accent">mdi-account-outline</v-icon> -->
                <v-icon @click="$router.push('/auth')" aria-label="پروفایل" v-else size="40" :color="hover?'primary':'blackd'">mdi-account-outline</v-icon>
                <v-scroll-y-transition>
                  <div v-if="$route.path == '/profile' || hover"  class="primary--text pa-0 text-center font_10">پروفایل</div>
                </v-scroll-y-transition>
            </div>
          </v-hover>
        </v-col>
        <v-col class="flex-grow-0" @click="$router.push('/')">
          <v-hover v-slot="{ hover }">
            <div class="d-flex flex-column">
                <v-img v-if="main_setting" aria-label="صفحه اصلی" :src="$getImage(main_setting.logo)" width="40" height="40"></v-img>
                <v-scroll-y-transition>
                  <div v-if="$route.path == '/' || hover"  class="primary--text pa-0 text-center font_10">صفحه اصلی</div>
                </v-scroll-y-transition>
            </div>
          </v-hover>
        </v-col>
        <v-col class="flex-grow-0 " @click="$router.push('/basket')">
          <v-hover v-slot="{ hover }">
            <div class="d-flex flex-column align-center" style="min-width:60px">
              <v-badge
              :value="basket && basket.items.length !=0"
              :content="basket ? basket.items.length:''"
              color="error"
              overlap
              left
              transition="slide-x-transition"

              >
              <v-icon size="36" aria-label="سبد خرید" :color="hover || $route.path == '/basket'?'primary':'blackd'">mdi-cart-outline</v-icon>
            </v-badge>
                <v-scroll-y-transition>
                  <div v-if="$route.path == '/basket' || hover"  class="primary--text pa-0 text-center font_10">سبد خرید</div>
                </v-scroll-y-transition>
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-footer>
    <!-- footer mobile end -->
</template>

<script>
export default {
  data() {
    return {
      basket_menu: false,
      basket:null,
      main_setting:null,
    };
  },
  watch:{
    '$store.state.base.basket.refresh'(){
      this.basket = this.$store.state.base.basket.data;
    }
  },
  mounted(){
    if(this.$store.state.base.basket){
      this.basket = this.$store.state.base.basket.data;
    }
    if(this.$store.state.base.landing_page.data){
      let res = this.$store.state.base.landing_page.data
      this.setMainSetting(res.settings);
    }   
  },
  methods:{
    setMainSetting(settings){
      settings.forEach((item) =>{
        if(item.key == "main_setting")
          this.main_setting= JSON.parse(item.value)
      })
    },
  }
}
</script>