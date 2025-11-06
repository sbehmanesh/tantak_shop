<template>
  <v-sheet class="footer py-8 py-md-10">
    <v-container>
      <v-row class="footer__content" :dense="$vuetify.breakpoint.smAndDown">
        <v-col cols="12" md="5" class="footer__column footer__column--info">
          <div
            v-for="(info, i) in informations"
            :key="i"
            class="footer__info-item mb-3"
          >
            <v-icon color="primary" class="footer__info-icon">
              {{ info.icon }}
            </v-icon>
            <span class="font_14">{{ info.description }}</span>
          </div>
          <div class="font_14 footer__hours">
            همه روزه به جز ایام تعطیل رسمی ساعت 9 الی 17 پنجشنبه ها ساعت 9 الی
            14
          </div>
        </v-col>

        <v-col cols="12" md="4" class="footer__column">
          <v-row class="footer__menus">
            <v-col cols="12" sm="6" class="footer__menu-column">
              <div
                v-for="menu in menu1"
                :key="menu.route"
                class="font_14 mb-3 pointer"
                @click="goToPage(menu.route)"
              >
                {{ menu.name }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="footer__menu-column">
              <div
                v-for="menu in menu2"
                :key="menu.route"
                class="font_14 mb-3 pointer"
                @click="goToPage(menu.route)"
              >
                {{ menu.name }}
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          md="3"
          class="footer__column footer__column--social d-flex flex-wrap justify-center justify-md-end align-center"
        >
          <v-icon
            v-for="(icon, i) in social_icons"
            :key="i"
            color="primary"
            size="28"
            class="footer__social-icon"
          >
            {{ icon.name }}
          </v-icon>
        </v-col>
      </v-row>

      <v-divider color="#f27b00" class="my-6"></v-divider>

      <v-row>
        <v-col cols="12" class="footer__copyright">
          <div class="font_14 text-center text-md-left">
            تمام حقوق مادی و معنوی این وب سایت متعلق به تن تاک© می باشد
          </div>
          <div :class="$vuetify.breakpoint.mdAndUp ? '' : 'height64 mb-6'"></div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      main_setting: null,
      informations: [
        {
          icon: "mdi-office-building",
          description:''
        },
        {
          icon: "mdi-face-agent",
          description:"",
        },
        {
          icon: "mdi-email-outline",
          description: " ",
        },
        {
          icon: "mdi-phone",
          description: "",
        },
        {
          icon: "mdi-cellphone",
          description: "",
        },
        {
          icon: "mdi-post-outline",
          description: "",
        },
      ],
      menu1: [
        {
          name: "درباره ما",
          route: "/about-us",
        },
        {
          name: "نحوه ارسال",
          route: "/how-to-send",
        },
        {
          name: "حریم شخصی",
          route: "/privacy",
        },
        {
          name: "قوانین و مقررات",
          route: "/terms-and-conditions",
        },
        {
          name: "ثبت شکایات",
          route: "/complaint",
        },
      ],
      menu2: [
        {
          name: "ارتباط با ما",
          route: "/contact-us",
        },
        {
          name: "راهنمای سایز کفش",
          route: "/show-size-guide",
        },
        {
          name: "شرایط مرجوعی ",
          route: "/return-conditions",
        },
        {
          name: "خدمات پس از فروش",
          route: "/support",
        },
        {
          name: "شعب و نمایندگی",
          route: "/dealership",
        },
        {
          name: "درخواست نمایندگی",
          route: "/form-for-branch-registeration",
        },
        {
          name: "فروش عمده و سازمانی",
          route: "/whole-sale",
        },
      ],
      social_icons: [
        {
          name: "mdi-facebook",
          route: "",
        },
        {
          name: "mdi-twitter",
          route: "",
        },
        {
          name: "mdi-instagram",
          route: "",
        },
        {
          name: "mdi-whatsapp",
          route: "",
        },
        {
          name: "telegram",
          route: "",
        },
        {
          name: "aparat",
          route: "",
        },
      ],
    };
  },
  created() {
    // this.main_setting =  this.$store.state.base.main_setting
  },
  watch: {
    '$store.state.setting.main_setting'(){
      let clone_main_setting = [...this.$store.state.setting.main_setting]
      clone_main_setting.map((x)=>{
        this.informations[0].description = x.address
        this.informations[1].description = x.addres_after_sales_service
        this.informations[2].description = x.email
        this.informations[3].description = x.advertising
        this.informations[4].description = x.phone
        this.informations[5].description = x.postal_code
      })
    }
  },
  methods: {
    goToPage(value) {
      this.$router.push(value);
    },
  },
};
</script>
<style scoped>
.footer {
  position: relative;
  z-index: 200;
}

.footer__content {
  row-gap: 24px;
}

.footer__column {
  display: flex;
  flex-direction: column;
}

.footer__column--info {
  gap: 8px;
}

.footer__info-item {
  display: flex;
  align-items: center;
}

.footer__info-icon {
  margin-left: 12px;
}

.footer__hours {
  margin-top: 8px;
  line-height: 1.8;
}

.footer__menu-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer__social-icon {
  margin: 4px 8px;
}

.footer__copyright {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 600px) {
  .footer__info-item {
    justify-content: center;
    text-align: center;
  }

  .footer__info-icon {
    margin-left: 8px;
  }

  .footer__menu-column {
    align-items: center;
    text-align: center;
  }
}
</style>
