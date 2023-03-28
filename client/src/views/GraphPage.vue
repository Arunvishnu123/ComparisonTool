<template>
    <div>
        <Menubar :model="items">
            <template #start>
                <div class="p-inputgroup flex-1">
                    <h1 class="header-name1">Comparison Graph</h1>
                </div>
            </template>
            <template #end>
                <div class="p-inputgroup flex-1">
                    <Button label="Download" icon="pi pi-times" @click="downloadImage" autofocus />
                    <div class="space-generate"></div>
                    <Button label="Cancel" icon="pi pi-times" severity="danger" @click="home()" autofocus />
                </div>
            </template>
        </Menubar>
        <div ref="myDiv" class="card1">
            <Chart type="bar" :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button';
import Chart from 'primevue/chart';
import { ref } from "vue";
import store from "../store/index";
import Menubar from 'primevue/menubar';
import router from '@/router';
import html2canvas from 'html2canvas';
export default {
    components: {
        Chart,
        Menubar,
        Button

    },

    data: () => ({
        chartData: ref(),
        chartOptions: ref({
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }),
    }),


    mounted() {
        let valueArray = [];
        let languageArray = [];

        for (let i of store.state.selectedKnowledge.data) {
            console.log(i.selectedValues?.length)
            const parameterName = i.parameter;
            const language = i.knolwedgeName;
            valueArray.push(i.selectedValues?.length)
            languageArray.push(language)
            console.log(parameterName)
            const documentStyle = getComputedStyle(document.documentElement);
            const chartData = ref({
                labels: languageArray,
                datasets: [
                    {
                        label: parameterName,
                        data: valueArray,
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        borderWidth: 1
                    }
                ]
            });

            this.chartData = chartData



        }
    },

    methods: {
        home() {
            router.push("/")
        },
        downloadImage() {
            const myDiv = this.$refs.myDiv;
            html2canvas(myDiv).then(canvas => {
                const link = document.createElement('a');
                link.download = 'comparisonchart.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    }
}

</script>

<style>
.header-name1 {
    padding-bottom: 7px;
}

.space-generate {
    width: 10px;
}

.card1 {
    height: 100%;
    width: 100%;
}
</style>