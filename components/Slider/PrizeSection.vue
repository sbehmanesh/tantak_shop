<template>
  <v-row class="ga-4">
    <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="3">
      <v-card class="pa-4 prize-card" elevation="2" outlined>
        <!-- image (optional) -->
        <div v-if="item.image" class="text-center mb-3">
          <v-img :src="item.image" height="90" contain class="rounded-lg"></v-img>
        </div>

        <!-- title -->
        <h4 class="font-weight-bold mb-2 text-truncate">
          {{ item.title }}
        </h4>

        <!-- value -->
        <p class="grey--text mb-1">
          مقدار: <strong>{{ item.value }}</strong>
        </p>

        <!-- winners -->
        <p class="grey--text mb-1">
          تعداد برنده: <strong>{{ item.winners }}</strong>
        </p>

        <!-- description -->
        <p v-if="item.desc" class="grey--text text-caption mt-2" style="line-height: 1.6">
          {{ item.desc }}
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.prize-card {
  border-radius: 14px;
  transition: 0.3s ease;
}
.prize-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12) !important;
}
</style>
