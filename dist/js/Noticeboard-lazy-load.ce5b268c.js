(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Noticeboard-lazy-load"],{"0492":function(e,t,a){"use strict";var o=a("e069"),n=a.n(o);n.a},6202:function(e,t,a){},a00d:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"py-8",attrs:{"grid-list-xs":""}},[a("h1",[e._v("Nástěnka")]),a("v-row",{attrs:{justify:"space-around"}},[a("v-col",{staticClass:"px-200",attrs:{cols:"12",md:"6"}},[a("Features")],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-card",{staticClass:"pa-4 mb-5",attrs:{elevation:"4"}},[a("h2",[e._v("Instruktážní video")]),a("p",[e._v(" V tomto videu najdete všechny základní funkce týkající se skautského webu. ")]),a("section",{staticClass:"video-container"},[a("iframe",{staticClass:"video",attrs:{src:"https://www.youtube.com/embed/SBjQ9tuuTJQ",frameborder:"0",height:"200px",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"}})])]),a("v-card",{staticClass:"pa-4 my-5",attrs:{elevation:"4"}},[a("h2",[e._v("Administrátor")]),a("v-card-subtitle",[a("p",[e._v("Tyto webové stránky vytvořil Dominik Jašek (Šíša). V případě jakýchkoliv dotazů mě kontaktujte na telefonu "),a("a",{attrs:{href:"tel:732-181-317"}},[e._v("732 181 317")]),e._v(" nebo na "),a("v-btn",{attrs:{icon:"",href:"https://www.facebook.com/dominikjasekk"}},[a("v-icon",{staticClass:"mb-1"},[e._v("mdi-facebook")])],1),e._v(".")],1),a("p",[e._v('Vše dělám ve svém volném čase, tudíž se předem omlouvám za moje výmluvy typu "'),a("i",[e._v("sorry, nemám teď vůbec čas")]),e._v('". Nenechte se ale zastrašit a perte to do mě, já si s tím nějak poradím 🙂')]),a("p",[e._v("PS: Velmi rád uvítám výpomoc šikovného programátora se znalostí Vue.js. Rád si s Tebou projdu zdrojový kód a vysvětlím Ti, jak všechno funguje. Pokud máš chuť mi pomoct, ozvi se mi prosím. ")])])],1)],1)],1)],1)},n=[],r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{staticClass:"pa-4 mb-5",attrs:{elevation:"4"}},[a("div",[a("h2",[e._v("Implementované funkce")]),a("p",[e._v("Následující funkce se mi podařilo přidat na web:")]),e._l(e.features.done,(function(t,o){return a("v-card",{key:o,staticClass:"my-1",attrs:{elevation:"2"}},[a("v-card-subtitle",[a("span",[e._v(" ✔️ "+e._s(t.popis)+" ("+e._s(e.getDate(t.updatedAt))+")")])])],1)})),a("br"),a("br"),a("h2",[e._v("Plánované funkce")]),a("p",[e._v("Tyto funkce plánuji přidat. Můžete přidat také vlastní požadavek na novou funkci na webu. Prosím o konkrétní popis problému, aby pro mě bylo jasné, o co se jedná.")]),e._l(e.features.notdone,(function(t,o){return a("v-card",{key:"A"+o,staticClass:"my-1",attrs:{elevation:"2"}},[a("v-card-subtitle",[a("span",[e._v(" ❌ "+e._s(t.popis))])])],1)})),a("v-card",{staticClass:"my-1 ",attrs:{elevation:"2"}},[a("v-card-subtitle",[a("v-text-field",{attrs:{counter:"100",label:"Požadavek na novou funkci"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.saveNewFeature(t)}},model:{value:e.newFeatureText,callback:function(t){e.newFeatureText=t},expression:"newFeatureText"}}),a("div",{staticClass:"d-flex justify-end mt-4"},[a("v-btn",{staticClass:"white--text",attrs:{loading:e.uploading,color:"#174085"},on:{click:e.saveNewFeature}},[e._v("Přidat")])],1)],1)],1)],2)])},s=[],i=(a("4160"),a("159b"),a("bc3a")),c=a.n(i),u={name:"Features",data:function(){return{features:{done:[],notdone:[]},show:!1,newFeatureText:"",uploading:!1}},methods:{getDate:function(e){var t=new Date(e);return t.toLocaleDateString("cs-CS")},saveNewFeature:function(){var e=this;this.newFeatureText&&(console.log("saving new feature"),this.uploading=!0,c.a.post("/features",{popis:this.newFeatureText}).then((function(t){console.log("res",t),e.uploading=!1,e.features.notdone.push(t.data),e.newFeatureText=""})).catch((function(t){console.log("posting new feautre was not successfull",t),e.uploading=!1})))},getFeatures:function(){var e=this;c.a.get("/features").then((function(t){console.log("features",t.data),t.data.forEach((function(t){t.done?e.features.done.push(t):e.features.notdone.push(t)}))}))}},created:function(){this.getFeatures()}},l=u,d=a("2877"),v=a("6544"),p=a.n(v),m=a("8336"),f=a("b0af"),h=a("99d9"),g=a("8654"),b=Object(d["a"])(l,r,s,!1,null,"37d9319d",null),k=b.exports;p()(b,{VBtn:m["a"],VCard:f["a"],VCardSubtitle:h["b"],VTextField:g["a"]});var _={name:"Noticeboard",components:{Features:k}},w=_,y=(a("da0f"),a("62ad")),j=a("a523"),C=a("132d"),x=a("0fd9"),V=Object(d["a"])(w,o,n,!1,null,"bcab9cd2",null);t["default"]=V.exports;p()(V,{VBtn:m["a"],VCard:f["a"],VCardSubtitle:h["b"],VCol:y["a"],VContainer:j["a"],VIcon:C["a"],VRow:x["a"]})},da0f:function(e,t,a){"use strict";var o=a("6202"),n=a.n(o);n.a},e069:function(e,t,a){},f5e2:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"my-3",attrs:{"grid-list-xs":""}},[a("h1",{staticClass:"mb-0",attrs:{id:"Aktuality"}},[e._v("Schválení registrace vedoucích")]),a("v-divider",{staticClass:"mb-4"}),a("p",[e._v("Zde můžete schválit registraci jiných vedoucích, kteří se zaregistrovali na web. Schválení proveďte až po "),a("strong",[e._v("důkladném ověření")]),e._v(" totožnosti zaregistrovaného účtu. (jméno, email, přihlašovací jméno musí patřit skutečně danému vedoucímu). Pokud náhodou schválíte nesprávnou registraci, ihned kontaktujte správce webu.")]),a("br"),a("v-data-table",{staticClass:"elevation-3",attrs:{loading:e.loading,"loading-text":"Načítám registrace...",headers:e.headers,items:e.users,"loader-height":"6","sort-by":"id","hide-default-footer":""},scopedSlots:e._u([{key:"item.createdAt",fn:function(t){var o=t.item;return[a("span",[e._v(e._s(o.createdAtFormated))])]}},{key:"item.actions",fn:function(t){var o=t.item;return[o.blocked?a("div",[a("v-btn",{staticClass:"mr-3",attrs:{color:"primary"},on:{click:function(t){return e.approveDialog(o)}}},[e._v("Schválit")]),a("v-btn",{attrs:{color:"error"},on:{click:function(t){return e.deleteDialog(o)}}},[e._v("Zrušit")])],1):a("div",[a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,r=t.attrs;return[a("div",e._g(e._b({attrs:{color:"primary",dark:""}},"div",r,!1),n),[e._v(" "+e._s(o.approvedAtFormated)+" ")])]}}],null,!0)},[a("span",[e._v("schváleno uživatelem "+e._s(o.approvedBy.jmeno))])])],1)]}}],null,!0)}),a("Confirm",{ref:"confirm"})],1)},n=[],r=(a("99af"),a("4160"),a("159b"),a("bc3a")),s=a.n(r),i=a("9420"),c={name:"ManageVedoucisRights",data:function(){return{loading:!1,headers:[{text:"Jméno",align:"start",value:"jmeno"},{text:"Přezdívka",value:"prezdivka"},{text:"Email",value:"email"},{text:"Datum registrace",value:"createdAt"},{text:"Schválení registrace",value:"actions",sortable:!1}],users:[]}},computed:{getPostObject:function(){var e=new Date;return console.log("today date is",e),{blocked:!1,approvedAt:e,approvedBy:{_id:this.get_id}}},get_id:function(){return this.$store.getters.get_id}},watch:{},methods:{approveDialog:function(e){var t=this;this.$refs.confirm.open("Schválit registraci","Opravdu chcete schválit registraci nového vedoucího - "+e.jmeno+"?",{color:"primary"}).then((function(a){a&&(t.loading=!0,s.a.put("/users/"+e.id,t.getPostObject).then((function(e){console.log("OU YEAH, member put successfully",e),t.loadVedoucis()})).catch((function(e){console.log("error while putting a member",e.response)})))}))},deleteDialog:function(e){var t=this;this.$refs.confirm.open("Smazat registraci","Opravdu chcete smazat registraci nového vedoucího - "+e.jmeno+"?",{color:"error"}).then((function(a){a&&(t.loading=!0,s.a.delete("/users/"+e.id,t.getPostObject).then((function(e){console.log("OU YEAH, member deleted successfully",e),t.loadVedoucis()})).catch((function(e){console.log("error while deleting a member",e.response)})))}))},loadVedoucis:function(){var e=this;this.loading=!0,s()({url:"/graphql",method:"post",data:{query:'\n          {\n            users(where: { role: { name: "Contributor" }}) {\n              id,\n              username,\n              email,\n              jmeno,\n              prezdivka,\n              blocked,\n              createdAt,\n              approvedAt,\n              approvedBy  {\n                jmeno\n              },\n            }\n          }'}}).then((function(t){console.log("all users loaded successfully",t),e.users=t.data.data.users,e.switches=[],e.users.forEach((function(e){var t=new Date(e.createdAt);e.createdAtFormated="".concat(t.getDate(),".").concat(t.getMonth()+1,".").concat(t.getFullYear());var a=new Date(e.approvedAt);e.approvedAtFormated="".concat(a.getDate(),".").concat(a.getMonth()+1,".").concat(a.getFullYear()),e.activeAccount=!e.blocked})),e.loading=!1})).catch((function(t){console.log("error while loading user",t.result),e.loading=!1}))}},created:function(){this.loadVedoucis()},components:{Confirm:i["a"]}},u=c,l=(a("0492"),a("2877")),d=a("6544"),v=a.n(d),p=a("8336"),m=a("a523"),f=a("8fea"),h=a("ce7e"),g=a("3a2f"),b=Object(l["a"])(u,o,n,!1,null,"d482ca16",null);t["default"]=b.exports;v()(b,{VBtn:p["a"],VContainer:m["a"],VDataTable:f["a"],VDivider:h["a"],VTooltip:g["a"]})}}]);
//# sourceMappingURL=Noticeboard-lazy-load.ce5b268c.js.map