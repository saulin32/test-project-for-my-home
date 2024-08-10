<template>
  <div class="img flex justify-center items-center">
    <div class="w-[340px] h-[309px] flex flex-col items-center">
      <div class="w-[308px] h-14 bg-[#44A248] flex items-center justify-center text-white rounded-[5px] z-10 font-bold">
        <p>Авторизация</p>
      </div>
      <form class="bg-white w-[340px] h-[290px] rounded-[5px] flex flex-col justify-end -translate-y-[37px]">
        <Input label="Логин или телефон" v-model="login" />
        <Input label="Пароль" v-model="password" />
      </form>
    </div>
  </div>
</template>

<script>
import Input from '../UI/Input.vue'
export default {
  name: 'LoginPage',
  props: {
    msg: String
  },
  components: {
    Input
  },
  data() {
    return {
      login: '',
      password:'',
    }
  }
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
