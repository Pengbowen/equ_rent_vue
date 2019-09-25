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
      <el-table-column prop="picture" label="图片" />
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
          <el-input v-model="form.formData.sort" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.formData.description" />
        </el-form-item>
        <el-form-item label="图片" prop="component">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :auto-upload="false"
            :on-change="beforeAvatarUpload"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">立即添加</el-button>
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
      imageUrl: ''
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
      console.info(file)

      let reader = new FileReader()
      reader.readAsDataURL(file.raw) // 这里也可以直接写参数event.raw

      // 转换成功后的操作，reader.result即为转换后的DataURL ，
      // 它不需要自己定义，你可以console.log(reader.result)看一下
      reader.onload = () => {
        console.log(reader.result)
      };
      this.imageUrl = URL.createObjectURL(file.raw)
      console.info(URL.createObjectURL(file.raw))
      return isJPG && isLt2M
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
