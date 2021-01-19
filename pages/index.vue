<template>
  <v-row class="d-flex justify-center">
    <v-col cols="4"
    v-for="(item,i) in MENU_ITEMS"
    :key=i
    >
      <v-card :height="$vuetify.breakpoint.xs ? '10rem' : '20rem'" class="d-flex flex-column justify-center align-center"  @click="redirect(item.to)">
        <v-icon :size="$vuetify.breakpoint.xs ? '5rem' : '10rem'" color="black">
          {{ item.icon }}
        </v-icon>
        <v-card-title class="pa-1">{{item.title}}</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {MENU} from '~/constants/menu';
import {LOGIN_REQUIRED} from '~/constants/messages';

export default {
  methods: {
    redirect(route) {
      if(!this.$auth.loggedIn) {
        this.$notifier.showMessage({message: LOGIN_REQUIRED});
      } else {
        this.$router.push(route);
      }
    }
  },
  created() {
    this.MENU_ITEMS = MENU;
  }
}
</script>