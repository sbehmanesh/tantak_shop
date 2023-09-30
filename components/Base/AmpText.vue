<template>
  <v-tooltip bottom :disabled="disabled">
    <template v-slot:activator="{ on, attrs }">
      <span v-on="on" v-bind="attrs" :class="classText">
        {{ text_end }}
      </span>
    </template>
    <span :class="classText">{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    size: { default: 0 },
    text: { default: '-', type: String },
    classText: { default: '', type: String },
  },
  computed: {
    disabled() {
      return this.text == this.text_end
    },
    text_end() {
      let text = this.text
      if (typeof text != 'string') {
        return text
      }
      if (this.size > 0 && text.length > this.size) {
        return this.text.slice(0, this.size - 3) + '...'
      }
      return this.text
    },
  },
}
</script>
