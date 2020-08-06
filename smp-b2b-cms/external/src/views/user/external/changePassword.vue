<template>
  <div class="changePassword">
    <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm2.username" :readonly="true" style="width: 44%"/>
      </el-form-item>
      <el-form-item label="原密码" prop="originPass">
        <el-input v-model="ruleForm2.originPass" maxlength="16" type="password" style="width: 44%" placeholder="请输入原密码"/>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input v-model="ruleForm2.pass" type="password" autocomplete="off" style="width: 44%" placeholder="请输入新密码"/>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input v-model="ruleForm2.checkPass" type="password" autocomplete="off" style="width: 44%" placeholder="请再次输入新密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
    <ol>
      <li>密码应该由8-15个字符组成，区分大小写（不能包含冒号）；</li>
      <li>密码必须包含大写字母、小写字母、数字、特殊字符的三种组合；</li>
      <li>密码不能包含：admin，password，test，abc（不区分大小写）；</li>
      <li>密码不可以包含姓名及账号名（不区分大小写）；</li>
      <li>密码不能包含4个重复的数字或字母；</li>
      <li>密码不可以包含4个连续的数字；</li>
      <li>不可以使用之前5个旧密码。</li>
    </ol>

  </div>
</template>

<script>
import { validatePassword, validatePasswordKeywords, validatePasswordNums, maxCount } from '@/utils/validate'
import { mapGetters } from 'vuex'
export default {
  name: 'ChangePassword',
  data() {
    // 原始密码
    const validateOrigin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原密码不能为空'))
      }
      callback()
    }
    // 新密码
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.indexOf(':') !== -1) {
          return callback(new Error('密码不能包含冒号'))
        }
        // 1,2
        if (!validatePassword(value)) {
          return callback(new Error('密码长度或内容不符合要求'))
        }
        // 3
        if (!validatePasswordKeywords(value.toLocaleUpperCase())) {
          return callback(new Error('密码不能包含：admin，password，test，abc（不区分大小写）'))
        }
        // 4
        if ((value.toLocaleUpperCase().indexOf(this.$store.getters.name.toLocaleUpperCase())) !== -1) {
          return callback(new Error('密码不可以包含姓名及账号名'))
        }
        // 5
        if (maxCount(value) >= 4) {
          return callback(new Error('密码不能包含4个重复的数字或字母'))
        }
        // 6
        if (validatePasswordNums(value)) {
          return callback(new Error('密码不可以包含4个连续的数字'))
        }
        // 重复密码不为空 验证是否相等
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    // 确认密码
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        username: this.$store.getters.name,
        pass: '',
        checkPass: '',
        originPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        originPass: [
          { validator: validateOrigin, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          // console.log(this.ruleForm2)
          this.loading = true
          console.log(this.ruleForm2, 'loginForm')
          this.$store.dispatch('ChangePassword', this.ruleForm2).then((response) => {
            this.loading = false
            console.log(response, 'response of change password')
            this.$notify({
              title: '修改成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.resetForm('ruleForm2')
            this.$router.push({ path: '/' })
            console.log(response.status, '123123')
          }).catch((error) => {
            this.loading = false
            console.log(error, 'errorChangePWD')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.changePassword{
  margin: 50px;
}
</style>
