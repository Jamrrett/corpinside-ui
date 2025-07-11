<template>
  <div>

    <div class="introduce-search-container">
      <div class="introduce-search-box">
        <h3>HeaRT : 基于偏移坐标回归和自适应修复的头部刚性迁移方法</h3>
      </div>
    </div>
    <div class="page-container">
      <el-form :model="inputData" :rules="rules" ref="ruleForm" label-width="110px" class="model-input-form">
        <el-form-item class="model-input-item" label="原始图像" prop="sourceImage">
          <uploadModelInputImage :isAdmin="true" :prefix="'sourceImage'" style="margin-top: 10px" @addPicture="addCorporationLogo"
                         :maxSize="1"
                         :maxNumber="1"></uploadModelInputImage>
        </el-form-item>
        <el-form-item class="model-input-item" label="目标图像" prop="targetImage">
          <uploadModelInputImage :isAdmin="true" :prefix="'targetImage'" style="margin-top: 10px" @addPicture="addCorporationCover"
                         :maxSize="3"
                         :maxNumber="1"></uploadModelInputImage>
        </el-form-item>
      </el-form>
      <div class="myCenter" style="margin-bottom: 22px">
        <el-button type="info"  style="margin-right: 30px" @click="resetForm('ruleForm')">重置所有修改</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div>
      <div class="result-image">
        <el-image
          :src="resultImage"
          v-show="resultImage"
        >
          <div slot="error" class="image-slot">
            <div class="corporation-image"></div>
          </div>
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
const uploadModelInputImage = () => import( './common/uploadModelInputImage');

export default {
  components: {
    uploadModelInputImage,
  },
  data() {
    return {
      id: this.$route.query.id,
      inputData: {
        sourceImage: '',
        targetImage: '',
      },
      resultImage: '',
      sorts: [],
      rules: {
        sourceImage: [
          {required: true, message: '原始图像', trigger: 'change'}
        ],
        targetImage: [
          {required: true, message: '目标图像', trigger: 'change'}
        ],
      }
    };
  },

  created() {
    this.sendPing();
  },

  mounted() {

  },

  methods: {
    imgAdd(pos, file) {
      let suffix = '';
      if (file.name.lastIndexOf('.') !== -1) {
        suffix = file.name.substring(file.name.lastIndexOf('.'));
      }
      let key = 'corporationPicture' + '/' + this.$store.state.currentAdmin.username.replace(/[^a-zA-Z]/g, '') + this.$store.state.currentAdmin.id + new Date().getTime() + Math.floor(Math.random() * 1000) + suffix;

      let storeType = localStorage.getItem('defaultStoreType');

      let fd = new FormData();
      fd.append('file', file);
      fd.append('originalName', file.name);
      fd.append('key', key);
      fd.append('relativePath', key);
      fd.append('type', 'corporationPicture');
      fd.append('storeType', storeType);

      if (storeType === 'local') {
        this.saveLocal(pos, fd);
      } else if (storeType === 'qiniu') {
        this.saveQiniu(pos, fd);
      }
    },
    saveLocal(pos, fd) {
      this.$http.upload(this.$constant.baseURL + '/resource/upload', fd, true)
        .then((res) => {
          if (!this.$common.isEmpty(res.data)) {
            let url = res.data;
            this.$refs.md.$img2Url(pos, url);
          }
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: 'error'
          });
        });
    },
    addCorporationLogo(res) {
      this.inputData.sourceImage = res;
    },
    addCorporationCover(res) {
      this.inputData.targetImage = res;
    },
    sendPing() {
      this.$http.get(this.$constant.baseURL + '/webInfo/getSortCorporationInfo')
        .then((res) => {
          if (!this.$common.isEmpty(res.data)) {
            this.sorts = res.data;
            if (!this.$common.isEmpty(this.id)) {
              this.getCorporation();
            }
          }
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: 'error'
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getInferenceResult(this.inputData, '/api/getInferenceResult');
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
    getInferenceResult(value, url) {
      this.$http.post(this.$constant.modelURL + url, value, true)
        .then((res) => {
          this.$message({
            message: '运行成功！',
            type: 'success'
          });
          this.$router.push({path: '/corporationList'});
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: 'error'
          });
        });
    }
  }
};
</script>

<style scoped>
  .introduce-search-container {
    /* 向下排列 */
    display: flex;
    flex-direction: row;
    cursor: default;
    width: 90%;
    padding: 30px 20px 0 20px;
    margin: 0 auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

  .introduce-search-box {
    will-change: transform;
    contain: content;
    background: linear-gradient(-45deg, #87CEFA, #eec1ea, #bdbdf0);
    /*background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);*/
    /*animation: gradientBG 10s ease infinite;*/
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--white);
    padding: 0 30px;
  }

  .page-container {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 25px auto 0;
    padding: 0 20px 20px 20px;
    flex-direction: column;
  }

  .model-input-form {
    display: flex;

    .model-input-item {
      flex: 1;
    }
  }

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
