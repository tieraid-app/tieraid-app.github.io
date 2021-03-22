<template>
    <form
        class="p-grid"
        @submit.prevent="submit"
    >
        <div class="p-col-12">
            <div class="card">
                <h5>Account</h5>
                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-6">
                        <label for="firstname">Firstname</label>
                        <InputText
                            id="firstname"
                            type="text"
                            v-model="user.first_name"
                            required
                        />
                    </div>
                    <div class="p-field p-col-12 p-md-6">
                        <label for="lastname">Lastname</label>
                        <InputText
                            id="lastname"
                            type="text"
                            v-model="user.last_name"
                            required
                        />
                    </div>
                    <div class="p-field p-col-12">
                        <label for="email">Email</label>
                        <InputText
                            id="email"
                            type="text"
                            v-model="user.email"
                            required
                        />
                    </div>
                    <div class="p-field p-col-12">
                        <Button
                            type="submit"
                            label="Submit"
                        />
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    name: 'Account',
    components: {
        InputText,
        Button
    },
    computed: {
        user() {
            return Object.assign({}, this.$store.getters['users/current']);
        }
    },
    methods: {
        submit() {
            if(this.user.id) {
                this.$store.dispatch('users/update', this.user);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>