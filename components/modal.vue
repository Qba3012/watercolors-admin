<template>
    <v-dialog
        v-model="show"
        persistent
        max-width="310"
    >
        <v-card>
            <v-card-title>
                {{ message }}
            </v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red"
                text
                @click="executeCallback"
            >
                {{ action.title }}
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="show = false"
            >
                Anuluj
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            message: '',
            action: {
                title: '',
                callback: function (){}
            }
        }
    },
    methods: {
        executeCallback() {
            this.action.callback();
            this.show = false;
        }
    },
    created () {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'dialog/showMessage') {
                this.show = true;
                this.message = state.dialog.message;
                this.action = state.dialog.action;
            }
        })
    }
}
</script>