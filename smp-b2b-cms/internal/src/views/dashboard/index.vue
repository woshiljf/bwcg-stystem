<template>
  <!-- <div class="dashboard-container">
    <component :is="currentRole"/>
  </div> -->
  <el-container class="order-box welcome">
    <edit-model
      ref="editView"
      :default-parameters="parameters"
      :options="enums.editOptions"
      :item="chosenItem"
      :rules="enums.rules"
      api="/sys/users"
      custom-class="detail-model-small"
      @callback="optionCallback"/>
    <el-header class="auth_name">
      <div>欢迎您  {{ $store.getters.name }}</div>
      <div><span v-for="item in $store.getters.roleName" :key="item"> {{ item }}</span></div>
    </el-header>
    <el-main>
      <!-- <el-button v-preventReClick type="primary" @click.prevent="pay(1, 2, 3)">dianji</el-button> -->
      <!-- {{ isDisable }} -->
    </el-main>
    <el-footer>
      copyright @ 昆山宝唯信息科技有限公司上海分公司
    </el-footer>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import editModel from '@/components/editModel'
import enums from '@/components/editModel/user-enums'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard, editModel },
  data() {
    return {
      // data2: [],
      // data1: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      // pageSize: 2,
      // currentPage4: 4,
      isDisable: false,
      textarea2: '',
      enums: enums,
      chosenItem: {},
      currentRole: 'adminDashboard',
      loading: false,
      parameters: {
        id: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (sessionStorage.getItem('urlName') !== '主页') {
      window._paq.push(['setDocumentTitle', '主页'])
      window._paq.push(['trackPageView'])
      sessionStorage.setItem('urlName', '主页')
    }
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
    console.log(this.$store, '登录人信息')
  },
  methods: {
    async pay(num, num1, num2) {
      const params = ''
      const res = await this.$api.physicalInventory(params)
      // const res = await this.tryThrow(params, 'physicalInventory', '创建成功', this.isDisable)
      console.log(res, 'jieguo')
    },
    edit(item) {
      item['userType'] = '' + item['type']
      this.chosenItem = item
      this.parameters.id = item.id
      this.$refs.editView.handleVisible()
    },
    optionCallback() {
    }
  }
}
</script>
<style scoped>
.order-box {
  display: block;
  width:100%;
  padding: 15px 40px;
}
.app-main {
  position: relative;
}
.el-header {
  line-height: 100px;
}
.el-header .el-col {
  font-size: 18px;
}
.el-main {
  height: 100%;
}
.el-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 12px;
  /* margin: 15px 40px; */
}
.auth_name {
  text-align:center;
}
</style>

