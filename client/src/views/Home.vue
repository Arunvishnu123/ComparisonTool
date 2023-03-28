<template>
    <div>
        <HeaderComponent />
        <AddKnowledge />
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import AddKnowledge from '@/components/AddKnowledge.vue';
export default {

    components: {
        HeaderComponent,
        AddKnowledge
    }
}

</script>