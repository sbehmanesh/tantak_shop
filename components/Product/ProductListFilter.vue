<template>
    <div>
      <v-row v-if="!$vuetify.breakpoint.mdAndUp" no-gutters class="">
        <!-- first row -->
        <v-row no-gutters class="col-12 align-center px-3 px-sm-6">
          <!-- filter icon -->
          <v-col class="flex-grow-0 mb-3">
            <v-btn @click="drawer = !drawer" min-width="40" icon  class="whited elevation-1 d-flex justify-center align-center rounded pa-0" style="width:48px;height:48px">
              <v-icon size="32">mdi-filter</v-icon>
            </v-btn>
          </v-col>
          <!-- filter icon end -->
        </v-row>
        <!-- first row end -->
      </v-row>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
        right
        temporary
        width="100%"
        mobile-breakpoint="0"
      >
        <v-row no-gutters class="flex-column align-center px-3 px-sm-6">

            <!-- close icon -->
            <v-col class="flex-grow-0 my-3">
                <v-btn @click="drawer = !drawer" min-width="40" icon  class=" elevation-0 d-flex justify-center align-center rounded pa-0" style="width:48px;height:48px">
                <v-icon size="32">mdi-close</v-icon>
                </v-btn>
            </v-col>
            <!-- close icon end -->
            
            <!-- category -->
            <v-col class="mb-3">
              <ProductCategory @closeDrawer="drawer = false"/>
            </v-col>
            <!-- category end -->

            <!-- filter form -->
            <!-- <v-col>
                <FilterForm/>
            </v-col> -->
            <!-- filter form end -->
        </v-row>
      </v-navigation-drawer>
    </div>
  </template>
  
  <script>
import FilterForm from './FilterForm.vue';
import ProductCategory from './ProductCategory.vue';
  export default {
    data: () => ({
        clipped: true,
        drawer: false,
        fixed: false,
        items: [
            {
                icon: "mdi-home-outline",
                title: "صفحه اصلی",
                to: "/"
            },
            {
                icon: "mdi-apps",
                title: "فروشگاه",
                to: "/product"
            },
            {
                icon: "mdi-file-outline",
                title: "نشریه",
                to: "/blog"
            },
            {
                icon: "mdi-information-outline",
                title: "درباره تن تاک",
                to: "/about"
            },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: "Vuetify.js"
    }),
    components: { FilterForm, ProductCategory }
}
  </script>