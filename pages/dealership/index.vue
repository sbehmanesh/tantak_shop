<template>
  <v-row no-gutters class="ma-4">
    <v-card class="border12 col-12" v-if="$vuetify.breakpoint.mdAndUp">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-left</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-card width="100%" class="mt-8 border12">
      <v-row>
        <v-col cols="12" md="12">
          <v-dialog v-model="dialog.show" max-width="600">
            <v-card>
              <v-card-title class="d-flex justify-center" v-if="dialog.item">
                {{ dialog.item.name }}
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="12" class="ma-0">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    class="d-flex justify-center"
                    v-if="dialog.show && dialog.item.long"
                  >
                    <client-only>
                      <l-map
                        :zoom="zoom"
                        :center="[
                          dialog.item.lat,
                          dialog.item.long
                        ]"
                        class="map-viewer"
                      >
                        <l-tile-layer :url="url" :subdomains="subdomains" />
                        <l-marker
                          :lat-lng="[dialog.item.lat, dialog.item.long]"
                        ></l-marker>
                      </l-map>
                    </client-only>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="12" md="12" class="px-8">
          <BaseTable
            :loading="loading"
            :items="items_table"
            :headers="headers"
            :actions="actoins"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import BaseTable from "~/components/DataTable/BaseTableOffline";
import MapViever from "@/components/Map/MapViewer.vue";
export default {
  components: { BaseTable, MapViever },
  data: () => ({
    title: "شعب و نمایندگی",
    zoom: 16,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    url: "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/"
      },
      {
        text: "شعب و نمایندگی",
        disabled: true
      }
    ],
    province: "",
    dialog: { item: null, show: false },
    actoins: [],
    loading: false,
    country_divisoin: [],
    headers: [],
    filters: {},
    items_table: []
  }),
  beforeMount() {
    this.loadBranchs();
    // this.loadDevisoin();
    this.headers = [
      {
        text: "شعبه/نمایندگی",
        value: "name",
        class: " d-block text-lg-right mt-4"
      },
      {
        text: "کد",
        value: "branch_code",
        class: " d-table-cell text-lg-right"
      },
      {
        text: "وضعیت",
        value: "status",
        class: " d-block text-lg-right mt-4"
      },
      {
        text: "آدرس",
        value: "address",
        class: " d-table-cell text-lg-right"
      },
      {
        text: "#",
        value: "actions",
        class: " d-block text-lg-right mt-4 mr-4"
      }
    ];
    this.actoins = [
      {
        color: "success",
        text: "نقشه",
        fun: body => {
          this.dialog.item = body;
          this.dialog.show = true;
        },
        show_fun: body => {
          if ((body.lat && body.long) && body.lat != '#N/A') {
            return true;
          }
        }
      }
    ];
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
  },
  methods: {
    loadBranchs() {
      this.loading = true;
      this.$reqApi("/shop/branch", { filter: this.filters , row_number: 3000000 })
        .then(res => {
          this.items_table = res.model.data
            .map((x, i) => ({
              ...x,
              index: i + 1,
              created_at: this.$toJalali(x.created_at),
              status: this.setstatus(x),
              name: x.name
            }))
            .filter(y => y.status);
          this.loading = false;
        })
        .catch(err => {
          return err;
          this.loading = false;
          this.$toast.error(
            "در روند بارگزاری اطاعات مشکل پیش آمده لطفا دوباره امتحان کنید"
          );
        });
    },
    loadDevisoin() {
      this.$reqApi("/country-division", {row_number: 3000000 }).then(res => {
        res.model.data.map(x => {
          this.country_divisoin.push(x);
        });
      });
    },
    setstatus(data) {
      if (data.status == "active") {
        return "فعال";
      }
      if (data.status == "inactive") {
        return "غیر فعال";
      }
      if (data.status == "hidden") {
        return null;
      }
    }
  }
};
</script>
<style scoped>
.map-viewer {
  width: 100%;
  height: 300px;
  z-index: 0;
}
</style>
