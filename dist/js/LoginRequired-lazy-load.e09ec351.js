(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["LoginRequired-lazy-load"],{"118e":function(e,o,n){},"8e43":function(e,o,n){"use strict";n.r(o);var a=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("v-container",{staticClass:"my-15 cont",attrs:{"grid-list-xs":"","align-center":""}},[n("h2",[e._v("Tento obsah je přístupný pouze pro členy našich oddílů. Pro jeho zobrazení se prosím přihlaste.")]),n("v-col",{attrs:{align:"center"}},[n("LoginForm",{staticClass:"my-5"}),n("v-dialog",{attrs:{width:"500"},model:{value:e.loginDialogLoader,callback:function(o){e.loginDialogLoader=o},expression:"loginDialogLoader"}},[n("LoginLoader")],1)],1)],1)},t=[],i=n("fe86"),r=n("6c1e"),s={name:"LoginRequired",components:{LoginForm:i["a"],LoginLoader:r["a"]},created:function(){},computed:{loginDialogLoader:{set:function(){this.$store.dispatch("closeLoginDialog")},get:function(){return this.$store.getters.getLoginDialogLoader}}}},l=s,c=(n("e3ef"),n("2877")),g=n("6544"),d=n.n(g),u=n("62ad"),p=n("a523"),L=n("169a"),f=Object(c["a"])(l,a,t,!1,null,"4ed45541",null);o["default"]=f.exports;d()(f,{VCol:u["a"],VContainer:p["a"],VDialog:L["a"]})},e3ef:function(e,o,n){"use strict";var a=n("118e"),t=n.n(a);t.a}}]);
//# sourceMappingURL=LoginRequired-lazy-load.e09ec351.js.map