<template>
  <v-row :class="$vuetify.breakpoint.mdAndUp ? 'ma-6' : 'mx-3'">
    <v-col cols="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="elevation-0 px-4 py-10 my-8 border12">
        <v-row no-gutters class="flex-column justify-center align-center">
          <v-col cols="12">
            <OTPPhoneForm v-model="username" v-if="!Boolean(username)" />
            <OTPCodeForm
              v-model="username"
              v-if="Boolean(username)"
              url_path="/profile"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import OTPCodeForm from "@/components/Auth/OTPCodeForm.vue";
import OTPPhoneForm from "@/components/Auth/OTPPhoneForm.vue";
export default {
  components: { OTPCodeForm, OTPPhoneForm },
  props: {},
  data: () => ({
    title: "ورود",
    valid: false,
    loading: false,
    username: "",
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "ورود به سایت",
        disabled: true,
        to: "",
      },
    ],
  }),
  mounted() {
    if (this.$store.state.auth.user) {
      this.$router.push("/profile");
    }

    this.$store.dispatch("setPageTitle", this.title);
  },
  methods: {
    closeDialog() {
      this.$emit("input", false);
      this.username = "";
    },
  },
};
</script>
