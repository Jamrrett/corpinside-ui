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
        <mavon-editor ref="md" @imgAdd="imgAdd" v-model="department.departmentContent"/>
      </el-form-item>

      <el-form-item label="是否启用评论" prop="commentStatus">
        <el-tag :type="department.commentStatus === false ? 'danger' : 'success'"
                disable-transitions>
          {{department.commentStatus === false ? '否' : '是'}}
        </el-tag>
        <el-switch v-model="department.commentStatus"></el-switch>
      </el-form-item>

      <el-form-item label="是否推荐" prop="recommendStatus">
        <el-tag :type="department.recommendStatus === false ? 'danger' : 'success'"
                disable-transitions>
          {{department.recommendStatus === false ? '否' : '是'}}
        </el-tag>
        <el-switch v-model="department.recommendStatus"></el-switch>
      </el-form-item>

      <el-form-item label="是否可见" prop="viewStatus">
        <el-tag :type="department.viewStatus === false ? 'danger' : 'success'"
                disable-transitions>
          {{department.viewStatus === false ? '否' : '是'}}
        </el-tag>
        <el-switch v-model="department.viewStatus"></el-switch>
      </el-form-item>

      <el-form-item v-if="department.viewStatus === false" label="不可见时的访问密码" prop="password">
        <el-input maxlength="30" v-model="department.password"></el-input>
      </el-form-item>

      <el-form-item v-if="department.viewStatus === false" label="密码提示" prop="tips">
        <el-input maxlength="60" v-model="department.tips"></el-input>
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
        department: {
          departmentTitle: "",
          departmentContent: "",
          commentStatus: true,
          recommendStatus: false,
          viewStatus: true,
          password: "",
          tips: "",
          corporationId: ""
        },
        corporations: [],
        rules: {
          departmentTitle: [
            {required: true, message: '请输入名称', trigger: 'change'}
          ],
          departmentContent: [
            {required: true, message: '请输入内容', trigger: 'change'}
          ],
          commentStatus: [
            {required: true, message: '是否启用评论', trigger: 'change'}
          ],
          recommendStatus: [
            {required: true, message: '是否推荐', trigger: 'change'}
          ],
          viewStatus: [
            {required: true, message: '是否可见', trigger: 'change'}
          ],
          corporationId: [
            {required: true, message: '公司', trigger: 'change'}
          ]
        }
      }
    },

    created() {
      this.getCorporations();
    },

    mounted() {

    },

    methods: {
      imgAdd(pos, file) {
        let suffix = "";
        if (file.name.lastIndexOf('.') !== -1) {
          suffix = file.name.substring(file.name.lastIndexOf('.'));
        }
        let key = "departmentPicture" + "/" + this.$store.state.currentAdmin.username.replace(/[^a-zA-Z]/g, '') + this.$store.state.currentAdmin.id + new Date().getTime() + Math.floor(Math.random() * 1000) + suffix;

        let storeType = localStorage.getItem("defaultStoreType");

        let fd = new FormData();
        fd.append("file", file);
        fd.append("originalName", file.name);
        fd.append("key", key);
        fd.append("relativePath", key);
        fd.append("type", "departmentPicture");
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
                    this.$common.saveResource(this, "departmentPicture", url, file.size, file.type, file.name, "qiniu", true);
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
      getCorporations() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listSortAndCorporations")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.corporations = res.data.corporations;
              if (!this.$common.isEmpty(this.id)) {
                this.getDepartment();
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
      getDepartment() {
        this.$http.get(this.$constant.baseURL + "/admin/department/getDepartmentById", {id: this.id}, true)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.department = res.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$common.isEmpty(this.id)) {
              this.saveDepartment(this.department, "/department/saveDepartment")
            } else {
              this.department.id = this.id;
              this.saveDepartment(this.department, "/admin/department/updateDepartment")
            }
          } else {
            console.log(valid);
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
            this.getDepartment();
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
          this.$http.get(this.$constant.baseURL + "/admin/department/deleteDepartment", {id: this.id}, true)
            .then((res) => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.$router.push({path: '/departmentList'});
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        }).catch(() => {});
      },
      saveDepartment(value, url) {
        this.$confirm('确认保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          console.log(value);
          this.$http.post(this.$constant.baseURL + url, value, true)
            .then((res) => {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.$router.push({path: '/departmentList'});
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
