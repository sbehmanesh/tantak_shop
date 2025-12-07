<template>
  <v-bottom-navigation fixed class="justify-space-between px-4">
    <v-btn
      value="profile"
      active-class="primary--text"
      @click="$router.push('/auth/login')"
    >
      <span>پروفایل</span>
      <v-icon size="28">mdi-account-outline</v-icon>
    </v-btn>
    <v-btn value="store" active-class="primary--text" @click="$router.push('/product')">
      <span>فروشگاه</span>
      <v-icon size="28">mdi-store-outline</v-icon>
    </v-btn>

    <v-btn value="main" active-class="primary--text" @click="$router.push('/')">
      <span>صفحه اصلی</span>
      <v-icon size="28">mdi-home-outline</v-icon>
    </v-btn>

    <v-btn
      @click="$router.push('/profile/orders')"
      value="basket"
      active-class="primary--text"
    >
      <span>سبد خرید</span>
      <v-icon size="28">mdi-cart-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
