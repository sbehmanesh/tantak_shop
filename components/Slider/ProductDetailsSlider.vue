<template>
  <div>
    <v-responsive>
      <v-row>
        <v-col class="flex-grow-0" v-if="$vuetify.breakpoint.mdAndUp">
          <v-item-group v-model="current_item" mandatory>
            <v-row no-gutters class="flex-column">
              <v-col
                v-for="(slide, index) in slider_item[0]"
                :key="index"
                class="col-12 flex-grow-0 pb-3"
              >
                <v-item v-slot="{ active, toggle }">
                  <!-- <v-img 
                    :color="active ? 'primary' : ''"
                    @click="toggle"
                    width="70px"
                    aspect-ratio="1" 
                    :src="$getImage($resizeImage(slide.image))" 
                    :alt="slide.title" 
                    ></v-img> -->
                  <v-img
                    :color="active ? 'primary' : ''"
                    @click="toggle"
                    width="70px"
                    aspect-ratio="1"
                    :src="slide.image"
                    :alt="slide.title"
                  ></v-img>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
        </v-col>
        <v-col v-if="slider_item[0]">
          <v-carousel
            v-model="current_item"
            height="auto"
            hide-delimiters
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(slide, index) in slider_item[0].path"
              :key="index"
            >
              <!-- <v-img aspect-ratio="1" :src="$getImage(slide)" :alt="slide.title" ></v-img> -->
              <v-img
                contain
                aspect-ratio="1"
                :src="$getImage(slide)"
                :alt="slide"
              ></v-img>
            </v-carousel-item>
            <template v-slot:prev="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                class="ma-2"
                size="25"
                color="white"
                >mdi-arrow-right</v-icon
              >
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                class="ma-2"
                size="25"
                color="white"
                >mdi-arrow-left</v-icon
              >
            </template>
            <!-- slider control -->
            <v-fade-transition>
              <div
                class="d-flex flex-column justify-center align-center py-6 px-10"
                style="position: absolute; z-index: 1; bottom: 0; width: 100%"
              >
                <div class="d-flex">
                  <div
                    v-for="(slide, index) in slider_item[0].path"
                    :key="index"
                    :class="[
                      'rounded-circle',
                      current_item == index && 'primary',
                    ]"
                    style="
                      width: 12px;
                      height: 12px;
                      margin: 4px;
                      border: 1px solid black !important;
                    "
                  ></div>
                </div>
              </div>
            </v-fade-transition>
            <!-- slider control end -->
          </v-carousel>
        </v-col>
      </v-row>
      <v-col class="pa-10 flex-grow-0 mt-5" v-if="slider_item.length == 0">
        <v-img  :src="$getImage(main_image)"> </v-img>
      </v-col>
    </v-responsive>
  </div>
</template>

<script>
export default {
  props: {
    imagesForSlider: {
      required: true,
    },
    mainImage: {
      required: true,
    },

  },
  data: () => ({
    slider_item: [],
    current_item: 0,
    main_image: "",
  }),
  watch: {
    imagesForSlider() {
      this.slider_item = this.imagesForSlider;
    },
  },
  mounted() {
    for (
      let index = 0;
      index < this.mainImage.product_variations.length;
      index++
    ) {
      const element = this.mainImage.product_variations[index];
      if (element.product_images.length > 0) {
        this.main_image = element.product_images[0].path;
        return;
      }
    }

    this.slider_item = this.imagesForSlider;
  },
};
</script>