(this["webpackJsonpwhiteboard-task-mern"]=this["webpackJsonpwhiteboard-task-mern"]||[]).push([[0],{32:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(12),o=n.n(c),s=(n(32),n(6)),i=n(8),u=n(4),l=n(13),d=n(3),p=n.n(d),v=n(9),f=n(11),h=n.n(f);h.a.defaults.baseURL="/api",h.a.defaults.headers.post["Content-Type"]="application/json",h.a.interceptors.response.use((function(e){return e}),(function(e){return e.response&&e.response.data&&e.response.status,Promise.reject(e)}));var j=function(e){var t=e.url,n=e.params;return new Promise((function(e,a){var r={method:"GET",url:t,params:n};return e(h()(r))}))},b=function(e){var t=e.url,n=e.data,a=e.params;return new Promise((function(e,r){var c={method:"POST",url:t,data:n,params:a,headers:{}};return e(h()(c))}))},g=function(e){var t=e.url,n=e.data,a=e.params;return new Promise((function(e,r){var c={method:"PUT",url:t,data:n,params:a,headers:{}};return e(h()(c))}))},O=function(e){var t=e.url,n=e.data,a=e.params,r=void 0===a?{}:a;return new Promise((function(e,a){var c={method:"DELETE",url:t,data:n,params:r,headers:{}};return e(h()(c))}))},m="CATEOGRY_GENERAL_STATE",x="CATEGORY_TASK_REORDER_STATIC",y="CATEGORY_TASK_UPDATE_STATIC",w="TASK_GENERAL_STATE",k=function(e){var t=e.props,n=e.value,a=e.deep;return{type:m,payload:{props:t,value:n,deep:a}}},_=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return function(){var t=Object(v.a)(p.a.mark((function t(n){var a;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,!0===e&&n(k({props:"fetching",value:!0})),t.next=4,j({url:"/category"});case 4:a=t.sent,n(k({props:"data",value:a.data.data})),t.next=11;break;case 8:throw t.prev=8,t.t0=t.catch(0),Error(t.t0);case 11:return t.prev=11,n(k({props:"fetching",value:!1})),t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[0,8,11,14]])})));return function(e){return t.apply(this,arguments)}}()},E=function(e){var t=e.props,n=e.value,a=e.deep;return{type:w,payload:{props:t,value:n,deep:a}}},T=function(e){var t=e.id,n=e.svg_events,a=e.mode,r=void 0===a?"CREATE":a;return function(){var e=Object(v.a)(p.a.mark((function e(a){var c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(E({props:"saving",value:!0})),a({type:y,payload:{id:t,svg_events:n}}),e.next=5,g({url:"/task/".concat(t),data:{svg_events:n},params:{mode:r}});case 5:return c=e.sent,e.abrupt("return",c);case 9:throw e.prev=9,e.t0=e.catch(0),Error(e.t0);case 12:return e.prev=12,a(E({props:"saving",value:!1})),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[0,9,12,15]])})));return function(t){return e.apply(this,arguments)}}()},C=n(1),S=function(e){var t=e.height,n=void 0===t?100:t,a=e.width,r=void 0===a?100:a,c=e.color,o=void 0===c?"#fff":c,s=e.isFullScreen,i=void 0!==s&&s;return Object(C.jsxs)("div",{children:[Object(C.jsx)("div",{className:"loader "+(i?"full_screen":""),children:Object(C.jsx)("svg",{style:{width:r,height:n},version:"1.1",id:"L9",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 100 100",enableBackground:"new 0 0 0 0",children:Object(C.jsx)("path",{fill:o,d:"M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50",children:Object(C.jsx)("animateTransform",{attributeName:"transform",attributeType:"XML",type:"rotate",dur:"1s",from:"0 50 50",to:"360 50 50",repeatCount:"indefinite"})})})}),i?Object(C.jsx)("div",{className:"bg",onClick:function(e){}}):null]})},N=function(e){var t=e.value,n=e.onBlur,a=e.placeholder,r=e.onChange,c=e.loading;return Object(C.jsxs)("div",{className:"input_container",children:[Object(C.jsx)("input",{type:"text",className:"input_element",placeholder:a,autoFocus:!0,onFocus:function(e){e.target.select()},value:t,onBlur:n,onChange:function(e){r&&r(e.target.value)}}),c?Object(C.jsx)(S,{height:40,width:40,color:"#4caf50"}):null]})},A=function(e){var t=e.category,n=e.selectCategory,r=e.children,c=e.mode,o=void 0===c?"edit":c,s=e.onBlur,l=e.onSave,d=Object(a.useState)(null),f=Object(i.a)(d,2),h=f[0],j=f[1],O=Object(a.useState)(""),m=Object(i.a)(O,2),x=m[0],y=m[1],w=Object(u.c)(),E=Object(u.d)((function(e){return e.category}));return Object(a.useEffect)((function(){t&&y(t.name)}),[]),Object(C.jsxs)("section",{children:["add"!==o&&h!==t.id?Object(C.jsx)("h2",{className:"cat_title",onClick:function(){j(t.id),n&&n(t)},children:Object(C.jsx)("span",{children:t.name})}):Object(C.jsx)("form",{onSubmit:function(e){e.preventDefault(),t?w(function(e){var t=e.id,n=e.name;return function(){var e=Object(v.a)(p.a.mark((function e(a){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(k({props:"saving",value:!0})),e.next=4,g({url:"/category/".concat(t),data:{name:n}});case 4:return e.abrupt("return",e.sent);case 7:throw e.prev=7,e.t0=e.catch(0),Error(e.t0);case 10:return e.prev=10,a(k({props:"saving",value:!1})),e.finish(10);case 13:case"end":return e.stop()}}),e,null,[[0,7,10,13]])})));return function(t){return e.apply(this,arguments)}}()}({id:t._id,name:x})).then((function(e){j(null),w(_()),l&&l()})).catch((function(e){})):w(function(e){var t=e.name;return function(){var e=Object(v.a)(p.a.mark((function e(n){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n(k({props:"saving",value:!0})),e.next=4,b({url:"/category",data:{name:t}});case 4:return e.abrupt("return",e.sent);case 7:throw e.prev=7,e.t0=e.catch(0),Error(e.t0);case 10:return e.prev=10,n(k({props:"saving",value:!1})),e.finish(10);case 13:case"end":return e.stop()}}),e,null,[[0,7,10,13]])})));return function(t){return e.apply(this,arguments)}}()}({name:x})).then((function(e){w(_()),l&&l()})).catch((function(e){}))},children:Object(C.jsx)(N,{loading:E.saving,onChange:function(e){y(e)},placeholder:"Name your category",onBlur:function(){j(null),s&&s()},value:x})}),r]})};A.proTotype={};var D=n(10),R=function(e){var t=e.width,n=e.height,a=void 0===n?150:n,r=e.goodEvents,c=e.onStop,o=new D.EventStream,s=new D.EventStore;return s.goodEvents=[],r&&(s.goodEvents=r),o.on("stop",(function(){c&&c(s.goodEvents)})),Object(C.jsx)("div",{children:Object(C.jsx)(D.Whiteboard,{style:{backgroundColor:"white"},height:a,width:t,events:o,eventStore:s})})},P=new D.EventStream,I=new D.EventStore,L=function(e){var t=e.task,n=e.onUpdate,r=(e.onDelete,e.onDuplicate,Object(u.c)()),c=Object(a.useState)(!1),o=Object(i.a)(c,2),s=o[0],l=o[1],d=Object(a.useState)(!1),f=Object(i.a)(d,2),h=f[0],j=f[1];return I.goodEvents=t.svg_events,Object(C.jsxs)("div",{className:"notes n_card ",style:{},children:[Object(C.jsx)(D.Whiteboard,{style:{backgroundColor:"white"},height:150,events:P,eventStore:I}),Object(C.jsxs)("div",{className:"card_action",children:[Object(C.jsx)("a",{href:"/",disabled:h,className:h?"disabled":"",onClick:function(e){e.preventDefault(),j(!0),r(T({id:t._id,svg_events:t.svg_events,mode:"DUPLICATE"})).then((function(e){r(_())})).catch((function(e){console.log(e)})).finally((function(){j(!1)}))},children:Object(C.jsx)("i",{className:"far fa-copy "+(h?"rotate_":"")})}),Object(C.jsx)("a",{href:"/",onClick:function(e){e.preventDefault(),n&&n()},children:Object(C.jsx)("i",{className:"far fa-pen"})}),Object(C.jsx)("a",{href:"/",disabled:s,className:s?"disabled":"",onClick:function(e){e.preventDefault(),l(!0),r(function(e){var t=e.id;return function(){var e=Object(v.a)(p.a.mark((function e(n){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O({url:"/task/".concat(t)});case 3:return a=e.sent,n(_(!1)),e.abrupt("return",a);case 8:throw e.prev=8,e.t0=e.catch(0),Error(e.t0);case 11:return e.prev=11,e.finish(11);case 13:case"end":return e.stop()}}),e,null,[[0,8,11,13]])})));return function(t){return e.apply(this,arguments)}}()}({id:t._id})).then((function(){l(!1)}))},children:Object(C.jsx)("i",{className:"far fa-trash "+(s?"rotate_":"")})})]})]})},B=function(e){var t=e.children,n=e.onClose,a=e.show,r=void 0!==a&&a,c=e.width,o=void 0===c?500:c,s=e.height,i=void 0===s?500:s,u=e.title,l=e.subTitle,d=e.onSave,p=e.loading,v=void 0!==p&&p,f=e.btnText,h=void 0===f?"Create Task":f;return r?Object(C.jsxs)("div",{children:[Object(C.jsxs)("div",{className:"modal",style:{width:o,height:i},children:[Object(C.jsxs)("div",{className:"title",children:[u?Object(C.jsx)("h1",{className:"",children:u}):null,l?Object(C.jsx)("small",{children:l}):null]}),Object(C.jsx)("div",{className:"modal-body",children:t}),Object(C.jsx)("div",{className:"modal-action",children:Object(C.jsxs)("div",{className:"task_act_button",children:[Object(C.jsx)("button",{disabled:v,className:"btn btn-primary ".concat(v?"disabled":""),type:"submit",onClick:function(){d&&d()},children:v?"Saving...":h}),"\xa0\xa0",Object(C.jsx)("button",{type:"button",className:"btn",onClick:function(){n&&n()},children:"Cancel"})]})})]}),Object(C.jsx)("div",{className:"bg",onClick:function(e){e.preventDefault(),n&&n()}})]}):null},U=[],F=function(e){var t=e.onClose,n=e.height,a=void 0===n?440:n,r=e.category,c=e.show,o=e.mode,s=void 0===o?"CREATE":o,i=e.selectedTask,l=Object(u.c)(),d=Object(u.d)((function(e){return e.task})),f='Add New Task "'.concat(r?r.name:"",'"'),h=null;return i&&(f="CREATE"===s?'Update Task "'.concat(r?r.name:"",'"'):'Duplicate Task "'.concat(r?r.name:"",'"'),h=i.svg_events,U=i.svg_events),console.log(c),Object(C.jsxs)(B,{btnText:i?"CREATE"===s?"Update Task":"Duplicate Task":"Create Task",loading:d.saving,onSave:function(){U&&U.length&&(i?l(T({svg_events:U,id:i._id,mode:s})).then((function(e){l(_()),t()})).catch((function(e){console.log(e)})):l(function(e){var t=e.category,n=e.svg_events;return function(){var e=Object(v.a)(p.a.mark((function e(a){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(E({props:"saving",value:!0})),e.next=4,b({url:"/task",data:{category:t,svg_events:n}});case 4:return e.abrupt("return",e.sent);case 7:throw e.prev=7,e.t0=e.catch(0),Error(e.t0);case 10:return e.prev=10,a(E({props:"saving",value:!1})),e.finish(10);case 13:case"end":return e.stop()}}),e,null,[[0,7,10,13]])})));return function(t){return e.apply(this,arguments)}}()}({svg_events:U,category:r._id})).then((function(e){l(_()),U=[],t()})).catch((function(e){console.log(e)})))},height:a,subTitle:"Draw on the white board to and create a new task.",title:f,onClose:function(){t&&t()},show:c,children:[Object(C.jsx)(R,{goodEvents:h,onStop:function(e){U=e},height:220,width:500}),Object(C.jsx)("p",{style:{color:"#999"},children:Object(C.jsx)("small",{children:"Click and move your mouse to start drawing"})})]})};var G=function(){var e=Object(a.useState)(null),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(null),o=Object(i.a)(c,2),d=o[0],f=o[1],h=Object(a.useState)("CREATE"),j=Object(i.a)(h,2),b=j[0],O=j[1],m=Object(a.useState)(!1),y=Object(i.a)(m,2),w=y[0],k=y[1],E=Object(u.c)(),T=Object(u.d)((function(e){return e.category}));return Object(a.useEffect)((function(){E(_()).catch((function(e){}))}),[]),Object(C.jsxs)("div",{className:"App",children:[Object(C.jsx)(l.a,{onDragEnd:function(e){var t=e.destination,n=e.source,a=e.draggableId;E(function(e){var t=e.destination,n=e.id,a=e.source;return function(){var e=Object(v.a)(p.a.mark((function e(r){var c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t!==a){e.next=3;break}return e.abrupt("return");case 3:if(t){e.next=5;break}return e.abrupt("return");case 5:return r({type:x,payload:{destination:t,source:a,id:n}}),e.next=8,g({url:"/task/reorder/".concat(n),data:{category:t}}).catch((function(e){console.log(e)}));case 8:return c=e.sent,r(_(!1)),e.abrupt("return",c);case 13:throw e.prev=13,e.t0=e.catch(0),Error(e.t0);case 16:return e.prev=16,e.finish(16);case 18:case"end":return e.stop()}}),e,null,[[0,13,16,18]])})));return function(t){return e.apply(this,arguments)}}()}({destination:t.droppableId,id:a,source:n.droppableId}))},children:T.data.map((function(e,t){return Object(C.jsx)(l.c,{droppableId:String(e._id),children:function(n){return Object(C.jsx)("section",Object(s.a)(Object(s.a)({className:"category_iterator"},n.droppableProps),{},{ref:n.innerRef,children:Object(C.jsxs)(A,{selectCategory:function(e){},category:e,children:[e.tasks?e.tasks.map((function(n,a){return Object(C.jsx)(l.b,{index:a,draggableId:String(n._id),children:function(t){return Object(C.jsx)("div",Object(s.a)(Object(s.a)(Object(s.a)({ref:t.innerRef},t.draggableProps),t.dragHandleProps),{},{children:Object(C.jsx)(L,{onUpdate:function(){f(n),r(e)},onDuplicate:function(){f(n),r(e),O("DUPLICATE")},task:n},a)}))}},a+t)})):null,n.placeholder,Object(C.jsxs)("div",{onClick:function(){f(null),r(e)},className:"action_add action_add_item",children:[Object(C.jsx)("i",{className:"fas fa-plus-circle"})," \xa0Add New Task.."]})]},t)}))}},t)}))}),w?Object(C.jsx)("section",{className:"category_iterator",children:Object(C.jsx)(A,{onSave:function(){k(!1)},onBlur:function(){k(!1)},mode:"add"})}):Object(C.jsxs)("section",{style:{marginRight:40},onClick:function(){k(!0)},className:"action_add action_add_category",children:[Object(C.jsx)("i",{className:"fas fa-plus-circle"})," \xa0Add New Category"]}),Object(C.jsx)(F,{mode:b,selectedTask:d,show:null!==n,category:n,onClose:function(){r(null),f(null)}}),T.data.length>0?Object(C.jsx)("div",{className:"downloder",children:Object(C.jsx)("button",{onClick:function(){window.location.href="/api/category/download"},children:"Download"})}):null]})},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,62)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),c(e),o(e)}))},K=n(5),Y=n(27),J={saving:!1,data:[],fetching:!1},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m:return t.payload.deep?e[t.payload.props][t.payload.deep]=t.payload.value:e[t.payload.props]=t.payload.value,Object(s.a)({},e);case x:var n={};return e.data.map((function(e){return e.tasks=e.tasks.filter((function(e){if(e._id!==t.payload.id)return e;n=e})),e})),e.data.map((function(e){return e._id===t.payload.destination&&e.tasks.push(n),e})),Object(s.a)({},e);case y:return e.data.map((function(e){return e.tasks=e.tasks.map((function(e){return e._id===t.payload.id&&(e.svg_events=t.payload.svg_events),e})),e})),Object(s.a)({},e);default:return Object(s.a)({},e)}},H={saving:!1,data:[]},X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case w:return t.payload.deep?e[t.payload.props][t.payload.deep]=t.payload.value:e[t.payload.props]=t.payload.value,Object(s.a)({},e);default:return Object(s.a)({},e)}},q=Object(K.c)({category:W,task:X}),z=Object(K.e)(q,Object(K.d)(Object(K.a)(Y.a)));o.a.render(Object(C.jsx)(r.a.StrictMode,{children:Object(C.jsx)(u.a,{store:z,children:Object(C.jsx)(G,{})})}),document.getElementById("root")),M()}},[[61,1,2]]]);
//# sourceMappingURL=main.feaa041f.chunk.js.map