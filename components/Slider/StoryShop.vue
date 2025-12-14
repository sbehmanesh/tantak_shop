<template>
  <div>
    <v-card
      class="d-flex transparent mt-4 px-4 elevation-0"
      style="overflow-x: auto; overflow-y: hidden !important"
    >
      <v-col v-for="(x, i) in story" :key="i" cols="3" class="flex-column justify-center">
        <v-avatar
          size="75"
          class="d-flex align-center justify-center pa-1"
          style="
            background: linear-gradient(45deg, #833ab4, #fd1d1d, #f56040, #fcaf45);
            border-radius: 100%;
          "
        >
          <v-avatar size="65">
            <v-img contin :src="x.value"></v-img>
          </v-avatar>
        </v-avatar>
        <div class="text-center">
          <small>
            {{ x.text }}
          </small>
        </div>
      </v-col>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      story: [
        { text: "استایل جذاب", value: "/image/blog1.jpg" },
        { text: "مبلمان", value: "/image/blog1.jpg" },
        { text: "text sdcsdcs1 ", value: "/image/blog1.jpg" },
        { text: "انواع کرم", value: "/image/blog1.jpg" },
        { text: "نظم دهنده", value: "/image/blog1.jpg" },
        { text: "انواع بوت", value: "/image/blog1.jpg" },
        { text: "مکمل دارویی", value: "/image/blog1.jpg" },
      ],
    };
  },
};
</script>
