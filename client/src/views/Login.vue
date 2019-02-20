<template lang="pug">
  .login-page
    form.content-box(@submit.prevent="login")
      //- disable chrome auto accomplete
      input.hide(name="account")
      input.hide(name="password" type="password")

      div
        .label Account
        input(
          id="input-account"
          v-model="account"
        )
      div
        .label Password
        input(
          id="input-password"
          type="password"
          v-model="password"
        )
      div.error-msg(
        id="hint-login-error"
        v-show="errorMsg"
      ) {{ errorMsg }}
      button(
        id="btn-login"
        @submit="login"
      ) Login
</template>

<script>
import { url } from '@/lib/config';

export default {
  data() {
    return {
      account: '',
      password: '',
      errorMsg: '',
    };
  },

  methods: {
    async login() {
      const { account, password } = this;
      const payload = { account, password };
      try {
        await this.axios.post(`${url}/users/login`, payload);
        this.$router.push('/users');
      } catch (e) {
        this.errorMsg = e.response.data.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.error-msg {
  color: red;
  font-size: 10px;
}

.hide {
  margin: 0;
  padding: 0;
  display: block;
  height: 0px;
  border: 0;
  width: 0px;
}

.label {
  display: inline-block;
  width: 80px;
}
</style>
