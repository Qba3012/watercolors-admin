<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <h1>Dostępne formy</h1>
            </v-col>
            <v-col cols="4" class="d-flex align-center justify-end">
                <v-btn
                    fab
                    x-small
                    color="indigo darken-4"
                    light
                    elevation="12"
                    to="/formy/nowa"
                >
                    <v-icon x-small color="white">mdi-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="mx-auto">
                <v-expansion-panels focusable>
                    <v-expansion-panel
                        v-for="(template,i) in templates"
                        :key="i"
                    >
                    <v-expansion-panel-header @click="selectHtml(template)">{{ template.name }}</v-expansion-panel-header>
                    <v-expansion-panel-content >
                        <v-slider
                            v-model="zoom"
                            thumb-label
                            append-icon="mdi-magnify-plus-outline"
                            prepend-icon="mdi-magnify-minus-outline"
                            max=100
                            min=10
                            class="my-5"
                        />
                        <div v-html="html" class="template" :style="{zoom:`${zoom}%`}"></div>
                        <v-row v-if="template">
                            <v-col cols="9"/>
                            <v-col cols="3">
                                <v-btn block color="red" class="white--text" @click="removeTemplate">
                                    x Usuń
                                </v-btn> 
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8">
                <h1>Dostępne zdjęcia</h1>
            </v-col>
            <v-col cols="4" class="d-flex align-center justify-end">
                <v-btn
                    fab
                    x-small
                    @click="pickFile"
                    color="indigo darken-4"
                    light
                    elevation="12"
                    id="file"
                >
                    <v-icon x-small color="white">mdi-plus</v-icon>
                </v-btn>
                <input style="display: none" type="file" id="file" ref="file" @change="handleFileUpload"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" v-for="(img,i) in images" :key="i">
                <v-hover>
                    <template v-slot:default="{ hover }">
                        <v-card hover>
                            <v-img :src="img.url">
                                <v-fade-transition>
                                    <v-overlay
                                        absolute
                                        v-if="hover"
                                    >
                                        <div
                                            @click="removeImage(img.name)"
                                        >
                                            <v-icon color="white" large>
                                                mdi-close
                                            </v-icon>
                                            <h2 class="overline">Usuń</h2>
                                        </div>
                                    </v-overlay>
                                </v-fade-transition>
                            </v-img>
                            <v-card-text>Nazwa: {{img.name}}</v-card-text>
                            <v-card-text>Url: {{img.url}}</v-card-text>
                        </v-card>
                    </template>
                </v-hover>
            </v-col>
        </v-row>
        <v-overlay v-if="loading">
                        <v-progress-circular
            :size="70"
            :width="7"
            color="indigo"
            indeterminate
            ></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { ARE_U_SURE, PHOTO_ADDED, FORM_REMOVED, IMG_REMOVED } from '~/constants/messages';
export default {
    data() {
        return {
            html: '',
            zoom: 50,
            template: '',
            image: '',
            loading: false,
        }
    },
    methods: {
        renderHtml() {
            this.template.data.forEach(data => {
                let prerender = this.template.html;
                if(data.value) {
                    const regex = new RegExp('<' + data.tag + '>.*<\\/' + data.tag + '>','g');
                    prerender = prerender.replaceAll(regex, data.value);
                } else {
                    const regex = new RegExp('<' + data.tag + '>.*<\\/' + data.tag + '>','g');
                    prerender = prerender.replaceAll(regex, `<h2 style="color:blue">[${data.tag}]</h2>`);
                }
                this.html = prerender;
            });
        },
        removeImage(img) {
            this.image = img;
            this.$modal.showMessage({message: ARE_U_SURE, 
                action: {title:'Usuń', callback: this.deleteImage}});
        },
        removeTemplate() {
            this.$modal.showMessage({message: ARE_U_SURE, 
                action: {title:'Usuń', callback: this.deleteTemplate}});
        },
        selectHtml(template) {
            this.template = template;
            this.html = template.html;
            this.renderHtml();
        },
        handleFileUpload(e) {
            const files = e.target.files;
            if(files != undefined && files.length > 0) {
                this.loading = true;

                let formData = new FormData();
                formData.append('file', files[0]);

                this.$store.dispatch('newsletterImages/create', formData)
                    .then(() => {
                        this.$store.dispatch('newsletterImages/getAll');
                        this.$notifier.showMessage({message: PHOTO_ADDED, success: true});
                    })
                    .finally(() => this.loading = false);
            }
        },
        pickFile() {
            this.$refs.file.click();
        },
        deleteTemplate() {
            if(this.template) {
                this.$store.dispatch('templates/delete', this.template.name)
                    .then(() => {
                        this.$store.dispatch('templates/getAll');
                        this.$notifier.showMessage({message: FORM_REMOVED, success: true});
                        this.template = null;
                    })
            }
        },
        deleteImage() {
            if(this.image) {
                this.$store.dispatch('newsletterImages/delete', this.image)
                    .then(() => {
                        this.$store.dispatch('newsletterImages/getAll');
                        this.$notifier.showMessage({message: IMG_REMOVED, success: true});
                    })
            }
        }
    },
    computed: {
        ...mapGetters('templates', [
            'templates'
        ]),
        ...mapGetters('newsletterImages', [
            'images'
        ])
    },
    async asyncData({ app }) {
        await app.store.dispatch('templates/getAll');
        await app.store.dispatch('newsletterImages/getAll');
    },
}
</script>

<style lang="scss" scoped>
    .template {
        background-color: #fff;
        border: 1px solid #000;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .fab {
        position: fixed;
        right: 2rem;
        bottom: 2rem;
    }
</style>