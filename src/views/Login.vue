<template>
  <i class="iconfont icon-guanbi" @click="handleClose"></i>
  <label for="">登录页</label>
  <a-form :model="formData">
    <a-form-item>
      <a-input v-model:value="formData.name" placeholder="输入账号" />
    </a-form-item>
    <a-form-item>
      <a-input type="password" v-model:value="formData.password" placeholder="输入密码" />
    </a-form-item>
    <a-form-item>
      <a-button @click="clickLogin" :disabled="btnDisabled">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
// 在渲染进程中需使用window.require('electron')的方式引入
const { ipcRenderer, remote } = window.require('electron');
import { defineComponent, reactive, computed } from "vue";
import { Button, Form, Input } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';

export default defineComponent({
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
  },
  setup() {
    const formData = reactive({
      name: '',
      password: '',
      // code: '',
    })

    const btnDisabled = computed(() => {
      return formData.name === '' || formData.password === ''
    })

    function clickLogin() {
      ipcRenderer.sendSync('login-message')
    }

    // 退出app
    function handleClose() {
      remote.app.quit()
    }
    return {
      clickLogin,
      formData,
      btnDisabled,
      handleClose
    }
  },
});
</script>

<style lang="scss" scope>
.icon-guanbi {
  position: fixed;
  left: 6px;
  top: 6px;
  color: red;
}
</style>