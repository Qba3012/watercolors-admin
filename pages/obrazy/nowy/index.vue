<template>
    <v-container fluid>
        <v-row>
            <v-col                    
                :cols="$vuetify.breakpoint.mobile ? 12 : 9"
                class="mx-auto"
            >
                <h1>Nowy obraz</h1>
                <v-stepper class="mt-10" alt-labels :value="step">
                    <v-stepper-header>
                        <v-stepper-step class="pa-3" step="1" :complete="step > 1">
                            Podaj dane
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step class="pa-3" step="2" :complete="step > 2">
                            Dodaj zdjęcia
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step class="pa-3" step="3" :complete="step > 3">
                            Zapisz obraz
                        </v-stepper-step>
                    </v-stepper-header>
                </v-stepper>
            </v-col>
        </v-row>
        <v-form ref="form" v-if="step === 1">
            <v-row class="mt-10"> 
                <v-col :cols="$vuetify.breakpoint.mobile ? 2 : 3" class="d-flex align-start pa-1" :class="$vuetify.breakpoint.mobile ? 'justify-start' : 'justify-end'">
                    <p class="ma-0">Tytuł:</p>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12: 6">
                    <v-text-field
                        v-model="painting.title"
                        solo
                        required
                        placeholder="Tytuł"
                        hint="Tytuł"
                        :rules="NO_EMPTY_RULE"
                    />
                </v-col>
            </v-row>
            <v-row> 
                <v-col :cols="$vuetify.breakpoint.mobile ? 2 : 3" class="d-flex align-start pa-1" :class="$vuetify.breakpoint.mobile ? 'justify-start' : 'justify-end'">
                    <p class="ma-0">Opis:</p>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12: 6">
                    <v-textarea
                        solo
                        v-model="painting.description"
                        required
                        placeholder="Opis"
                        label="Opis"
                        hint="Opis"
                        :rules="NO_EMPTY_RULE"
                    /> 
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="$vuetify.breakpoint.mobile ? 2 : 3" class="d-flex align-start pa-1" :class="$vuetify.breakpoint.mobile ? 'justify-start' : 'justify-end'">
                    <p class="ma-0">Kategoria:</p>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12: 6">
                    <v-select
                        :items="CATEGORIES"
                        v-model="painting.category"
                        label="Kategoria"
                        solo
                        hint="Kategoria"
                        :rules="NO_EMPTY_RULE"
                        required
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="$vuetify.breakpoint.mobile ? 2 : 3" class="d-flex align-start pa-1" :class="$vuetify.breakpoint.mobile ? 'justify-start' : 'justify-end'">
                    <p class="ma-0">Kolekcja:</p>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12: 6">
                    <v-text-field
                        solo
                        v-model="painting.collection"
                        placeholder="Kolekcja"
                        hint="Kolekcja"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="$vuetify.breakpoint.mobile ? 2 : 3" class="d-flex align-start pa-1" :class="$vuetify.breakpoint.mobile ? 'justify-start' : 'justify-end'">
                    <p class="ma-0">Tagi:</p>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12: 6">
                    <v-combobox
                        v-model="painting.tags"
                        :items="tags"
                        hint="Tagi"
                        label="Tagi"
                        solo
                        multiple
                        chips
                        :rules="NO_EMPTY_RULE"
                        required
                    />
                </v-col>
            </v-row>  
            <v-row>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3" class="d-flex align-start pa-1" :class="$vuetify.breakpoint.mobile ? 'justify-start' : 'justify-end'">
                    <p class="ma-0">Wymiary:</p>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.mobile ? 6 : 3" class="d-flex justify-center align-start">
                    <v-text-field
                        v-model="painting.width"
                        solo
                        placeholder="Szerokość"
                        hint="Szerokość"
                        :rules="INTEGER_ONLY_RULE"
                        required
                    />
                </v-col>
                <v-col :cols="$vuetify.breakpoint.mobile ? 6 : 3" class="d-flex justify-center align-start">
                    <v-text-field
                        v-model="painting.height"
                        solo
                        placeholder="Wysokość"
                        hint="Wysokość"
                        :rules="INTEGER_ONLY_RULE"
                        requied
                    />
                </v-col>
            </v-row>  
            <v-row>
                <v-col cols="3" class="d-flex align-start pa-1" :class="$vuetify.breakpoint.mobile ? 'justify-start' : 'justify-end'">
                    <p class="ma-0">Cena i dostępność:</p>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4" class="d-flex justify-center align-start">
                    <v-text-field
                        v-model="painting.price"
                        solo
                        :rules="NUMBER_ONLY_RULE"
                        placeholder="Cena"
                        hint="Cena"
                        required
                    >
                    <div class="body-2" slot="append">zł</div>
                    </v-text-field>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.mobile ? 7 : 2" :class="{'mx-auto':$vuetify.breakpoint.mobile}">
                    <v-switch
                        class="mt-2"
                        v-model="available"
                        :label="available ? 'Dostępny od ręki' : 'Na zamówienie'"
                        color="indigo"
                        hide-details
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12: 6" class="mx-auto" :class="{'my-5': $vuetify.breakpoint.mobile}">
                    <v-btn block color="indigo" class="white--text" @click="validateData">
                        Dalej
                    </v-btn> 
                </v-col>
            </v-row>    
        </v-form>
        <div v-if="step === 2">
            <v-row>
                <v-col cols="4" v-for="(img,i) in imagesUrl" :key="i">
                    <v-hover>
                        <template v-slot:default="{ hover }">
                            <v-card height="25vw" hover>
                                <v-img :src="img" height="100%">
                                </v-img>
                                <v-fade-transition>
                                    <v-overlay
                                        absolute
                                        v-if="hover"
                                    >
                                        <div
                                            @click="removeImage(i)"
                                        >
                                            <v-icon color="white" large>
                                                mdi-close
                                            </v-icon>
                                            <h2 class="overline">Usuń</h2>
                                        </div>
                                    </v-overlay>
                                </v-fade-transition>
                                
                            </v-card>
                        </template>
                    </v-hover>
                </v-col>

            </v-row>      
            <v-row>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12: 6" class="mx-auto">
                    <v-btn id="file" block color="indigo" class="white--text" @click="pickFile">
                        + Dodaj zdjęcie
                    </v-btn> 
                    <input style="display: none" type="file" id="file" ref="file" @change="handleFileUpload"/>
                </v-col>
            </v-row>  
            <v-row>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12: 6" class="mx-auto">
                    <v-btn id="file" block color="green" class="white--text" @click="sendData">
                        Zapisz
                    </v-btn> 
                    <input style="display: none" type="file" id="file" ref="file" @change="handleFileUpload"/>
                </v-col>
            </v-row>          
        </div>
        <div v-if="step === 3">
            <v-row>
                <v-col v-if="!completed" :cols="$vuetify.breakpoint.mobile ? 12: 6" class="mx-auto">
                    <h3 class="mt-9">Wysyłanie danych</h3>
                        <v-progress-linear
                            color="indigo accent-4"
                            indeterminate
                            rounded
                            height="6"
                        />
                </v-col>
                <v-col v-if="completed && success" :cols="$vuetify.breakpoint.mobile ? 12: 6" class="mx-auto mt-9 d-flex flex-column align-center">
                    <v-icon color="green" size="10rem">
                        mdi-check-circle
                    </v-icon>
                    <h2>Wysłane</h2>
                </v-col>
                <v-col v-if="completed && !success" :cols="$vuetify.breakpoint.mobile ? 12: 6" class="mx-auto mt-9 d-flex flex-column align-center">
                    <v-icon color="red" size="10rem">
                        mdi-cancel
                    </v-icon>
                    <h2>Błąd. Spróbuj ponownie później.</h2>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import {NO_EMPTY_RULE, NUMBER_ONLY_RULE, INTEGER_ONLY_RULE} from '~/utils/validators';
import DetailedPainting from '~/models/DetailedPainting';
import {CATEGORIES} from '~/constants/categories';
import {DATA_MISSING, ARE_U_SURE} from '~/constants/messages';

    export default {
        data() {
            return {
                painting: {
                },
                imagesUrl: [],
                images: [],
                step: 1,
                available: true,
                remove: -1,
                success: false,
                completed: false,
            } 
        },
        methods: {
            validateData() {
                if(this.$refs.form.validate()){
                    this.painting.availability = this.available ? 'AVAILABLE' : 'TO_ORDER';
                    this.step = 2;
                }
            },
            sendData() {
                if(this.images.length > 0) {
                    this.step = 3;
                    let formData = new FormData();
                    this.images.forEach((image) => {
                        formData.append('file',image);
                    })
                    const painting = new DetailedPainting(this.painting);
                    this.$store.dispatch('paintings/create', {painting, formData})
                        .then(() => {
                            this.success = true;
                        })
                        .finally(() => {
                            this.completed = true;
                            setTimeout(() => {
                                this.$router.push('/obrazy');
                            }, 1000);
                        })    
                } else {
                    this.$notifier.showMessage({message: DATA_MISSING})
                }
            },
            pickFile() {
                this.$refs.file.click();
            },
            handleFileUpload(e) {
                const files = e.target.files;
                if(files[0] !== undefined) {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(files[0]);
                    fileReader.addEventListener('load', () => {
                        this.imagesUrl.push(fileReader.result);
                        this.images.push(files[0]);
                    });
                }
            },
            removeImage(index) {
                this.remove = index;
                this.$modal.showMessage({message: ARE_U_SURE, 
                action: {title:'Usuń', callback: this.handleRemoveImage}});
            },
            handleRemoveImage() {
                this.images.splice(this.remove,1);
                this.imagesUrl.splice(this.remove,1);
            }
        },
        computed: {
            ...mapGetters('tags', [
                'tags'
            ])
        },
        created() {
            this.NO_EMPTY_RULE = NO_EMPTY_RULE;
            this.INTEGER_ONLY_RULE = INTEGER_ONLY_RULE;
            this.NUMBER_ONLY_RULE = NUMBER_ONLY_RULE;
            this.CATEGORIES = CATEGORIES;
        }
    }
</script>