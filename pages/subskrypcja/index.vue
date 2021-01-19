<template>
    <v-row class="d-flex justify-center">
        <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
            <h2>Liczba subskrybentów: {{ subscribers.length }}</h2>
            <v-text-field
                v-model="filter"
                label="Filter"
                solo
                @input="search"
            >
                <template v-slot:append leave-absolute>
                    <v-icon>
                        mdi-magnify
                    </v-icon>
                </template>
            </v-text-field>
          </v-col>
        <v-col cols="12"
        v-for="(user,i) in filteredSubscribers"
        :key=i
        >
            <v-sheet
                min-height="50"
                color="transparent"
                class="fill-height"
            >
                <v-lazy
                    v-model="isVisible[i]"
                    :options="{
                    threshold: 1
                    }"
                    class="fill-height"
                    transition="fade-transition"
                >
                    <v-card
                        class="d-flex justify-space-between"
                    >
                        <div class="d-flex flex-column justify-space-between">
                            <v-card-title>{{user.email}}</v-card-title>
                            <v-card-subtitle>{{getDate(user.createDate)}}</v-card-subtitle>
                        </div>
                            <v-btn color="red" class="align-self-center mr-4 d-flex flex-column" @click="setDelete(user.id)">
                                <v-icon>
                                    mdi-close
                                </v-icon>
                                <h5>Usuń</h5>
                            </v-btn>
                    </v-card> 
                </v-lazy>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import Subscriber from '~/models/Subscriber';
import { mapGetters } from "vuex";
import {ARE_U_SURE} from '~/constants/messages';

export default {
    data() {
        return {
            filter: '',
            delete: '',
            isVisible: [],
            filteredSubscribers: []
        }
    },
    methods: {
        getDate(date) {
            const regex = /\.\S+Z/;
            let dateTime = date.toString().replace('T',' ')
            return 'Zapisano: ' + dateTime.replace(regex,'');
        },
        setDelete(id) {
            this.delete = id;
            this.$modal.showMessage({message: ARE_U_SURE, 
                action: {title:'Usuń', callback: this.deleteSubscriber}});            
        },
        deleteSubscriber() {
            this.$store.dispatch('newsletter/delete', this.delete)
                .then(() => this.$store.dispatch('newsletter/getAll')
                    .then(() => {
                        this.filteredSubscribers = this.subscribers;
                    })
                );
        },
        search() {
            this.filteredSubscribers = this.subscribers.filter(u => u.email.startsWith(this.filter)); 
        }
    },
    mounted(){
        this.isVisible = new Array(this.subscribers?.length).fill(false);
        this.filteredSubscribers = this.subscribers;
    },
    computed: {
        ...mapGetters('newsletter', [
            'subscribers'
        ])
    },
    async asyncData({app}) {
        await app.store.dispatch('newsletter/getAll');
    }
}
</script>