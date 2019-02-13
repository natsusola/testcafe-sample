<template lang="pug">
  .user-page
    button(
      id="btn-logout"
      @click="logout"
    ) 登出
    table
      tr
        th
        th 帳號
        th email
        th 管理員
      tr(
        v-for="user in users"
        :key="user.account"
      )
        td
        td {{ user.account }}
        td {{ user.email }}
        td {{ user.isAdmin }}
        td
          button 刪除
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
