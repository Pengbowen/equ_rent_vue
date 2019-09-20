<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true">添加一级菜单</el-button>
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
      <el-table-column prop="meta.icon" label="菜单图标" />
      <el-table-column prop="meta.breadcrumb" label="面包屑" />
      <el-table-column prop="meta.noCache" label="禁止缓存" />
    </el-table>
    <el-dialog title="新增菜单路由" :visible.sync="addFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="访问地址" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="组件路径" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="重定向地址" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="可见性" prop="delivery">
          <el-switch v-model="ruleForm.delivery" active-text="隐藏" inactive-text="可见" />
        </el-form-item>
        <el-form-item label="默认展开" prop="delivery">
          <el-switch v-model="ruleForm.delivery" active-text="开" inactive-text="关" />
        </el-form-item>
        <el-form-item label="缓存控制" prop="delivery">
          <el-switch v-model="ruleForm.delivery" active-text="开" inactive-text="关" />
        </el-form-item>
        <el-form-item label="面包屑状态" prop="delivery">
          <el-switch v-model="ruleForm.delivery" active-text="显示" inactive-text="不显示" />
        </el-form-item>
        <!-- <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery" />
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type" />
            <el-checkbox label="地推活动" name="type" />
            <el-checkbox label="线下主题活动" name="type" />
            <el-checkbox label="单纯品牌曝光" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助" />
            <el-radio label="线下场地免费" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import * as RouterMenuApi from "../../api/router_api";
export default {
  data() {
    return {
      addFormVisible: false,
      menuList: [],
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  mounted: function() {
    RouterMenuApi.getList().then(res => {
      if (res.code === 20000) {
        this.menuList = res.data;
      }
      console.info(res);
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
