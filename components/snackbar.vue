<template>
    <v-snackbar
        v-model="show"
        :color= "success ? 'lime ligthen-1' : 'orange darken-2'"
        :timeout="3000"
    >
            {{ message }}
        <template v-slot:action="{ attrs }">
            <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="show = false"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            message: '',
            success: false
        }
    },
    created () {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'snackbar/showMessage') {
                this.message = state.snackbar.message
                this.success = state.snackbar.success
                this.show = true
            }
        })
    }
}
</script>