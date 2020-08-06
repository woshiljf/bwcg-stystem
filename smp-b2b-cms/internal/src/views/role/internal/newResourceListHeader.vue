<template>
  <el-row>
    <el-col class="mr">
      <span class="blue-line">   |</span>
      <el-button type="primary" @click="dialogVisible = true">新增资源</el-button>
      <el-select v-model="SearchRadio" placeholder="全部">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button type="primary" @click="getTypeList">查询</el-button>
      <!-- 增加指定渠道占库弹窗 -->
      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        title="编辑新增资源"
        width="80%">
        <el-radio-group v-model="radio">
          <el-radio :label="6">菜单级</el-radio>
          <el-radio :label="9">接口级</el-radio>
        </el-radio-group>
        <div class="relative">
          <el-table
            :data="channelData"
            stripe
            class="wh80">
            <el-table-column
              prop="resourceName"
              label="权限名">
              <template slot-scope="scope">
                <el-input v-model="scope.row.resourceName" placeholder="请输入内容"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="resourceCode"
              label="ResourceCode">
              <template slot-scope="scope">
                <el-input v-model="scope.row.resourceCode" placeholder="请输入内容"/>
              </template>
            </el-table-column>
            <el-table-column
              v-if="radio === 9"
              prop="url"
              label="URL">
              <template slot-scope="scope">
                <el-input v-model="scope.row.url" placeholder="请输入内容"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="parentID"
              label="ParentID">
              <template slot-scope="scope">
                <el-input v-model="scope.row.parentId" placeholder="请输入内容"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="资源描述">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" type="textarea" placeholder="请输入内容" />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button v-if="channelData.length !== 1" type="text" size="small" @click="delRow(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" class="absolute" icon="el-icon-circle-plus-outline" @click="addRow"/>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitConfim">确 定</el-button>
        </span>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import { setResource } from '../../../api/newResourceRole'
export default {
  name: 'NewResourceListHeader',
  data() {
    return {
      options: [{
        value: ' ',
        label: '全部'
      }, {
        value: 'MENU',
        label: '菜单级资源'
      }, {
        value: 'LINK',
        label: '接口级资源'
      }],
      SearchRadio: '',
      radio: 6,
      dialogVisible: false,
      creator: this.$store.getters.name,
      channelData: [{ // 指定渠道table表格变量
        id: 1,
        resourceName: '',
        resourceCode: '',
        url: '',
        parentId: '',
        remark: '',
        systemId: 10
      }]
    }
  },
  beforeDestroy() {
    this.channelData = null
    this.dialogVisible = null
  },
  methods: {
    // 增加关闭指定渠道占库弹窗方法
    handleClose(done) {
      const that = this
      this.$confirm('确认关闭？')
        .then(_ => {
          that.channelData = [{
            id: 1,
            reamrk: '',
            resourceCode: '',
            url: '',
            parentId: '',
            resourceName: '',
            systemId: 10
          }]
          done()
        })
        .catch(_ => {})
    },
    addRow() {
      this.channelData.map((item, index) => {
        item.id = index + 1
      })
      const newRow = {
        id: this.channelData.length + 1,
        reamrk: '',
        resourceCode: '',
        url: '',
        parentId: '',
        resourceName: '',
        systemId: 10
      }
      this.channelData.push(newRow)
    },
    delRow(row) {
      this.channelData = this.channelData.filter(item => item.id !== row.id)
    },
    getTypeList() {
      this.$emit('getList', this.SearchRadio)
    },
    async submitConfim() {
      const params = {
        userCode: this.creator,
        list: this.channelData
      }
      try {
        await setResource(params)
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.channelData = [{
          id: 1,
          reamrk: '',
          resourceCode: '',
          url: '',
          parentId: '',
          resourceName: '',
          systemId: 10
        }]
        this.$emit('getList')
      } catch (e) {
        this.$message.error('新增失败')
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
  .absolute{
    position: absolute;
    bottom: 10px;
    right: 10px
  }
  .relative{
    position: relative;
  }
</style>
