<template>
  <div v-if="end_render">
    <amp-labale
      :text="text"
      :color="color"
      test-tag="labale"
      v-if="show_lable"
      :required="required"
      :help_text="help_text"
      :starRight="starRight"
      :textClass="textClass"
    />
    <v-textarea
      dense
      outlined
      :rows="rows"
      :label="label"
      test-tag="input"
      :rules="ruleItem"
      :placeholder="placeholder"
      :counter="counter"
      v-model="inp_value"
      :readonly="readonly"
      :maxlength="maxlength"
      :height="height"
      :class="[cClass, disabled || readonly ? 'opacity_input' : '']"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: {
    cClass: {
      type: String,
      required: false,
    },
    value: {
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      required: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    show_lable: {
      type: Boolean,
      default: true,
    },
    rows: {
      type: Number,
      default: 5,
    },
    counter: {
      default: '',
    },
    starRight: {
      type: Boolean,
      default: false,
    },
    help_text: {
      type: String,
      default: '',
    },
    maxlength: {
      default: '',
    },
    height: {},
    textClass: {
      type: String,
    },
  },
  data: () => ({
    ruleItem: [],
    inpRules: {},
    inp_value: '',
    required: false,
    end_render: false,
  }),
  watch: {
    value() {
      this.inp_value = this.value
    },
    inp_value() {
      this.$emit('input', this.inp_value)
    },
    rules() {
      this.setRules()
    },
  },
  mounted() {
    this.setRules()
    if (this.value_inp) {
      this.inp_value = this.value_inp
    }
    if (this.value) {
      this.inp_value = this.value
    }
    this.end_render = true
  },
  methods: {
    setRules() {
      this.ruleItem = []
      let inpRules = this.$inpRules()
      if (typeof this.rules == 'string') {
        this.rules.split(',')?.forEach((element) => {
          if (typeof inpRules[element] != 'undefined') {
            if (element == 'require') {
              this.required = true
            }
            this.ruleItem.push(inpRules[element])
          }
        })
      } else if (typeof this.rules == 'function') {
        this.ruleItem.push(this.rules)
      }
    },
  },
}
</script>
