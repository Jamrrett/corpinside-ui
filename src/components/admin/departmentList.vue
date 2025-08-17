<template>
  <div>
    <div class="handle-box">
      <el-select style="width: 140px" class="mrb10" v-model="pagination.corporationId" placeholder="请选择公司">
        <el-option
          v-for="item in corporations"
          :key="item.id"
          :label="item.corporationTitle"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input v-model="pagination.searchKey" placeholder="部门名称" class="handle-input mrb10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchDepartments()">搜索</el-button>
      <el-button type="danger" @click="clearSearch()">清除参数</el-button>
      <el-button type="primary" @click="$router.push({ path: '/admin/departmentEdit' })">新增部门</el-button>
    </div>
    <el-table :data="departments" border class="table" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center" />
      <el-table-column prop="departmentTitle" label="部门名称" align="center" />
      <el-table-column label="所属公司" align="center">
        <template slot-scope="scope">
          {{ corporations.find(item => item.id === scope.row.corporationId).corporationTitle }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" align="center" />
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button disabled type="text" icon="el-icon-delete" style="color: var(--orangeRed)" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next"
                     :current-page="pagination.current"
                     :page-size="pagination.size"
                     :total="pagination.total"
                     @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getCorporationTitles} from "@/utils/data/corporation";
import {adminGetDepartmentList} from "@/utils/data/admin";

export default {
  data() {
    return {
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        recommendStatus: null,
        corporationId: null
      },
      departments: [],
      corporations: []
    };
  },

  created() {
    this.getDepartments();
    this.getCorporations();
  },

  mounted() {
  },

  methods: {
    getCorporations() {
      this.corporations = getCorporationTitles();
    },
    clearSearch() {
      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        recommendStatus: null,
        corporationId: null
      };
      this.getDepartments();
    },
    getDepartments() {
      const res = adminGetDepartmentList(this.pagination);
      this.departments = res.data;
      this.pagination.total = res.total;
    },
    handlePageChange(val) {
      this.pagination.current = val;
      this.getDepartments();
    },
    searchDepartments() {
      this.pagination.total = 0;
      this.pagination.current = 1;
      this.getDepartments();
    },
    changeStatus(article, flag) {
      let param;
      if (flag === 1) {
        param = {
          articleId: article.id,
          viewStatus: article.viewStatus
        };
      } else if (flag === 2) {
        param = {
          articleId: article.id,
          commentStatus: article.commentStatus
        };
      } else if (flag === 3) {
        param = {
          articleId: article.id,
          recommendStatus: article.recommendStatus
        };
      }
      this.$http.get(this.$constant.baseURL + '/admin/article/changeArticleStatus', param, true)
        .then(() => {
          if (flag === 1) {
            this.$message({
              duration: 0,
              showClose: true,
              message: '修改成功！注意，文章不可见时必须设置密码才能访问！',
              type: 'warning'
            });
          } else {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          }
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: 'error'
          });
        });
    },
    handleDelete(item) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        this.$http.get(this.$constant.baseURL + '/article/deleteArticle', {id: item.id}, true)
          .then(() => {
            this.pagination.current = 1;
            this.getDepartments();
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: 'error'
            });
          });
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消删除!'
        });
      });
    },
    handleEdit(item) {
      this.$router.push({ path: '/admin/departmentEdit', query: {id: item.id }});
    }
  }
};
</script>

<style scoped>

  .handle-box {
    margin-bottom: 20px;
  }

  .handle-input {
    width: 160px;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .mrb10 {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }

  .pagination {
    margin: 20px 0;
    text-align: right;
  }

  .el-switch {
    margin: 5px;
  }
</style>
