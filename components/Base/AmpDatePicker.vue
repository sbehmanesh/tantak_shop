<template>
  <v-flex v-if="end_render" class="mb-n6">
    <v-menu
      offset-y
      v-model="menu"
      min-width="290px"
      transition="scale-transition"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-flex>
          <amp-labale
            :text="text"
            :color="color"
            test-tag="labale"
            :required="required"
            v-if="text && show_lable"
          />
          <v-text-field
            dense
            full-width
            outlined
            readonly
            v-on="on"
            :type="type"
            v-bind="attrs"
            :dark="dark"
            :class="cClass"
            :prefix="prefix"
            test-tag="input"
            :rules="ruleItem"
            :disabled="readonly"
            :height="amp_height"
            :placeholder="placeholder"
            :background-color="backcolor"
            @update:error="change_error"
            v-model="computedDateFormatted"
            :prepend-inner-icon="innerIcon"
            :prepend-icon="prependIcon"
            :append-outer-icon="outerIcon"
            @click:prepend="$emit('click:prepend', $event)"
          >
            <template slot="append">
              <v-flex class="center-div pointer" v-on="on" v-bind="attrs">
                <!-- <img
                  width="22"
                  height="22"
                  v-if="menu"
                  src="/icon/arrow_bottom.svg"
                /> -->
                <!-- <img
                  v-else
                  width="22"
                  height="22"
                  src="/icon/arrow_right.svg"
                /> -->
              </v-flex>
            </template>
          </v-text-field>
        </v-flex>
      </template>
      <v-date-picker
        no-title
        scrollable
        :min="min"
        :max="max"
        ref="date_picker"
        v-model="inp_value"
        @input="menu = false"
        test-tag="date_picker"
        :allowed-dates="allowedDates"
        :weekday-format="weekdayFormat"
        :active-picker.sync="activePicker"
      />
    </v-menu>
  </v-flex>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
    },
    value: {
      required: false,
    },
    backcolor: {
      type: String,
    },
    innerIcon: {
      type: String,
      required: false,
    },
    outerIcon: {
      type: String,
      required: false,
    },

    prependIcon: {
      type: String,
      required: false,
    },
    placeholder: {
      default: 'روز/ماه/سال',
      type: String,
    },
    text: {
      default: '',
      type: String,
    },
    activePicker: {
      default: 'DATE',
      type: String,
    },
    cClass: {
      type: String,
      required: false,
    },
    min: {
      type: String,
      required: false,
    },
    max: {
      type: String,
      required: false,
    },
    rules: {
      type: String,
      default: '',
    },
    show_lable: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    color: {
      type: String,
      required: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: '',
    },
    allowedDates: {
      required: false,
    },
  },
  data: () => ({
    menu: false,
    ruleItem: [],
    inpRules: {},
    inp_value: '',
    required: false,
    end_render: false,
  }),
  watch: {
    menu(val) {
      val &&
        setTimeout(
          () => (this.$refs.date_picker.activePicker = this.activePicker)
        )
    },
    value() {
      this.inp_value = this.value
    },
    inp_value() {
      this.$emit('input', this.inp_value)
    },
  },
  computed: {
    amp_height() {
      if (this.$vuetify.breakpoint.xl) {
        return 10
      }
      return 10
    },
    computedDateFormatted() {
      return this.$formatDate(this.inp_value)
    },
  },
  mounted() {
    this.ruleItem = []
    this.inpRules = this.$inpRules()
    this.rules.split(',').forEach((element) => {
      if (
        typeof this[element] != 'undefined' &&
        typeof this.inpRules[element] != 'undefined'
      ) {
        if (element == 'require') {
          this.required = true
        }
        this.ruleItem.push(this[element])
      }
    })
    if (this.value) {
      this.inp_value = this.value
    }
    this.end_render = true
  },
  methods: {
    change_error(data) {
      this.$emit('change_error', data)
    },
    require(value) {
      let check = this.$inpRules().require(value)
      if (check != true) {
        return this.error_text || this.text + check
      } else {
        return true
      }
    },
    weekdayFormat(date) {
      return this.$moment(date).format('ddd')
    },
  },
}
</script>
<style scoped>
.v-text-field {
  min-width: 170px;
}
</style>
