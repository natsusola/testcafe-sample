<template lang="pug">
  .user-page
    button(
      @click="logout"
      test-id="btn-logout"
    ) Logout
    table
      tr
        th
        th Account
        th Email
        th Admin
        th(test-id="list-col-act") Action
      tr(
        v-for="user in users"
        :key="user.account"
        test-id="list-row-user"
      )
        td
        td {{ user.account }}
        td {{ user.email }}
        td {{ user.isAdmin }}
        td
          button(test-id="btn-del") Del
</template>

<script>
import { url } from '@/lib/config';

export default {
  data() {
    return {
      users: [],
    };
  },

  created() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      try {
        const res = await this.axios.get(`${url}/users`);
        this.users = res.data.data;
      } catch (e) {
        console.log(e);
        alert(e.mssage);
      }
    },

    logout() {
      this.$router.push('/login');
    },
  },
};
</script>
