<template>
  <div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-upload
          ref="uploadi"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          class="upload-demo"
          list-type="picture"
          accept=".png,.jpeg,.jpg"
          action="aa"
          multiple>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">一次只能上传一个图片文件，仅限格式png、jpeg、jpg，单个文件不超过10MB</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { payment, delivery } from '@/api/trade'

export default {
  name: 'UploadImage',
  props: {
    orderNo: {
      type: String,
      default: ''
    },
    userCode: {
      type: String,
      default: ''
    },
    step: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      temp: {},
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        delivery: '到款凭证',
        payment: '付款凭证'
      },
      dialogStatus: ''
    }
  },
  methods: {
    // 上传
    handleUpload(step) {
      this.dialogStatus = step
      this.dialogFormVisible = true
      this.$nextTick(() => {
        console.log(this.orderNo)
        // console.log(this.$refs['dataForm'])
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      console.log(this.orderNo, this.step, 'uploadData')
      // const methodStep = this.step
      const that = this
      that.formData = new FormData()
      that.$refs['uploadi'].submit()
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          that.formData.append('orderNo', this.orderNo)
          that.formData.append('userCode', this.userCode)
          if (that.formData.get('file').size / 1024 / 1024 >= 10) {
            this.$notify({
              title: '错误',
              message: '上传文件大小不能超过 10MB!',
              type: 'error',
              duration: 3000
            })
            return
          }
          if (!that.formData.get('file')) {
            this.$notify({
              title: '错误',
              message: '文件不能为空',
              type: 'error',
              duration: 3000
            })
            return
          }
          if (this.step === 'payment') {
            payment(that.formData).then(() => {
              // 直接在页面显示插入的数据
              // this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.$emit('fetchUploadData', this.orderNo)
            })
          } else if (this.step === 'delivery') {
            delivery(that.formData).then(() => {
              // 直接在页面显示插入的数据
              // this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.$emit('fetchUploadData', this.orderNo)
            })
          }
          that.$refs['uploadi'].clearFiles()
        }
      })
    },
    // upload
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeUpload(file) {
      console.log('beforeUpload')
      this.formData.append('file', file)
      return false
    }
  }
}
</script>

<style scoped>

</style>
