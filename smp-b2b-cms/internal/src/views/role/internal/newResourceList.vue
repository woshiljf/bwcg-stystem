<template>
  <div class="order-box newListBox">
    <!-- 头部信息 -->
    <new-list-header @getList="getList"/>
    <!-- 表格 -->
    <new-list-table :data-list="tableData" :loading="loading" @getList="getList"/>
    <!-- 分页器 -->
    <page-common
      ref="page"
      :page-size-list="[20, 50, 100]"
      :default-parameters="defaultParams"
      api="/api/api/V2/resource"
      method="get"
      @query="query"
      @loading="load"
    />
  </div>
</template>

<script>
import moment from 'moment'
import PageCommon from './components/PageCommon'
import NewListHeader from './newResourceListHeader'
import NewListTable from './newResourceListTable'
export default {
  name: 'NewResourceList',
  components: {
    NewListHeader,
    PageCommon, // 分页组件
    NewListTable
  },
  data() {
    return {
      moment: moment,
      tableData: [],
      loading: false,
      defaultParams: { resourceType: ' ' }
    }
  },
  beforeDestroy() {
    this.tableData = null
    this.loading = null
  },
  methods: {
    getList(str) {
      if (str) {
        this.$refs.page.getList({ resourceType: str })
      } else {
        this.$refs.page.getList({ resourceType: 'all' })
      }
    },
    // 搜索查询返回结果data函数
    query(data) {
      data.map(item => {
        item.createTime = moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
        item.lastUpdateTime = moment(item.lastUpdateTime).format('YYYY/MM/DD HH:mm:ss')
      })
      this.tableData = data
      console.log(this.tableData, 'zheli123123')
    },
    // 加载表格数据渲染动画函数
    load(status) {
      this.loading = status
    }
  }
}
</script>
