<template>
  <div class="amp-lable_parent">
    <span :class="['amp-lable_text', color, textClass]" v-html="text"> </span>
    <span v-if="required && starRight" class="amp-lable_start_right">*</span>
    <span v-if="required && !starRight" class="amp-lable_start">*</span>
    <v-tooltip
      bottom
      color="teal"
      v-if="help_text"
      :max-width="tooltipWidth"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">info</v-icon>
      </template>
      <span v-html="help_text"></span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
    },
    color: {
      type: '',
      required: false,
    },
    tooltipWidth: {
      type: String,
      default: '350',
    },
    required: {
      type: Boolean,
      default: false,
    },
    starRight: {
      type: Boolean,
      default: false,
    },
    help_text: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textClass: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.amp-lable_parent {
  padding-top: 7px;
  padding-bottom: 7px;
  direction: rtl !important;
  text-align: right !important;
}
.amp-lable_start {
  float: left;
  color: #f00;
  font-size: 18px;
  padding-left: 4px;
}
.amp-lable_start_right {
  color: #f00;
}
.amp-lable_text {
  color: #5e5e5e;
}
</style>
