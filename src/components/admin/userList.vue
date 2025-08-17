<template>
  <div>
    <div>
      <div class="handle-box">
        <el-select v-model="pagination.userType" placeholder="用户类型" class="handle-select mrb10">
          <el-option key="1" label="站长" :value="0"></el-option>
          <el-option key="2" label="管理员" :value="1"></el-option>
          <el-option key="3" label="普通用户" :value="2"></el-option>
        </el-select>
        <el-input v-model="pagination.searchKey" placeholder="用户名/邮箱" class="handle-input mrb10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchUser()">搜索</el-button>
        <el-button type="danger" @click="clearSearch()">清除参数</el-button>
      </div>
      <el-table :data="users" border class="table" header-cell-class-name="table-header">
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <el-image lazy class="table-td-thumb" :src="scope.row.avatar" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="简介" align="center"></el-table-column>
        <el-table-column label="用户类型" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.userType === 0" disable-transitions>
              站长
            </el-tag>
            <el-tag type="success" v-else-if="scope.row.userType === 1" disable-transitions>
              管理员
            </el-tag>
            <el-tag type="success" v-else disable-transitions>
              普通用户
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center" />
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
  </div>
</template>

<script>
import {adminGetUserList} from '@/utils/data/admin';

export default {
  data() {
    return {
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        userType: null
      },
      users: [],
    };
  },

  created() {
    this.getUsers();
  },

  methods: {
    clearSearch() {
      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        userType: null
      };
      this.getUsers();
    },
    getUsers() {
      const res = adminGetUserList(this.pagination);
      this.users = res.data;
      this.pagination.total = res.total;
    },
    handlePageChange(val) {
      this.pagination.current = val;
      this.getUsers();
    },
    searchUser() {
      this.pagination.total = 0;
      this.pagination.current = 1;
      this.getUsers();
    },
  }
};
</script>

<style scoped>

  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
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
