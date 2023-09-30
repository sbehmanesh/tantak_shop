<template>
  <div class="amp_section">
    <div v-if="text" class="text_item">
      <v-flex class="pa-1 mr-1 warning rounded-circle d-inline-block"></v-flex>
      <h3 class="font_16" v-html="text"></h3>
    </div>
    <div xs12 md12 class="border_item"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped>
.amp_section {
  margin-top: 16px;
  margin-bottom: 10px;
}
.amp_section > .border_item {
  border-bottom: 2px dotted #acacac;
}
.amp_section > .text_item {
  position: absolute;
  margin-top: -11px;
  background: #fff;
  padding-left: 5px;
}
</style>
