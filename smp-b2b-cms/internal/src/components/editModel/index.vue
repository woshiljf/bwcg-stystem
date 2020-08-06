<!--编辑弹框-->
<template>
  <div>
    <el-dialog
      :title="title||'编辑'"
      :visible.sync="visible"
      :item="item"
      :options="options"
      :api="API"
      :param="defaultParameters"
      :close-on-click-modal="false"
      :fullscreen="isFullscreen"
      :custom-class="`detail-model edit-model ${customClass}`"
      @close="resetForm">
      <el-form ref="ruleForm" :model="params" :rules="rules" label-width="160px">
        <el-form-item
          v-for="(option,index) in options"
          :key="index"
          :label="option.name"
          :prop="option.field"
          :style="{width:option.width?option.width+'%':'50%'}">
          <el-select
            v-if="option.type==='select'"
            :placeholder="option.placeholder"
            :multiple="!!option.multiple"
            v-model="params[option.field]"
            style="width:100%"
            value-key="id"
            @change="handleBrandChange(option.field)">
            <el-option
              v-for="(item, index) in option.options"
              v-show="!enums[option.field]"
              :label="item.name"
              :value="option.all?item:item.id"
              :key="index"/>
            <el-option
              v-for="(item, index) in enums[option.field]"
              v-show="enums[option.field]"
              :label="item.name"
              :value="option.all?item:item.id"
              :key="index"/>
          </el-select>
          <el-row v-else-if="option.type==='area'">
            <el-col :span="12">
              <el-select v-model="params[option.field]" @change="getCity($event)">
                <el-option :value="null" label="选择省" />
                <el-option
                  v-for="(item,index) of provinces"
                  :label="item.name"
                  :value="item.value"
                  :key="index"/>
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-select v-model="params[option.field1]" :disabled="!params[option.field]">
                <el-option :value="null" label="选择市" />
                <el-option
                  v-for="(item,index) of cityArr"
                  :label="item.name"
                  :value="item.value"
                  :key="index"/>
              </el-select>
            </el-col>
          </el-row>
          <el-row v-else-if="option.type==='organization'">
            <el-col :span="24">
              <el-radio v-model="userType" label="1">品牌方</el-radio>
              <el-radio v-model="userType" label="2">经销商</el-radio>
            </el-col>
            <el-col v-if="userType==='2'" :span="8" >
              <el-select v-model="regionId" @change="getAreaList(regionId)">
                <el-option :value="null" label="选择大区" />
                <el-option
                  v-for="(item,index) of regionList"
                  :label="item.name"
                  :value="item.value"
                  :key="index"/>
              </el-select>
            </el-col>
            <el-col v-if="userType==='2'" :span="8">
              <el-select
                v-model="areaId"
                :disabled="!regionId"
                @change="getDealerList(areaId)">
                <el-option :value="null" label="选择小区" />
                <el-option
                  v-for="(item,index) of areaList"
                  :label="item.name"
                  :value="item.value"
                  :key="index"/>
              </el-select>
            </el-col>
            <el-col v-if="userType==='2'" :span="8">
              <el-select v-model="dealerId" :disabled="!areaId">
                <el-option :value="null" label="选择经销商" />
                <el-option
                  v-for="(item,index) of dealerList"
                  :label="item.name"
                  :value="item.value"
                  :key="index"/>
              </el-select>
            </el-col>
          </el-row>

          <el-date-picker
            v-else-if="option.type==='date'"
            :default-value="option.defaultValue||''"
            :placeholder="option.placeholder"
            v-model="params[option.field]"
            type="date"/>
          <el-checkbox
            v-else-if="option.type==='checkbox'"
            v-model="params[option.field]"/>
          <el-upload
            v-else-if="option.type==='img'"
            :class="option.num&&imgList[option.tag]?option.num<=(imgList[option.tag].length+unUploadImgs[option.tag].length)?'hidden-uploader':'':imgList[option.tag]&&imgList[option.tag].length+unUploadImgs[option.tag].length>=1?'hidden-uploader':''"
            :ref="option.tag"
            :action="utils.imgUrl"
            :auto-upload="false"
            :http-request="uploadImgs[option.tag]"
            :file-list="imgList[option.tag]"
            :on-preview="handlePictureCardPreview"
            :on-change="changeImgs[option.tag]"
            :on-remove="removeImgs[option.tag]"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-input
            v-else-if="option.type==='input'&&option.eltype==='number'"
            :placeholder="option.placeholder"
            :disabled="option.disabled"
            v-model.number="params[option.field]">
            <template v-if="option.unit" slot="append">{{ option.unit }}</template>
          </el-input>
          <el-input
            v-else
            :type="option.eltype?option.eltype:'text'"
            :placeholder="option.placeholder"
            :disabled="option.disabled"
            v-model="params[option.field]">
            <template v-if="option.unit" slot="append" >{{ option.unit }}</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit">保存</el-button>
        <el-button @click="visible=false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="previewVisible">
      <img :src="dialogImageUrl" alt="" width="100%" >
    </el-dialog>
  </div>
</template>
<script>
// import configs from '../../configs/configs'
// import  commonService from '../../services/common/common-service';
// import noImage from '../../images/no-image.png'

export default {
  components: { // 组件
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    },
    API: {
      type: String,
      default: ''
    },
    Url: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    defaultParameters: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isFullscreen: {
      type: Boolean,
      default: false
    }
  },
  data: function() { // 初始化数据
    return {
      visible: false,
      previewVisible: false,
      dialogImageUrl: '',
      params: {},
      enums: {},
      imgList: {},
      removeImgs: {},
      uploadImgs: {},
      changeImgs: {},
      allImgs: [],
      unUploadImgs: {},
      totalUpload: 0,
      callbackNames: [],
      hasImg: false,
      provinces: [],
      cities: {},
      cityArr: [],
      hasArea: false,
      isInit: false,
      regionList: [],
      areaList: [],
      dealerList: [],
      userType: '1',
      regionId: null,
      areaId: null,
      dealerId: null
    }
  },
  mounted() {
    this.init()
  },
  methods: { // 方法
    init() {
      this.options.forEach((item, index) => {
        if (item.multiple) {
          this.$set(this.params, item.field, item.defaultValue || [])
        } else {
          this.$set(this.params, item.field, item.defaultValue || '')
        }
        if (item.type === 'area') {
          this.$set(this.params, item.field, null)
          this.$set(this.params, item.field1, null)
          this.hasArea = true
        }

        if (item.type === 'organization') {
          this.getRegionList()
        }

        if (item.type === 'img') {
          this.$set(this.imgList, item.tag, [])
          this.$set(this.unUploadImgs, item.tag, [])
          this.removeImgs[item.tag] = (file) => {
            for (let i = 0; i < this.imgList[item.tag].length; i++) {
              if (this.imgList[item.tag][i].name === file.name) {
                this.imgList[item.tag].splice(i, 1)
              }
            }
            for (let j = 0; j < this.unUploadImgs[item.tag].length; j++) {
              if (this.unUploadImgs[item.tag][j].file.uid === file.uid) {
                this.unUploadImgs[item.tag].splice(j, 1)
              }
            }
          }
          this.changeImgs[item.tag] = (file) => {
            if (item.num) {
              const tags = []
              const allImgList = this.imgList[item.tag].concat(this.unUploadImgs[item.tag])
              for (const i of allImgList) {
                tags.push(i.name)
              }
              for (let n = 1; n <= item.num; n++) {
                const tag = item.tag + '-' + n
                if (tags.indexOf(tag) === -1) {
                  this.unUploadImgs[item.tag].push({ name: tag, file: file, status: 'ready' })
                  return false
                }
              }
            } else {
              this.unUploadImgs[item.tag].push({ name: item.tag, file: file, status: 'ready' })
            }
          }
          this.uploadImgs[item.tag] = (request) => {
            // let file = request.file
          }
        }
      })
    },
    handleVisible() {
      this.$nextTick(() => {
        const oItem = { ...this.item }
        this.options.forEach(async(item, index) => {
          if (item.multiple) {
            this.$set(this.params, item.field, [])
          } else {
            this.$set(this.params, item.field, '')
          }
          if (item.type === 'area') {
            if (oItem[item.field]) {
              this.getCity(oItem[item.field])
              this.isInit = true
            }
          }
          if (item.type === 'img') {
            this.hasImg = true
            if (!item.num) {
              this.$set(this.imgList, item.tag, [{
                name: item.tag,
                url: `${this.utils.ImgUrl}${this.type}/${oItem.id}-${item.tag}@smaller?v=${oItem['img_ver_' + item.tag]}`
              }])
            } else {
              const imgArr = []
              for (let i = 0; i < item.num; i++) {
                imgArr.push({
                  name: `${item.tag}-${i + 1}`,
                  url: `${this.utils.ImgUrl}${this.type}/${oItem.id}-${item.tag}-${i + 1}@smaller?v=${oItem['img_ver_' + item.tag + (i + 1)]}`
                })
              }
              this.$set(this.imgList, item.tag, imgArr)
            }
          }
          if (item.type === 'organization') {
            this.userType = this.item['userType']
            this.regionId = this.item['regionId']
            this.getAreaList(this.regionId)
            this.areaId = this.item['areaId']
            this.getDealerList(this.regionId, this.areaId)
            this.dealerId = this.item['dealerId']
          }
        })
        for (const key in this.params) {
          if (this.params.hasOwnProperty(key)) {
            if (key.match(/(_on$)|(_at$)/)) {
              this.params[key] = oItem[key] ? new Date(oItem[key] * 1000) : ''
            } else {
              oItem[key] = oItem[key] ? this.$set(this.params, key, oItem[key]) : ''
            }
            if (key === 'location' && oItem[key]) {
              this.params[key] = oItem[key].join(',')
            }
          }
        }
        this.visible = true
        if (this.params.brand_id) {
          this.handleBrandChange('brand_id')
        }
      })
    },
    handleEdit() {
      // 判断修改的属性
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const params = this.utils.getDiffObj(this.params, this.item)
          for (const key in params) {
            if (params.hasOwnProperty(key) && params[key] && key.match(/(_on$)|(_at$)/)) {
              params[key] = this.utils.transDate(params[key])
              if (params[key] === this.item[key]) {
                delete params[key]
              }
            }

            if (key === 'location') {
              const arr = params[key].split(',')
              if (arr.length !== 2 || !arr[0] || !arr[1]) {
                this.$message('经纬度格式错误')
                return false
              }
              params[key] = arr
            }

            if (key === 'organization') {
              params['type'] = this.userType
              if (this.userType === '2') {
                params['dealerId'] = this.dealerId
                params['areaId'] = this.areaId
                params['regionId'] = this.regionId
              }
            }
          }
          if (this.API) {
            this.defaultParameters && Object.assign(params, this.defaultParameters)
            const url = this.Url ? this.Url : ''
            this.$https.post(url + this.API, params).then(() => {
              this.$emit('callback')
              this.visible = false
              this.addSuccess()
            })
          } else {
            if (this.utils.isEmptyObj(params) && !this.hasImg) {
              this.mClose()
              return false
            } else if (this.utils.isEmptyObj(params) && this.hasImg) {
              this.handleSubmitImgs()
            } else {
              this.$https.put(`/${this.type}/${this.item.id}`, params, this).then((data) => {
                if (this.hasImg) {
                  this.handleSubmitImgs()
                } else {
                  this.addSuccess()
                }
              }).finally(() => {
                this.addSuccess()
              })
            }
          }
        }
      })
    },
    addSuccess() {
      this.$message({
        type: 'success',
        message: '修改成功!'
      })
      this.$emit('callback')
      window.setTimeout(() => {
        this.visible = false
      }, 100)
    },
    // 上传图片完成后，往数据库中添加版本号
    addImgVersion() {
      // let params = {
      //   'type': this.type,
      //   'id': this.item.id,
      //   'name': this.callbackNames
      // }
      // commonService.updateVersion(params).then(data => {
      //   this.addSuccess()
      // })
      this.addSuccess()
    },
    resetForm() {
      this.handleClearImgs()
      this.$refs.ruleForm.resetFields()
      this.init()
      this.isInit = false
    },
    close(done) {
      this.resetForm()
      done()
    },
    mClose() {
      this.$refs.ruleForm.resetFields()
      window.setTimeout(() => {
        this.visible = false
      }, 100)
    },
    imgError(e) {
      e.target.src = '123131231232132132'
    },
    setEnums(enums) {
      for (const key in enums) {
        if (enums.hasOwnProperty(key)) {
          this.$set(this.enums, key, enums[key])
        }
      }
    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.previewVisible = true
    },
    handleSubmitImgs() {
      for (const key in this.imgList) {
        if (this.imgList.hasOwnProperty(key) && this.unUploadImgs[key] && this.unUploadImgs[key].length > 0) {
          this.allImgs = this.allImgs.concat(this.unUploadImgs[key])
          this.$refs[key][0].submit()
        }
      }
      if (this.allImgs.length === 0) {
        this.addSuccess()
      }
    },
    handleClearImgs() {
      this.allImgs = []
      this.totalUpload = 0
      for (const key in this.imgList) {
        if (this.imgList.hasOwnProperty(key)) {
          this.$refs[key][0].clearFiles()
          this.$set(this.imgList, key, [])
          this.$set(this.unUploadImgs, key, [])
        }
      }
    },
    handleBrandChange(type) {
      if (type === 'brand_id') {
        // commonService.getVehicleModels(this.params.brand_id, this).then(data => {
        //   this.$set(this.enums, 'vehicle_model_info', data.data)
        // })
      }
    },
    getArea(data) {
      for (const k in data.data.provinces) {
        this.provinces.push({ name: data.data.provinces[k], value: k })
      }
      this.cities = data.data.cities
    },
    getCity(e) {
      console.log('=============')
      console.log(this.isInit)
      if (!this.isInit) {
        this.$set(this.params, 'city_id', null)
      }
      this.isInit = false
      const arr = []
      if (this.cities) {
        const cities = this.cities[`${e}`] || {}
        for (const k in cities) {
          arr.push({ name: cities[k], value: k })
        }
      }
      this.cityArr = arr
      console.log(e)
      console.log(arr)
    },
    async getRegionList() {
    },
    async getAreaList(regionId) {
    },
    async getDealerList(regionId, areaId) {
    }
  }
}
</script>
<style scoped>
  .el-dialog__body {
      padding: 30px 20px;
      height: 90%;
      color: #48576a;
      font-size: 14px;
      overflow: auto;
    }
    .el-form-item {
      width: 50%;
      float: left;
      margin-bottom: 22px;
    }
     .el-form-item__content {
      line-height: 37px;
      position: relative;
      font-size: 14px;
    }

</style>
