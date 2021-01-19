<template>
    <v-form ref="form">
        <v-row>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6" class="mx-auto">
                <h1>Wybierz formę: </h1>
                <v-select
                    v-model="template"
                    :items="templates"
                    @change="selectHtml"
                    name="template"
                    item-text="name"
                    return-object
                    label="Formy"
                    solo
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col v-if="template" :cols="$vuetify.breakpoint.mobile ? 12 : 6" class="mx-auto">
                <v-text-field
                    v-model="subject"
                    solo
                    required
                    placeholder="Temat"
                    hint="Temat"
                    :rules="NO_EMPTY_RULE"
                />
            </v-col>
        </v-row>        
        <v-row>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6" class="mx-auto" v-for="(data,i) in template.data" :key="i">
                <h2>Uzupełnij dane:</h2>
                <v-row>
                    <v-col cols="2" class="d-flex justify-end">
                        <h3 class="indigo--text">{{data.tag}}</h3>
                    </v-col>
                    <v-col cols="10">
                        <v-textarea
                            v-model="data.value"
                            solo
                            placeholder="Dane"
                            :rules="NO_EMPTY_RULE"
                            required
                            @change="renderHtml(data)"
                        >
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-if="template">
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
        <v-row v-if="template">
            <v-col cols="12" class="template" :style="{zoom:`${zoom}%`}">
                <div v-html="html"></div>
            </v-col>
        </v-row>
        <v-row v-if="template">
            <v-col cols="6">
                <v-btn block color="indigo" class="white--text" @click="test">
                    Testuj
                </v-btn> 
            </v-col>
            <v-col cols="6">
                <v-btn block color="green" class="white--text" @click="confirmSendNewsletter">
                    Wyślij do wszystkich
                </v-btn> 
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import {NO_EMPTY_RULE} from '~/utils/validators';
import { mapGetters } from "vuex";
import TemplateData from '~/models/TemplateData';
import NewsletterRequest from '~/models/NewsletterRequest';
import {DATA_MISSING, SENT, ARE_U_SURE} from '~/constants/messages';

export default {
    data() {
        return {
            html: '',
            zoom: 100,
            template: '',
            subject: '',
            dialog: false
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
        selectHtml() {
            this.html = this.template.html;
            this.renderHtml();
        },
        test() {
            if(this.template && this.$refs.form.validate()) {
                const templateName = this.template.name;
                const templateData = this.template.data.map(data => new TemplateData(data));
                this.$store.dispatch('templates/test', {templateName, templateData})
                    .then(() => this.$notifier.showMessage({message: SENT, success: true}))
            } else {
                this.$notifier.showMessage({message: DATA_MISSING});
            }
        },
        confirmSendNewsletter() {
            this.$modal.showMessage({message: ARE_U_SURE, 
                action: {title:'Send', callback: this.sendNewsletter}});
        },
        sendNewsletter() {
            if(this.template && this.$refs.form.validate()) {
                const newsletterRequest = new NewsletterRequest({
                    data: this.template.data,
                    subject: this.subject,
                    template: this.template.name,
                })
                this.$store.dispatch('newsletter/send', newsletterRequest)
                    .then(() => this.$notifier.showMessage({message: SENT, success: true}));
            } else {
                this.$notifier.showMessage({message: DATA_MISSING});
            }
        }
    },
    computed: {
        ...mapGetters('templates', [
            'templates'
        ])
    },
    created() {
        this.NO_EMPTY_RULE = NO_EMPTY_RULE;
    },
    async asyncData({ app }) {
        await app.store.dispatch('templates/getAll');
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
</style>