<template>
  <div>
    <el-tree :data="permissionValue" :show-checkbox="showCheckbox" :default-expand-all="show" :props="defaultProps" @node-click="handleNodeClick"/>
  </div>
</template>

<script>
export default {
  name: 'PermissionItem',
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    showCheckbox: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    fristMenu: {
      type: Array,
      default: () => {
        return []
      }
    },
    permission: {
      type: Array,
      default: () => {
        return [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }]
      }
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    permissionValue: {
      get() {
        const m = new Map()
        // console.log(typeof this.fristMenu)
        // console.log(this.fristMenu)
        for (const i of this.fristMenu) {
          for (const j of this.permission) {
            if (i.id === j.parentId && !m.has(i.remark)) {
              m.set(i.remark, i.id)
            }
          }
        }
        // console.log(m, 'res')
        const res = []
        for (const z of m) {
          const item = { id: z[1], label: z[0], children: [] }
          for (const p of this.permission) {
            if (z[1] === p.parentId) {
              item.children.push({ label: p.remark, id: p.id })
            }
          }
          res.push(item)
          // console.log(z)
        }
        // console.log(res, 'res')
        return res
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
