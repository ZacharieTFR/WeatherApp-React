(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{129:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(9),l=a.n(r),c=a(41),o=a(21),s=a(17),u=a(30),d=a(36),m=a(39),h=a(87),f=a(176),v=a(84),g=a.n(v),y=a(83),p=a.n(y),E=a(182),b=a(23),w=a(187),C=a(188),k=a(183),S=a(181),_=a(35),j=a(173),O=a(171),N=a(170),A=a(184),W=a(186),L=a(174),x=a(80),D=a.n(x),T=a(169);function G(e){var t=Object(b.b)().t,a=i.a.useState(!1),n=Object(_.a)(a,2),r=n[0],l=n[1];function c(){l(!1)}return i.a.createElement("div",null,i.a.createElement(C.a,{title:t("add_city"),"aria-label":t("add_city")},i.a.createElement(T.a,{color:"secondary",onClick:function(){l(!0)}},i.a.createElement(D.a,null))),i.a.createElement(W.a,{open:r,onClose:c,"aria-labelledby":"form-dialog-title"},i.a.createElement(N.a,{id:"form-dialog-title"},t("add_city")),i.a.createElement("form",{id:"addCityForm",onSubmit:function(t){var a=t.target.cityName.value;e.onCityAdd(a),t.preventDefault(),l(!1)}},i.a.createElement(O.a,null,i.a.createElement(A.a,{autoFocus:!0,required:!0,margin:"dense",id:"cityName",label:t("city_name"),type:"text",fullWidth:!0})),i.a.createElement(j.a,null,i.a.createElement(L.a,{type:"submit",color:"primary"},t("add")),i.a.createElement(L.a,{onClick:c,color:"primary"},t("cancel"))))))}var B=a(179),P=a(175),R=a(177),U=a(81),F=a.n(U),I=Object(P.a)({deleteBtn:{float:"right"}});function J(e){var t=Object(b.b)().t,a=I(),n=i.a.useState(!1),r=Object(_.a)(n,2),l=r[0],c=r[1];function o(){c(!1)}return i.a.createElement("div",null,i.a.createElement(C.a,{title:t("delete_city"),"aria-label":t("delete_city")},i.a.createElement(f.a,{"aria-label":t("delete"),className:a.deleteBtn,onClick:function(){c(!0)}},i.a.createElement(F.a,{fontSize:"small"}))),i.a.createElement("div",null,i.a.createElement(W.a,{open:l,onClose:o,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},i.a.createElement(N.a,{id:"alert-dialog-title",style:{textTransform:"capitalize"}},t("delete")," ",e.city," ?"),i.a.createElement(O.a,null,i.a.createElement(R.a,{id:"alert-dialog-description"},t("confirm_delete"))),i.a.createElement(j.a,null,i.a.createElement(L.a,{onClick:function(t){e.onCityDelete(e.city),c(!1)},color:"primary"},t("delete")),i.a.createElement(L.a,{onClick:o,color:"primary",autoFocus:!0},t("cancel"))))))}var z=a(178),q=a(180),M=Object(P.a)({card:{margin:"12px 0"},lightGrey:{color:"#8c8c8c"},deleteBtn:{float:"right"}}),V="https://www.weatherbit.io/static/img/icons/";function $(e){var t=Object(b.b)().t,a=M();if(e){var n=e.data[0],r=new Date(n.last_ob_time),l=r.toLocaleDateString(),c=r.toLocaleTimeString(),o=n.wind_spd,s=n.wind_cdir_full,u=V+n.weather.icon+".png";return i.a.createElement(z.a,{className:a.card},i.a.createElement(B.a,null,i.a.createElement(q.a,{container:!0,spacing:3},i.a.createElement(q.a,{item:!0,xs:12},i.a.createElement(J,{onCityDelete:function(){return t=n.city_name,void e.onCityDelete(t);var t},city:n.city_name}),i.a.createElement(h.a,{variant:"h5"},n.city_name,", ",n.country_code),i.a.createElement(h.a,{className:a.lightGrey,variant:"subtitle2"},l,", ",c)),i.a.createElement(q.a,{item:!0,xs:6},i.a.createElement("img",{align:"left",src:u,alt:"weather icon"}),i.a.createElement(h.a,{variant:"h3"},n.temp,"\xb0C"),i.a.createElement(h.a,{variant:"subtitle1"},n.weather.description)),i.a.createElement(q.a,{item:!0,xs:6},i.a.createElement(h.a,{variant:"subtitle1"},i.a.createElement("span",{className:a.lightGrey},t("sunrise"),": "),n.sunrise),i.a.createElement(h.a,{variant:"subtitle1"},i.a.createElement("span",{className:a.lightGrey},t("sunset"),": "),n.sunset),i.a.createElement(h.a,{variant:"subtitle1"},i.a.createElement("span",{className:a.lightGrey},t("wind"),": "),o," m/s, ",s),i.a.createElement(h.a,{variant:"subtitle1"},i.a.createElement("span",{className:a.lightGrey},t("humidity"),": "),n.rh," %")))))}}var H=a(67),K=a(85),Q=a(82),X=a.n(Q);H.a.use(K.a).use(X.a).use(b.a).init({fallbackLng:["en"],debug:!1,whitelist:["en","fr"],interpolation:{escapeValue:!1}});var Y=H.a,Z="42b79f35a88041eeaf3144331fc8529b",ee="https://api.weatherbit.io/v2.0/current/",te=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={error:null,weathers:[],cities:[]},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"getCitiesSaved",value:function(){if("undefined"!=typeof Storage){var e=JSON.parse(localStorage.getItem("cities"));e&&this.setState({cities:e})}}},{key:"saveCitiesToLocalStorage",value:function(e){"undefined"!==typeof Storage&&localStorage.setItem("cities",JSON.stringify(e))}},{key:"getUserCoords",value:function(){var e=this;navigator.geolocation?navigator.geolocation.getCurrentPosition(function(t){e.fetchCoordsWeather(t.coords)},function(t){console.warn(t.message),e.handleCityAdd("Paris")}):this.handleCityAdd("Paris")}},{key:"fetchCoordsWeather",value:function(e){var t=this;fetch(ee+"?lat="+e.latitude+"&lon="+e.longitude+"&key="+Z).then(function(e){return e.json()}).then(function(e){t.handleCityAdd(e.data[0].city_name)},function(e){t.setState({error:e})})}},{key:"replaceCityTrad",value:function(e,t){if(e!==t){var a=Object(c.a)(this.state.cities),n=a.indexOf(e);a[n]=t,this.setState({cities:a})}}},{key:"fetchCitiesWeathers",value:function(e){var t=this,a=[];e.forEach(function(e){fetch(ee+"?lang="+Y.language+"&city="+e+"&key="+Z).then(function(e){return e.json()}).then(function(n){t.replaceCityTrad(e,n.data[0].city_name),a.push(n.data),t.setState({weathers:a})},function(e){t.setState({error:e})})})}},{key:"componentDidMount",value:function(){this.getCitiesSaved(),this.getUserCoords()}},{key:"handleCityAdd",value:function(e){var t=this.state.cities;t.find(function(t){return t===e})||(t.push(e),this.saveCitiesToLocalStorage(t),this.setState({cities:t})),this.fetchCitiesWeathers(t)}},{key:"handleCityDelete",value:function(e){var t=this.state.cities.filter(function(t){return t!==e}),a=this.state.weathers.filter(function(t){return t[0].city_name!==e});this.saveCitiesToLocalStorage(t),this.setState({cities:t,weathers:a})}},{key:"handleRefresh",value:function(){this.fetchCitiesWeathers(this.state.cities)}},{key:"handleChangeLang",value:function(e){var t=e.target.value;Y.changeLanguage(t)}},{key:"render",value:function(){var e=this,t=this.props.t;return i.a.createElement("div",{className:"container"},i.a.createElement(n.Suspense,{fallback:i.a.createElement("div",null,"Loading")},i.a.createElement(S.a,{position:"fixed",className:"header"},i.a.createElement(E.a,null,i.a.createElement(h.a,{variant:"h6",color:"inherit",style:{flexGrow:1}},"Weather App"),i.a.createElement(k.a,{onChange:function(t){e.handleChangeLang(t)},IconComponent:p.a,value:Y.language},i.a.createElement(w.a,{value:"fr"},"Fran\xe7ais"),i.a.createElement(w.a,{value:"en"},"English")),i.a.createElement(C.a,{title:t("refresh"),"aria-label":t("refresh")},i.a.createElement(f.a,{"aria-label":t("refresh"),onClick:function(){e.handleRefresh()}},i.a.createElement(g.a,{fontSize:"small"}))),i.a.createElement(G,{onCityAdd:function(t){return e.handleCityAdd(t)}}))),i.a.createElement("div",{style:{marginTop:"4.5em"}},this.state.weathers.map(function(t,a){return i.a.createElement($,{key:a,data:t,onCityDelete:function(t){return e.handleCityDelete(t)}})}))))}}]),t}(i.a.Component),ae=Object(b.c)()(te);var ne=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(n.Suspense,{fallback:i.a.createElement("div",null,"Loading")},i.a.createElement(ae,null)))},ie=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function re(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(128);l.a.render(i.a.createElement(ne,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/weatherapp-react",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/weatherapp-react","/service-worker.js");ie?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):re(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):re(t,e)})}}()},98:function(e,t,a){e.exports=a(129)}},[[98,1,2]]]);
//# sourceMappingURL=main.1d38d72a.chunk.js.map