(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-904af684"],{"408a":function(e,t,r){var a=r("e330");e.exports=a(1..valueOf)},6034:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{multiple:"",drag:"",action:e.$store.state.sysConfig.qiniuUrl,"on-change":e.handleChange,"before-upload":e.beforeUpload,"on-success":e.handleSuccess,"on-error":e.handleError,"on-remove":e.handleRemove,"http-request":e.customUpload,"list-type":e.listType,accept:e.accept,limit:e.maxNumber,"auto-upload":!1}},[r("div",{staticClass:"el-upload__text"},[r("svg",{attrs:{viewBox:"0 0 1024 1024",width:"40",height:"40"}},[r("path",{attrs:{d:"M666.2656 629.4528l-113.7664-112.4864c-20.7872-20.5824-54.3232-20.5312-75.1104 0.1024l-113.3056 112.4864c-20.8896 20.736-21.0432 54.528-0.256 75.4688 20.736 20.8896 54.528 21.0432 75.4688 0.256l22.6304-22.4256v189.5936c0 29.44 23.9104 53.3504 53.3504 53.3504s53.3504-23.9104 53.3504-53.3504v-189.5424l22.6816 22.4256a53.1456 53.1456 0 0 0 37.5296 15.4112c13.7728 0 27.4944-5.2736 37.9392-15.8208 20.6336-20.9408 20.4288-54.7328-0.512-75.4688z",fill:"#FFE37B"}}),r("path",{attrs:{d:"M820.992 469.504h-5.376c-3.072-163.328-136.3456-294.8096-300.4416-294.8096S217.856 306.1248 214.784 469.504H209.408c-100.7104 0-182.3744 81.664-182.3744 182.3744s81.664 182.3744 182.3744 182.3744h209.7664V761.856c-30.208 5.5808-62.464-3.3792-85.6576-26.7264-37.3248-37.5808-37.0688-98.5088 0.512-135.7824l113.3056-112.4864c37.2224-36.9664 97.8432-37.0176 135.168-0.1536l113.7664 112.4864c18.2272 18.0224 28.3648 42.0864 28.5184 67.7376 0.1536 25.6512-9.728 49.8176-27.7504 68.0448a95.40096 95.40096 0 0 1-68.3008 28.5184c-5.9392 0-11.776-0.512-17.5104-1.5872v72.3456h209.7664c100.7104 0 182.3744-81.664 182.3744-182.3744S921.7024 469.504 820.992 469.504z",fill:"#8C7BFD"}})]),r("div",[e._v("拖拽上传 / 点击上传")])]),"picture"===e.listType?[r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v(" 一次最多上传"+e._s(e.maxNumber)+"张图片，且每张图片不超过"+e._s(e.maxSize)+"M！ ")])]:[r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v(" 一次最多上传"+e._s(e.maxNumber)+"个文件，且每个文件不超过"+e._s(e.maxSize)+"M！ ")])]],2),r("div",{staticStyle:{"text-align":"center","margin-top":"20px"}},[r("el-button",{staticStyle:{"font-size":"12px"},attrs:{type:"success"},on:{click:e.submitUpload}},[e._v(" 上传 ")])],1)],1)},n=[];r("a9e3"),r("b0c0"),r("ac1f"),r("5319"),r("d3b7"),r("d9e2"),r("a434"),r("99af"),r("159b"),r("b64b");function o(e,t,r){var a;return a=r.response?"".concat(r.response.error||r.response):r.responseText?"".concat(r.responseText):"fail to ".concat(e," ").concat(r.status),new Error(a)}function s(e){var t=e.responseText||e.response;if(!t)return t;try{return JSON.parse(t)}catch(r){return t}}function i(e){var t=new XMLHttpRequest,r=e.action;t.upload&&(t.upload.onprogress=function(t){t.total>0&&(t.percent=t.loaded/t.total*100),e.onProgress(t)});var a=new FormData;e.data&&Object.keys(e.data).forEach((function(t){a.append(t,e.data[t])})),a.append(e.filename,e.file,e.file.name),t.onerror=function(t){e.onError(t)},t.onload=function(){if(t.status<200||t.status>=300)return e.onError(o(r,e,t));e.onSuccess(s(t))},t.open("post",r,!0),e.withCredentials&&"withCredentials"in t&&(t.withCredentials=!0);var n=e.headers||{};for(var i in n)n.hasOwnProperty(i)&&null!==n[i]&&t.setRequestHeader(i,n[i]);return t.send(a),t}var c={props:{isAdmin:{type:Boolean,default:!1},prefix:{type:String,default:""},listType:{type:String,default:"picture"},storeType:{type:String,default:localStorage.getItem("defaultStoreType")},accept:{type:String,default:"image/*"},maxSize:{type:Number,default:5},maxNumber:{type:Number,default:5}},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{submitUpload:function(){this.$refs.upload.submit()},customUpload:function(e){var t=this,r="";-1!==e.file.name.lastIndexOf(".")&&(r=e.file.name.substring(e.file.name.lastIndexOf(".")));var a=this.prefix+"/"+(this.$common.isEmpty(this.$store.state.currentUser.username)?this.$store.state.currentAdmin.username.replace(/[^a-zA-Z]/g,"")+this.$store.state.currentAdmin.id:this.$store.state.currentUser.username.replace(/[^a-zA-Z]/g,"")+this.$store.state.currentUser.id)+(new Date).getTime()+Math.floor(1e3*Math.random())+r;if("local"===this.storeType)return new Promise((function(r,n){var o=new FileReader;o.readAsDataURL(e.file),o.onload=function(){var s=new Image;s.src=o.result,s.onload=function(){var o=document.createElement("canvas"),i=o.getContext("2d"),c=s.width,l=s.height;if("corporationLogo"===t.prefix||"userAvatar"===t.prefix)c=120,l=120;else if("corporationCover"===t.prefix){var u=s.width/s.height;c=3200,l=3200/u}o.width=c,o.height=l,i.drawImage(s,0,0,c,l);var p="image/webp",d=".webp",f=.9;o.toBlob((function(o){var s=new FormData;s.append("file",o,e.file.name.replace(/\.\w+$/,d)),s.append("originalName",e.file.name),s.append("key",a.replace(/\.\w+$/,d)),s.append("relativePath",a.replace(/\.\w+$/,d)),s.append("type",t.prefix),s.append("storeType",t.storeType),console.log(s.get("file")),console.log(s.get("originalName")),console.log(s.get("key")),console.log(s.get("relativePath")),console.log(s.get("type")),console.log(s.get("storeType")),console.log(e),t.$http.upload(t.$constant.baseURL+"/resource/upload",s,t.isAdmin,e).then((function(e){r(e)})).catch((function(e){n(e)}))}),p,f)}},o.onerror=function(){n(new Error("读取文件失败"))}}));if("qiniu"===this.storeType){var n=new XMLHttpRequest;n.open("get",this.$constant.baseURL+"/qiniu/getUpToken?key="+a,!1),this.isAdmin?n.setRequestHeader("Authorization",localStorage.getItem("adminToken")):n.setRequestHeader("Authorization",localStorage.getItem("userToken"));try{n.send();var o=JSON.parse(n.responseText);return null!==o&&o.hasOwnProperty("code")&&200===o.code?(e.data={token:o.data,key:a},i(e)):null!==o&&o.hasOwnProperty("code")&&200!==o.code?Promise.reject(o.message):Promise.reject("服务异常！")}catch(s){return Promise.reject(s.message)}}},handleSuccess:function(e,t,r){var a;"local"===this.storeType?a=e.data:"qiniu"===this.storeType&&(a=this.$store.state.sysConfig["qiniu.downloadUrl"]+e.key,this.$common.saveResource(this,this.prefix,a,t.size,t.raw.type,t.name,"qiniu",this.isAdmin)),this.$emit("addPicture",a)},handleError:function(e,t,r){this.$message({message:e,type:"error"})},beforeUpload:function(e){},handleRemove:function(e,t){},handleChange:function(e,t){var r=!1;e.size>1024*this.maxSize*1024&&(this.$message({message:"图片最大为"+this.maxSize+"M！",type:"warning"}),r=!0),r&&t.splice(t.size-1,1)}}},l=c,u=r("2877"),p=Object(u["a"])(l,a,n,!1,null,"0dc30131",null);t["default"]=p.exports},a9e3:function(e,t,r){"use strict";var a=r("83ab"),n=r("da84"),o=r("e330"),s=r("94ca"),i=r("cb2d"),c=r("1a2d"),l=r("7156"),u=r("3a9b"),p=r("d9b5"),d=r("c04e"),f=r("d039"),h=r("241c").f,m=r("06cf").f,g=r("9bf2").f,v=r("408a"),y=r("58a8").trim,b="Number",w=n[b],S=w.prototype,x=n.TypeError,N=o("".slice),T=o("".charCodeAt),I=function(e){var t=d(e,"number");return"bigint"==typeof t?t:E(t)},E=function(e){var t,r,a,n,o,s,i,c,l=d(e,"number");if(p(l))throw x("Cannot convert a Symbol value to a number");if("string"==typeof l&&l.length>2)if(l=y(l),t=T(l,0),43===t||45===t){if(r=T(l,2),88===r||120===r)return NaN}else if(48===t){switch(T(l,1)){case 66:case 98:a=2,n=49;break;case 79:case 111:a=8,n=55;break;default:return+l}for(o=N(l,2),s=o.length,i=0;i<s;i++)if(c=T(o,i),c<48||c>n)return NaN;return parseInt(o,a)}return+l};if(s(b,!w(" 0o1")||!w("0b1")||w("+0x1"))){for(var _,A=function(e){var t=arguments.length<1?0:w(I(e)),r=this;return u(S,r)&&f((function(){v(r)}))?l(Object(t),r,A):t},$=a?h(w):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),U=0;$.length>U;U++)c(w,_=$[U])&&!c(A,_)&&g(A,_,m(w,_));A.prototype=S,S.constructor=A,i(n,b,A,{constructor:!0})}},b0c0:function(e,t,r){var a=r("83ab"),n=r("5e77").EXISTS,o=r("e330"),s=r("9bf2").f,i=Function.prototype,c=o(i.toString),l=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,u=o(l.exec),p="name";a&&!n&&s(i,p,{configurable:!0,get:function(){try{return u(l,c(this))[1]}catch(e){return""}}})}}]);