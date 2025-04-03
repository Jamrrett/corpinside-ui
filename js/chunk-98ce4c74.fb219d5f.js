(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-98ce4c74"],{"868a":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-tag",{staticClass:"my-tag",attrs:{effect:"dark"}},[a("svg",{staticStyle:{"vertical-align":"-3px"},attrs:{viewBox:"0 0 1024 1024",width:"20",height:"20"}},[a("path",{attrs:{d:"M0 0h1024v1024H0V0z",fill:"#202425",opacity:".01"}}),a("path",{attrs:{d:"M682.666667 204.8h238.933333a34.133333 34.133333 0 0 1 34.133333 34.133333v648.533334a68.266667 68.266667 0 0 1-68.266666 68.266666h-204.8V204.8z",fill:"#FFAA44"}}),a("path",{attrs:{d:"M68.266667 921.6a34.133333 34.133333 0 0 0 34.133333 34.133333h785.066667a68.266667 68.266667 0 0 1-68.266667-68.266666V102.4a34.133333 34.133333 0 0 0-34.133333-34.133333H102.4a34.133333 34.133333 0 0 0-34.133333 34.133333v819.2z",fill:"#11AA66"}}),a("path",{attrs:{d:"M238.933333 307.2a34.133333 34.133333 0 0 0 0 68.266667h136.533334a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h409.6a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h204.8a34.133333 34.133333 0 1 0 0-68.266667H238.933333z",fill:"#FFFFFF"}})]),t._v(" 文章信息 ")]),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.article,rules:t.rules,"label-width":"110px"}},[a("el-form-item",{attrs:{label:"标题",prop:"articleTitle"}},[a("el-input",{attrs:{maxlength:"30"},model:{value:t.article.articleTitle,callback:function(e){t.$set(t.article,"articleTitle",e)},expression:"article.articleTitle"}})],1),a("el-form-item",{attrs:{label:"内容",prop:"articleContent"}},[a("mavon-editor",{ref:"md",on:{imgAdd:t.imgAdd},model:{value:t.article.articleContent,callback:function(e){t.$set(t.article,"articleContent",e)},expression:"article.articleContent"}})],1),a("el-form-item",{attrs:{label:"是否启用评论",prop:"commentStatus"}},[a("el-tag",{attrs:{type:!1===t.article.commentStatus?"danger":"success","disable-transitions":""}},[t._v(" "+t._s(!1===t.article.commentStatus?"否":"是")+" ")]),a("el-switch",{model:{value:t.article.commentStatus,callback:function(e){t.$set(t.article,"commentStatus",e)},expression:"article.commentStatus"}})],1),a("el-form-item",{attrs:{label:"是否推荐",prop:"recommendStatus"}},[a("el-tag",{attrs:{type:!1===t.article.recommendStatus?"danger":"success","disable-transitions":""}},[t._v(" "+t._s(!1===t.article.recommendStatus?"否":"是")+" ")]),a("el-switch",{model:{value:t.article.recommendStatus,callback:function(e){t.$set(t.article,"recommendStatus",e)},expression:"article.recommendStatus"}})],1),a("el-form-item",{attrs:{label:"是否可见",prop:"viewStatus"}},[a("el-tag",{attrs:{type:!1===t.article.viewStatus?"danger":"success","disable-transitions":""}},[t._v(" "+t._s(!1===t.article.viewStatus?"否":"是")+" ")]),a("el-switch",{model:{value:t.article.viewStatus,callback:function(e){t.$set(t.article,"viewStatus",e)},expression:"article.viewStatus"}})],1),!1===t.article.viewStatus?a("el-form-item",{attrs:{label:"不可见时的访问密码",prop:"password"}},[a("el-input",{attrs:{maxlength:"30"},model:{value:t.article.password,callback:function(e){t.$set(t.article,"password",e)},expression:"article.password"}})],1):t._e(),!1===t.article.viewStatus?a("el-form-item",{attrs:{label:"密码提示",prop:"tips"}},[a("el-input",{attrs:{maxlength:"60"},model:{value:t.article.tips,callback:function(e){t.$set(t.article,"tips",e)},expression:"article.tips"}})],1):t._e(),a("el-form-item",{attrs:{label:"公司",prop:"corporationId"}},[a("el-select",{attrs:{placeholder:"请选择公司"},model:{value:t.article.corporationId,callback:function(e){t.$set(t.article,"corporationId",e)},expression:"article.corporationId"}},t._l(t.corporations,(function(t){return a("el-option",{key:t.id,attrs:{label:t.corporationTitle,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:"部门",prop:"departmentId"}},[a("el-select",{attrs:{disabled:t.$common.isEmpty(t.article.corporationId),placeholder:"请选择部门"},model:{value:t.article.departmentId,callback:function(e){t.$set(t.article,"departmentId",e)},expression:"article.departmentId"}},t._l(t.departments,(function(t){return a("el-option",{key:t.id,attrs:{label:t.departmentTitle,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:"分类",prop:"sortId"}},[a("el-select",{attrs:{placeholder:"请选择分类"},model:{value:t.article.sortId,callback:function(e){t.$set(t.article,"sortId",e)},expression:"article.sortId"}},t._l(t.sorts,(function(t){return a("el-option",{key:t.id,attrs:{label:t.sortName,value:t.id}})})),1)],1)],1),a("div",{staticClass:"myCenter",staticStyle:{"margin-bottom":"22px"}},[this.$common.isEmpty(this.id)?t._e():a("el-button",{staticStyle:{"margin-right":"30px"},attrs:{type:"danger"},on:{click:function(e){return t.deleteForm("ruleForm")}}},[t._v("删除文章")]),a("el-button",{staticStyle:{"margin-right":"30px"},attrs:{type:"info"},on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("重置所有修改")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("保存")])],1)],1)},i=[],s=(a("b0c0"),a("ac1f"),a("5319"),{components:{},data:function(){return{id:this.$route.query.id,article:{articleTitle:"",articleContent:"",commentStatus:!0,recommendStatus:!1,viewStatus:!0,password:"",tips:"",articleCover:"",videoUrl:"",corporationId:null,departmentId:null,sortId:null},sorts:[],corporations:[],departments:[],rules:{articleTitle:[{required:!0,message:"请输入标题",trigger:"change"}],articleContent:[{required:!0,message:"请输入内容",trigger:"change"}],commentStatus:[{required:!0,message:"是否启用评论",trigger:"change"}],recommendStatus:[{required:!0,message:"是否推荐",trigger:"change"}],viewStatus:[{required:!0,message:"是否可见",trigger:"change"}],articleCover:[{required:!0,message:"封面",trigger:"change"}],corporationId:[{required:!0,message:"公司",trigger:"change"}],departmentId:[{required:!0,message:"部门",trigger:"blur"}],sortId:[{required:!0,message:"分类",trigger:"change"}]}}},computed:{},watch:{"article.corporationId":function(t,e){null!==e&&(this.article.departmentId=null),null!==t&&this.getDepartmentByCorporation()}},created:function(){this.getSortAndCorporation(),this.getDepartmentByCorporation()},mounted:function(){},methods:{imgAdd:function(t,e){var a="";-1!==e.name.lastIndexOf(".")&&(a=e.name.substring(e.name.lastIndexOf(".")));var r="articlePicture/"+this.$store.state.currentAdmin.username.replace(/[^a-zA-Z]/g,"")+this.$store.state.currentAdmin.id+(new Date).getTime()+Math.floor(1e3*Math.random())+a,i=localStorage.getItem("defaultStoreType"),s=new FormData;s.append("file",e),s.append("originalName",e.name),s.append("key",r),s.append("relativePath",r),s.append("type","articlePicture"),s.append("storeType",i),"local"===i?this.saveLocal(t,s):"qiniu"===i&&this.saveQiniu(t,s)},saveLocal:function(t,e){var a=this;this.$http.upload(this.$constant.baseURL+"/resource/upload",e,!0).then((function(e){if(!a.$common.isEmpty(e.data)){var r=e.data;a.$refs.md.$img2Url(t,r)}})).catch((function(t){a.$message({message:t.message,type:"error"})}))},saveQiniu:function(t,e){var a=this;this.$http.get(this.$constant.baseURL+"/qiniu/getUpToken",{key:e.get("key")},!0).then((function(r){a.$common.isEmpty(r.data)||(e.append("token",r.data),a.$http.uploadQiniu(a.$store.state.sysConfig.qiniuUrl,e).then((function(r){if(!a.$common.isEmpty(r.key)){var i=a.$store.state.sysConfig["qiniu.downloadUrl"]+r.key,s=e.get("file");a.$common.saveResource(a,"articlePicture",i,s.size,s.type,s.name,"qiniu",!0),a.$refs.md.$img2Url(t,i)}})).catch((function(t){a.$message({message:t.message,type:"error"})})))})).catch((function(t){a.$message({message:t.message,type:"error"})}))},getSortAndCorporation:function(){var t=this;this.$http.get(this.$constant.baseURL+"/webInfo/listSortAndCorporations").then((function(e){t.$common.isEmpty(e.data)||(t.sorts=e.data.sorts,t.corporations=e.data.corporations)})).catch((function(e){t.$message({message:e.message,type:"error"})}))},getDepartmentByCorporation:function(){var t=this;this.$common.isEmpty(this.article.corporationId)?this.departments=[]:this.$http.get(this.$constant.baseURL+"/department/getDepartmentByCorporationId",{id:this.article.corporationId}).then((function(e){t.departments=e.data})).catch((function(e){t.$message({message:e.message,type:"error"})}))},getArticle:function(){var t=this;this.$http.get(this.$constant.baseURL+"/admin/article/getArticleById",{id:this.id},!0).then((function(e){t.$common.isEmpty(e.data)||(t.article=e.data)})).catch((function(e){t.$message({message:e.message,type:"error"})}))},submitForm:function(t){var e=this;this.$refs[t].validate((function(t){t?e.$common.isEmpty(e.id)?e.saveArticle(e.article,"/article/saveArticle"):(e.article.id=e.id,e.saveArticle(e.article,"/admin/article/updateArticle")):e.$message({message:"请完善必填项！",type:"error"})}))},resetForm:function(t){var e=this;this.$confirm("确认重置？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info",center:!0}).then((function(){e.$refs[t].resetFields(),e.$common.isEmpty(e.id)||e.getArticle(),e.$message({message:"重置成功！",type:"success"})})).catch((function(){}))},deleteForm:function(t){var e=this;this.$confirm("确认删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"error",center:!0}).then((function(){e.$http.get(e.$constant.baseURL+"/admin/article/deleteArticle",{id:e.id,userId:e.article.userId},!0).then((function(t){t.data;e.$message({message:"删除成功！",type:"success"}),e.$router.push({path:"/postList"})})).catch((function(t){e.$message({message:t.message,type:"error"})}))})).catch((function(){}))},saveArticle:function(t,e){var a=this;this.$confirm("确认保存？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success",center:!0}).then((function(){a.$http.post(a.$constant.baseURL+e,t,!0).then((function(t){a.$message({message:"保存成功！",type:"success"})})).catch((function(t){a.$message({message:t.message,type:"error"})}))})).catch((function(){a.$message({type:"success",message:"已取消保存!"})}))}}}),n=s,o=(a("9f6a"),a("2877")),c=Object(o["a"])(n,r,i,!1,null,"18270738",null);e["default"]=c.exports},9610:function(t,e,a){},"9f6a":function(t,e,a){"use strict";a("9610")},b0c0:function(t,e,a){var r=a("83ab"),i=a("5e77").EXISTS,s=a("e330"),n=a("9bf2").f,o=Function.prototype,c=s(o.toString),l=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,m=s(l.exec),u="name";r&&!i&&n(o,u,{configurable:!0,get:function(){try{return m(l,c(this))[1]}catch(t){return""}}})}}]);