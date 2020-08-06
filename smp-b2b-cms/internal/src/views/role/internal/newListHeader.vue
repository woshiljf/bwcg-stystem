<template>
  <el-row>
    <el-col class="mr">
      <span class="blue-line">   |</span>
      <dialog-button
        ref="dbtn"
        :button-text="'新建角色'"
        :options="DialogOptions"
        :show-dialog.sync="showDialog"
        @open="showDialog = true"
        @DialogConfirm="addRoleConfirm($event)"/>
    </el-col>
  </el-row>
</template>
<script>
import DialogButton from './components/DialogButton'
import { newListHeaderDialogOption } from './newListData'
export default {
  name: 'NewListHeader',
  components: {
    DialogButton
  },
  data() {
    return {
      DialogOptions: newListHeaderDialogOption, // 新建角色弹窗项数组
      showDialog: false // 新建角色弹窗显示控制变量
    }
  },
  beforeDestroy() {
    this.DialogOptions = null
    this.showDialog = null
  },
  methods: {
    // 新建角色确认方法
    addRoleConfirm(even) {
      even['creator'] = this.$store.getters.name
      even['systemId'] = '10'
      this.$axios({
        method: 'POST',
        url: '/api/api/v1/role',
        data: { list: [
          even
        ] }
      }).then((res) => {
        console.log(res)
        this.$notify({
          title: '提示',
          message: res.data.msg,
          duration: 2000
        })
        this.showDialog = false
        this.$refs.dbtn.resetForm()
        this.$emit('getList')
      }).catch(e => {
        this.$notify({
          title: '提示',
          message: e.response.data.msg || '新增角色失败',
          duration: 2000
        })
        console.log('新增角色失败')
      })
    }
  }
}
</script>
