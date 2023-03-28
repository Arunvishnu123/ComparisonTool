<template>
    <div class="test">
        <div v-for="langauge in $store.state.selectedKnowledge.data" :key="langauge.id" id="language-div">
            <div class="language-div">
                <Card style="width: 21em">

                    <template #title>
                        <div class="p-inputgroup flex-1">
                            <div class="text-space"> {{ langauge.knolwedgeName }} </div>
                            <Button icon="pi pi-times" severity="danger" text raised rounded aria-label="Cancel" />
                        </div>
                    </template>

                    <template #content>
                        <Tag>{{ langauge.parameter
                        }}</Tag>
                        <div class="space2"></div>
                        <div class="p-inputgroup flex-1">
                            <Tag value="Value Selection"></Tag>
                            <MultiSelect v-model="langauge.selectedValues" :options="langauge.values" optionLabel="name"
                                placeholder="Select Values" :maxSelectedLabels="3" class="w-full md:w-20rem" />
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>



<script>
import Tag from 'primevue/tag';
import Card from 'primevue/card';
import axios from 'axios';
import { ref } from "vue";
import Button from 'primevue/button';
import store from "../store/index"
import MultiSelect from 'primevue/multiselect';
export default {
    components: {
        Card,
        Tag,
        MultiSelect,
        Button


    },
    data: () => ({
        selectedParameter: ref(),
        selectedCities: null,
        selectedCity: null,

        jsonData: {
            name: 'John Doe',
            age: 30,
            email: 'johndoe@example.com'
        },
        arr: []
    }),

    methods: {
        test() {
            this.arr.push({ first: this.name, lastn: this.last, index: this.index, grade: this.grade });
            console.log(1);
            const data = JSON.stringify(this.arr)
            window.localStorage.setItem('arr', data);

        },

        test21() {
            console.log(JSON.parse(window.localStorage.getItem('arr')))
        },


    },

    mounted() {
        axios.get("http://localhost:4000/api/getknowledge").then((response => {

            store.state.selectedKnowledge = response.data
        }))

        console.log("djuhfuodfu", store.state.selectedKnowledge)
    }

}
</script>

<style>
#language-div {
    margin-top: 20px;
}

.space1 {
    margin-left: 240px;
}

.space2 {
    height: 10px;
}

.test {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

}

.language-div {
    margin-right: 15px;
}

.text-space{    
    width:280px
}
</style>