(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["KontaktView-lazy-load"],{"259d":function(o,e,t){"use strict";var i=t("9061"),n=t.n(i);n.a},4256:function(o,e,t){"use strict";var i=t("7d3c"),n=t.n(i);n.a},"6aa7":function(o,e,t){"use strict";t.r(e);var i=function(){var o=this,e=o.$createElement,t=o._self._c||e;return t("v-container",{staticClass:"my-3",attrs:{"grid-list-xs":"","text-center":""}},[o.id?t("div",[t("h1",{staticClass:"mb-0",attrs:{id:"Aktuality"}},[o._v("Kontakty na hlavní vedoucí")]),t("v-divider",{staticClass:"mb-2"}),t("KontaktOddil",{attrs:{oddil:o.id}})],1):t("div",[t("h1",[o._v("Kontakty na hlavní vedoucí")]),t("v-divider",{staticClass:"mb-2"}),t("KontaktVudci",{attrs:{"py-5":""}})],1),o.isContributor?t("p",[t("strong",[o._v("Tip:")]),o._v(" Pořadí vedoucích se řídí podle času poslední úpravy. Pro umístění na první místo aktualizuj beze změny daného vedoucího. ")]):o._e()])},n=[],a=function(){var o=this,e=o.$createElement,t=o._self._c||e;return t("div",{staticClass:"team py-2"},[t("Confirm",{ref:"confirm"}),t("v-container",{attrs:{"grid-list-xs":"","my-5":""}},[t("v-tooltip",{attrs:{bottom:""},scopedSlots:o._u([{key:"activator",fn:function(e){var i=e.on,n=e.attrs;return[t("v-btn",o._g(o._b({directives:[{name:"show",rawName:"v-show",value:o.isContributor,expression:"isContributor"}],staticClass:"mb-5 mt-n3 editBtn",attrs:{fab:"",dark:"",color:"#174085"},on:{click:function(e){o.pickDialog=!0}}},"v-btn",n,!1),i),[t("v-icon",{attrs:{dark:""}},[o._v("mdi-plus")])],1)]}}])},[t("span",[o._v("Přidat vedoucího")])]),t("v-layout",{attrs:{row:"",wrap:"","justify-space-around":"","align-center":"",temporary:""}},[o.loading?o._l(7,(function(o){return t("v-flex",{key:o,attrs:{xl3:"",lg4:"",md6:"",sm6:"",xs12:"","mt-1":""}},[t("PersonCardLoader")],1)})):o._l(o.main_contacts,(function(e){return t("v-flex",{key:e._id,attrs:{xl3:"",lg4:"",md6:"",sm6:"",xs12:"","mt-1":""}},[t("PersonCard",{attrs:{fotkaUrl:e.vedouci.fotka[0]?e.vedouci.fotka[0].url:"",jmeno:e.vedouci.jmeno,prezdivka:e.vedouci.prezdivka?e.vedouci.prezdivka:"",funkce:e.vedouci.funkce?e.vedouci.funkce:"",popis:e.vedouci.popis?e.vedouci.popis:"",email:e.vedouci.email?e.vedouci.email:"",telefon:e.vedouci.telefon?e.vedouci.telefon:"",facebook:e.vedouci.facebook?e.vedouci.facebook:"",_id:e.vedouci._id,showPossibleEditBtn:"isContributor",showRemoveBtn:!0},on:{deleteItem:function(t){return o.deleteItem(e)},removeItem:function(t){return o.removeItem(e)}}})],1)}))],2)],1),t("v-dialog",{attrs:{"max-width":"500px"},model:{value:o.pickDialog,callback:function(e){o.pickDialog=e},expression:"pickDialog"}},[t("v-card",[t("v-card-title",[o._v(" Přidat veřejný kontakt ")]),t("v-card-text",[t("v-select",{attrs:{items:o.vedoucis,label:"Vyberte vedoucího","item-text":"jmeno","item-value":"id"},model:{value:o.newVedouci,callback:function(e){o.newVedouci=e},expression:"newVedouci"}})],1),t("v-card-actions",[t("v-btn",{attrs:{color:"primary",text:"",to:{name:"CreateVedouciView",params:{oddil:null}}}},[o._v(" Nový ")]),t("v-spacer"),t("v-btn",{attrs:{color:"primary",disabled:null==o.newVedouci},on:{click:o.add}},[o._v(" Přidat ")])],1)],1)],1)],1)},d=[],c=(t("4de4"),t("4160"),t("d3b7"),t("ac1f"),t("3ca3"),t("841c"),t("159b"),t("ddb0"),t("bc3a")),s=t.n(c),r=t("9702"),u=function(){var o=this,e=o.$createElement,t=o._self._c||e;return t("v-card",{staticClass:"my-5 mx-auto card",attrs:{"max-width":"344",height:"300",outlined:""}},[t("v-skeleton-loader",{attrs:{type:"image, list-item-two-line"}})],1)},l=[],v={name:"PersonCardLoader"},f=v,m=t("2877"),h=t("6544"),p=t.n(h),g=t("b0af"),k=t("3129"),b=Object(m["a"])(f,u,l,!1,null,"c56d53f6",null),V=b.exports;p()(b,{VCard:g["a"],VSkeletonLoader:k["a"]});var w=t("9420"),_={data:function(){return{newVedouci:null,pickDialog:!1,vedoucis:[],oddily:[],errors:[],main_contacts:[],loading:!0}},methods:{setLoading:function(o){this.$store.commit("setLoading",o)},compare:function(o,e){return o.vedouci.updatedAt>e.vedouci.updatedAt?-1:e.vedouci.updatedAt>o.vedouci.updatedAt?1:0},getMainVedoucis:function(){var o=this;return new Promise((function(e){s.a.get("/dulezity-vedoucis").then((function(t){o.main_contacts=[],t.data.forEach((function(e){console.log(e),o.main_contacts.push(e)})),o.main_contacts.sort(o.compare),o.getRestOfVedoucis(),console.log("main_contacts",o.main_contacts),o.loading=!1,o.setLoading(!1),e("OK")})).catch((function(e){o.errors.push(e),o.loading=!1,o.setLoading(!1)}))}))},getRestOfVedoucis:function(){var o=this;s()({url:"/graphql",method:"post",data:{query:"\n        {\n          vedoucis {\n              jmeno,\n              id\n            }\n        }\n        "}}).then((function(e){console.log("vedoucis",e.data.data.vedoucis),o.vedoucis=e.data.data.vedoucis,o.vedoucis=o.vedoucis.filter((function(e){return o.search(e.id)}))})).catch((function(e){console.log(e),o.errors.push(e)}))},add:function(){var o=this;null!=this.newVedouci&&(this.pickDialog=!1,this.setLoading(!0),s.a.post("/dulezity-vedoucis",{vedouci:this.newVedouci}).then((function(e){console.log("new vedouci was added",e),o.getMainVedoucis(),o.newVedouci=null,o.setLoading(!1)})).catch((function(o){console.log("new vedouci was not added",o)}))),console.log("Adding vedouci with id =",this.newVedouci)},isInArray:function(o){this.main_contacts.forEach((function(e){if(o.id==e.vedouci.id)return!0}))},search:function(o){for(var e=0;e<this.main_contacts.length;e++)if(this.main_contacts[e].vedouci.id===o)return console.log("found"),!1;return!0},deleteItem:function(o){var e=this;console.log("opening confirmation dialog to delete",o.vedouci),this.$refs.confirm.open("Odstranit","Opravdu chcete trvale odstranit vedoucího "+o.vedouci.jmeno+"?",{color:"error"}).then((function(t){if(t){e.setLoading(!0);var i=[];i.push(s.a.delete("/dulezity-vedoucis/"+o.id).then((function(o){console.log("dulezity vedouci deleted",o)})).catch((function(o){console.log("error while deleting dulezity vedouci",o)}))),o.vedouci.fotka[0].url&&i.push(s.a.delete("/upload/files/"+o.vedouci.fotka[0]._id).then((function(o){console.log("photo of vedouci deleted successfully",o)})).catch((function(o){console.log("error while deleting photo of vedouci",o)}))),i.push(s.a.delete("/vedoucis/"+o.vedouci.id).then((function(o){console.log("vedouci deleted",o)})).catch((function(o){console.log("error while deleting vedouci",o)}))),Promise.all(i).then((function(o){console.log("vedouci (and photo) deleted from both collections successfully",o),e.getMainVedoucis()})).catch((function(o){console.log("there was a fail during deleting vedouci",o.response),e.getMainVedoucis()}))}}))},removeItem:function(o){var e=this;console.log("opening confirmation dialog to remove",o),this.$refs.confirm.open("Odstranit","Opravdu chcete odebrat vedoucího "+o.vedouci.jmeno+"? Vedoucí nebude smazán úplně, pouze bude odstraněn z tohoto veřejného seznamu.",{color:"warning"}).then((function(t){t&&(e.setLoading(!0),s.a.delete("/dulezity-vedoucis/"+o.id).then((function(o){console.log("dulezity vedouci deleted",o),e.getMainVedoucis()})).catch((function(o){console.log("error while deleting dulezity vedouci",o),this.getMainVedoucis()})))}))}},computed:{isContributor:function(){return this.$store.getters.isContributor}},created:function(){this.getMainVedoucis()},components:{PersonCard:r["a"],PersonCardLoader:V,Confirm:w["a"]}},y=_,C=t("8336"),x=t("99d9"),z=t("a523"),j=t("169a"),L=t("0e8f"),P=t("132d"),O=t("a722"),D=t("b974"),$=t("2fa4"),I=t("3a2f"),K=Object(m["a"])(y,a,d,!1,null,"1c1cf8f5",null),A=K.exports;p()(K,{VBtn:C["a"],VCard:g["a"],VCardActions:x["a"],VCardText:x["c"],VCardTitle:x["d"],VContainer:z["a"],VDialog:j["a"],VFlex:L["a"],VIcon:P["a"],VLayout:O["a"],VSelect:D["a"],VSpacer:$["a"],VTooltip:I["a"]});var B=function(){var o=this,e=o.$createElement,t=o._self._c||e;return t("div",{staticClass:"team py-2"},[t("Confirm",{ref:"confirm"}),t("v-container",{attrs:{"grid-list-xs":"","my-2":""}},[t("h2",{staticClass:"mb-5"},[o._v(o._s(o.oddilNazev[o.oddil]))]),t("v-tooltip",{attrs:{bottom:""},scopedSlots:o._u([{key:"activator",fn:function(e){var i=e.on,n=e.attrs;return[t("v-btn",o._g(o._b({directives:[{name:"show",rawName:"v-show",value:o.isContributor,expression:"isContributor"}],staticClass:"mb-5 editBtn",attrs:{fab:"",dark:"",color:"#174085",to:{name:"CreateVedouciView",params:{oddil:o.oddil}}}},"v-btn",n,!1),i),[t("v-icon",{attrs:{dark:""}},[o._v("mdi-plus")])],1)]}}])},[t("span",[o._v("Vytvořit nového vedoucího")])]),t("v-layout",{attrs:{row:"",wrap:"","justify-space-around":"","align-center":"",temporary:""}},[o.loading?o._l(5,(function(o){return t("v-flex",{key:o,attrs:{xl3:"",lg4:"",md6:"",sm6:"",xs12:"","mt-1":""}},[t("PersonCardLoader")],1)})):o._l(o.vedouci,(function(e){return t("v-flex",{key:e._id,attrs:{xl3:"",lg4:"",md6:"",sm6:"",xs12:"","mt-1":""}},[t("PersonCard",{attrs:{fotkaUrl:e.fotka[0]?e.fotka[0].url:"",jmeno:e.jmeno,prezdivka:e.prezdivka?e.prezdivka:"",funkce:e.funkce?e.funkce:"",popis:e.popis?e.popis:"",email:e.email?e.email:"",telefon:e.telefon?e.telefon:"",facebook:e.facebook?e.facebook:"",_id:e._id,showPossibleEditBtn:"isContributor",showRemoveBtn:!1},on:{deleteItem:function(t){return o.deleteItem(e)}}})],1)}))],2)],1)],1)},E=[],M=t("5fb0"),N={name:"Kontakt",props:["oddil"],data:function(){return{vedouci:[],oddilNazev:{skauti:"2. oddíl skautů",skautky:"2. oddíl skautek",vlcata:"2. smečka vlčat",svetlusky:"2. roj světlušek",roveri:"2. oddíl roverů a rangers",oldskauti:"Rikitanova dvojka"},oddilDiacritics:M["a"].oddilDiacriticsObj,loading:!0}},methods:{setLoading:function(o){this.$store.commit("setLoading",o)},getVedoucis:function(o){var e=this;console.log("getting vedoucis for oddil:",o),s.a.get("/vedoucis?oddil.nazev="+o+"&_sort=updatedAt:desc").then((function(o){e.vedouci=o.data,console.log("vedoucis loaded",e.vedouci),e.loading=!1})).catch((function(o){e.errors.push(o),e.loading=!1}))},deleteItem:function(o){var e=this;console.log("opening confirmation dialog",o),this.$refs.confirm.open("Odstranit","Opravdu chcete trvale odstranit vedoucího "+o.jmeno+"?",{color:"error"}).then((function(t){if(t){console.log("deleting item",o),e.setLoading(!0);var i=[];o.fotka[0].url&&i.push(s.a.delete("/upload/files/"+o.fotka[0]._id).then((function(o){console.log("photo of vedouci deleted successfully",o)})).catch((function(o){console.log("error while deleting photo of vedouci",o)}))),i.push(s.a.delete("/vedoucis/"+o.id).then((function(o){console.log("vedouci deleted successfully",o)})).catch((function(o){console.log("error while deleting vedouci",o)}))),Promise.all(i).then((function(o){console.log("both vedouci and photo deleted successfully",o),e.getVedoucis(e.oddilDiacritics[e.oddil]),e.setLoading(!1)})).catch((function(o){console.log("error while deleting photo or vedouci",o.response),e.getVedoucis(e.oddilDiacritics[e.oddil]),e.setLoading(!1)}))}}))}},computed:{isContributor:function(){return this.$store.getters.isContributor}},watch:{oddil:function(o){this.getVedoucis(this.oddilDiacritics[o])}},created:function(){this.getVedoucis(this.oddilDiacritics[this.oddil])},components:{PersonCard:r["a"],PersonCardLoader:V,Confirm:w["a"]}},R=N,S=(t("259d"),Object(m["a"])(R,B,E,!1,null,"271ec0ca",null)),T=S.exports;p()(S,{VBtn:C["a"],VContainer:z["a"],VFlex:L["a"],VIcon:P["a"],VLayout:O["a"],VTooltip:I["a"]});var q={name:"KontaktView",data:function(){return{id:this.$route.params.oddil}},computed:{isContributor:function(){return this.$store.getters.isContributor}},components:{KontaktVudci:A,KontaktOddil:T},watch:{$route:function(o){this.id=o.params.oddil}}},F=q,J=(t("4256"),t("ce7e")),U=Object(m["a"])(F,i,n,!1,null,"03e3589d",null);e["default"]=U.exports;p()(U,{VContainer:z["a"],VDivider:J["a"]})},"7d3c":function(o,e,t){},9061:function(o,e,t){}}]);
//# sourceMappingURL=KontaktView-lazy-load.79a040a4.js.map