<template>
  <div class="mt-8">
    <v-card class="elevation-0" style="">
      <v-card
        class="d-flex py-3 px-3 elevation-0"
        style="
          overflow-x: auto;
          overflow-y: hidden !important ;
          background: linear-gradient(to bottom, #0e426b, #1e6fd9, #1e6fd9) !important;
        "
      >
        <v-col v-for="(x, i) in items" :key="i" cols="6" md="2" class="">
          <v-card height="295px" class="rounded-xl elevation-0">
            <v-card class="grey elevation-0" height="120px">
              <v-img cover height="120px" :src="$getImage(x?.main_image)" alt="" />
            </v-card>
            <v-card cols="12" class="elevation-0 pa-3" height="110">
              <b class="font_14">
                {{ x.name }}
              </b>
              <br />

              <div class="text-start font_14 mt-6">{{ $price(x.base_price) }} تومان</div>
            </v-card>
            <v-card cols="12" class="elevation-0 pa-3" height="40">
              <v-chip color="#3e3e3e" class="rounded-lg pa-2">
                <v-icon color="white"> shopping_cart </v-icon>
              </v-chip></v-card
            >
          </v-card>
        </v-col>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      require: true,
    },
  },
  data: () => ({}),
  mounted() {
    console.log("ssss", this.items);
  },
};
</script>
