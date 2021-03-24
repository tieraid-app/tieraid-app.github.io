<template>
    <div class="p-grid">
        <div class="p-col-12">
            <Card>
                <template #title>
                    <h5>Settings</h5>
                </template>
                <template #content>
                    Some settings..
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