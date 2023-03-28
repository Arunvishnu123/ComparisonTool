<template>
    <Menubar :model="items">
        <template #start>
            <div class="p-inputgroup flex-1">
                <Button class="parameterButton" icon="pi pi-bars" @click="visible2 = true" />
                <div class="space"></div>
                <h1 class="header-name">Language Comparison Tool</h1>
                <div class="card flex justify-content-center">
                    <Sidebar p-sidebar-sm v-model:visible="visible2">
                        <Button class="parameterButton" label="Popularity Checker" icon="pi pi-plus"
                            @click="visible = true" />
                    </Sidebar>
                </div>
            </div>
        </template>
        <template #end>
            <div class="p-inputgroup flex-1">
                <Button class="parameterButton" label="Parameter" icon="pi pi-plus" @click="visible = true" />
                <div class="space"></div>
                <Button class="valueButton" label="Value" icon="pi pi-plus" @click="addValues()" />
                <div class="space"></div>
                <Button class="valueButton" label="Generate" icon="pi pi-sign-out" @click="generate()" />
            </div>
            <Dialog v-model:visible="visible" modal header="Add new Parameter" :style="{ width: '50vw' }">
                <div class="card p-fluid">
                    <Chips v-model="value" />
                </div>

                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="visible = false" text />
                    <Button label="Yes" icon="pi pi-check" @click="checkForm()" autofocus />
                </template>

            </Dialog>
            <Dialog v-model:visible="visibleValue" modal header="Add New Value" :style="{ width: '50vw' }">
                <div class="card p-fluid">
                    <Dropdown v-model="selectedParameter" :options="parameters" optionLabel="name"
                        placeholder="Select the Parameter" class="w-full md:w-14rem" />
                    <Chips v-model="parameterValue" />
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="visibleValue = false" text />
                    <Button label="Yes" icon="pi pi-check" @click="addparameterValues()" autofocus />
                </template>
            </Dialog>
        </template>
    </Menubar>
</template>


<script>
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import Chips from 'primevue/chips';
import Dropdown from 'primevue/dropdown';
import { ref } from "vue";
import axios from 'axios';
import Sidebar from 'primevue/sidebar';
import store from "../store/index";
import router from "../router/index"


export default {
    components: {
        Menubar,
        Dialog,
        Chips,
        Button,
        Dropdown,
        Sidebar,
      

    },
    data: () => ({
        visible: false,
        visible2: false,
        value: null,
        vuecharts: false,
        visibleValue: false,
        selectedParameter: ref(),
        parameterValue: null,
    
        cities: ref([
            { name: 'Expressivity', code: 'NY' },
            { name: 'Constraints', code: 'RM' },
            { name: 'Mathematical Constraints', code: 'LDN' },
            { name: 'Logical Connectives', code: 'IST' },
            { name: 'Quantifiers', code: 'PRS' }
        ]),

        parameters: ref([]),
        jsonData: {
            name: 'John Doe',
            age: 30,
            email: 'johndoe@example.com'
        }
    }),
    methods: {
        async checkForm() {
            console.log("test");
            this.visible = false;
            console.log(this.value);
            await axios.post("http://localhost:4000/api/parameter", {
                parameter: this.value
            }).then((response) => {
                console.log(response)
            })
        },

        async addValues() {
            this.visibleValue = true
            await axios.get("http://localhost:4000/api/getparameters").then((response => {
                console.log(response.data)
                for (let i of response.data.parameter) {
                    let test = {
                        name: i
                    }
                    this.parameters.push(test)
                }
            }))
        },
        async addparameterValues() {
            console.log("test");
            this.visibleValue = false;
            console.log(this.parameterValue);
            await axios.post("http://localhost:4000/api/parametervalue", {
                name: this.selectedParameter.name,
                values: this.parameterValue
            }).then((response) => {
                console.log(response)
            })
        },


        generate() {
            console.log(store.state.selectedKnowledge)


            router.push("/generate")

            console.log(this.chartData)
        }
    }

}

</script>

<style>
h1 {
    margin: 0px;
    padding: 0px;
    font-family: BebasNeue;
    color: #777878;
    font-size: 20pt;
    line-height: 20px;
}

.close-heading {
    margin: 0px;
    padding: 0px;
}

.close-heading p {
    margin: 0px;
    padding: 0px;
}

.valueButton {
    margin-left: 20px;
}

.parameterButton {
    margin-right: 10px;
}

.space {
    width: 5px;
}

.header-name {
    margin-top: 10px;
}
</style>