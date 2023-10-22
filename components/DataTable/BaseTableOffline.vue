<template>
  <div class="offline-tabel">
    <div class="center-div pt-2">
      <amp-input append-icon="search" placeholder="جستجو" v-model="search" />
      <v-spacer />
    </div>
    <v-data-table
      :search="search"
      :page.sync="page"
      :items="desserts"
      :loading="loading"
      :headers="headers"
      hide-default-footer
      :items-per-page="15"
      @page-count="page_count = $event"
    >
      <template v-slot:item="{ item, headers }">
        <tr>
          <td v-for="(header, index) in headers" :key="index">
            <div v-if="loading" class="px-1">
              <v-skeleton-loader type="image" height="20px" v-if="loading" />
            </div>
            <template v-else>
              <span v-if="header.value != 'actions'" v-html="item[header.value]"></span>
              <div v-else>
                <template v-for="(btn, index) in btn_actions">
                  <v-btn
                    dark
                    x-small
                    depressed
                    :title="btn.text"
                    :color="btn.color"
                    @click="btn.fun(item)"
                    :key="index + btn.text"
                    v-if="btn.show_fun(item)"
                    :disabled="btn.disab_fun(item)"
                    :class="['py-4', 'ma-1']"
                  >
                    <span>{{ btn.text }}</span>
                    <v-icon v-if="btn.icon">{{ btn.icon }}</v-icon>
                  </v-btn>
                </template>
              </div>
            </template>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="page_count"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array },
    headers: { type: Array },
    actions: { type: Array },
    loading: { type: Boolean },
  },
  data: () => ({
    page: 1,
    search: '',
    page_count: 1,
  }),
  computed: {
    desserts() {
      return this.items
    },
    btn_actions() {
      return this.actions.map((x) => {
        let disab_fun = () => {
          return false
        }
        let show_fun = () => {
          return true
        }
        if (x.disab_fun) {
          disab_fun = x.disab_fun
        }
        if (x.show_fun) {
          show_fun = x.show_fun
        }
        return {
          ...x,
          show_fun,
          disab_fun,
        }
      })
    },
  },
}
</script>

<style>
.offline-tabel {
  padding: 15px;
}
.offline-tabel > div > div > table > thead {
  background-color: #f07b21 !important;
}
.offline-tabel > div > div > table > thead > tr > th {
  text-align: center !important;
}
.offline-tabel > div > div > table > thead > tr > th > i {
  color: white !important;
  font-size: 16px !important;
}
.offline-tabel > div > div > table > thead > tr > th > span {
  color: white !important;
  font-size: 16px !important;
}
</style>
