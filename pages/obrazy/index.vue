<template>
    <v-container>
        <v-toolbar color="transparent" flat>
            <v-tabs
                v-model="tab"
            >
                <v-spacer/>
                <v-tab>Wszystkie</v-tab>
                <v-tab>Od ręki</v-tab>
                <v-tab>Na zamówienie</v-tab>
                <v-spacer/>
            </v-tabs>
        </v-toolbar>

        <v-row>
            <v-col                    
            v-for="(painting,i) in sortedPaintings"
            :key="i"
            cols="12"
            >
                <v-card
                    class="d-flex justify-space-between"
                >
                    <div class="d-flex flex-column justify-space-between">
                        <v-card-title class="headline">{{painting.title}}</v-card-title>

                        <v-card-subtitle>{{painting.description}}</v-card-subtitle>
                        <v-card-text :class="painting.availability === 'AVAILABLE' ? 'available' : 'not-available'">
                            {{painting.availability === 'AVAILABLE' ? 'Dostępny od ręki' : 'Na zamówienie'}}
                        </v-card-text>
                        <v-card-actions>
                        <v-btn text @click="editPainting(painting.id)">
                            Edytuj
                        </v-btn>
                        <v-btn text color="red" class="justify-self-end" @click="assignDelete(painting.id)">
                            Usuń
                        </v-btn>
                        </v-card-actions>
                    </div>
                    <v-img v-if="painting.mainImage" class="ma-5" contain max-height="10rem" max-width="10rem" :src="painting.mainImage.small"/>
                </v-card> 
            </v-col>
        </v-row>
        <v-btn
            fab
            large
            class="fab"
            color="indigo darken-4"
            light
            elevation="12"
            to="/obrazy/nowy"
        >
            <v-icon large color="white">mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import {ARE_U_SURE} from '~/constants/messages';

export default {
    data() {
        return {
            tab: null,
            dialog: false,
            deletePaintingId: -1,
            sortedPaintings: []
        }
    },
    methods:{
        editPainting(id) {
            this.$router.push(`/obrazy/${id}`);
        },
        sendDelete() {
            this.$store.dispatch('paintings/delete', this.deletePaintingId)
                .then(() => {
                    this.$store.dispatch('paintings/getAll').then(() => {
                        this.sortedPaintings = this.paintings;
                    });
                });
        },
        assignDelete(id) {
            this.deletePaintingId = id;
            this.$modal.showMessage({message: ARE_U_SURE, 
                action: {title: 'Usuń' , callback: this.sendDelete}});
        }
    },
    computed: {
        ...mapGetters('paintings', [
            'paintings'
        ])
    },
    watch: {
        tab: function (val) {
            switch(val) {
                case 0:
                    this.sortedPaintings = this.paintings;
                    break;
                case 1:
                    this.sortedPaintings = this.paintings.filter(painting => painting.availability === 'AVAILABLE');
                    break;
                case 2:
                    this.sortedPaintings = this.paintings.filter(painting => painting.availability === 'TO_ORDER');
                    break;
            }
        }
    },
    mounted() {
        this.$store.dispatch('paintings/getAll').then(()=>{
            this.sortedPaintings = this.paintings;
        })
    },
}
</script>

<style lang="scss" scoped>
    .available {
        color: yellowgreen;
    }

    .not-available {
        color: rgb(255, 73, 246);
    }

    .fab {
        position: fixed;
        right: 2rem;
        bottom: 2rem;
    }
</style>