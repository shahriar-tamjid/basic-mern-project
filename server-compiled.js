(()=>{var e={860:e=>{"use strict";e.exports=require("express")},13:e=>{"use strict";e.exports=require("mongodb")}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,o),s.exports}(()=>{const{MongoClient:e}=o(13),t=o(860);let n;const r=t();r.set("view engine","ejs"),r.set("views","./views"),r.use(t.static("public")),r.get("/",(async(e,t)=>{const o=await n.collection("cats").find().toArray();t.render("home",{allCats:o})})),r.get("/admin",((e,t)=>{t.render("admin")})),async function(){const t=new e("mongodb://root:root@localhost:27017/BasicMernApp?&authSource=admin");await t.connect(),n=t.db(),r.listen(3e3)}()})()})();