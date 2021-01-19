<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      app
      disable-resize-watcher
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in MENU_ITEMS"
          :key="i"
          :to="item.to"
          @click.stop="drawer = !drawer"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      color="indigo"
      class="white--text"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"/>
      <h3 class="pl-10" @click="$router.push('/')">Moje Akwarele - admin panel</h3>
      <v-spacer/>
      <v-icon v-if="!loggedIn" color="white" @click="login">
        mdi-lock-outline
      </v-icon>
      <v-icon v-if="loggedIn" color="white" @click="logout">
        mdi-lock-check-outline
      </v-icon>
    </v-app-bar>
    <v-main class="main">
      <v-container @click="drawer = false">
        <nuxt />
      </v-container>
    </v-main>
    <snackbar/>
    <modal/>
  </v-app>
</template>

<script>
import {MENU} from '~/constants/menu';
import Snackbar from '~/components/snackbar';
import Modal from '~/components/modal';

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      loggedIn: false,
      home: '/',
    }
  },
  methods: {
    login() {
        this.$auth.loginWith('keycloak');
    },
    logout() {
      this.$auth.logout();
    }
  },
  created() {
    this.MENU_ITEMS = MENU;
  },
  mounted() {
    this.loggedIn = this.$auth.loggedIn;
  },
  components: {
    Snackbar,
    Modal
  }
}
</script>