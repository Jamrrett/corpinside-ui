(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3102d67d"],{"1c83":function(t,o,e){},b0c0:function(t,o,e){var r=e("83ab"),a=e("5e77").EXISTS,n=e("e330"),i=e("9bf2").f,s=Function.prototype,c=n(s.toString),p=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,l=n(p.exec),m="name";r&&!a&&i(s,m,{configurable:!0,get:function(){try{return l(p,c(this))[1]}catch(t){return""}}})},bde8:function(t,o,e){"use strict";e.r(o);var r=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("el-tag",{staticClass:"my-tag",attrs:{effect:"dark"}},[e("svg",{staticStyle:{"vertical-align":"-3px"},attrs:{viewBox:"0 0 1024 1024",width:"20",height:"20"}},[e("path",{attrs:{d:"M0 0h1024v1024H0V0z",fill:"#202425",opacity:".01"}}),e("path",{attrs:{d:"M682.666667 204.8h238.933333a34.133333 34.133333 0 0 1 34.133333 34.133333v648.533334a68.266667 68.266667 0 0 1-68.266666 68.266666h-204.8V204.8z",fill:"#FFAA44"}}),e("path",{attrs:{d:"M68.266667 921.6a34.133333 34.133333 0 0 0 34.133333 34.133333h785.066667a68.266667 68.266667 0 0 1-68.266667-68.266666V102.4a34.133333 34.133333 0 0 0-34.133333-34.133333H102.4a34.133333 34.133333 0 0 0-34.133333 34.133333v819.2z",fill:"#11AA66"}}),e("path",{attrs:{d:"M238.933333 307.2a34.133333 34.133333 0 0 0 0 68.266667h136.533334a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h409.6a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h204.8a34.133333 34.133333 0 1 0 0-68.266667H238.933333z",fill:"#FFFFFF"}})]),t._v(" 文章信息 ")]),e("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.corporation,rules:t.rules,"label-width":"110px"}},[e("el-form-item",{attrs:{label:"名称",prop:"corporationTitle"}},[e("el-input",{attrs:{maxlength:"30"},model:{value:t.corporation.corporationTitle,callback:function(o){t.$set(t.corporation,"corporationTitle",o)},expression:"corporation.corporationTitle"}})],1),e("el-form-item",{attrs:{label:"视频链接",prop:"videoUrl"}},[e("el-input",{attrs:{maxlength:"1000"},model:{value:t.corporation.videoUrl,callback:function(o){t.$set(t.corporation,"videoUrl",o)},expression:"corporation.videoUrl"}})],1),e("el-form-item",{attrs:{label:"介绍",prop:"corporationContent"}},[e("mavon-editor",{ref:"md",on:{imgAdd:t.imgAdd},model:{value:t.corporation.corporationContent,callback:function(o){t.$set(t.corporation,"corporationContent",o)},expression:"corporation.corporationContent"}})],1),e("el-form-item",{attrs:{label:"是否启用评论",prop:"commentStatus"}},[e("el-tag",{attrs:{type:!1===t.corporation.commentStatus?"danger":"success","disable-transitions":""}},[t._v(" "+t._s(!1===t.corporation.commentStatus?"否":"是")+" ")]),e("el-switch",{model:{value:t.corporation.commentStatus,callback:function(o){t.$set(t.corporation,"commentStatus",o)},expression:"corporation.commentStatus"}})],1),e("el-form-item",{attrs:{label:"是否推荐",prop:"recommendStatus"}},[e("el-tag",{attrs:{type:!1===t.corporation.recommendStatus?"danger":"success","disable-transitions":""}},[t._v(" "+t._s(!1===t.corporation.recommendStatus?"否":"是")+" ")]),e("el-switch",{model:{value:t.corporation.recommendStatus,callback:function(o){t.$set(t.corporation,"recommendStatus",o)},expression:"corporation.recommendStatus"}})],1),e("el-form-item",{attrs:{label:"是否可见",prop:"viewStatus"}},[e("el-tag",{attrs:{type:!1===t.corporation.viewStatus?"danger":"success","disable-transitions":""}},[t._v(" "+t._s(!1===t.corporation.viewStatus?"否":"是")+" ")]),e("el-switch",{model:{value:t.corporation.viewStatus,callback:function(o){t.$set(t.corporation,"viewStatus",o)},expression:"corporation.viewStatus"}})],1),!1===t.corporation.viewStatus?e("el-form-item",{attrs:{label:"不可见时的访问密码",prop:"password"}},[e("el-input",{attrs:{maxlength:"30"},model:{value:t.corporation.password,callback:function(o){t.$set(t.corporation,"password",o)},expression:"corporation.password"}})],1):t._e(),!1===t.corporation.viewStatus?e("el-form-item",{attrs:{label:"密码提示",prop:"tips"}},[e("el-input",{attrs:{maxlength:"60"},model:{value:t.corporation.tips,callback:function(o){t.$set(t.corporation,"tips",o)},expression:"corporation.tips"}})],1):t._e(),e("el-form-item",{attrs:{label:"Logo",prop:"corporationLogo"}},[e("div",{staticStyle:{display:"flex"}},[e("el-input",{model:{value:t.corporation.corporationLogo,callback:function(o){t.$set(t.corporation,"corporationLogo",o)},expression:"corporation.corporationLogo"}}),e("el-image",{staticClass:"table-td-thumb",staticStyle:{"margin-left":"10px"},attrs:{lazy:"","preview-src-list":[t.corporation.corporationLogo],src:t.corporation.corporationLogo,fit:"cover"}})],1),e("uploadPicture",{staticStyle:{"margin-top":"10px"},attrs:{isAdmin:!0,prefix:"corporationLogo",maxSize:1,maxNumber:1},on:{addPicture:t.addCorporationLogo}})],1),e("el-form-item",{attrs:{label:"封面",prop:"corporationCover"}},[e("div",{staticStyle:{display:"flex"}},[e("el-input",{model:{value:t.corporation.corporationCover,callback:function(o){t.$set(t.corporation,"corporationCover",o)},expression:"corporation.corporationCover"}}),e("el-image",{staticClass:"table-td-thumb",staticStyle:{"margin-left":"10px"},attrs:{lazy:"","preview-src-list":[t.corporation.corporationCover],src:t.corporation.corporationCover,fit:"cover"}})],1),e("uploadPicture",{staticStyle:{"margin-top":"10px"},attrs:{isAdmin:!0,prefix:"corporationCover",maxSize:3,maxNumber:1},on:{addPicture:t.addCorporationCover}})],1),e("el-form-item",{attrs:{label:"分类",prop:"sortId"}},[e("el-select",{attrs:{placeholder:"请选择分类"},model:{value:t.corporation.sortId,callback:function(o){t.$set(t.corporation,"sortId",o)},expression:"corporation.sortId"}},t._l(t.sorts,(function(t){return e("el-option",{key:t.id,attrs:{label:t.sortName,value:t.id}})})),1)],1)],1),e("div",{staticClass:"myCenter",staticStyle:{"margin-bottom":"22px"}},[this.$common.isEmpty(this.id)?t._e():e("el-button",{staticStyle:{"margin-right":"30px"},attrs:{type:"danger"},on:{click:function(o){return t.deleteForm("ruleForm")}}},[t._v("删除文章")]),e("el-button",{staticStyle:{"margin-right":"30px"},attrs:{type:"info"},on:{click:function(o){return t.resetForm("ruleForm")}}},[t._v("重置所有修改")]),e("el-button",{attrs:{type:"primary"},on:{click:function(o){return t.submitForm("ruleForm")}}},[t._v("保存")])],1)],1)},a=[],n=(e("d3b7"),e("3ca3"),e("ddb0"),e("b0c0"),e("ac1f"),e("5319"),function(){return e.e("chunk-43ff963a").then(e.bind(null,"6034"))}),i={components:{uploadPicture:n},data:function(){return{id:this.$route.query.id,corporation:{corporationTitle:"",corporationContent:"",commentStatus:!0,recommendStatus:!1,viewStatus:!0,password:"",tips:"",corporationLogo:"",corporationCover:"",videoUrl:"",sortId:null},sorts:[],rules:{corporationTitle:[{required:!0,message:"请输入名称",trigger:"change"}],corporationContent:[{required:!0,message:"请输入内容",trigger:"change"}],commentStatus:[{required:!0,message:"是否启用评论",trigger:"change"}],recommendStatus:[{required:!0,message:"是否推荐",trigger:"change"}],viewStatus:[{required:!0,message:"是否可见",trigger:"change"}],corporationLogo:[{required:!0,message:"Logo",trigger:"change"}],corporationCover:[{required:!0,message:"封面",trigger:"change"}],sortId:[{required:!0,message:"分类",trigger:"change"}]}}},created:function(){this.getSortCorporation()},mounted:function(){},methods:{imgAdd:function(t,o){var e="";-1!==o.name.lastIndexOf(".")&&(e=o.name.substring(o.name.lastIndexOf(".")));var r="corporationPicture/"+this.$store.state.currentAdmin.username.replace(/[^a-zA-Z]/g,"")+this.$store.state.currentAdmin.id+(new Date).getTime()+Math.floor(1e3*Math.random())+e,a=localStorage.getItem("defaultStoreType"),n=new FormData;n.append("file",o),n.append("originalName",o.name),n.append("key",r),n.append("relativePath",r),n.append("type","corporationPicture"),n.append("storeType",a),"local"===a?this.saveLocal(t,n):"qiniu"===a&&this.saveQiniu(t,n)},saveLocal:function(t,o){var e=this;this.$http.upload(this.$constant.baseURL+"/resource/upload",o,!0).then((function(o){if(!e.$common.isEmpty(o.data)){var r=o.data;e.$refs.md.$img2Url(t,r)}})).catch((function(t){e.$message({message:t.message,type:"error"})}))},saveQiniu:function(t,o){var e=this;this.$http.get(this.$constant.baseURL+"/qiniu/getUpToken",{key:o.get("key")},!0).then((function(r){e.$common.isEmpty(r.data)||(o.append("token",r.data),e.$http.uploadQiniu(e.$store.state.sysConfig.qiniuUrl,o).then((function(r){if(!e.$common.isEmpty(r.key)){var a=e.$store.state.sysConfig["qiniu.downloadUrl"]+r.key,n=o.get("file");e.$common.saveResource(e,"corporationPicture",a,n.size,n.type,n.name,"qiniu",!0),e.$refs.md.$img2Url(t,a)}})).catch((function(t){e.$message({message:t.message,type:"error"})})))})).catch((function(t){e.$message({message:t.message,type:"error"})}))},addCorporationLogo:function(t){this.corporation.corporationLogo=t,console.log(this.corporation.corporationLogo)},addCorporationCover:function(t){this.corporation.corporationCover=t},getSortCorporation:function(){var t=this;this.$http.get(this.$constant.baseURL+"/webInfo/getSortCorporationInfo").then((function(o){t.$common.isEmpty(o.data)||(t.sorts=o.data,t.$common.isEmpty(t.id)||t.getCorporation())})).catch((function(o){t.$message({message:o.message,type:"error"})}))},getCorporation:function(){var t=this;this.$http.get(this.$constant.baseURL+"/admin/corporation/getCorporationById",{id:this.id},!0).then((function(o){t.$common.isEmpty(o.data)||(t.corporation=o.data)})).catch((function(o){t.$message({message:o.message,type:"error"})}))},submitForm:function(t){var o=this;this.$refs[t].validate((function(t){t?o.$common.isEmpty(o.id)?o.saveCorporation(o.corporation,"/corporation/saveCorporation"):(o.corporation.id=o.id,o.saveCorporation(o.corporation,"/admin/corporation/updateCorporation")):(console.log(t),o.$message({message:"请完善必填项！",type:"error"}))}))},resetForm:function(t){var o=this;this.$confirm("确认重置？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info",center:!0}).then((function(){o.$refs[t].resetFields(),o.$common.isEmpty(o.id)||o.getCorporation(),o.$message({message:"重置成功！",type:"success"})})).catch((function(){}))},deleteForm:function(){var t=this;this.$confirm("确认删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"error",center:!0}).then((function(){t.$http.get(t.$constant.baseURL+"/admin/corporation/deleteCorporation",{id:t.id},!0).then((function(){t.$message({message:"删除成功！",type:"success"}),t.$router.push({path:"/corporationList"})})).catch((function(o){t.$message({message:o.message,type:"error"})}))})).catch((function(){}))},saveCorporation:function(t,o){var e=this;this.$confirm("确认保存？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success",center:!0}).then((function(){e.$http.post(e.$constant.baseURL+o,t,!0).then((function(){e.$message({message:"保存成功！",type:"success"}),e.$router.push({path:"/corporationList"})})).catch((function(t){e.$message({message:t.message,type:"error"})}))})).catch((function(){e.$message({type:"success",message:"已取消保存!"})}))}}},s=i,c=(e("c22c"),e("2877")),p=Object(c["a"])(s,r,a,!1,null,"390cc001",null);o["default"]=p.exports},c22c:function(t,o,e){"use strict";e("1c83")}}]);