<template>
  <div class="order-box clearfix auth-role internal-role-list">
    <!--搜索项-->
    <div class="filter-container clearfix">
      <el-button v-show="resourceCode.indexOf('createdRole') != -1" class="filter-item fr" type="primary" @click="handleAdd()">
        添加
      </el-button>
    </div>
    <!--表格-->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :header-cell-style="{
        background: '#204060',
        color: 'white'
      }"
      border
      fit
      height="calc(100vh - 140px)"
      class="role-list-tabel-css"
      highlight-current-row>
      <el-table-column
        type="index"/>
      <el-table-column label="角色权限" prop="roleName" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }} </span>
        </template>
      </el-table-column>
      <el-table-column label="权限列表" prop="permissionList" align="center" >
        <template slot-scope="scope">
          <permission-item ref="permissionItem" :permission="scope.row.permissionResponseVo" :frist-menu="fristMenu"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-show="resourceCode.indexOf('modifyRole') != -1" type="text" size="small" @click="handleEdit(scope.row)" >编辑</el-button>
          <el-button type="text" size="small" @click="handleView(scope.row)" >查看</el-button>
          <el-button v-show="resourceCode.indexOf('deleteRole') != -1" type="text" size="small" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-col :span="24" class="text-position-right">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-col>
    <!--查看-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" label-position="left" label-width="120px" class="marginLeft50-width400">
        <el-form-item label="角色名称" prop="roleName">
          {{ temp.roleName }}
        </el-form-item>
        <el-form-item label="权限列表" prop="roleName">
          <permission-item ref="permissionItem" :permission="temp.permissionResponseVo" :frist-menu="fristMenu" :show="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-waves @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogEditVisible">
      <el-form ref="dataForm" label-position="left" label-width="120px" class="marginLeft50-width400">
        <el-form-item v-model="temp['roleName']" label="角色名称" prop="roleName">
          {{ temp.roleName }}
        </el-form-item>
        <el-form-item label="权限列表" prop="resourceCodes">
          <el-tree
            ref="treeEdit"
            :data="allResource"
            :default-checked-keys="itemChecked"
            :props="defaultProps"
            node-key="id"
            show-checkbox
            default-expand-all
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-position-center">
        <el-button v-waves :disabled="temp.editSubmitDisabled" type="primary" @click="submitEdit()" >提交</el-button>
        <el-button v-waves @click="resetEditRole()">关闭</el-button>
      </div>
    </el-dialog>
    <!--添加-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogAddVisible">
      <el-form ref="dataForm" label-position="left" label-width="120px" class="marginLeft50-width400">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleName" :value="addRoleName" maxlength="40" autocomplete="off" clearable />
          <i v-show="addTemp.showNotice && addTemp.roleNameAvailable" class="el-icon-success color67c23a">角色名称可用</i>
          <i v-show="addTemp.showNotice && !addTemp.roleNameAvailable" class="el-icon-warning colore6a23c">角色名称不可用</i>
        </el-form-item>
        <el-form-item label="权限列表" prop="resourceCodes">
          <el-tree
            ref="treeAdd"
            :data="allResource"
            :default-checked-keys="itemAddChecked"
            :props="defaultProps"
            node-key="id"
            show-checkbox
            default-expand-all
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-position-center">
        <el-button v-waves :disabled="addTemp.addSubmitDisabled" type="primary" @click="submitAdd()" >提交</el-button>
        <el-button v-waves @click="resetAddRole()">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import roleList from './roleList'
import Pagination from '@/components/Pagination'
import PermissionItem from '@/views/role/components/permissionItem'
export default {
  name: 'Role',
  components: { Pagination, PermissionItem },
  ...roleList
}
</script>
<style lang="scss" scoped>
@import '@styles/roleInternalList.scss';
</style>
