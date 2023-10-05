<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'ma-9' : 'ma-6'">
    <v-sheet class="" color="transparent" width="100%">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <div class="justify-center align-center">
        <v-card class="elevation-0 pa-4 my-8 border12">
          <v-row no-gutters class="flex-column justify-center align-center">
            <v-col class="d-flex justify-center mb-3">
              <img src="/logo.png" width="90px" />
            </v-col>
            <v-col class="mt-n16">
              <OTPPhoneForm v-model="username" v-if="!Boolean(username)" />
              <OTPCodeForm
                v-model="username"
                v-if="Boolean(username)"
                url_path="/profile"
              />
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import OTPCodeForm from "@/components/Auth/OTPCodeForm.vue";
import OTPPhoneForm from "@/components/Auth/OTPPhoneForm.vue";
export default {
  components: { OTPCodeForm, OTPPhoneForm },
  props: {
    // value: {
    //     required: true,
    // },
  },
  data: () => ({
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
        text: "ورود به تن تاک",
        disabled: true,
        to: "",
      },
    ],
  }),
  methods: {
    closeDialog() {
      this.$emit("input", false);
      this.username = "";
    },
  },
};
</script>

<style >
.login-card-fixed {
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 100%;
}
@media screen and (min-width: 600px) {
  .login-card-fixed {
    border: 1px solid lightgray !important;
  }
}
</style>
