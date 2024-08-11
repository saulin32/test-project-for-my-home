<template>
  <div class="img flex justify-center items-center">
    <div class="w-[340px] h-[309px] flex flex-col items-center">
      <div
        class="w-[308px] h-[56px] bg-[#44A248] flex items-center justify-center text-white rounded-[5px] z-10 font-bold">
        <p>Авторизация</p>
      </div>
      <div class="bg-white w-full h-[290px] rounded-[5px] flex flex-col justify-center -translate-y-[37px] px-5">
        <v-form class="flex flex-col gap-2">
          <v-text-field label="Логин или телефон" v-model="login" prepend-inner-icon="mdi-phone">
          </v-text-field>
          <v-text-field label="Пароль" hide-details="auto" prepend-inner-icon="mdi-lock" append-icon="mdi-eye-off"
            v-model="password">
          </v-text-field>
          <div class="flex justify-center">
            <v-btn color="#50B053" class="!text-white hover:!bg-[#319c4b]" @click="loginToAccount"
              :disabled="buttonDisabled">
              Войти
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  props: {
    msg: String,
  },
  components: {
  },
  data() {
    return {
      login: '79122333444',
      password: "123456",
      buttonDisabled: false,
    }
  },
  methods: {
    async loginToAccount() {
      this.buttonDisabled = true
      await window.axios.post('api/auth/login/', {
        username: this.login,
        password: this.password,
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.error(error)
      })
      this.buttonDisabled = false
    },
  },
}
</script>

<style scoped>
.img {
  background-image: url('../../../public/background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
