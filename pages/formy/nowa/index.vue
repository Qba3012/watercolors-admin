<template>
    <v-form ref="form">
        <v-row>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6" class="mx-auto">
                <h1>Wpisz nazwę formy:</h1>
                <v-text-field
                    solo
                    v-model="template.name"
                    placeholder="Nazwa"
                    hint="Nazwa"
                    :rules="NO_EMPTY_RULE"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6" class="mx-auto">
                <h3>Podaj tagi</h3>
                <v-combobox
                    v-model="template.data"
                    hint="Tagi"
                    label="Tagi"
                    solo
                    multiple
                    chips
                />
            </v-col>
        </v-row>        
        <v-row>
            <v-col cols="12" class="mx-auto">
                <h3>Html formy</h3>
                <v-textarea
                    v-model="template.html"
                    solo
                    placeholder="html"
                    :rules="NO_EMPTY_RULE"
                    required
                    @change="renderHtml"
                >
                </v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6" class="mx-auto">
                <v-slider
                v-model="zoom"
                thumb-label
                append-icon="mdi-magnify-plus-outline"
                prepend-icon="mdi-magnify-minus-outline"
                max=100
                min=10
                />
            </v-col>
        </v-row>
        <v-row>
            <h3>Podgląd</h3>
            <v-col cols="12" class="template" :style="{zoom:`${zoom}%`}">
                <div v-html="html"></div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn block color="green" class="white--text" @click="saveTemplate">
                    Zapisz formę
                </v-btn> 
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import Template from '~/models/Template';
import {NO_EMPTY_RULE} from '~/utils/validators';
import {NEW_FORM_CREATED, DATA_MISSING} from '~/constants/messages';

export default {
    data() {
        return {
            html: '',
            zoom: 100,
            template: {
                name: '',
                html: '',
                data: [],
            }
        }
    },
    methods: {
        renderHtml() {
            this.template.data.forEach(data => {
                let prerender = this.template.html;
                const regex = new RegExp('<' + data + '>.*<\\/' + data + '>','g');
                prerender = prerender.replaceAll(regex, `<h2 style="color:blue">[${data}]</h2>`);
                this.html = prerender;
            });
        },
        saveTemplate() {
            if(this.$refs.form.validate()) {
                let data = [];
                this.template.data.forEach(el => {
                    data.push({tag: el});
                });
                this.template.data = data;

                this.$store.dispatch('templates/create', new Template(this.template))
                    .then(() => this.$notifier.showMessage({message: NEW_FORM_CREATED, success: true}));
            } else {
                this.$notifier.showMessage({message: DATA_MISSING});
            }
        }
    },
    created() {
        this.NO_EMPTY_RULE = NO_EMPTY_RULE;
    }
}
</script>

<style lang="scss" scoped>
    .template {
        background-color: #fff;
        border: 1px solid #000;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 200px;
    }
</style>