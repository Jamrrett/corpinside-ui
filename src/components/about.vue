<template>
  <div>
    <div class="introduce-search-container">
      <div class="introduce-search-box" style="color: var(--white-content)">
        <div class="logo-content" style="padding-left: 20px">
          <h2>
            <span>关于&thinsp;{{$store.state.webInfo.webName}}&thinsp;……</span>
          </h2>
        </div>
      </div>
    </div>

    <div class="page-container">
      <div class="page-content">
        <div class="page-content-box">
          <div class="page-content-box-content">
            <div class="page-content-box-content-item">
              <div class="page-content-box-content-item-title">
                <span style="font-size: 28px;font-weight: bold">网站简介</span>
              </div>
              <div class="page-content-box-content-item-content">
                <p>
                  <span>
                    网站开发初衷是希望能够以公司部门作为分类标准，为找工作的同学们提供一个更便捷的面试经验与工作体验分享平台，
                    同时也为了给自己一个学习的机会，动手实操一个完整的项目。
                  </span>
                </p>
                <p>
                  <span>
                    可能大家会有疑问，不是已经有了牛客网这样的平台了吗？
                    的确，牛客网作为一个大家广为熟知的平台，已经有非常多的面试经验帖子，也有着编程题库等功能。
                    但是在我的真实求职经历中，当我收到一家公司某一部门的面试通知时，
                    我会想要了解该部门的具体业务，以及面试时大概会问哪些问题。
                    在牛客网，想要实现这样的功能，我需要按照公司名+部门名搜索该公司部门的面经，
                    虽然可以搜索到几篇能满足要求的面经帖，但效率较低，
                    试想如果能够按照部门分类，并且能够在分类中筛选出自己感兴趣的面经帖，那将会是一个非常好的体验。
                    于是，我开始着手开发这个网站，希望能够帮助到更多和我有类似需求的同学。
                  </span>
                </p>
              </div>
            </div>

            <div class="page-content-box-content-item">
              <div class="page-content-box-content-item-title">
                <span style="font-size: 22px;font-weight: bold">网站架构</span>
              </div>
              <div class="page-content-box-content-item-content">
                <p>
                  <span>
                    网站本地版本采用前后端分离的方式，基于POETIZE开源博客进行二次开发<br>
                    前端采用 Vue2 + ElementUI + Axios 等技术栈进行开发<br>
                    后端采用 SpringBoot + MySQL + MyBatis-Plus 等技术栈进行开发<br>
                    目前已经实现了用户注册、登录、文章发布、文章评论、文章分类等功能
                  </span>
                </p>
                <p>
                  <span>
                    网站线上版本为基于 Github Pages 静态托管的纯前端界面<br>
                    <b>Why？</b>因为租云服务器要钱，而且部署起来比较麻烦...<br>
                    目前用 json + js 模拟了后端接口，仅提供阅读服务，不可登录、发布文章<br>
                    待开发功能：全局搜索
                  </span>
                </p>
                <p>
                  <span>
                    如果大家在使用过程中遇到了bug，或者有任何建议，欢迎直接给我发邮件，谢谢！
                  </span>
                </p>
              </div>
            </div>

            <div class="page-content-box-content-item">
              <div class="page-content-box-content-item-title">
                <span style="font-size: 22px;font-weight: bold">关于我</span>
              </div>
              <div class="page-content-box-content-item-content">
                <p>
                  <span>
                    一名正在实习的研三在读学生，目前就读于哈尔滨工业大学（深圳）
                  </span>
                </p>
                <p>
                  <span>
                    爱好：篮球🏀（你怎么知道我读研期间获得了4次校赛冠军和1次院赛冠军+MVP，并且还是二级裁判？😼)<br>
                    研究方向：计算机视觉，AIGC，时尚AI<br>
                    发表论文：暂无😑课题组偏向于项目，对科研产出要求不高<br>
                    参与项目：真伪票据识别、校园OJ系统开发、污染物预测与平台开发<br>
                    实习经历：<br>
                    <span style="display: block;text-indent: 2em;"><b>字节跳动 前端开发</b></span>
                    <span style="display: block;text-indent: 4em;">待补充......</span>
                    <span style="display: block;text-indent: 2em;"><b>北京大学深圳研究生院 城市规划与设计学院 科研助理</b></span>
                    <span style="display: block;text-indent: 4em;">美国大选预测（Trump or Harris)</span>
                    <span style="display: block;text-indent: 4em;">51个州+特区的预测准确率98.04%（即仅有1个州预测失误，其余州的真实投票获胜者我们全部预测正确）</span>
                    邮箱：jhw@vip.qq.com<br>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.introduce-search-container {
  /* 向下排列 */
  display: flex;
  flex-direction: row;
  cursor: default;
  width: 90%;
  padding: 30px 0 0;
  margin: 0 auto;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.introduce-search-box {
  background: linear-gradient(-45deg, var(--theme-blue), var(--theme-pink), var(--theme-purple));
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.page-content-box {
  background-color: var(--content-background-color);
  border-radius: 10px;
  width: 100%;
  padding: 15px 20px;
  line-height: 2;
}
</style>
