<template>
  <div>
    <el-tag effect="dark" class="my-tag">
      <svg viewBox="0 0 1024 1024" width="20" height="20" style="vertical-align: -3px;">
        <path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01"></path>
        <path
          d="M682.666667 204.8h238.933333a34.133333 34.133333 0 0 1 34.133333 34.133333v648.533334a68.266667 68.266667 0 0 1-68.266666 68.266666h-204.8V204.8z"
          fill="#FFAA44"></path>
        <path
          d="M68.266667 921.6a34.133333 34.133333 0 0 0 34.133333 34.133333h785.066667a68.266667 68.266667 0 0 1-68.266667-68.266666V102.4a34.133333 34.133333 0 0 0-34.133333-34.133333H102.4a34.133333 34.133333 0 0 0-34.133333 34.133333v819.2z"
          fill="#11AA66"></path>
        <path
          d="M238.933333 307.2a34.133333 34.133333 0 0 0 0 68.266667h136.533334a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h409.6a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h204.8a34.133333 34.133333 0 1 0 0-68.266667H238.933333z"
          fill="#FFFFFF"></path>
      </svg>
      文章信息
    </el-tag>
    <el-form :model="department" :rules="rules" ref="ruleForm" label-width="110px"
             class="demo-ruleForm">
      <el-form-item label="名称" prop="departmentTitle">
        <el-input maxlength="30" v-model="department.departmentTitle"></el-input>
      </el-form-item>

      <el-form-item label="介绍" prop="departmentContent">
        <mavon-editor ref="md" v-model="department.departmentContent"/>
      </el-form-item>

      <el-form-item label="公司" prop="corporationId">
        <el-select v-model="department.corporationId" placeholder="请选择公司">
          <el-option
            v-for="item in corporations"
            :key="item.id"
            :label="item.corporationTitle"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="myCenter" style="margin-bottom: 22px">
      <el-button type="info"  style="margin-right: 30px" @click="resetForm('ruleForm')">重置所有修改</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </div>
    <el-dialog title="新数据对象" :visible.sync="newDataVisible" center>
      <div class="data-container">
        <pre class="formatted-data">{{ formattedNewData }}</pre>
        <div class="copy-button">
          <el-button type="primary" icon="el-icon-document-copy" @click="copyFormattedData">
            复制
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getCorporationTitles, getNewCorporationId} from "@/utils/data/corporation";
import {getDepartmentById, getNewDepartmentId} from "@/utils/data/department";
import {getFormattedCurrentTime, copyFormattedData} from "@/utils/helper";

export default {
  data() {
    return {
      id: this.$route.query.id,
      department: {
        departmentTitle: '',
        departmentContent: '',
        corporationId: ''
      },
      corporations: [],
      rules: {
        departmentTitle: [
          {required: true, message: '请输入名称', trigger: 'change'}
        ],
        departmentContent: [
          {required: true, message: '请输入内容', trigger: 'change'}
        ],
        corporationId: [
          {required: true, message: '公司', trigger: 'change'}
        ],
      },
      newData: {},
      newDataVisible: false,
      formattedNewData: '',
    };
  },

  created() {
    this.getCorporations();
  },

  methods: {
    getCorporations() {
      this.corporations = getCorporationTitles();
      if (!this.$common.isEmpty(this.id)) {
        this.getDepartment();
      }
    },
    getDepartment() {
      this.department = getDepartmentById(this.id);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$common.isEmpty(this.id)) {
            this.saveDepartment(this.department);
          } else {
            this.department.id = this.id;
            this.saveDepartment(this.department);
          }
        } else {
          console.log(valid);
          this.$message({
            message: '请完善必填项！',
            type: 'error'
          });
        }
      });
    },
    resetForm(formName) {
      this.$confirm('确认重置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      }).then(() => {
        this.$refs[formName].resetFields();
        if (!this.$common.isEmpty(this.id)) {
          this.getDepartment();
        }
        this.$message({
          message: '重置成功！',
          type: 'success'
        });
      }).catch(() => {});
    },
    saveDepartment(value) {
      this.$confirm('确认保存？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        const nowTime = getFormattedCurrentTime();
        this.newData = {
          id: this.id || getNewDepartmentId(),
          sortId: value.sortId,
          departmentTitle: value.departmentTitle,
          departmentContent: value.departmentContent,
          corporationId: value.corporationId,
          createTime: value.createTime || nowTime,
          updateTime: nowTime,
        };
        this.newDataVisible = true;
        this.formattedNewData = JSON.stringify(this.newData, null, 2);
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消保存!'
        });
      });
    },
    copyFormattedData,
  }
};
</script>

<style scoped>

  .my-tag {
    margin-bottom: 20px;
    width: 100%;
    text-align: left;
    background: var(--lightYellow);
    border: none;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: var(--black);
  }

  .table-td-thumb {
    border-radius: 2px;
    width: 40px;
    height: 40px;
  }

  .el-switch {
    margin-left: 10px;
  }

  .el-form-item {
    margin-bottom: 40px;
  }

  .data-container {
    position: relative;

    .formatted-data {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
      max-height: 400px;
      font-family: monospace;
      font-size: 14px;
    }

    .copy-button {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
</style>
