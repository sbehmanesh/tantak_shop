<template>
  <div class="pb-2">
    <template v-if="type == 'string' && value.length > 0">
      <v-row dense>
        <v-col cols="5" class="font_bold">{{ text }}:</v-col>
        <v-col cols="7" :class="classValue">{{ value }}</v-col>
      </v-row>
    </template>
    <template v-if="type == 'badge'">
      <v-badge :color="value.badge.color" :content="value.badge.text" class="float-left" inline>
        <br />
      </v-badge>
      <v-divider />
    </template>
    <template v-if="type == 'btn' && condition">
      <amp-button height="35" block :text="text" :class="classValue" />
    </template>
    <template v-if="type == 'action'">
      <template v-for="(item, index) in value">
        <amp-button
          height="35"
          :key="index"
          :text="item.text"
          :color="item.color"
          @click="actionClick(item)"
          v-if="actionCondition(item)"
        />
      </template>
    </template>
    <template v-if="type == 'center'">
      <v-row dense class="text-center">
        <v-col cols="12" :style="styleValue" :class="classValue">
          {{ value }}
        </v-col>
      </v-row>
    </template>

    <template v-if="type == 'chips'">
      <div class="end-justify">
        <v-chip
          small
          width="60"
          height="60"
          class="mr-1"
          v-for="(chip, index) in value"
          :key="index"
          v-html="chip.text"
          :color="chip.color"
        >
        </v-chip>
      </div>
    </template>
    <template v-if="type == 'string_badge'">
      <div class="text-center">
        <v-badge :color="value.badge.color" inline :content="value.badge.text">
          <div class="text-center">
            {{ value.value }}
          </div>
        </v-badge>
      </div>
    </template>

    <template v-if="type == 'chip'">
      <div :class="classValue">
        <v-chip small outlined width="60" height="60" :color="value.chip.color" v-html="value.chip.text"> </v-chip>
      </div>
    </template>

    <template v-if="type == 'image'">
      <div class="center-div">
        <img height="90" width="auto" v-if="value" :class="classValue" :src="$getImage(value)" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    item: { require: true },
    header: { require: true },
  },
  computed: {
    text() {
      if (typeof this.header.text == 'function') {
        return this.header.text(this.item)
      }
      return this.header.text
    },
    value() {
      let value = ''
      let key = this.header.value
      if (this.$checkNotNull(this.item[key])) {
        value = this.item[key]
      }
      if (typeof this.header.value == 'function') {
        return this.header.value(this.item)
      }

      // if (this.type == 'image') {
      //   if (value == '') {
      //     value = '/image/no_image.png'
      //   }
      //   // if (value.indexOf('http') != 0) {
      //   //   value = this.$store.state.file_url + value
      //   // }
      // }
      return value
    },
    condition() {
      if (this.header.condition) {
        return this.header.condition(this.item)
      }
    },
    classValue() {
      return this.header.class || ''
    },
    styleValue() {
      return this.header.style || ''
    },
    type() {
      let type = 'string'
      if (typeof this.header.type == 'string') {
        type = this.header.type
      }
      return type
    },
  },
  methods: {
    actionClick(item) {
      if (typeof item.action == 'function') {
        return item.action(this.item)
      }
    },
    actionCondition(item) {
      return item.condition
    },
  },
}
</script>
