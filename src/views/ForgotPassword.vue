<template>
    <div class="forgot-password-body">
        <div class="forgot-password-panel ui-fluid">
            <div class="forgot-password-panel-content">
                <form
                    class="p-grid"
                    @submit.prevent="submit"
                >
                    <div class="p-col-12">
                        <h1>Forgot Your Password?</h1>
                        <p>
                            If you have forgotten your password, please enter your account's email address below and click the "Reset My Password" button. You will receive an email that contains a link to set a new password.
                        </p>
                    </div>
                    <div class="p-col-12">
                        <span class="p-float-label">
                            <InputText
                                id="username"
                                v-model="input.email"
                                class="p-inputtext p-component"
                                type="email"
                                pattern="^(?![\.\-_])((?![\-\._][\-\._])[a-z0-9\-\._]){0,63}[a-z0-9]@(?![\-])((?!--)[a-z0-9\-]){0,63}[a-z0-9]\.(|((?![\-])((?!--)[a-z0-9\-]){0,63}[a-z0-9]\.))(|([a-z]{2,14}\.))[a-z]{2,14}$"
                                required
                            />
                            <label for="username">Email</label>
                        </span>
                    </div>
                    <div
                        class="p-col-6"
                        style="display: flex; align-items: center"
                    >
                        <a
                            class="p-link"
                            @click="goToLoginPage"
                        >
                            Return to Login Page
                        </a>
                    </div>
                    <div
                        class="p-col-6"
                        style="text-align: right"
                    >
                        <Button
                            class="p-button p-component"
                            type="submit"
                            label="Reset My Password"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    name: 'ForgotPassword',
    components: {
        InputText,
        Button
    },
    data() {
        return {
            input: {
                email: null
            },
            errors: null
        };
    },
    methods: {
        goToLoginPage() {
            this.$router.push({ name: 'Login' });
        },
        async submit() {
            this.errors = null;
        }
    },
};
</script>

<style lang="scss">
.forgot-password-body {
    background-image: url("../assets/images/background.jpg");
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.forgot-password-body h1 {
    text-transform: uppercase;
}

.forgot-password-body .p-component {
    width: 100%;
}

.forgot-password-body .forgot-password-panel {
    width: 565px;
    height: 410px;
    background-color: #fafafa;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -282px;
    margin-top: -232px;
    padding: 0;
    border-radius: 3px;
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
        0 5px 22px 4px rgba(0, 0, 0, 0.12), 0 12px 17px 2px rgba(0, 0, 0, 0.14);
}

.forgot-password-body .forgot-password-panel .forgot-password-panel-content {
    padding: 58px 98px;
    position: relative;
}

.forgot-password-body .forgot-password-panel .forgot-password-panel-content h1 {
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1.3px;
    color: #616161;
    margin-top: 0;
    margin-bottom: 6px;
    text-align: center;
}

.forgot-password-body .forgot-password-panel .forgot-password-panel-content h2 {
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 0.5px;
    color: #212121;
    margin-top: 0;
    margin-bottom: 1em;
    text-align: center;
}

.forgot-password-body .forgot-password-panel .forgot-password-panel-content button.p-link {
    color: #457fca;
    font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial,
        Lucida Grande, sans-serif;
    font-size: 14px;
}

.forgot-password-body .forgot-password-panel .forgot-password-panel-content .p-col-12,
.forgot-password-body .forgot-password-panel .forgot-password-panel-content .p-col-6 {
    padding: 1em;
}

@media screen and (max-width: 1024px) {
    .forgot-password-body .forgot-password-panel {
        left: 0;
        margin-left: 0;
        width: 100%;
    }

    .forgot-password-body .forgot-password-panel .forgot-password-panel-content {
        padding: 58px 38px;
    }
}
</style>
