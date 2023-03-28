<template>
    <div class="add-knowledge-class">
        <Menubar :model="items">
            <template #start>
                <div class="p-inputgroup flex-1">
                    <h1 class="select-language-text">Selected language</h1>
                    <InputText class="ok-button" v-model="value1" placeholder="Enter Language Name" />
                    <Dropdown v-model="$store.state.selectedParameter" :options="parameters1" optionLabel="name"
                        placeholder="Select the parameter" class="w-full md:w-14rem" />
                    <br />
                    <Button label="Ok" icon="pi pi-check" @click="addNewKnowledge()" autofocus />
                </div>
            </template>
        </Menubar>
        <LanguageComponent />
    </div>
</template>

<script>

import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import LanguageComponent from "./LanguageComponent.vue"
import { ref } from "vue";
import Dropdown from 'primevue/dropdown';
import axios from 'axios';
import store from "../store/index";
export default {
    components: {
        Menubar,
        InputText,
        Button,
        LanguageComponent,
        Dropdown
    },

    watch: {
        input: function () {

            localStorage.setItem('storedData', this.input)

        }
    },

    data: () => ({
        input: null,
        selectedParameter: null,
        cities1: ref([
            { name: 'Univerisal Quantifier', code: 'NY' },
            { name: 'Existential Quantifier', code: 'RM' },
            { name: 'Variables', code: 'LDN' },
            { name: 'Conjunction', code: 'IST' },
            { name: 'Disjunction', code: 'PRS' }
        ]),
        parameters1: ref([]),
        selectedCities: null,

    }),

    mounted() {
        axios.get("http://localhost:4000/api/getparameters").then((response => {
            console.log(response.data)
            for (let i of response.data.parameter) {
                let test = {
                    name: i
                }
                this.parameters1.push(test)
            }
        }))
    },

    methods: {
        addNewKnowledge() {

            // axios.get("http://localhost:4000/api/getparameter/" + store.state.selectedParameter.name).then((response => {
            //     console.log(response.data)
            //     let obj = {}
            //     for (let i of response.data) {
            //         obj["name"] = i
            //         store.state.selectedValues.push(obj)
            //     }

            // }))

            console.log("testetst")

            axios.post("http://localhost:4000/api/addknowledge", {
                knolwedgeName: this.value1,
                parameter: store.state.selectedParameter.name,
            }).then((response) => {
                console.log("test",response)
              
            })

            axios.get("http://localhost:4000/api/getknowledge").then((response => {
                    console.log("djuhfuodfu", response.data)
                    store.state.selectedKnowledge = response.data                   
                }))


           
        }
    }
}
</script>

<style>
.add-knowledge-class {
    padding-top: 20px;
}

.select-language-text {
    padding-right: 40px;
    padding-top: 9px;
}

.ok-button {
    padding-right: 20px;
}
</style>