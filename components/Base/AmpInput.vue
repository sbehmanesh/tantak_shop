<template>
  <div v-if="end_render" :class="parentClass">
    <amp-labale
      :text="text"
      test-tag="labale"
      :disabled="disabled"
      :required="required"
      :textClass="textClass"
      :help_text="help_text"
      :starRight="starRight"
      v-if="text && show_lable"
    />
    <v-text-field
      :hide-details="hideDetails"
      class="edited text-field"
      :dense="dense"
      :color="color"
      :outlined="outlined"
      :filled="filled"
      :rounded="rounded"
      :label="label"
      :solo="solo"
      :type="type"
      :suffix="suffix"
      :prefix="prefix"
      test-tag="input"
      :rules="ruleItem"
      v-model="inp_value"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      :width="width"
      :height="height"
      :flat="flat"
      :append-icon="appendIcon"
      :placeholder="placeholder"
      :background-color="backgroundColor"
      :prepend-inner-icon="prependInnerIcon"
      @click:append="$emit('click:append', $event)"
      :autocomplete="type == 'password' ? 'new-password' : ''"
      :class="[
        cClass,
        isFloat || isNumber || isPrice ? 'ltr-item' : '',
        (disabled || readonly) && activeOpacity ? 'opacity_input' : '',
      ]"
    >
    </v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    isPrice: {
      type: Boolean,
      default: false,
    },
    dense: { type: Boolean, default: true },
    hideDetails: { type: Boolean, default: false },
    outlined: { type: Boolean, default: true },
    rounded: { type: Boolean, default: false },
    filled: { type: Boolean, default: false },
    solo: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    label: { type: String },
    activeOpacity: {
      type: Boolean,
      default: true,
    },
    textClass: {
      type: String,
      default: "",
    },
    isNumber: {
      type: Boolean,
      default: false,
    },
    isFloat: {
      type: Boolean,
      default: false,
    },
    value: {
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    cClass: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    rules: {
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    color: {
      type: String,
      required: false,
    },
    backgroundColor: {
      type: String,
      default: "",
    },
    appendIcon: {
      type: String,
      default: "",
    },
    prependInnerIcon: {
      default: "",
    },
    show_lable: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    value_inp: {
      default: "",
    },
    starRight: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    help_text: {
      type: String,
      default: "",
    },
    maxlength: {
      default: "",
    },
    parentClass: {
      default: "",
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  data: () => ({
    ruleItem: [],
    inpRules: {},
    inp_value: "",
    required: false,
    end_render: false,
  }),
  watch: {
    value() {
      let value = this.value;
      if (this.isPrice && value) {
        value = this.$price(value);
      }
      this.inp_value = value;
    },
    inp_value() {
      let value = this.inp_value;
      if (this.isPrice && value) {
        value = String(value).replace(/\D/g, "");
      }
      if (this.isPrice || this.isNumber || this.isFloat) {
        value = this.$FarsiToEnglishNumber(String(value));
      }
      this.$emit("input", value);
    },
    value_inp() {
      this.inp_value = this.value_inp;
    },
    rules: {
      deep: true,
      handler() {
        this.setRules();
      },
    },
  },
  mounted() {
    this.setRules();
    if (this.value_inp) {
      this.inp_value = this.value_inp;
    }
    if (this.value) {
      this.inp_value = this.value;
    }
    if (this.isPrice && this.inp_value) {
      this.inp_value = this.$price(this.inp_value);
    }
    this.end_render = true;
  },
  methods: {
    setRules() {
      this.required = false;
      let ruleItem = [];
      this.ruleItem = [];
      let inpRules = this.$inpRules();
      if (typeof this.rules == "string") {
        this.rules.split(",")?.forEach((element) => {
          if (typeof inpRules[element] != "undefined") {
            if (element == "require") {
              this.required = true;
            }
            if (element == "password") {
              ruleItem = [...ruleItem, ...inpRules[element]];
            } else {
              ruleItem.push(inpRules[element]);
            }
          }
        });
      } else if (typeof this.rules == "function") {
        ruleItem.push(this.rules);
      }
      if (this.isNumber) {
        ruleItem.push(inpRules.number);
      }
      if (this.isFloat) {
        ruleItem.push(inpRules.number_float);
      }
      if (this.isPrice) {
        ruleItem.push(inpRules.price);
      }
      this.$nextTick(() => {
        this.ruleItem = [...ruleItem];
      });
    },
  },
};
</script>
