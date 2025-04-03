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
          <mavon-editor ref="md" @imgAdd="imgAdd" v-model="article.articleContent"/>
        </el-form-item>

        <el-form-item label="公司" prop="corporationId">
          <el-select v-model="article.corporationId" placeholder="请选择公司">
            <el-option
              v-for="item in corporations"
              :key="item.id"
              :label="item.corporationTitle"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门" prop="departmentId">
          <el-select :disabled="$common.isEmpty(article.corporationId)" v-model="article.departmentId" placeholder="请选择部门">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.departmentTitle"
              :value="item.id">
            </el-option>
          </el-select>
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
      </el-form>
    </div>
    <div class="myCenter" style="padding-bottom: 22px">
      <el-button type="danger" v-if="!this.$common.isEmpty(this.id)" style="margin-right: 30px" @click="deleteForm('ruleForm')">删除文章</el-button>
      <el-button type="info"  style="margin-right: 30px" @click="resetForm('ruleForm')">重置所有修改</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </div>
  </div>
</template>

<script>

  export default {
    components: {
    },
    data() {
      return {
        id: this.$route.query.id,
        article: {
          articleTitle: "",
          articleContent: "",
          commentStatus: true,
          recommendStatus: false,
          viewStatus: true,
          password: "",
          tips: "",
          articleCover: "",
          videoUrl: "",
          corporationId: null,
          departmentId: null,
          sortId: null
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
          corporationId: [
            {required: true, message: '公司', trigger: 'change'}
          ],
          departmentId: [
            {required: true, message: '部门', trigger: 'blur'}
          ],
          sortId: [
            {required: true, message: '分类', trigger: 'change'}
          ]
        }
      }
    },

    computed: {},

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

    mounted() {

    },

    methods: {
      imgAdd(pos, file) {
        let suffix = "";
        if (file.name.lastIndexOf('.') !== -1) {
          suffix = file.name.substring(file.name.lastIndexOf('.'));
        }
        let key = "articlePicture" + "/" + this.$store.state.currentAdmin.username.replace(/[^a-zA-Z]/g, '') + this.$store.state.currentAdmin.id + new Date().getTime() + Math.floor(Math.random() * 1000) + suffix;

        let storeType = localStorage.getItem("defaultStoreType");

        let fd = new FormData();
        fd.append("file", file);
        fd.append("originalName", file.name);
        fd.append("key", key);
        fd.append("relativePath", key);
        fd.append("type", "articlePicture");
        fd.append("storeType", storeType);

        if (storeType === "local") {
          this.saveLocal(pos, fd);
        } else if (storeType === "qiniu") {
          this.saveQiniu(pos, fd);
        }
      },
      saveLocal(pos, fd) {
        this.$http.upload(this.$constant.baseURL + "/resource/upload", fd, true)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              let url = res.data;
              this.$refs.md.$img2Url(pos, url);
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      saveQiniu(pos, fd) {
        this.$http.get(this.$constant.baseURL + "/qiniu/getUpToken", {key: fd.get("key")}, true)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              fd.append("token", res.data);

              this.$http.uploadQiniu(this.$store.state.sysConfig.qiniuUrl, fd)
                .then((res) => {
                  if (!this.$common.isEmpty(res.key)) {
                    let url = this.$store.state.sysConfig['qiniu.downloadUrl'] + res.key;
                    let file = fd.get("file");
                    this.$common.saveResource(this, "articlePicture", url, file.size, file.type, file.name, "qiniu", true);
                    this.$refs.md.$img2Url(pos, url);
                  }
                })
                .catch((error) => {
                  this.$message({
                    message: error.message,
                    type: "error"
                  });
                });
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      addArticleCover(res) {
        this.article.articleCover = res;
      },
      getSortAndCorporation() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listSortAndCorporations")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.sorts = res.data.sorts;
              this.corporations = res.data.corporations;
              console.log(res.data);
              if (!this.$common.isEmpty(this.id)) {
                this.getArticle();
              }
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      getDepartmentByCorporation() {
        if (!this.$common.isEmpty(this.article.corporationId)) {
          this.$http.get(this.$constant.baseURL + "/department/getDepartmentByCorporationId", {id: this.article.corporationId})
            .then((res) => {
              this.departments = res.data;
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        }
        else {
          this.departments = [];
        }
      },
      getArticle() {
        this.$http.get(this.$constant.baseURL + "/article/getArticleByIdForEdit", {id: this.id})
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.article = res.data;
              this.getDepartmentByCorporation();
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
            this.$router.push({path: `/user/${this.$store.state.currentUser.id}`});
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$common.isEmpty(this.id)) {
              this.saveArticle(this.article, "/article/saveArticle")
            } else {
              this.article.id = this.id;
              this.saveArticle(this.article, "/article/updateArticle")
            }
          } else {
            this.$message({
              message: "请完善必填项！",
              type: "error"
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
            message: "重置成功！",
            type: "success"
          });
        }).catch(() => {});
      },
      deleteForm(formName) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
        }).then(() => {
          this.$http.get(this.$constant.baseURL + "/article/deleteArticle", {id: this.id})
            .then((res) => {
              let articleId = res.data;
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              // this.$router.push({path: '/postList'});
              window.location.replace(`/user/${this.$store.state.currentUser.id}`);
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        }).catch(() => {});
      },
      saveArticle(value, url) {
        this.$confirm('确认保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          this.$http.post(this.$constant.baseURL + url, value)
            .then((res) => {
              let articleId = res.data;
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              // this.$router.push({path: '/postList'});
              window.location.replace(`/article/${articleId}`);
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消保存!'
          });
        });
      }
    }
  }
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
</style>
