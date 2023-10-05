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
      <v-card class="elevation-0 pa-4 my-8 border12">
        <v-row no-gutters class="flex-column justify-center align-center">
          <v-col class="d-flex justify-center mb-3">
            <img src="/logo.png" width="90px" />
          </v-col>
          <v-col class="mt-n16">
            <Login v-model="username" v-if="!Boolean(username)" />
          </v-col>
        </v-row>
      </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import Login from "~/components/Auth/Login.vue";
  export default {
    components: { Login },
    props: {},
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
          text: "ورود به سایت",
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
  
  <style>
  .login-card-fixed {
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    max-width: 400px;
    width: 100%;
  }
  @media screen and (min-width: 600px) {
    .login-card-fixed {
      border: 1px solid lightgray !important;
    }
  }
  </style>
  