<template>
    <div class="p-grid">
        <div class="p-col-4">
            <div class="p-grid">
                <div class="p-col-12">
                    <Card>
                        <template #title>
                            <h5>Att göra</h5>
                        </template>
                        <template #subtitle>
                            Saker som kräver din uppmärksamhet
                        </template>
                        <template #content>
                            <p>Lägg order</p>
                        </template>
                    </Card>
                </div>
                <div class="p-col-12">
                    <Card>
                        <template #title>
                            <h5>Nyheter</h5>
                        </template>
                        <template #content>
                            <p>Senaste nyheter</p>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
        <div class="p-col-8">
            <div class="p-grid">
                <div class="p-col-3">
                    <Card class="p-text-center">
                        <template #title>
                            <h6>Antalet ordrar idag</h6>
                        </template>
                        <template #content>
                            <Badge 
                                value="7" 
                                size="xlarge" />
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Badge from 'primevue/badge';
import Card from 'primevue/card';

export default {
    name: 'Account',
    components: {
        Badge,
        Card,
    }
}
</script>

<style lang="scss">

</style>