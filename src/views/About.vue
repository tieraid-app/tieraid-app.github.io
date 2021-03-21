<template>
    <div class="p-grid">
        <div class="p-col-4">
            <Avatar 
                shape="circle" 
                size="xlarge"
            >
                <img 
                    src="@/assets/images/logo_dogo.png" 
                    alt=""
                >
            </Avatar>
            <p>{{name}}</p>
        </div>
        <Card class="p-col">
            <template #title>
                Profile
            </template>
            <template #content>
                <div class="p-grid">
                    <div class="p-field p-col-12">
                        <span class="p-float-label">
                            <InputText type="text" v-model="first_name" />
                            <label for="inputtext">First name</label>
                        </span>
                    </div>
                    <div class="p-field p-col-12">
                        <span class="p-float-label">
                            <InputText type="text" v-model="last_name" />
                            <label for="inputtext">Last name</label>
                        </span>
                    </div>
                    <div class="p-field p-col-12">
                        <span class="p-float-label">
                            <InputText type="text" v-model="email" />
                            <label for="inputtext">Email</label>
                        </span>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import Avatar from 'primevue/avatar';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';

export default {
    components: {
        Avatar,
        Card,
        InputText
    },
    data() {
        return {
            expanded: false
        };
    },
    computed: {
        name() {
            const user = this.$store.getters['users/current'];

            return `${user.first_name} ${user.last_name}`;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.go();
        },
        onClick(event) {
            this.expanded = !this.expanded;
            event.preventDefault();
        }
    }
};
</script>