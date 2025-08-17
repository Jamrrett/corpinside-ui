<template>
  <div>
    <div class="handle-box">
      <el-select style="width: 140px" class="mrb10" v-model="pagination.sortId" placeholder="请选择分类">
        <el-option
          v-for="item in sortCorporations"
          :key="item.id"
          :label="item.sortName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input v-model="pagination.searchKey" placeholder="公司名称" class="handle-input mrb10" />
      <el-button type="primary" icon="el-icon-search" @click="searchCorporations()">搜索</el-button>
      <el-button type="danger" @click="clearSearch()">清除参数</el-button>
      <el-button type="primary" @click="$router.push({ path: '/admin/corporationEdit' })">新增公司</el-button>
    </div>
    <el-table :data="corporations" border class="table" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column prop="corporationTitle" label="公司名称" align="center" />
      <el-table-column prop="sortCorporation.sortName" label="分类" align="center" >
        <template slot-scope="scope">
          {{ sortCorporations.find(item => item.id === scope.row.sortId).sortName }}
        </template>
      </el-table-column>
      <el-table-column label="Logo" align="center">
        <template slot-scope="scope">
          <el-image lazy class="table-td-thumb" :src="scope.row.corporationLogo" fit="logo"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="封面" align="center">
        <template slot-scope="scope">
          <el-image lazy class="table-td-thumb" :src="scope.row.corporationCover" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" align="center" />
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
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
import {getSortCorporationInfo} from "@/utils/data/sortCorporation";
import {adminGetCorporationList} from "@/utils/data/admin";

export default {
  data() {
    return {
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        recommendStatus: null,
        sortId: null
      },
      corporations: [],
      sortCorporations: [],
    };
  },

  created() {
    this.getCorporations();
    this.getSortCorporation();
  },

  mounted() {
  },

  methods: {
    getSortCorporation() {
      this.sortCorporations = getSortCorporationInfo();
    },
    clearSearch() {
      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        recommendStatus: null,
        sortId: null
      };
      this.getCorporations();
    },
    getCorporations() {
      const res = adminGetCorporationList(this.pagination);
      this.corporations = res.data;
      this.pagination.total = res.total;
    },
    handlePageChange(val) {
      this.pagination.current = val;
      this.getCorporations();
    },
    searchCorporations() {
      this.pagination.total = 0;
      this.pagination.current = 1;
      this.getCorporations();
    },
    handleEdit(item) {
      this.$router.push({ path: '/admin/corporationEdit', query: {id: item.id }});
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
