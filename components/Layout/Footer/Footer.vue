<template>
  <v-sheet class="py-5 pt-md-10 mt-md-10">
    <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
      <v-col cols="1" v-if="$vuetify.breakpoint.mdAndUp"></v-col>
      <v-col
        cols="12"
        md="5"
        :class="$vuetify.breakpoint.smAndDown ? 'pa-3' : ''"
      >
        <div v-for="(info, i) in informations" :key="i" class="mb-3">
          <v-icon color="primary" class="ml-2">{{ info.icon }}</v-icon>
          <span class="font_14">{{ info.description }}</span>
        </div>
        <div>
          <span class="font_14"
            >همه روزه به جز ایام تعطیل رسمی ساعت 9 الی 17 پنجشنبه ها ساعت 9 الی
            14</span
          >
        </div>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-center pa-0 pr-14">
        <v-col cols="5" class="pr-6">
          <div
            v-for="menu in menu1"
            :key="menu.route"
            class="font_14 mb-3 pointer"
            @click="goToPage(menu.route)"
          >
            {{ menu.name }}
          </div>
        </v-col>
        <v-col cols="7">
          <div
            v-for="menu in menu2"
            :key="menu.route"
            @click="goToPage(menu.route)"
            class="font_14 mb-3 pointer"
          >
            {{ menu.name }}
          </div>
        </v-col>
      </v-col>
      <v-col
        cols="12"
        md="1"
        class="d-flex align-center mr-4"
        :class="$vuetify.breakpoint.mdAndUp ? 'flex-column' : 'justify-center'"
      >
        <v-icon
          v-for="(icon, i) in social_icons"
          :key="i"
          color="primary"
          class="ml-4 mb-5"
          size="26"
        >
          {{ icon.name }}
        </v-icon>
      </v-col>
      <v-col cols="1" v-if="$vuetify.breakpoint.mdAndUp"></v-col>
    </v-row>
    <v-divider color="#f27b00"></v-divider>
    <v-col cols="12" class="d-flex justify-center mt-2">
      <div class="font_14">
        تمام حقوق مادی و معنوی این وب سایت متعلق به تن تاک© می باشد
      </div>
      <div :class="$vuetify.breakpoint.mdAndUp ? '' : 'height64 mb-6'"></div>
    </v-col>
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
          description:
            "دفتر مرکزی: تهران، خیابان ملاصدرا ، خیابان شیخ بهایی، خیابان برزیل غربی، پلاک 136، طبقه چهارم",
        },
        {
          icon: "mdi-face-agent",
          description:
            "خدمات پس از فروش: تهران، بزرگراه آزادگان، بزرگراه رجایی، بزرگراه شهید بهشتی، نرسیده به سه راه ترانسفور، مجتمع تجاری آرین",
        },
        {
          icon: "mdi-email-outline",
          description: " info@tantak.ir",
        },
        {
          icon: "mdi-phone",
          description: "تلفن روابط عمومی و تبلیغات: 57917500-021",
        },
        {
          icon: "mdi-cellphone",
          description: "تلفن پشتیبانی: 56804577-021 * 57917000-021 ",
        },
        {
          icon: "mdi-post-outline",
          description: "کدپستی: 1879613154",
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
          name: 'ثبت شکایات',
          route: '/complaint'
        }
      ],
      menu2: [
        {
          name: 'ارتباط با ما',
          route: '/contact-us'
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
          route: "/hole-sale",
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
  methods: {
    goToPage(value) {
      this.$router.push(value);
    },
  },
};
</script>
