<template>
  <v-app>
    <v-row class="error-main">
      <v-col cols="6" class="ma-auto text-center">
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
        <NuxtLink to="/">
          Strona główna
        </NuxtLink>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import {NOT_FOUND, OTHER_ERROR} from '~/constants/messages';

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: NOT_FOUND,
      otherError: OTHER_ERROR
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style lang="scss" scoped>
  .error-main {
      background-image: linear-gradient(to left, #ffffff34,#ffffff34), url("/img/error.png"), url("/img/background.jpg");
      background-size: cover;
  }
</style>