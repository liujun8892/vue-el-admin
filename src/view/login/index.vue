<template>
  <div>
    <div class="container" style="height: 100vh">
      <div class="row" style="padding-top: 20%">
        <div
          class="card col-12 col-sm-9 col-md-7 col-lg-5 m-auto text-center p-0"
          style="align-self: center"
        >
          <div class="card-header bg-white">
            <h3 class="text-secondary m-0">M1-ADMIN</h3>
          </div>
          <div class="card-body">
            <el-form :model="form" :rules="rules" ref="loginForm">
              <el-form-item prop="username">
                <el-input
                  type="text"
                  placeholder="请输入用户名"
                  v-model="form.username"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="form.password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="background: #17a2b8; border-color: #17a2b8"
                  class="w-100"
                  @click="submitForm('loginForm')"
                  >立即登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16  个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) this.$router.push('/index')
      })
    },
  },
}
</script>

<style scoped>
</style>
