(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25665fb7"],{"19b5":function(t,e,i){},"4db8":function(t,e,i){"use strict";i("d09b")},"555f":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"text-align":"center"}},[i("div",{staticClass:"lds-grid"},[i("div"),i("div"),i("div"),i("div"),i("div"),i("div"),i("div"),i("div"),i("div")])])}],r={name:"Loader"},n=r,c=(i("7801"),i("2877")),o=Object(c["a"])(n,a,s,!1,null,"73da4018",null);e["a"]=o.exports},7801:function(t,e,i){"use strict";i("19b5")},c66d:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("transition",{attrs:{name:"fade"}},[t.loader?i("Loader",{staticStyle:{position:"absolute",top:"40%",left:"50%","margin-left":"-40px"}}):t._e()],1),i("transition",{attrs:{name:"fade"}},[t.loader?t._e():i("div",{staticClass:"mt-4 mb-4 container-fluid"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-3"},[i("SideProfile",{attrs:{username:t.username}})],1),i("div",{staticClass:"col-md-9"},[i("div",[i("h3",{staticClass:"fw-bold"},[t._v("Upcoming Activities")]),t.getUpcomingActivities.length>0?i("div",{staticClass:"row"},t._l(t.getUpcomingActivities,(function(e,a){return i("div",{key:a,staticClass:"col-12 col-sm-6 mt-3",staticStyle:{position:"relative"}},[e.createdByMe?i("span",{staticClass:"badge rounded-pill created-by-me-badge"},[t._v("Created by me")]):t._e(),i("ActivityCard",{attrs:{image:e.bgImage,title:e.title,startDate:e.startDate,itemId:e.id,participantLimit:e.limit}})],1)})),0):i("div",{staticClass:"mb-4"},[i("p",{staticClass:"text-secondary mt-3"},[i("a",{staticStyle:{"text-decoration":"none",color:"black"},attrs:{href:"./create-activity/step-1"}},[t._v(" Oops, looks like you don't have any upcoming activities yet. Create one now! ")])])])]),i("div",[i("h3",{staticClass:"fw-bold mt-5"},[t._v("Past Activities")]),t.getPastActivities.length>0?i("div",{staticClass:"row"},t._l(t.getPastActivities,(function(e,a){return i("div",{key:a,staticClass:"col-12 col-sm-6 mt-3",staticStyle:{position:"relative"}},[e.createdByMe?i("span",{staticClass:"badge rounded-pill created-by-me-badge"},[t._v("Created by me")]):t._e(),i("ActivityCard",{attrs:{image:e.bgImage,title:e.title,startDate:e.startDate,itemId:e.id,participantLimit:e.limit}})],1)})),0):i("div",[i("div",{staticClass:"col"},[i("p",{staticClass:"text-secondary"},[t._v("No past activities")])])])])])])])])],1)},s=[],r=i("b85c"),n=(i("4e82"),i("fb6a"),i("bc3a")),c=i.n(n),o=i("bf41"),l=i("69f9"),d=i("555f"),u={components:{ActivityCard:l["a"],SideProfile:o["a"],Loader:d["a"]},name:"Profile",props:["loggedIn","checked"],data:function(){return{interestList:[],username:".",activities_data:[],loader:!0}},methods:{getInterest:function(){var t=this,e=window.localStorage.getItem("jwt"),i={headers:{authorization:"Bearer ".concat(e)}},a="api/getUserDetails";c.a.get(a,i).then((function(e){t.interestList=e.data.interests,t.username=e.data.username}))},getActivity:function(){var t=this,e=window.localStorage.getItem("jwt"),i={headers:{authorization:"Bearer ".concat(e)}},a="api/myActivities";c.a.get(a,i).then((function(e){t.activities_data=e.data,t.loader=!1}))}},computed:{getUpcomingActivities:function(){var t,e=[],i=Object(r["a"])(this.activities_data);try{for(i.s();!(t=i.n()).done;){var a=t.value,s=new Date(a.StartDate),n=new Date,c=Math.floor((s-n)/864e5);c>=0&&e.push({startDate:a.StartDate,startTime:a.StartTime,bgImage:a.Image,title:a.Title,id:a._id,limit:a.Participant_Limit,createdByMe:a.Email.toLowerCase()==this.$parent.email})}}catch(o){i.e(o)}finally{i.f()}return e=e.slice().sort((function(t,e){return new Date(e.startDate)-new Date(t.startDate)})),e||null},getPastActivities:function(){var t,e=[],i=Object(r["a"])(this.activities_data);try{for(i.s();!(t=i.n()).done;){var a=t.value,s=new Date(a.StartDate),n=new Date,c=Math.floor((s-n)/864e5);c<0&&e.push({startDate:a.StartDate,startTime:a.StartTime,bgImage:a.Image,title:a.Title,id:a._id,limit:a.Participant_Limit,createdByMe:a.Email.toLowerCase()==this.$parent.email})}}catch(o){i.e(o)}finally{i.f()}return e=e.slice().sort((function(t,e){return new Date(e.startDate)-new Date(t.startDate)})),e||null}},watch:{checked:function(){this.checked&&(this.$parent.loggedIn?(this.getInterest(),this.getActivity()):this.$router.push({name:"Login",query:{redirect:"Profile",msg:"Oops! You must be logged in to access your profile page"}}))}},mounted:function(){this.checked&&(this.$parent.loggedIn?(this.getInterest(),this.getActivity()):this.$router.push({name:"Login",query:{redirect:"Profile",msg:"Oops! You must be logged in to access your profile page"}}))}},m=u,v=(i("4db8"),i("2877")),g=Object(v["a"])(m,a,s,!1,null,"ddf307b6",null);e["default"]=g.exports},d09b:function(t,e,i){}}]);
//# sourceMappingURL=chunk-25665fb7.86b917cd.js.map