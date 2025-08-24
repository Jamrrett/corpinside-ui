<template>
  <div>
    <el-tag effect="dark" class="my-tag">
      <div style="width: 90%;padding: 0 20px 0 20px;margin: 0 auto">
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
      </div>
    </el-tag>
    <div class="page-container">
      <el-form :model="article" :rules="rules" ref="ruleForm" label-width="51px" style="width: 100%"
               class="demo-ruleForm">
        <el-form-item label="标题" prop="articleTitle">
          <el-input maxlength="30" v-model="article.articleTitle"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="articleContent">
          <mavon-editor ref="md" v-model="article.articleContent"/>
        </el-form-item>

        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="article.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="分类" prop="sortId">
          <el-select v-model="article.sortId" placeholder="请选择分类">
            <el-option
              v-for="item in sorts"
              :key="item.id"
              :label="item.sortName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="article.sortId !== '3'" label="公司" prop="corporationId">
          <el-select v-model="article.corporationId" placeholder="请选择公司">
            <el-option
              v-for="item in corporations"
              :key="item.id"
              :label="item.corporationTitle"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="article.sortId !== '3'" label="部门" prop="departmentId">
          <el-select :disabled="$common.isEmpty(article.corporationId)" v-model="article.departmentId" placeholder="请选择部门">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.departmentTitle"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="myCenter" style="padding-bottom: 22px">
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
import {getCorporationTitles} from "@/utils/data/corporation";
import {getDepartmentsByCorporationId} from "@/utils/data/department";
import {getArticleById, getNewArticleId} from "@/utils/data/article";

import {getCorporationById} from "@/utils/data/corporation";
import {getDepartmentById} from "@/utils/data/department";
import {getFormattedCurrentTime, copyFormattedData} from "@/utils/helper";

export default {
  data() {
    return {
      id: this.$route.query.id,
      article: {
        articleTitle: '',
        articleContent: '',
        date: null,
        sortId: null,
        corporationId: null,
        departmentId: null,
      },
      sorts: [],
      corporations: [],
      departments: [],
      rules: {
        articleTitle: [
          {required: true, message: '请输入标题', trigger: 'change'}
        ],
        articleContent: [
          {required: true, message: '请输入内容', trigger: 'change'}
        ],
        date: [
          {required: true, message: '请选择日期', trigger: 'change'}
        ],
        sortId: [
          {required: true, message: '分类', trigger: 'change'}
        ],
        corporationId: [
          {required: true, message: '公司', trigger: 'change'}
        ],
        departmentId: [
          {required: true, message: '部门', trigger: 'blur'}
        ]
      },
      newData: {},
      newDataVisible: false,
      formattedNewData: '',
    };
  },

  watch: {
    'article.corporationId'(newVal, oldVal) {
      if (oldVal !== null) {
        this.article.departmentId = null;
      }
      if (newVal!== null) {
        this.getDepartmentByCorporation();
      }
    }
  },

  created() {
    this.getSortAndCorporation();
  },

  methods: {
    getSortAndCorporation() {
      this.sorts = this.$store.state.sortInfo;
      this.corporations = getCorporationTitles();
      if (!this.$common.isEmpty(this.id)) {
        this.getArticle();
      }
    },
    getDepartmentByCorporation() {
      if (!this.$common.isEmpty(this.article.corporationId)) {
        this.departments = getDepartmentsByCorporationId(this.article.corporationId);
      } else {
        this.departments = [];
      }
    },
    getArticle() {
      this.article = getArticleById(this.id);
      this.getDepartmentByCorporation();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$common.isEmpty(this.id)) {
            this.saveArticle(this.article);
          } else {
            this.article.id = this.id;
            this.saveArticle(this.article);
          }
        } else {
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
          this.getArticle();
        }
        this.$message({
          message: '重置成功！',
          type: 'success'
        });
      }).catch(() => {});
    },
    saveArticle(value) {
      this.$confirm('确认保存？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        if (value.sortId === '3') {
          value.corporationId = undefined;
          value.departmentId = undefined;
        }
        const newCorporation = getCorporationById(value.corporationId);
        const newDepartment = getDepartmentById(value.departmentId);
        const newCorporationSortInfo = this.$store.state.sortCorporationInfo.find(item => item.id === newCorporation?.sortId);
        const nowTime = getFormattedCurrentTime();
        this.newData = {
          id: this.id || getNewArticleId(),
          sortId: value.sortId,
          userId: this.$store.state.currentUser.id,
          username: this.$store.state.currentUser.username,
          articleTitle: value.articleTitle,
          articleContent: value.articleContent,
          corporationId: value.corporationId,
          corporationTitle: newCorporation?.corporationTitle,
          departmentId: value.departmentId,
          departmentTitle: newDepartment?.departmentTitle,
          sortCorporationId: newCorporation?.sortId,
          sortCorporationName: newCorporationSortInfo?.sortName,
          date: value.date,
          createTime: value.createTime || nowTime,
          updateTime: nowTime,
          recommendStatus: false
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
    padding: 0;
  }

  .page-container {
    width: 90%;
    background: var(--background);
    margin: 0 auto;
    display: flex;
    padding: 0 20px 0 20px;

    .v-note-wrapper {
      z-index: 2;
    }

    .v-note-wrapper.fullscreen {
      z-index: 9999;
    }
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
