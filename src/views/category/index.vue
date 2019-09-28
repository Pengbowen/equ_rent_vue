<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin:15px"
      @click="form.visiable = true"
    >添加类别</el-button>
    <el-table
      :data="categoryList"
      style="width: 100%;margin-bottom: 20px;"
      stripe
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="名称" sortable width="180" />
      <el-table-column prop="description" label="描述" sortable width="180" />
      <el-table-column prop="picture" label="图片访问地址（鼠标移上可预览）">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.picture" trigger="hover" placement="left">
            <img :src="scope.row.picture" style="width:200px;heiht:200px;" >
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.picture }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              v-if="scope.row.pid == 0"
              title="添加子类别"
              icon="el-icon-plus"
              size="mini"
              @click="addChild(scope.row)"
            />
            <el-button
              type="primary"
              size="mini"
              title="编辑"
              icon="el-icon-edit"
              @click="edit(scope.row)"
            />
            <el-button
              type="danger"
              title="删除"
              icon="el-icon-delete"
              size="mini"
              @click="delete(scope.row.id)"
            />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增类别" :visible.sync="form.visiable" @close="closeDialog">
      <el-form ref="dialogForm" :model="form.formData" :rules="rules" label-width="100px">
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="form.formData.name" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.formData.sort" type="number" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.formData.description" />
        </el-form-item>
        <el-form-item label="图片" prop="component">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="http://localhost:8080/category/add"
            :show-file-list="false"
            :on-success="addSuccess"
            :auto-upload="false"
            :data="form.formData"
            :on-change="beforeAvatarUpload"
            :on-error="addFail"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即添加</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import * as CategoryApi from '../../api/category_api';
export default {
  data() {
    return {
      categoryList: [],
      form: {
        status: 0, // 0-新增父类别状态 1-新增子类别状态 2-编辑状态
        visiable: false,
        formData: {
          id: '',
          pid: '',
          sort: '',
          name: '',
          description: '',
          picture: '',
          children: []
        }
      },
      imageUrl: '',
      rules: {
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        sort: [
          {
            required: true,
            type: 'number',
            message: '请输入排序序号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      CategoryApi.getList().then(res => {
        if (res.data.code === 20000) {
          this.categoryList = res.data.data
        } else {
          this.$message({
            message: '加载失败',
            type: 'error'
          })
        }
      })
    },
    edit(rowData) {},
    delete(id) {},
    add() {},
    addChild(rowData) {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log('上传成功')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.imageUrl = URL.createObjectURL(file.raw)
      return isJPG && isLt2M
    },
    submitForm() {
      this.$refs.upload.submit()
    },
    addSuccess(res) {
      debugger
      if (res.code === 20000) {
        this.loadData()
        this.form.visiable = false
        this.$refs.dialogForm.resetField()
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '添加失败',
          type: 'error'
        })
      }
    },
    addFail(res) {
      this.$message({
        message: '添加失败',
        type: 'error'
      })
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
