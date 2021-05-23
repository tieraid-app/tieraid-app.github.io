<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <DataTable 
                    :value="customers" 
                    show-gridlines 
                    responsive-layout="scroll"
                >
                    <template #header>
                        Customers
                    </template>
                    <Column 
                        field="name" 
                        header="Name" 
                    />
                    <Column 
                        field="description" 
                        header="Description"
                    />
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    components: {
        DataTable,
        Column
    },
    created() {
        this.$store.dispatch('customers/fetchAll');
    },
    computed: {
        customers() {
            return this.$store.getters['customers/get'].map((customer) => {
                return customer.customer;
            });
        },
    }
}
</script>

<style lang="scss" scoped>

</style>