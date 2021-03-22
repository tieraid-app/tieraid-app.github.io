<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <h5>Account</h5>
                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-6">
                        <label for="firstname">Firstname</label>
                        <InputText id="firstname" type="text"/>
                    </div>
                    <div class="p-field p-col-12 p-md-6">
                        <label for="lastname">Lastname</label>
                        <InputText id="lastname" type="text"/>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="address">Address</label>
                        <Textarea id="address" rows="4"/>
                    </div>
                    <div class="p-field p-col-12 p-md-6">
                        <label for="city">City</label>
                        <InputText id="city" type="text" />
                    </div>
                    <div class="p-field p-col-12 p-md-6">
                        <label for="zip">Zip</label>
                        <InputText id="zip" type="text"/>
                    </div>
                    <div class="p-field p-col-12">
                        <Button label="Submit"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

export default {
    name: 'Account',
    components: {
        InputText,
        Textarea,
        Button
    },
}
</script>

<style lang="scss" scoped>

</style>