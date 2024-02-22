<template>
  <v-card :class="['d-flex flex-column my-3 pt-2 rounded-xl w-85', cardClass]" min-height="80">
    <span class="font_size_14 font_weight_400 black300--text mx-4" v-html=" message.text" />
    <div class="mt-auto">
      <v-row no-gutters>
        <v-divider class="white"></v-divider>
      </v-row>
      <div class="d-flex flex-row pt-1">
        <span class="font_size_10 font_weight_300 black300--text mr-4" > {{ message.user }} </span>
        <span class="font_size_10 font_weight_300 black300--text mr-auto ml-4"> {{ message.created_at }} </span>
        <span class="font_size_10 font_weight_300 black300--text ml-4"> {{ message.date }} </span>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      require: true
    },
    cardClass: {}
  },
}
</script>

<style scoped>
.card {
  border-radius: 12px 0px 12px 12px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
}
</style>