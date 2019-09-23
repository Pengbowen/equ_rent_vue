<template>
  <div>
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
  </div>
</template>
<script>
import * as CategoryApi from "../../api/category_api";
export default {
  data() {
    return {
      categoryList: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      CategoryApi.getList().then(res => {
        if (res.data.code === 20000) {
          this.categoryList = res.data.data;
        } else {
          this.$message({
            message: "加载失败",
            type: "error"
          });
        }
      });
    },
    edit(rowData) {},
    delete(id) {},
    add() {},
    addChild(rowData) {}
  }
};
</script>
