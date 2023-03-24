<template>
    <Menubar :model="items">
        <template #start>
            <h1>Language Comparison Tool</h1>
        </template>
        <template #end>
            <Button class="parameterButton" label="Parameter" icon="pi pi-plus" @click="visible = true" />
            <Button class="valueButton" label="Value" icon="pi pi-plus" @click="visibleValue = true" />
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
                    <Dropdown v-model="selectedParameter" :options="cities" optionLabel="name"
                        placeholder="Select the Parameter" class="w-full md:w-14rem" />
                    <Chips v-model="value" />
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="visibleValue = false" text />
                    <Button label="Yes" icon="pi pi-check" @click="visibleValue = false" autofocus />
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


export default {
    components: {
        Menubar,
        Dialog,
        Chips,
        Button,
        Dropdown

    },
    data: () => ({
        visible: false,
        value: null,
        visibleValue: false,
        selectedParameter: ref(),
        cities: ref([
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ]),
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
            console.log(this.value[0]);
           const serverUrl = "http://localhost:3000/parameter"
            await axios
                .post(serverUrl, {
                    name:this.value[0]
                })
                .then((response) => {
                       console.log(response)
                });



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
</style>