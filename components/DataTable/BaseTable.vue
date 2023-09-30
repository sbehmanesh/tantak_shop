<template>
  <div>
    <div v-for="(item, index) in displayedArray" :key="index" class="mt-2">
      <v-card class="pa-2">
        <v-row dense>
          <v-col
            cols="12"
            @click="rowClick(item)"
            class="mx-1"
            :style="row_click ? 'cursor: pointer' : ''"
          >
            <div :class="getColor(item)"></div>
            <TableItem
              v-for="(header, i) in end_header"
              :key="i"
              :item="item"
              :header="header"
            />
          </v-col>
        </v-row>
        <div v-if="autoDelete || autoUpdate" class="d-flex justify-end ml-2">
          <div class="center-div">
            <!-- <v-btn icon small outlined color="success">
              <v-icon small class="" @click="editItem(item.id)"> edit </v-icon>
            </v-btn> -->
            <v-btn icon small outlined color="error">
              <v-icon small @click="deleteIt(item.id)"> delete </v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>
    <v-row
      class="mt-5 mb-5"
      no-gutters
      v-if="!no_footer && displayedArray && displayedArray.length > 0"
    >
      <v-col cols="12" class="my-2 d-flex justify-center">
        <v-btn
          small
          :disabled="current_page <= 1"
          @click="changePage(-1)"
          class="footer-left_btn mr-1"
          color="primary"
        >
          صفحه قبل
        </v-btn>
        <span class="mx-6" style="font-size: 19px">
          {{ current_page }} / {{ numberOfPages }}
        </span>
        <v-btn
          small
          color="primary"
          test-tag="prev_btn"
          @click="changePage(1)"
          :disabled="current_page >= numberOfPages"
          class="footer-left_btn ml-1"
        >
          صفحه بعد
        </v-btn>
      </v-col>
    </v-row>
    <ampDelete
      v-if="autoDelete"
      @deleted="deleted"
      @closeDialog="closeDialog"
      :value="deleteDialog"
      :deleteUrl="autoDelete"
      :id="thisId"
    />
  </div>
</template>

<script>
import TableItem from '@/components/DataTable/TableItem.vue'
import ampDelete from '@/components/Base/AmpDelete.vue'

export default {
  components: { TableItem, ampDelete },
  data: () => ({
    deleteDialog: false,
    thisId: '',
    style: { cursor: 'pointer' },
    // -----------
    pages: [],
    current_page: 1,
  }),
  props: {
    no_footer: {
      type: Boolean,
      default: false,
    },
    per_page: {
      default: 10,
    },
    header: {
      type: Array,
      require: true,
    },
    row_click: {
      type: Boolean,
      require: true,
    },
    items: {
      type: Array,
      require: false,
    },
    autoUpdate: {
      type: String,
      require: false,
    },
    autoDelete: {
      type: String,
      require: false,
    },
  },
  watch: {
    items() {
      this.setPages()
    },
  },
  computed: {
    end_header() {
      return this.header.filter((x) => x.type != 'color')
    },
    numberOfPages() {
      return this.items
    },
    displayedArray() {
      if (this.items) {
        return this.paginate(this.items)
      }
    },
    numberOfPages() {
      if (this.items) {
        return parseInt(Math.ceil(this.items.length / this.per_page))
      }
    },
  },
  methods: {
    //paginate
    changePage(count) {
      this.current_page += count
    },
    setPages() {
      this.current_page = 1
      if (this.items) {
        const numberOfPages = parseInt(
          Math.ceil(this.items.length / this.per_page)
        )
        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index)
        }
      }
    },
    paginate(items) {
      let page = this.current_page
      let perPage = this.per_page
      let from = page * perPage - perPage
      let to = page * perPage
      return items.slice(from, to)
    },
    //paginate

    closeDialog() {
      this.deleteDialog = false
    },
    rowClick(item) {
      if (this.row_click) {
        this.$emit('rowClickItems', item)
      }
    },
    deleteIt(item) {
      this.deleteDialog = true
      this.thisId = item
    },
    deleted() {
      this.deleteDialog = false
      this.$emit('deleted')
    },
    getColor(item) {
      let header = this.header.find((x) => x.type == 'color')
      if (header) {
        return `bt-color_item ${header.value(item)}`
      }
      return 'd-none'
    },
  },
}
</script>
<style scoped>
.bt-color_item {
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  position: absolute;
  border-bottom-left-radius: 20px;
}
</style>
