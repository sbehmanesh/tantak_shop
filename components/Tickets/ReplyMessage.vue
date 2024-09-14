<template>
  <v-card class="d-flex flex-column my-3 card ml-4 mr-12 pt-2" color="#E1F8F3" min-height="86">
    <span class="font_size_14 font_weight_400 black300--text mx-4">
      {{ text }}
    </span>

    <div class="mt-auto">
      <v-row no-gutters>
        <v-divider class="white"></v-divider>
      </v-row>
      <div class="d-flex flex-row pt-1">
        <span class="font_size_10 font_weight_300 black300--text mr-4"> {{ sender }} </span>
        <span class="font_size_10 font_weight_300 black300--text mr-auto ml-4"> {{ hour }} </span>
        <span class="font_size_10 font_weight_300 black300--text ml-4"> {{ date }} </span>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'درود',
      required: true,
    },
    sender: {
      type: String,
      default: 'پشتیبان بیمچه',
      required: false,
    },
    hour: {
      type: String,
      default: '',
      required: false,
    },
    date: {
      type: String,
      default: '',
      required: false,
    },
  },
}
</script>

<style scoped>
.card {
  border-radius: 0px 12px 12px 12px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
}
</style>