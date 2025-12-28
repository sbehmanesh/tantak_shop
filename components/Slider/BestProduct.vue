<template>
  <div class="mt-8">
    <v-col cols="12">
      <v-icon> local_fire_department </v-icon>
      <b>پرفروش ترین کالا ها</b>
    </v-col>
    <v-card
      class="d-flex py-3 elevation-0"
      style="overflow-x: auto; overflow-y: hidden !important"
    >
      <v-col cols="9">
        <div
          v-for="(x, i) in firstColumn"
          :key="'c1' + i"
          class="d-flex align-center mb-4"
        >
          <v-avatar size="75">
            <v-img cover :src="$getImage(x?.main_picture_path)" />
          </v-avatar>
          <b class="font_30 mx-4">{{ i + 1 }}</b>
          <small class="font_12">{{ x.name }}</small>
        </div>
      </v-col>

      <v-col cols="9">
        <div
          v-for="(x, i) in secondColumn"
          :key="'c2' + i"
          class="d-flex align-center mb-4"
        >
          <v-avatar size="75">
            <v-img cover :src="$getImage(x?.main_picture_path)" />
          </v-avatar>
          <b class="font_30 mx-3">{{ i + firstColumn.length + 1 }}</b>
          <small class="font_12">{{ x.name }}</small>
        </div>
      </v-col>
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
    console.log("top_products", this.items);
  },
  computed: {
    newItems() {
      return this.items.slice(0, 6);
    },
    firstColumn() {
      return this.newItems.slice(0, Math.ceil(this.newItems.length / 2));
    },
    secondColumn() {
      return this.newItems.slice(Math.ceil(this.newItems.length / 2));
    },
  },
};
</script>
