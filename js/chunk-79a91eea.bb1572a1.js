(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79a91eea"],{9268:function(t,o,i){},"99af":function(t,o,i){"use strict";var e=i("23e7"),a=i("da84"),n=i("d039"),s=i("e8b5"),c=i("861d"),r=i("7b0b"),h=i("07fa"),l=i("8418"),u=i("65f0"),p=i("1dde"),d=i("b622"),f=i("2d00"),g=d("isConcatSpreadable"),v=9007199254740991,m="Maximum allowed index exceeded",y=a.TypeError,b=f>=51||!n((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),P=p("concat"),w=function(t){if(!c(t))return!1;var o=t[g];return void 0!==o?!!o:s(t)},_=!b||!P;e({target:"Array",proto:!0,arity:1,forced:_},{concat:function(t){var o,i,e,a,n,s=r(this),c=u(s,0),p=0;for(o=-1,e=arguments.length;o<e;o++)if(n=-1===o?s:arguments[o],w(n)){if(a=h(n),p+a>v)throw y(m);for(i=0;i<a;i++,p++)i in n&&l(c,p,n[i])}else{if(p>=v)throw y(m);l(c,p++,n)}return c.length=p,c}})},"9ead":function(t,o,i){"use strict";i.r(o);var e=function(){var t=this,o=t.$createElement,i=t._self._c||o;return i("div",[i("div",{staticClass:"travel-container"},[i("div",{staticClass:"travel-header my-animation-slide-top"},[i("video",{staticClass:"index-video",attrs:{autoplay:"autoplay",muted:"muted",loop:"loop",src:t.$store.state.sysConfig["webStaticResourcePrefix"]+"assets/backgroundVideo.mp4"},domProps:{muted:!0}}),t._m(0),i("div",{staticStyle:{position:"absolute",left:"20px",bottom:"40px",margin:"10px"}},[t._v(" 每一张照片都是一次美好的记忆。 ")])]),i("div",{staticClass:"travel-content my-animation-slide-bottom"},[t.$common.isEmpty(t.photoTitleList)?t._e():i("div",{staticClass:"photo-title-warp"},t._l(t.photoTitleList,(function(o,e){return i("div",{key:e,class:{isActive:t.photoPagination.classify===o.classify},on:{click:function(i){return t.changePhotoTitle(o.classify)}}},[i("proTag",{staticStyle:{margin:"12px"},attrs:{info:o.classify+" "+o.count,color:t.$constant.before_color_list[Math.floor(6*Math.random())]}})],1)})),0),i("div",{staticClass:"photo-title"},[t._v(" "+t._s(t.photoPagination.classify)+" ")]),i("photo",{attrs:{resourcePathList:t.photoList}}),i("div",{staticClass:"pagination-wrap"},[t.photoPagination.total!==t.photoList.length?i("div",{staticClass:"pagination",on:{click:function(o){return t.pagePhotos()}}},[t._v(" 下一页 ")]):i("div",{staticStyle:{"user-select":"none"}},[t._v(" ~~到底啦~~ ")])])],1)]),i("div",{staticStyle:{background:"var(--favoriteBg)"}},[i("myFooter")],1)])},a=[function(){var t=this,o=t.$createElement,i=t._self._c||o;return i("div",{staticStyle:{position:"absolute",left:"20px",top:"20px"}},[i("div",{staticStyle:{margin:"10px"}},[i("div",[t._v(" 旅拍集 ")]),i("div",{staticStyle:{"font-size":"36px","font-weight":"bold","line-height":"1.5","margin-top":"20px"}},[t._v(" 这里是我的旅拍哦 ")])])])}],n=(i("d3b7"),i("3ca3"),i("ddb0"),i("99af"),function(){return i.e("chunk-b7a7b29a").then(i.bind(null,"68e4"))}),s=function(){return i.e("chunk-3c44ac4f").then(i.bind(null,"a1af"))},c=function(){return i.e("chunk-52863968").then(i.bind(null,"2c18"))},r={components:{photo:s,proTag:c,myFooter:n},data:function(){return{photoPagination:{current:1,size:10,total:0,resourceType:"lovePhoto",classify:""},photoTitleList:[],photoList:[]}},computed:{},watch:{},created:function(){this.getPhotoTitles()},mounted:function(){},methods:{getPhotoTitles:function(){var t=this;this.$http.get(this.$constant.baseURL+"/webInfo/listAdminLovePhoto").then((function(o){t.$common.isEmpty(o.data)||(t.photoTitleList=o.data,t.photoPagination={current:1,size:10,total:0,resourceType:"lovePhoto",classify:t.photoTitleList[0].classify},t.changePhoto())})).catch((function(o){t.$message({message:o.message,type:"error"})}))},changePhotoTitle:function(t){t!==this.photoPagination.classify&&(this.photoPagination={current:1,size:10,total:0,resourceType:"lovePhoto",classify:t},this.photoList=[],this.changePhoto())},pagePhotos:function(){this.photoPagination.current=this.photoPagination.current+1,this.changePhoto()},changePhoto:function(){var t=this;this.$http.post(this.$constant.baseURL+"/webInfo/listResourcePath",this.photoPagination).then((function(o){t.$common.isEmpty(o.data)||(t.photoList=t.photoList.concat(o.data.records),t.photoPagination.total=o.data.total)})).catch((function(o){t.$message({message:o.message,type:"error"})}))}}},h=r,l=(i("b2bc"),i("2877")),u=Object(l["a"])(h,e,a,!1,null,"1abdd1dd",null);o["default"]=u.exports},b2bc:function(t,o,i){"use strict";i("9268")}}]);