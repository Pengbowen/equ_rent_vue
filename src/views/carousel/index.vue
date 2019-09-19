<template>
  <div>
    <el-carousel
      :interval="4000"
      type="card"
      height="150px"
      style="width:500px;
      margin: 0 auto;
      text-align:center;
      "
    >
      <el-carousel-item
        v-for="item in tableData.filter(obj=>obj.enable==true)"
        :key="item.name"
        style="width:300px;text-align:center;"
      >
        <img width="300" height="150" :src="item.src" >
      </el-carousel-item>
    </el-carousel>
    <el-button type="primary" style="margin-left:20px" @click="dialogFormVisible = true">
      上传
      <i class="el-icon-upload el-icon--right" />
    </el-button>

    <el-table
      border
      :data="tableData"
      style="width: 100%;margin-top:10px;"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="src" label="图片访问地址（鼠标移上可预览）">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <img :src="scope.row.src" style="width:280px;heiht:180px;" >
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.src }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="图片存放位置" />
      <el-table-column prop="sort" label="排序" width="180" />
      <el-table-column prop="enable" label="启用状态">
        <template scope="scope">
          <el-switch v-model="scope.row.enable" @change="changeStatus(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="上传新的轮播图" :visible.sync="dialogFormVisible">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="http://localhost:8080/file/batchUploadImg"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :on-success="uploadSuccess"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import * as CarsouelApi from "../../api/carsouel_api";
import { MessageBox, Message } from "element-ui";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      fileList: []
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData() {
      CarsouelApi.getList().then(res => {
        this.tableData = res.data;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    changeStatus(obj) {
      CarsouelApi.updateCarsouel(obj).then(res => {
        this.$message({
          message: "修改成功",
          type: "success"
        });
      });
    },
    handleDelete(index, obj) {
      CarsouelApi.deleteCarsouel(obj.id).then(res => {
        this.tableData.splice(index, 1);
        this.$message({
          message: "删除成功",
          type: "success"
        });
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    uploadSuccess(response, file, fileList) {
      this.dialogFormVisible = false;
      this.loadData();
      this.fileList = [];
    }
  }
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  width: 50%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>