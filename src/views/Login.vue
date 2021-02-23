<template>
    <div class="login-body">
        <div class="login-panel ui-fluid">
            <div class="login-panel-content">
                <form
                    class="p-grid"
                    @submit.prevent="submit"
                >
                    <div class="p-col-12">
                        <h1>{{ company.name }}</h1>
                        <h2>Welcome to tieraid!</h2>
                    </div>
                    <div class="p-col-12">
                        <span class="p-float-label">
                            <InputText
                                id="username"
                                v-model="input.email"
                                class="p-inputtext p-component"
                                type="text"
                                required
                            />
                            <label for="username">Username</label>
                        </span>
                    </div>
                    <div class="p-col-12">
                        <span class="p-float-label">
                            <InputText
                                id="password"
                                v-model="input.password"
                                class="p-inputtext p-component"
                                type="password"
                                required
                            />
                            <label for="password">Password</label>
                        </span>
                    </div>
                    <div
                        class="p-col-6"
                        style="display: flex; align-items: center"
                    >
                        <button class="p-link">
                            Forget Password?
                        </button>
                    </div>
                    <div
                        class="p-col-6"
                        style="text-align: right"
                    >
                        <Button
                            class="p-button p-component"
                            type="submit"
                            label="Submit"
                        />
                    </div>
                </form>
                <Message
                    v-for="error of errors"
                    :key="error"
                    :severity="error"
                >
                    {{ error }}
                </Message>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            input: {
                email: '',
                password: '',
            },
        };
    },
    computed: {
        company() {
            return this.$store.getters['tenant/get'];
        },
    },
    methods: {
        async submit() {
            this.$store
                .dispatch('auth/login', this.input)
                .then(() => {
                    this.$router.push({ name: 'Dashboard' });
                })
                .catch(() => {
                    console.error('ERROR LOGIN');
                });
        },
    },
};
</script>

<style lang="scss">
.login-body {
  background-image: url("../assets/images/background.jpg");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.login-body h1 {
  text-transform: uppercase;
}
.login-body .p-component {
  width: 100%;
}
.login-body .login-panel {
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
.login-body .login-panel .login-panel-content {
  padding: 58px 98px;
  position: relative;
}
.login-body .login-panel .login-panel-content h1 {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1.3px;
  color: #616161;
  margin-top: 0;
  margin-bottom: 6px;
  text-align: center;
}
.login-body .login-panel .login-panel-content h2 {
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0.5px;
  color: #212121;
  margin-top: 0;
  margin-bottom: 1em;
  text-align: center;
}
.login-body .login-panel .login-panel-content button.p-link {
  color: #457fca;
  font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial,
    Lucida Grande, sans-serif;
  font-size: 14px;
}
.login-body .login-panel .login-panel-content .p-col-12,
.login-body .login-panel .login-panel-content .p-col-6 {
  padding: 1em;
}

@media screen and (max-width: 1024px) {
  .login-body .login-panel {
    left: 0;
    margin-left: 0;
    width: 100%;
  }
  .login-body .login-panel .login-panel-content {
    padding: 58px 38px;
  }
}
</style>
