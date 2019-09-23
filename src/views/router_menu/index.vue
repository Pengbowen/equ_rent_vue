<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin:15px"
      @click="addFormVisible = true"
    >添加一级菜单</el-button>
    <el-table
      :data="menuList"
      style="width: 100%;margin-bottom: 20px;"
      stripe
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="路由名称" sortable />
      <el-table-column prop="path" label="访问路径" sortable />
      <el-table-column prop="component" label="组件路径" />
      <el-table-column prop="hidden" label="是否隐藏" />
      <el-table-column prop="redirect" label="重定向" />
      <el-table-column prop="alwaysShow" label="始终显示" />
      <el-table-column prop="meta.title" label="菜单名称" />
      <!-- <el-table-column prop="meta.icon" label="菜单图标" />
      <el-table-column prop="meta.breadcrumb" label="面包屑" />
      <el-table-column prop="meta.noCache" label="禁止缓存" />-->
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.children.length > 0"
            type="text"
            size="small"
            @click="deleteRouter(scope.row.id)"
          >新增子菜单</el-button>
          <el-button type="text" size="small" @click="deleteRouter(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="editRouter(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="addStatus?'新增路由菜单':'编辑路由菜单'"
      :visible.sync="addFormVisible"
      @close="closeDialog"
    >
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px">
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="菜单名称" prop="meta.title">
          <el-input v-model="addForm.meta.title" />
        </el-form-item>
        <el-form-item label="访问地址" prop="path">
          <el-input v-model="addForm.path" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="addForm.component" />
        </el-form-item>
        <el-form-item label="重定向地址" prop="redirect">
          <el-input v-model="addForm.redirect" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addForm.sort" />
        </el-form-item>
        <el-form-item label="可见性" prop="hidden">
          <el-switch v-model="addForm.hidden" active-text="隐藏" inactive-text="可见" />
        </el-form-item>
        <el-form-item label="默认展开" prop="alwaysShow">
          <el-switch v-model="addForm.alwaysShow" active-text="开" inactive-text="关" />
        </el-form-item>
        <el-form-item label="缓存控制" prop="meta.noCache">
          <el-switch v-model="addForm.meta.noCache" active-text="开" inactive-text="关" />
        </el-form-item>
        <el-form-item label="面包屑状态" prop="meta.breadcrumb">
          <el-switch v-model="addForm.meta.breadcrumb" active-text="显示" inactive-text="不显示" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">{{ addStatus?'立即添加':'立即修改' }}</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import * as RouterMenuApi from '../../api/router_api';
export default {
  data() {
    return {
      addFormVisible: false, // 弹窗可见状态控制
      addStatus: true, // 弹窗是否新增状态还是编辑状态,如果是新增状态为true,否则为flase
      menuList: [],
      addForm: {
        id: '',
        pid: '',
        name: '',
        path: '',
        hidden: false,
        redirect: '',
        alwaysShow: false,
        component: '',
        sort: '',
        meta: {
          title: '',
          icon: '',
          noCache: false,
          breadcrumb: true
        }
      },
      rules: {}
    }
  },
  mounted: function() {
    this.loadData()
  },
  methods: {
    loadData() {
      RouterMenuApi.getList().then(res => {
        if (res.code === 20000) {
          this.menuList = res.data
          console.info(this.menuList)
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.addStatus) {
            this.addRouter()
          } else {
            this.updateRouter()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addRouter() {
      RouterMenuApi.addParentRouter(this.addForm).then(res => {
        if (res.data.code === 20000) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.menuList.push(res.data.data)
          this.addFormVisible = false
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      })
    },
    updateRouter() {
      RouterMenuApi.updateRouter(this.addForm).then(res => {
        if (res.data.code === 20000) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.loadData()
          this.addFormVisible = false
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      })
    },
    deleteRouter(id) {
      this.$confirm('确认删除此菜单吗？（子菜单一同删除）?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          RouterMenuApi.deleteRouter(id).then(res => {
            if (res.data.code === 20000) {
              this.loadData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editRouter(rowData) {
      this.addStatus = false
      // 深拷贝对象
      this.addForm = JSON.parse(JSON.stringify(rowData))
      this.addFormVisible = true
    },
    closeDialog() {
      if (!this.addStatus) {
        this.addStatus = true
        this.$refs['addForm'].resetFields()
      }
    }
  }
}
</script>
