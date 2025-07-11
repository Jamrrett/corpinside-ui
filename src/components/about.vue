<template>
  <div>
    <div class="introduce-search-container">
      <div class="introduce-search-box" style="color: var(--white)">
        <div class="logo-content" style="padding-left: 3%">
          <h2>
            <span>关于&thinsp;</span>
            <span v-for="(a, index) in $store.state.webInfo.webTitle" :key="index">{{a}}</span>
            <span>&thinsp;……</span>
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
                    网站采用前后端分离的方式，基于POETIZE开源博客进行二次开发<br>
                    前端采用 Vue2 + ElementUI + Axios 等技术栈进行开发<br>
                    后端采用 SpringBoot + MySQL + MyBatis-Plus 等技术栈进行开发
<!--                    后端采用 SpringBoot + MySQL + MyBatis-Plus + Redis + Elasticsearch 等技术栈进行开发-->
                  </span>
                </p>
                <p>
                  <span>
                    网站目前尚处于开发建设阶段<br>
                    目前已经实现了用户注册、登录、文章发布、文章评论、文章分类等功能<br>
                    待开发功能：文章搜索、文章推荐、文章点赞、文章收藏
                  </span>
                </p>
                <p>
                  <span>
                    如果大家在使用过程中遇到了bug，或者有任何建议，欢迎在评论区留言或者直接给我发邮件，谢谢！
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
                    一名正在努力学Java、学MySQL、学Redis、学消息队列，期望能够找到暑期实习的研二在读学生，目前就读于哈尔滨工业大学（深圳）
                  </span>
                </p>
                <p>
                  <span>
                    爱好：篮球🏀（你怎么知道我读研期间获得了3次校赛冠军和1次院赛冠军+MVP，并且还是二级裁判？😼)<br>
                    研究方向：计算机视觉，AIGC，时尚AI<br>
                    发表论文：暂无😑课题组偏向于项目，对科研产出要求不高<br>
                    参与项目：真伪票据识别、校园OJ系统开发、污染物预测与平台开发<br>
                    实习经历：北京大学深圳研究生院 城市规划与设计学院 科研助理<br>
                    <span style="display: block;text-indent: 5em;">美国大选预测（Trump or Harris)</span>
                    <span style="display: block;text-indent: 5em;">51个州+特区的预测准确率98.04%（即仅有1个州预测失误，其余州的真实投票获胜者我们全部预测正确）</span>
                    邮箱：jiahengw@outlook.com<br>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    <div>-->
<!--      <div class="message-in" style="text-align: center">-->
<!--        <h2 class="message-title">树洞</h2>-->
<!--        <div>-->
<!--          <input class="message-input"-->
<!--                 type="text"-->
<!--                 style="outline: none;width: 70%"-->
<!--                 placeholder="留下点什么啦~"-->
<!--                 v-model="messageContent"-->
<!--                 @click="show = true"-->
<!--                 maxlength="60"/>-->
<!--          <button v-show="show"-->
<!--                  style="margin-left: 12px;cursor: pointer;width: 20%"-->
<!--                  @click="submitMessage"-->
<!--                  class="message-input">发射-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->
    <div class="comment-wrap">
      <div class="comment-content">
        <comment :source="$constant.source" :type="'message'" :userId="$constant.userId"></comment>
      </div>
    </div>
  </div>
</template>

<script>
const comment = () => import( './comment/comment');

export default {
  components: {
    comment
  },
  data() {
    return {
      show: false,
      messageContent: '',
      // background: {"background": "url(" + this.$store.state.webInfo.backgroundImage + ") center center / cover no-repeat"},
      barrageList: []
    };
  },
  created() {
    this.getTreeHole();
  },
  methods: {
    getTreeHole() {
      this.$http.get(this.$constant.baseURL + '/webInfo/listTreeHole')
        .then((res) => {
          if (!this.$common.isEmpty(res.data)) {
            res.data.forEach(m => {
              this.barrageList.push({
                id: m.id,
                avatar: m.avatar,
                msg: m.message,
                time: Math.floor(Math.random() * 5 + 10)
              });
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
    submitMessage() {
      if (this.messageContent.trim() === '') {
        this.$message({
          message: '你还没写呢~',
          type: 'warning'
        });
        return;
      }

      let treeHole = {
        message: this.messageContent.trim()
      };

      if (!this.$common.isEmpty(this.$store.state.currentUser) && !this.$common.isEmpty(this.$store.state.currentUser.avatar)) {
        treeHole.avatar = this.$store.state.currentUser.avatar;
      }


      this.$http.post(this.$constant.baseURL + '/webInfo/saveTreeHole', treeHole)
        .then((res) => {
          if (!this.$common.isEmpty(res.data)) {
            this.barrageList.push({
              id: res.data.id,
              avatar: res.data.avatar,
              msg: res.data.message,
              time: Math.floor(Math.random() * 5 + 10)
            });
          }
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: 'error'
          });
        });

      this.messageContent = '';
      this.show = false;
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
    background: linear-gradient(-45deg, #87CEFA, #eec1ea, #bdbdf0);
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .page-container {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 25px auto 0;
    padding: 0 20px 20px 20px;
    flex-direction: row;
  }

  .page-content-box {
    background-color: var(--white);
    border-radius: 10px;
    width: 100%;
    padding: 25px 3%;
    line-height: 2;
  }

  .message-in {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    color: var(--white);
    animation: hideToShow 2.5s;
    width: 360px;
    z-index: 10;
  }

  .message-title {
    user-select: none;
    text-align: center;
  }

  .message-input {
    border-radius: 1.2rem;
    border: var(--white) 1px solid;
    color: var(--white);
    background: var(--transparent);
    padding: 10px 10px;
  }

  .message-input::-webkit-input-placeholder {
    color: var(--white);
  }

  .barrage-container {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100% - 50px);
    width: 100%;
    user-select: none;
    overflow: hidden;
  }

  .comment-wrap {
    background: var(--background);
    width: 100%;
  }

  .comment-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px 40px;
  }
</style>
