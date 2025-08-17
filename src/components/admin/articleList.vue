<template>
  <div>
    <div class="handle-box">
      <el-select v-model="pagination.recommendStatus" placeholder="是否推荐" style="width: 120px" class="mrb10">
        <el-option key="1" label="是" :value="true"></el-option>
        <el-option key="2" label="否" :value="false"></el-option>
      </el-select>
      <el-select style="width: 140px" class="mrb10" v-model="pagination.sortId" placeholder="请选择分类">
        <el-option
          v-for="item in sorts"
          :key="item.id"
          :label="item.sortName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select style="width: 140px" class="mrb10" v-model="pagination.corporationId" placeholder="请选择公司">
        <el-option
          v-for="item in corporations"
          :key="item.id"
          :label="item.corporationTitle"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select style="width: 140px" class="mrb10" v-model="pagination.departmentId" placeholder="请选择部门">
        <el-option
          v-for="item in departments"
          :key="item.id"
          :label="item.departmentTitle"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input v-model="pagination.searchKey" placeholder="文章标题" class="handle-input mrb10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchArticles()">搜索</el-button>
      <el-button type="danger" @click="clearSearch()">清除参数</el-button>
      <el-button type="primary" @click="$router.push({ path: '/articleEdit' })">新增文章</el-button>
    </div>
    <el-table :data="articles" border class="table" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center" />
      <el-table-column prop="username" label="作者" align="center" />
      <el-table-column prop="articleTitle" label="文章标题" align="center" />
      <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          {{ sorts.find(item => item.id === scope.row.sortId).sortName }}
        </template>
      </el-table-column>
      <el-table-column prop="corporationTitle" label="公司" align="center" />
      <el-table-column prop="departmentTitle" label="部门" align="center" />
      <el-table-column label="是否推荐" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.recommendStatus === false ? 'danger' : 'success'"
                  disable-transitions>
            {{scope.row.recommendStatus === false ? '否' : '是'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="updateTime" label="最终修改时间" align="center" />
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
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
import {getSortInfo} from "@/utils/data/sort";
import {getCorporationTitles} from "@/utils/data/corporation";
import {getDepartmentTitles} from "@/utils/data/department";
import {adminGetArticleList} from "@/utils/data/admin";

export default {
  data() {
    return {
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        recommendStatus: null,
        corporationId: null,
        departmentId: null,
        sortId: null
      },
      articles: [],
      sorts: [],
      corporations: [],
      departments: [],
    };
  },

  created() {
    this.getArticles();
    this.getSorts();
    this.getCorporationTitles();
    this.getDepartmentTitles();
  },

  methods: {
    clearSearch() {
      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        recommendStatus: null,
        corporationId: null,
        departmentId: null,
        sortId: null
      };
      this.getArticles();
    },
    getArticles() {
      const res = adminGetArticleList(this.pagination);
      this.articles = res.data;
      this.pagination.total = res.total;
    },
    getSorts() {
      this.sorts = getSortInfo();
    },
    getCorporationTitles() {
      this.corporations = getCorporationTitles();
    },
    getDepartmentTitles() {
      this.departments = getDepartmentTitles();
    },
    handlePageChange(val) {
      this.pagination.current = val;
      this.getArticles();
    },
    searchArticles() {
      this.pagination.total = 0;
      this.pagination.current = 1;
      this.getArticles();
    },
    handleEdit(item) {
      this.$router.push({path: '/articleEdit', query: { id: item.id }});
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
