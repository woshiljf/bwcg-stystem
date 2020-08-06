<template>
  <div class="login-container">
    <el-container>
      <el-container>
        <el-main>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <div class="title-container">
              <h3 class="title">
                {{ $t('login.title') }}
              </h3>
            </div>
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                v-model="loginForm.userCode"
                :placeholder="$t('login.username')"
                name="userCode"
                type="text"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                v-model="loginForm.password"
                :type="passwordType"
                :placeholder="$t('login.password')"
                name="password"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
              {{ $t('login.logIn') }}
            </el-button>
          </el-form>
        </el-main>
        <el-footer align="center" class="vue-footer">
          Copyright © 2019-2020 bwcaigou.com All Rights Reserved 版权所有 昆山宝唯信息科技有限公司
          <a style="color:#20a0ff" href="http://www.beian.miit.gov.cn" target="_blank">苏ICP备19012986号</a>
        </el-footer>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('用户名不正确'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码位数不够'))
      } else {
        callback()
      }
    }
    return {
      // 默认值
      loginForm: {
        userCode: '',
        password: ''
      },
      loginRules: {
        userCode: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
  },
  destroyed() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          //
          this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
            this.loading = false
            console.log(res, 'res')
            if (res.data.errorCode) {
              this.$notify({
                title: '登录失败',
                message: res.data.errorMsg || '登录失败',
                type: 'error',
                duration: 2000
              })
              return
            }
            // console.log(getToken(), 'getToken')
            // console.log(!getToken(), 'getToken')
            if (!getToken()) {
              this.$notify({
                title: '登录失败',
                message: '登录失败',
                type: 'error',
                duration: 2000
              })
            }
            if (res.data.firstLogin) {
              this.$router.push({ path: '/user/changepassword' })
              return
            }
            this.$router.push({ path: this.redirect || '/' })
          }).catch((error) => {
            // console.log(error.response)
            if (error.response) {
              Message({
                message: error.response.data.errorMsg || '用户名或密码错误，登录失败',
                type: 'error',
                duration: 5 * 1000
              })
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .vue-footer{
    position:absolute;
    bottom:0;
    width:100%;
    height:100px;
    text-align:center
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
</style>
