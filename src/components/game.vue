<template>
  <div class="game-container">
    <div class="interview-game">
      <!-- 角色选择 -->
      <div v-if="step === 'role'" class="role-selection">
        <h2>选择你的角色</h2>
        <div class="roles">
          <div
            v-for="role in roles"
            :key="role.type"
            @click="selectRole(role)"
            class="role-card">
<!--            <img :src="role.avatar" alt="role">-->
            <h3>{{ role.name }}</h3>
            <p>{{ role.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 面试过程 -->
      <div v-if="step === 'interview'" class="interview-process">
        <div class="interviewer">
          <div class="interviewer-container">
            <span style="color: white;font-size: 24px">面试官</span>
            <div class="interviewer-face" :class="expression">
              <div class="eyebrow">
                <div class="left-eyebrow">
                  <svg v-show="expression === 'smile'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,150 Q250,0 500,150" fill="none" stroke="#000" stroke-width="15"/>
                  </svg>
                  <svg v-show="expression === 'neutral'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,100 500,100" fill="none" stroke="#000" stroke-width="15"/>
                  </svg>
                  <svg v-show="expression === 'angry'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,0 500,150" fill="none" stroke="#000" stroke-width="15"/>
                  </svg>
                </div>
                <div class="right-eyebrow">
                  <svg v-show="expression === 'smile'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,150 Q250,0 500,150" fill="none" stroke="#000" stroke-width="15"/>
                  </svg>
                  <svg v-show="expression === 'neutral'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,100 500,100" fill="none" stroke="#000" stroke-width="15"/>
                  </svg>
                  <svg v-show="expression === 'angry'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,150 500,0" fill="none" stroke="#000" stroke-width="15"/>
                  </svg>
                </div>
              </div>
              <div class="eyes" style="animation: blink 2.8s infinite;"/>
  <!--            <img :src="currentRole.avatar" class="avatar">-->
              <div class="expression">
                <svg v-show="expression === 'smile'" width="50" height="15" viewBox="0 0 500 150">
                  <path d="M0,0 Q250,150 500,0" fill="none" stroke="#000" stroke-width="20"/>
                </svg>
                <svg v-show="expression === 'neutral'" width="50" height="15" viewBox="0 0 500 150">
                  <path d="M0,100 500,100" fill="none" stroke="#000" stroke-width="20"/>
                </svg>
                <svg v-show="expression === 'angry'" width="50" height="15" viewBox="0 0 500 150">
                  <path d="M0,150 250,0 500,150" fill="none" stroke="#000" stroke-width="20"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="interviewee-container">
            <span style="color: white;font-size: 24px">YOU</span>
            <div class="interviewee-face" :class="expression">
              <div class="eyebrow">
                <div class="left-eyebrow">
                  <svg v-show="expression === 'smile'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,150 Q250,0 500,150" fill="none" stroke="#000" stroke-width="15"/>
                  </svg>
                  <svg v-show="expression === 'neutral'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,100 500,50" fill="none" stroke="#000" stroke-width="15"/>
                  </svg>
                  <svg v-show="expression === 'angry'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,150 500,0" fill="none" stroke="#000" stroke-width="15"/>
                  </svg>
                </div>
                <div class="right-eyebrow">
                  <svg v-show="expression === 'smile'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,150 Q250,0 500,150" fill="none" stroke="#000" stroke-width="20"/>
                  </svg>
                  <svg v-show="expression === 'neutral'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,50 500,100" fill="none" stroke="#000" stroke-width="20"/>
                  </svg>
                  <svg v-show="expression === 'angry'" width="50" height="15" viewBox="0 0 500 150">
                    <path d="M0,0 500,150" fill="none" stroke="#000" stroke-width="20"/>
                  </svg>
                </div>
              </div>
              <div class="eyes" style="animation: blink 3.2s infinite;"/>
              <!--            <img :src="currentRole.avatar" class="avatar">-->
              <div class="expression">
                <svg v-show="expression === 'smile'" width="50" height="15" viewBox="0 0 500 150">
                  <path d="M0,0 Q250,150 500,0" fill="none" stroke="#000" stroke-width="15"/>
                </svg>
                <svg v-show="expression === 'neutral'" width="50" height="15" viewBox="0 0 500 150">
                  <path d="M0,150 Q250,100 500,150" fill="none" stroke="#000" stroke-width="15"/>
                </svg>
                <svg v-show="expression === 'angry'" width="50" height="15" viewBox="0 0 500 150">
                  <path d="M0,150 Q250,0 500,150 250,100 0,150" fill="none" stroke="#000" stroke-width="15"/>
                </svg>
              </div>
            </div>
          </div>

        </div>
        <div class="dialog-box">
          <span class="typing-text">{{ displayedText }}</span>
          <span class="typing-cursor">|</span>
          <div v-if="currentQuestion.code" class="code-block">
            <pre><code>{{ currentQuestion.code }}</code></pre>
          </div>
        </div>

        <div class="answer-section">
          <div v-if="currentQuestion.type === 'choice'" class="choice-options">
            <div
              v-for="option in currentQuestion.options"
              :key="option.id"
              class="option"
              :class="{ selected: selectedOption === option.id }"
              @click="selectedOption = option.id">
              {{ option.text }}
            </div>
          </div>

          <el-button
            type="primary"
            @click="submitAnswer"
            class="submit-btn"
            :disabled="currentQuestion.type === 'choice' && !selectedOption">
            提交答案
          </el-button>
        </div>
      </div>

      <!-- 结果展示 -->
      <div v-if="step === 'result'" class="result">
        <h2>面试结果</h2>
        <el-progress
          :percentage="(score / questions.length) * 100"
          :status="score >= questions.length ? 'success' : 'exception'">
        </el-progress>
        <div class="feedback">
          <p v-for="(fb, index) in feedbacks" :key="index">{{ fb }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import MonacoEditor from 'vue-monaco'
const QUESTIONS = {
  HTML: [
    {
      type: 'choice',
      text: '以下哪个是JavaScript的基本数据类型？',
      options: [
        { id: 1, text: 'Array' },
        { id: 2, text: 'Object' },
        { id: 3, text: 'String', correct: true },
        { id: 4, text: 'Function' }
      ],
      score: 1
    },
    {
      type: 'choice',
      text: 'JavaScript中的箭头函数有什么特点？',
      options: [
        { id: 1, text: '可以通过call()修改this指代的对象' },
        { id: 2, text: '没有argument，可以使用...args', correct: true },
        { id: 3, text: '通过new可以创建一个箭头函数'},
        { id: 4, text: '不知道' }
      ],
      score: 1
    }
  ],
  senior: [
    // 更复杂的问题...
  ]
}

export default {
  // components: { MonacoEditor },
  data() {
    return {
      step: 'role',
      roles: [
        {
          type: 'HTML',
          name: '前端工程师',
          // avatar: require('@/assets/junior.png'),
          desc: 'HTML + CSS + JS + Vue'
        },
        {
          type: 'Java',
          name: 'Java后端工程师',
          // avatar: require('@/assets/senior.png'),
          desc: 'SpringBoot + MySQL + Redis'
        },
        {
          type: 'C++',
          name: 'C++后端工程师',
          // avatar: require('@/assets/senior.png'),
          desc: '...'
        },
        {
          type: 'Client',
          name: '客户端工程师',
          // avatar: require('@/assets/senior.png'),
          desc: '...'
        },
        {
          type: 'Algorithm',
          name: '算法工程师',
          // avatar: require('@/assets/senior.png'),
          desc: 'XGBoost + Transformer'
        },
        {
          type: 'Interviewer',
          name: '我来当面试官！',
          // avatar: require('@/assets/senior.png'),
          desc: '倒反天罡？'
        }
      ],
      currentRole: null,
      questions: [],
      currentIndex: 0,
      selectedOption: null,
      userAnswer: '',
      codeAnswer: '',
      score: 0,
      feedbacks: [],
      startTime: 0,
      elapsedTime: 0,
      expression: 'smile', // smile/neutral/angry
      timer: null,
      displayedText: '',
      typingTimer: null,
      typingSpeed: 50
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || {}
    }
  },
  methods: {
    selectRole(role) {
      if (role.type !== 'HTML') {
        this.$message({
          message: '暂未开放！',
          type: 'error'
        });
      }
      else {
        this.currentRole = role;
        this.questions = QUESTIONS[role.type];
        this.step = 'interview';
        this.startTimer();
        this.typeText(this.questions[this.currentIndex].text);
      }
    },
    startTimer() {
      this.startTime = Date.now();
      this.timer = setInterval(() => {
        this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.updateExpression();
      }, 1000);
    },
    updateExpression() {
      if (this.elapsedTime < 10) {
        this.expression = 'smile'
        console.log(this.expression, this.elapsedTime);
      } else if (this.elapsedTime < 20) {
        this.expression = 'neutral'
        console.log(this.expression, this.elapsedTime);
      } else {
        this.expression = 'angry'
        console.log(this.expression,this.elapsedTime);
      }
    },

    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    submitAnswer() {
      this.stopTimer();
      // 答案评估逻辑
      const question = this.currentQuestion;
      let isCorrect = false;

      if (this.currentQuestion.type === 'choice') {
        const selected = this.currentQuestion.options.find(
          opt => opt.id === this.selectedOption
        );
        isCorrect = selected?.correct;
      }

      if (isCorrect) {
        this.score += question.score;
        this.feedbacks.push(`✅ 问题${this.currentIndex+1}: 回答正确!`);
      } else {
        this.feedbacks.push(`❌ 问题${this.currentIndex+1}: 需要改进`);
      }

      // 进入下一题或结束
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.userAnswer = '';
        this.codeAnswer = '';
        this.selectedOption = null;
        this.typeText(this.questions[this.currentIndex].text);
        this.startTimer();
      } else {
        this.step = 'result'
      }
    },
    typeText(text) {
      this.typingDefer = setTimeout(() => {
        clearInterval(this.typingTimer);
        this.displayedText = '';
        let i = 0;
        this.typingTimer = setInterval(() => {
          if (i < text.length) {
            this.displayedText += text.charAt(i);
            i++;
          } else {
            clearInterval(this.typingTimer);
          }
        }, this.typingSpeed);
      }, 500);
    }
  },
  beforeDestroy() {
    this.stopTimer();
    clearTimeout(this.typingDefer);
    clearInterval(this.typingTimer);
  }
  // beforeRouteLeave(to, from, next) {
  //   this.stopTimer();
  //   next();
  // }
}
</script>

<style>
.game-container {
  //max-width: 800px;
  width: 60%;
  padding: 40px 20px;
  margin: 0 auto;
  height: calc(100vh - 130px);
}

.interview-game {
  height: 100%;
  width: 100%;
  background-color: var(--white);
  border-radius: 10px;
  padding: 20px;
  //display: flow-root;
}

.role-selection {
  text-align: center;
}

.roles {
  display: grid;
  //justify-content: space-around;
  margin-top: 30px;
  row-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
}

.role-card {
  width: 90%;
  padding: 20px;
  margin: auto;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  //box-shadow: 0 2px 10px -2px rgba(0,0,0,0.1);
}

.role-card:hover {
  //transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.interview-process {
  //margin-top: 30px;
  width: 100%;
  height: 100%;
}

.interviewer {
  display: flex;
  align-items: center;
  //padding: 20px;
  width: 90%;
  aspect-ratio: 2 / 1;
  margin: 10px auto;
  //margin-bottom: 30px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.interviewer-container {
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: #87CEFA; /* 背景色 */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.interviewee-container {
  flex: 1;
  height: 100%;
  background-color: #bdbdf0; /* 背景色 */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.interviewer-face {
  position: relative;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  animation: move 3.1s infinite ease-out;
  transition: background-color 0.5s;
}
.interviewer-face.smile {
  background-color: #FFDBAC;
}
.interviewer-face.neutral {
  background-color: #FFD0A8;
}
.interviewer-face.angry {
  background-color: #FFB898;
}

.interviewee-face {
  position: relative;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  animation: move 2.9s infinite ease-in;
}
.interviewee-face.smile {
  background-color: #FFDBAC;
}
.interviewee-face.neutral {
  background-color: #F0E5AC;
}
.interviewee-face.angry {
  background-color: #E5EFAC;
}

@keyframes move {
  0%, 100% {
    transform: translate(0, -3%);
  }
  50% {
    transform: translate(0, 0);
  }
}

.eyebrow{
  position: relative;
  top: 29%;
  width: 100%;
  height: 12px;
}
.left-eyebrow {
  position: absolute;
  left: 30%;
  transform: translate(-50%, 0);
}
.right-eyebrow {
  position: absolute;
  right: 30%;
  transform: translate(50%, 0);
}


.eyes {
  position: relative;
  top: 35%;
  width: 100%;
  height: 12px;
}
.eyes::before,
.eyes::after {
  content: '';      /* 伪元素必须有content属性才能显示 */
  position: absolute;
  width: 12px;
  height: 12px;
  background: #000;
  border-radius: 50%;
  animation: inherit;
}
.eyes::before {
  left: 30%;
  transform: translate(-50%, 0);
}
.eyes::after {
  right: 30%;
  transform: translate(50%, 0);
}

.expression {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 15px;
}

@keyframes smile {
  0% {
    width: 20px;
    border-radius: 0 0 10px 10px;
  }
  100% {
    width: 30px;
    border-radius: 0 0 30px 30px;
  }
}



@keyframes blink {
  0%, 96%, 100% {
    height: 12px;
    top: 35%;
  }
  98% {
    top: calc(35% + 8px);
    height: 1px;

  }
}

.dialog-box {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  max-width: 70%;
}

.choice-options {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
}

.option {
  padding: 10px 15px;
  margin: 5px 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.option:hover {
  background-color: #f5f7fa;
}

.option.selected {
  border-color: #409eff;
  background-color: #ecf5ff;
}

.typing-text {
  white-space: pre-wrap;
}

.typing-cursor {
  animation: text-blink 1s infinite;
}

@keyframes text-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}


.submit-btn {
  margin-top: 20px;
}

.result {
  text-align: center;
}

.feedback {
  margin-top: 30px;
  text-align: left;
}
</style>
