<template>
  <div>
    <table-common v-loading="data.loading" :height="130" :table-header="data.tableHeader" :table-data="data.tableList" :table-button-width="140" table-button>
      <template slot="btn" slot-scope="scope">
        <dialog-button
          :button-type="'text'"
          :button-text="'查询'"
          :default-params="data.defaultPa"
          :options="data.searchDialogOptions"
          :show-dialog.sync="data.searchDialog"
          :cancel-text="'关闭'"
          :dialog-confirm-button="false"
          @open="openSearchDialog(scope.rowData.row)"/>
        <el-button type="text" @click="openSetRoleDialog(scope.rowData.row)">设置权限</el-button>
        <dialog-button
          :button-type="'text'"
          :button-text="'删除'"
          :options="data.deleteDialogOptions"
          :show-dialog.sync="data.deleteDialog"
          @open="openD( scope.rowData.row)"
          @DialogConfirm="deleteNowConfirm"/>
      </template>
    </table-common>
    <el-dialog
      :visible.sync="data.setRolDialog"
      title="提示"
      width="70%"
      @close="handleClose">
      <el-row class="text-center">
        <el-col :span="6">角色名称:  </el-col>
        <el-col :span="3"> {{ data.row.roleName }} </el-col>
      </el-row>
      <tree-transfer
        :title="data.options.title"
        :from_data="data.fromData"
        :to_data="data.toData"
        :default-props="{label:'resourceName'}"
        :default-checked-keys="data.defaultData"
        :mode="data.mode"
        default-transfer
        height="540px"
        filter
        @addBtn="add"
        @removeBtn="remove"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.setRolDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import treeTransfer from 'el-tree-transfer'
import TableCommon from './components/TableCommon'
import DialogButton from './components/DialogButton'
import { getallResuorce, getUserResuorce, setRoleFuction, getUserList, getResource } from '../../../api/newRole'
import { searchDialogOptions, deleteDialogOptions, tableHeader } from './newListData'
export default {
  name: 'NewListTable',
  components: {
    DialogButton,
    TableCommon,
    treeTransfer
  },
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  //  fromData: [{ id: '1', pid: 0, label: '一级 1', children: [{ id: '1-1', pid: '1', label: '二级 1-1', children: [] }, { id: '1-2', pid: '1', label: '二级 1-2', children: [{ id: '1-2-1', pid: '1-2', children: [], label: '二级 1-2-1' }, { id: '1-2-2', pid: '1-2', children: [], label: '二级 1-2-2' }] }] },
  //       { id: '2', pid: 0, label: '一级 2', children: [{ id: '2-1', pid: '2', label: '二级 2-1', children: [] }, { id: '2-2', pid: '2', label: '二级 2-2', children: [{ id: '2-2-1', pid: '2-2', children: [], label: '二级 2-2-1' }, { id: '2-2-2', pid: '2-2', children: [], label: '二级 2-2-2' }] }] }],
  data() {
    return {
      data: {
        userResuorceList: [],
        defaultData: [],
        TargetData: [],
        row: {},
        setRolDialog: false,
        fromData: [],
        options: {
          title: [
            '待选权限',
            '已选权限'
          ]
        },
        toData: [],
        mode: 'transfer', // transfer addressList
        tableList: this.dataList, // 表格数据源
        searchDialogOptions: searchDialogOptions, // 查询弹窗创建项options数组
        deleteDialogOptions: deleteDialogOptions, // 删除弹窗创建项options数组
        searchDialog: false, // 搜索弹窗显示控制变量
        deleteDialog: false, // 删除弹窗显示控制变量
        tableHeader: tableHeader, // 表格表头信息数组
        defaultPa: {
          roleName: '',
          roleCode: '',
          permissionResponseVo: [],
          userName: []
        },
        curow: {},
        sendList: []
      }
    }
  },
  watch: {
    dataList: {
      handler(newVal) {
        this.data.tableList = newVal
      },
      deep: true
    }
  },
  async created() {
  },
  beforeDestroy() {
    this.data = null
  },
  methods: {
    openD(row) {
      this.data.deleteDialog = true
      this.curow = row
    },
    setChidlren(item) {
      const that = this
      if (item.childNodes) {
        item['children'] = item.childNodes
        delete item['childNodes']
        item.children.map(e => {
          that.setChidlren(e)
        })
      } else {
        return false
      }
    },
    // 使用递归为请求到的后台数据的每一项添加一个对应树形结构的pid
    setPid(item) {
      const that = this
      if (item.children) {
        item.children.map(e => {
          // 子级中的pid等于其父级中的id
          e['pid'] = item.id
          that.setPid(e)
        })
      } else {
        return false
      }
    },
    // 使用递归,设置所有id,保留最底层id不变
    setId(item) {
      const that = this
      if (item.children) {
        item.children.map((e, index) => {
          // 子级中的pid等于其父级中的id
          e.id = item.id + '-' + (index + 1)
          that.setId(e)
        })
      } else {
        return false
      }
    },
    // 使用递归查找最终子元素
    getTarget(item, arr) {
      const that = this
      // 如果内部还有children,那么反复递归当前函数, arr为存储所有符合条件值的数组
      if (item.children) {
        item.children.map(e => {
          that.getTarget(e, arr)
        })
      } else {
        // 如果没有, 那么证明当前这个子元素就是最小子节点的元素, 即,
        arr.push(item)
      }
    },
    // 使用递归,获取到每一次添加或移除后toData中的最终子元素(没有children的元素)的集合
    getTbs(toData) {
      const arr = []
      toData.map(item => {
        if (item.children) {
          this.getTarget(item, arr)
        } else {
          arr.push(item)
          return false
        }
      })
      return arr
    },
    async setRole() {
      // 在这里判断一下是否是所有里面包含的权限
      const arr = []
      console.log(this.data.sendList.length)
      this.data.sendList.forEach(item => {
        arr.push({
          roleCode: this.data.row.roleCode,
          resourceCode: item.resourceCode,
          creator: this.$store.getters.name,
          option: item.option,
          parentId: item.parentId,
          systemId: 10
        })
      })
      const params = {
        list: arr
      }
      console.log(arr, '传递的数组')
      const res = await setRoleFuction(params)
      if (res) {
        this.$notify({
          title: '成功',
          type: 'success',
          message: '设置权限成功',
          duration: 2000
        })
        this.data.setRolDialog = false
        this.data.sendList = []
        this.handleClose()
        this.$emit('getList')
      }
    },
    async openSetRoleDialog(row) {
      this.data.setRolDialog = true
      this.data.row = row
      const res = await getallResuorce()
      const arr = res.data.data
      arr.map((item, index) => {
        item['pid'] = 0
        item.id = `${index + 1}`
        item['children'] = item.childNodes
        this.setChidlren(item)
        this.setId(item)
        this.setPid(item)
      })
      const currentList = []
      arr.forEach(item => {
        this.getMore(item, currentList)
      })
      // 用户当前的权限
      const res2 = await getUserResuorce(row.roleCode, '10')
      const arr2 = res2.data.data
      arr2.map((item, index) => {
        item['children'] = item.childNodes
        this.setChidlren(item)
      })
      // 先筛选出没有子元素的
      const arr3 = this.getTbs(arr2)
      const targetList = []
      arr3.forEach(item => {
        // 遍历去比较这个相同的地方, 提取出相同项的id,
        currentList.forEach(e => {
          if (e.resourceCode === item.resourceCode) {
            targetList.push(e.id)
          }
        })
      })
      // 保存用户所有权限列表
      this.data.userResuorceList = arr3
      // 保存所有列表
      this.data.fromData = arr
      // 保存默认选中列表
      this.data.defaultData = targetList
    },
    add(fromData, toData, obj) {
      // 增加, 增加所有层级
      const arr = [...obj.halfNodes, ...obj.nodes]
      console.log(arr, '增加的东西')
      arr.forEach(item => {
        item['option'] = '1'
        this.data.sendList = this.data.sendList.filter(e => e.id !== item.id)
        this.data.sendList.push(item)
      })
    },
    remove(fromData, toData, obj) {
      // 移除, 移动单个
      const arr = []
      console.log(obj, '移动的数组')
      obj.nodes.forEach(item => {
        arr.push(item)
      })
      // const arr = this.getTbs(obj.nodes)
      console.log(arr, '减少的数组')
      arr.forEach(item => {
        item['option'] = '0'
        this.data.sendList = this.data.sendList.filter(e => e.id !== item.id)
        this.data.sendList.push(item)
      })
    },
    // 使用递归查找最终子元素
    getMore(item, arr) {
      const that = this
      const obj = {
        id: item.id,
        resourceCode: item.resourceCode
      }
      arr.push(obj)
      // 如果内部还有children,那么反复递归当前函数, arr为存储所有符合条件值的数组
      if (item.children) {
        item.children.map(e => {
          that.getMore(e, arr)
        })
      }
    },
    // 打开查询
    async openSearchDialog(row) {
      this.data.searchDialog = true
      try {
        const res = await getUserList(row.roleCode)
        row['userName'] = res.data.data
      } catch (e) {
        this.$message.error('用户获取失败')
        this.data.datadefaultPa = {
          roleName: row.roleName,
          roleCode: row.roleCode,
          permissionResponseVo: [],
          userName: []
        }
      }
      try {
        const res1 = await getResource(row.roleCode)
        const ReData = res1.data.data
        row['permissionResponseVo'] = ReData
      } catch (e) {
        this.$message.error('权限获取失败')
        this.data.datadefaultPa = {
          roleName: row.roleName,
          roleCode: row.roleCode,
          permissionResponseVo: [],
          userName: row.userName
        }
      }
      this.data.defaultPa = row
    },
    handleClose() {
      this.data.fromData = []
      this.data.toData = []
    },
    // 删除用户
    async deleteNowConfirm(params1) {
      const params = [{
        roleCode: this.curow.roleCode,
        systemId: 10
      }]
      this.$axios({
        method: 'delete',
        url: '/api/api/v1/role',
        data: params
      }).then(res => {
        this.$notify({
          title: '成功',
          type: 'success',
          message: '删除角色成功',
          duration: 2000
        })
        this.data.deleteDialog = false
        this.$emit('getList')
      }).catch(e => {
        this.$notify({
          title: '错误',
          type: 'error',
          message: '删除角色失败',
          duration: 2000
        })
      })
      // const res = await delUser({ list: params })
      // console.log(res)
    }
  }
}
</script>
