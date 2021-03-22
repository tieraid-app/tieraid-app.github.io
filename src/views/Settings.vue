<template>
    <div class="p-grid">
        <div class="p-col-12">
            <Card>
                <template #title>
                    <h5>Company information</h5>
                </template>
                <template #content>
                    <p>Welcome Doggo Dog!</p>
                </template>
            </Card>
        </div>
    </div>
</template>


<script>
import Card from 'primevue/card';

export default {
    name: 'Account',
    components: {
        Card,
    }
}
</script>

<style lang="scss">

</style>