<template>
    <video-bg :sources="['/video/background.mp4']" img="/img/background.jpg">
        <v-row class="hero">
            <v-col :cols="$vuetify.breakpoint.mobile ? 12: 6" class="ma-auto d-flex flex-column align-center">
                <h1 class="text-center text-md-h1 text-h4 white--text">Moje akwarele</h1>
                    <v-btn
                        class="ma-9"
                        :x-large="!$vuetify.breakpoint.mobile"
                        outlined
                        color="white"
                        @click="login"
                        >
                        Zaloguj się
                    </v-btn>
            </v-col>
        </v-row>
    </video-bg>

</template>

<script>
export default {
    layout: 'empty',
    methods: {
        login() {
            this.$auth.loginWith('keycloak');
        }
    }
}
</script>

<style lang="scss" scoped>
    .hero {
        height: 100%;

        &__heading {
            font-family: 'Cormorant SC', serif;
        }
    }
</style>