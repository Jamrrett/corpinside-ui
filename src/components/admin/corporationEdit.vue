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
    <el-form :model="corporation" :rules="rules" ref="ruleForm" label-width="110px"
             class="demo-ruleForm">
      <el-form-item label="名称" prop="corporationTitle">
        <el-input maxlength="30" v-model="corporation.corporationTitle"></el-input>
      </el-form-item>

      <el-form-item label="介绍" prop="corporationContent">
        <mavon-editor ref="md" v-model="corporation.corporationContent"/>
      </el-form-item>

      <el-form-item label="Logo" prop="corporationLogo">
        <el-input v-model="corporation.corporationLogo">
          <template slot="prepend">images/logos/</template>
        </el-input>
      </el-form-item>

      <el-form-item label="封面" prop="corporationCover">
        <el-input v-model="corporation.corporationCover">
          <template slot="prepend">images/covers/</template>
        </el-input>
      </el-form-item>

      <el-form-item label="分类" prop="sortId">
        <el-select v-model="corporation.sortId" placeholder="请选择分类">
          <el-option
            v-for="item in sorts"
            :key="item.id"
            :label="item.sortName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="行业" prop="industry">
        <el-input v-model="corporation.industry"></el-input>
      </el-form-item>

      <el-form-item label="成立年份" prop="foundedYear">
        <el-input v-model="corporation.foundedYear"></el-input>
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
import {getSortCorporationInfo} from "@/utils/data/sortCorporation";
import {getCorporationById, getNewCorporationId} from "@/utils/data/corporation";
import {getFormattedCurrentTime, copyFormattedData} from "@/utils/helper";

export default {
  data() {
    return {
      id: this.$route.query.id,
      corporation: {
        corporationTitle: '',
        corporationContent: '',
        corporationLogo: '',
        corporationCover: '',
        sortId: null,
        industry: '',
        foundedYear: '',
      },
      sorts: [],
      rules: {
        corporationTitle: [
          {required: true, message: '请输入名称', trigger: 'change'}
        ],
        corporationContent: [
          {required: true, message: '请输入内容', trigger: 'change'}
        ],
        corporationLogo: [
          {required: true, message: 'Logo', trigger: 'change'}
        ],
        corporationCover: [
          {required: true, message: '封面', trigger: 'change'}
        ],
        sortId: [
          {required: true, message: '分类', trigger: 'change'}
        ],
        industry: [
          {required: true, message: '请输入行业', trigger: 'change'}
        ],
        foundedYear: [
          {required: true, message: '请输入成立年份', trigger: 'change'}
        ],
      },
      newData: {},
      newDataVisible: false,
      formattedNewData: '',
    };
  },

  created() {
    this.getSortCorporation();
  },

  methods: {
    getSortCorporation() {
      this.sorts = getSortCorporationInfo();
      if (!this.$common.isEmpty(this.id)) {
        this.getCorporation();
      }
    },
    getCorporation() {
      this.corporation = getCorporationById(this.id);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$common.isEmpty(this.id)) {
            this.saveCorporation(this.corporation);
          } else {
            this.corporation.id = this.id;
            this.saveCorporation(this.corporation);
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
          this.getCorporation();
        }
        this.$message({
          message: '重置成功！',
          type: 'success'
        });
      }).catch(() => {});
    },
    saveCorporation(value) {
      this.$confirm('确认保存？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        const nowTime = getFormattedCurrentTime();
        this.newData = {
          id: this.id || getNewCorporationId(),
          sortId: value.sortId,
          corporationTitle: value.corporationTitle,
          corporationLogo: value.corporationLogo,
          corporationCover: value.corporationCover,
          corporationContent: value.corporationContent,
          industry: value.industry,
          foundedYear: value.foundedYear,
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
