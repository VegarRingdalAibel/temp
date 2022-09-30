var gt=Object.defineProperty;var yt=(N,I,T)=>I in N?gt(N,I,{enumerable:!0,configurable:!0,writable:!0,value:T}):N[I]=T;var m=(N,I,T)=>(yt(N,typeof I!="symbol"?I+"":I,T),T);(function(){"use strict";const N=Symbol("Comlink.proxy"),I=Symbol("Comlink.endpoint"),T=Symbol("Comlink.releaseProxy"),J=Symbol("Comlink.thrown"),fe=e=>typeof e=="object"&&e!==null||typeof e=="function",ze={canHandle:e=>fe(e)&&e[N],serialize(e){const{port1:t,port2:r}=new MessageChannel;return Y(e,t),[r,[r]]},deserialize(e){return e.start(),Oe(e)}},Pe={canHandle:e=>fe(e)&&J in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},ue=new Map([["proxy",ze],["throw",Pe]]);function Y(e,t=self){t.addEventListener("message",function r(n){if(!n||!n.data)return;const{id:o,type:s,path:f}=Object.assign({path:[]},n.data),c=(n.data.argumentList||[]).map(z);let i;try{const l=f.slice(0,-1).reduce((h,a)=>h[a],e),d=f.reduce((h,a)=>h[a],e);switch(s){case"GET":i=d;break;case"SET":l[f.slice(-1)[0]]=z(n.data.value),i=!0;break;case"APPLY":i=d.apply(l,c);break;case"CONSTRUCT":{const h=new d(...c);i=Le(h)}break;case"ENDPOINT":{const{port1:h,port2:a}=new MessageChannel;Y(e,a),i=ge(h,[h])}break;case"RELEASE":i=void 0;break;default:return}}catch(l){i={value:l,[J]:0}}Promise.resolve(i).catch(l=>({value:l,[J]:0})).then(l=>{const[d,h]=Q(l);t.postMessage(Object.assign(Object.assign({},d),{id:o}),h),s==="RELEASE"&&(t.removeEventListener("message",r),de(t))})}),t.start&&t.start()}function De(e){return e.constructor.name==="MessagePort"}function de(e){De(e)&&e.close()}function Oe(e,t){return X(e,[],t)}function Z(e){if(e)throw new Error("Proxy has been released and is not useable")}function X(e,t=[],r=function(){}){let n=!1;const o=new Proxy(r,{get(s,f){if(Z(n),f===T)return()=>B(e,{type:"RELEASE",path:t.map(c=>c.toString())}).then(()=>{de(e),n=!0});if(f==="then"){if(t.length===0)return{then:()=>o};const c=B(e,{type:"GET",path:t.map(i=>i.toString())}).then(z);return c.then.bind(c)}return X(e,[...t,f])},set(s,f,c){Z(n);const[i,l]=Q(c);return B(e,{type:"SET",path:[...t,f].map(d=>d.toString()),value:i},l).then(z)},apply(s,f,c){Z(n);const i=t[t.length-1];if(i===I)return B(e,{type:"ENDPOINT"}).then(z);if(i==="bind")return X(e,t.slice(0,-1));const[l,d]=he(c);return B(e,{type:"APPLY",path:t.map(h=>h.toString()),argumentList:l},d).then(z)},construct(s,f){Z(n);const[c,i]=he(f);return B(e,{type:"CONSTRUCT",path:t.map(l=>l.toString()),argumentList:c},i).then(z)}});return o}function Be(e){return Array.prototype.concat.apply([],e)}function he(e){const t=e.map(Q);return[t.map(r=>r[0]),Be(t.map(r=>r[1]))]}const _e=new WeakMap;function ge(e,t){return _e.set(e,t),e}function Le(e){return Object.assign(e,{[N]:!0})}function Q(e){for(const[t,r]of ue)if(r.canHandle(e)){const[n,o]=r.serialize(e);return[{type:"HANDLER",name:t,value:n},o]}return[{type:"RAW",value:e},_e.get(e)||[]]}function z(e){switch(e.type){case"HANDLER":return ue.get(e.name).deserialize(e.value);case"RAW":return e.value}}function B(e,t,r){return new Promise(n=>{const o=Fe();e.addEventListener("message",function s(f){!f.data||!f.data.id||f.data.id!==o||(e.removeEventListener("message",s),n(f.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),r)})}function Fe(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var x=Uint8Array,P=Uint16Array,ye=Uint32Array,we=new x([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),pe=new x([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),$e=new x([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),xe=function(e,t){for(var r=new P(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var o=new ye(r[30]),n=1;n<30;++n)for(var s=r[n];s<r[n+1];++s)o[s]=s-r[n]<<5|n;return[r,o]},me=xe(we,2),ve=me[0],Ve=me[1];ve[28]=258,Ve[258]=28;for(var We=xe(pe,0),je=We[0],ee=new P(32768),g=0;g<32768;++g){var K=(g&43690)>>>1|(g&21845)<<1;K=(K&52428)>>>2|(K&13107)<<2,K=(K&61680)>>>4|(K&3855)<<4,ee[g]=((K&65280)>>>8|(K&255)<<8)>>>1}for(var $=function(e,t,r){for(var n=e.length,o=0,s=new P(t);o<n;++o)e[o]&&++s[e[o]-1];var f=new P(t);for(o=0;o<t;++o)f[o]=f[o-1]+s[o-1]<<1;var c;if(r){c=new P(1<<t);var i=15-t;for(o=0;o<n;++o)if(e[o])for(var l=o<<4|e[o],d=t-e[o],h=f[e[o]-1]++<<d,a=h|(1<<d)-1;h<=a;++h)c[ee[h]>>>i]=l}else for(c=new P(n),o=0;o<n;++o)e[o]&&(c[o]=ee[f[e[o]-1]++]>>>15-e[o]);return c},V=new x(288),g=0;g<144;++g)V[g]=8;for(var g=144;g<256;++g)V[g]=9;for(var g=256;g<280;++g)V[g]=7;for(var g=280;g<288;++g)V[g]=8;for(var Ee=new x(32),g=0;g<32;++g)Ee[g]=5;var Ge=$(V,9,1),He=$(Ee,5,1),te=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},M=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},re=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},Ze=function(e){return(e+7)/8|0},ne=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var n=new(e.BYTES_PER_ELEMENT==2?P:e.BYTES_PER_ELEMENT==4?ye:x)(r-t);return n.set(e.subarray(t,r)),n},qe=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],v=function(e,t,r){var n=new Error(t||qe[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,v),!r)throw n;return n},Je=function(e,t,r){var n=e.length;if(!n||r&&r.f&&!r.l)return t||new x(0);var o=!t||r,s=!r||r.i;r||(r={}),t||(t=new x(n*3));var f=function(Ue){var ke=t.length;if(Ue>ke){var Te=new x(Math.max(ke*2,Ue));Te.set(t),t=Te}},c=r.f||0,i=r.p||0,l=r.b||0,d=r.l,h=r.d,a=r.m,y=r.n,E=n*8;do{if(!d){c=M(e,i,1);var _=M(e,i+1,3);if(i+=3,_)if(_==1)d=Ge,h=He,a=9,y=5;else if(_==2){var U=M(e,i,31)+257,b=M(e,i+10,15)+4,R=U+M(e,i+5,31)+1;i+=14;for(var C=new x(R),O=new x(19),w=0;w<b;++w)O[$e[w]]=M(e,i+w*3,7);i+=b*3;for(var W=te(O),j=(1<<W)-1,G=$(O,W,1),w=0;w<R;){var Re=G[M(e,i,j)];i+=Re&15;var u=Re>>>4;if(u<16)C[w++]=u;else{var L=0,q=0;for(u==16?(q=3+M(e,i,3),i+=2,L=C[w-1]):u==17?(q=3+M(e,i,7),i+=3):u==18&&(q=11+M(e,i,127),i+=7);q--;)C[w++]=L}}var Ce=C.subarray(0,U),k=C.subarray(U);a=te(Ce),y=te(k),d=$(Ce,a,1),h=$(k,y,1)}else v(1);else{var u=Ze(i)+4,p=e[u-4]|e[u-3]<<8,D=u+p;if(D>n){s&&v(0);break}o&&f(l+p),t.set(e.subarray(u,D),l),r.b=l+=p,r.p=i=D*8,r.f=c;continue}if(i>E){s&&v(0);break}}o&&f(l+131072);for(var ht=(1<<a)-1,_t=(1<<y)-1,ae=i;;ae=i){var L=d[re(e,i)&ht],F=L>>>4;if(i+=L&15,i>E){s&&v(0);break}if(L||v(2),F<256)t[l++]=F;else if(F==256){ae=i,d=null;break}else{var Ne=F-254;if(F>264){var w=F-257,H=we[w];Ne=M(e,i,(1<<H)-1)+ve[w],i+=H}var le=h[re(e,i)&_t],ce=le>>>4;le||v(3),i+=le&15;var k=je[ce];if(ce>3){var H=pe[ce];k+=re(e,i)&(1<<H)-1,i+=H}if(i>E){s&&v(0);break}o&&f(l+131072);for(var Ke=l+Ne;l<Ke;l+=4)t[l]=t[l-k],t[l+1]=t[l+1-k],t[l+2]=t[l+2-k],t[l+3]=t[l+3-k];l=Ke}}r.l=d,r.p=ae,r.b=l,r.f=c,d&&(c=1,r.m=a,r.d=h,r.n=y)}while(!c);return l==t.length?t:ne(t,0,l)},Ye=new x(0),S=function(e,t){return e[t]|e[t+1]<<8},A=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},oe=function(e,t){return A(e,t)+A(e,t+4)*4294967296};function Xe(e,t){return Je(e,t)}var se=typeof TextDecoder<"u"&&new TextDecoder,Qe=0;try{se.decode(Ye,{stream:!0}),Qe=1}catch{}var et=function(e){for(var t="",r=0;;){var n=e[r++],o=(n>127)+(n>223)+(n>239);if(r+o>e.length)return[t,ne(e,r-1)];o?o==3?(n=((n&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):o&1?t+=String.fromCharCode((n&31)<<6|e[r++]&63):t+=String.fromCharCode((n&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(n)}};function be(e,t){if(t){for(var r="",n=0;n<e.length;n+=16384)r+=String.fromCharCode.apply(null,e.subarray(n,n+16384));return r}else{if(se)return se.decode(e);var o=et(e),s=o[0],f=o[1];return f.length&&v(8),s}}var tt=function(e,t){return t+30+S(e,t+26)+S(e,t+28)},rt=function(e,t,r){var n=S(e,t+28),o=be(e.subarray(t+46,t+46+n),!(S(e,t+8)&2048)),s=t+46+n,f=A(e,t+20),c=r&&f==4294967295?nt(e,s):[f,A(e,t+24),A(e,t+42)],i=c[0],l=c[1],d=c[2];return[S(e,t+10),i,l,o,s+S(e,t+30)+S(e,t+32),d]},nt=function(e,t){for(;S(e,t)!=1;t+=4+S(e,t+2));return[oe(e,t+12),oe(e,t+4),oe(e,t+20)]};function Me(e,t){for(var r={},n=e.length-22;A(e,n)!=101010256;--n)(!n||e.length-n>65558)&&v(13);var o=S(e,n+8);if(!o)return{};var s=A(e,n+16),f=s==4294967295;f&&(n=A(e,n-12),A(e,n)!=101075792&&v(13),o=A(e,n+32),s=A(e,n+48));for(var c=t&&t.filter,i=0;i<o;++i){var l=rt(e,s,f),d=l[0],h=l[1],a=l[2],y=l[3],E=l[4],_=l[5],u=tt(e,_);s=E,(!c||c({name:y,size:h,originalSize:a,compression:d}))&&(d?d==8?r[y]=Xe(e.subarray(u,u+h),new x(a)):v(14,"unknown compression type "+d):r[y]=ne(e,u,u+h))}return r}async function Ae(e){const t=new FileReader;return new Promise((r,n)=>{t.onloadend=o=>{var s;o.target?r((s=o.target)==null?void 0:s.result):r(null)},t.onerror=n,t.readAsArrayBuffer(e)})}async function ot(e){const t=new FileReader;return new Promise((r,n)=>{t.onloadend=o=>{o.target?r(o.target.result):r(null)},t.onerror=n,t.readAsText(e)})}async function Se(e,t){if(t){const r=await Ae(e);if(r instanceof ArrayBuffer){const n=Me(new Uint8Array(r)),o=Object.keys(n)[0];if(o){const s=be(n[o]);if(s&&typeof s=="string")return JSON.parse(s)}}return null}else{const r=await ot(e);return r&&typeof r=="string"?JSON.parse(r):null}}class st{constructor(){m(this,"worldIndex");m(this,"worldLength");m(this,"currentWorld");m(this,"currentIdMapIndex");m(this,"worldIdMapKeys");m(this,"currentModel",null);m(this,"data")}async loadUrl(t){try{const n=await fetch("/temp/"+t),o=await Se(await n.blob(),t.includes("zip"));this.initModel(o)}catch(r){console.log(t,r),this.initModel(null)}}initModel(t){var r;this.data=t,this.currentIdMapIndex=-1,this.worldIndex=-1,this.worldLength=((r=t==null?void 0:t.world)==null?void 0:r.length)|0,this.worldIdMapKeys=[]}loadNextModel(){return this.currentModel=this.loadNextModelInternal(),!!this.currentModel}loadNextModelInternal(){return this.data?this.currentWorld?(this.currentIdMapIndex<this.worldIdMapKeys.length-1&&this.currentIdMapIndex++,this.currentIdMapIndex>=0&&(this.currentModel=this.nextId()),this.currentIdMapIndex===this.worldIdMapKeys.length-1&&(this.currentWorld=null,this.worldIdMapKeys=[],this.currentIdMapIndex=-1),this.currentModel):(this.worldIndex++,this.worldIndex<this.worldLength?(this.currentWorld=this.data.world[this.worldIndex],this.worldIdMapKeys=Object.keys(this.currentWorld.id_map),this.currentModel=this.loadNextModelInternal(),this.currentModel):(this.currentModel=null,null)):null}transferModel(){if(!this.currentModel)return null;const t=this.currentModel;return this.currentModel=null,ge(t,[t.index.buffer,t.position.buffer,t.vertexColor.buffer])}nextId(){var _;const t=this.worldIdMapKeys[this.currentIdMapIndex],r=(_=this.currentWorld)==null?void 0:_.id_map[t],n=this.currentWorld;if(!r||!n)throw"error with idmap"+t+", "+this.currentIdMapIndex;const o=new Uint32Array(r.index),s=new Float32Array(r.position||[]),f=new Float32Array(r.vertexColor||[]),c=r.color||[0,0,0,1],i=r.matrix,l=r.instances,d=r.wireframeGeometry,h=r.id_sequence;let a=null;typeof r.position=="string"&&(a=r.position);let y=null;typeof r.index=="string"&&(y=r.index);let E=null;return typeof r.vertexColor=="string"&&(E=r.vertexColor),{IdMapString:t,wireframeGeometry:d,color:c,vertexColor:f,vertexColorRef:E,position:s,positionRef:a,matrix:i,instance:l,id_sequence:h,index:o,indexRef:y}}}async function it(){return{ENV_AZURE_CLIENT_ID:"d1a47ca2-bf8d-471d-9781-f1711981a922",ENV_AZURE_TENANT_ID:"306bb27f-a230-403b-a436-2e5cd45b8ec0",ENV_AZURE_LOGIN_URL:"https://login.microsoftonline.com",ENV_AZURE_STORAGE_URL:"https://stdataaibelweb3d001.blob.core.windows.net",ENV_AZURE_STORAGE_SHARE_CONTAINER_NAME:"set-share",ENV_AZURE_STORAGE_PROJECT_CONTAINER_NAME:"000000"}}async function Ie(e,t,r){const n=await it();return await fetch(`${n.ENV_AZURE_STORAGE_URL}/${t}/${r}`,{headers:{"cache-control":"no-cache",pragma:"no-cache","x-ms-version":"2021-04-10","x-ms-date":new Date().toUTCString(),authorization:`Bearer ${e}`}})}async function at(e,t){const r=await Ae(e);if(r instanceof ArrayBuffer){const n=Me(new Uint8Array(r)),o=Object.keys(n)[0];if(o)return t==="uint32"?new Uint32Array(n[o].buffer):new Float32Array(n[o].buffer)}return null}async function ie(e,t,r,n){const o=await Ie(e,t,r);return o.ok?await at(await o.blob(),n):(console.warn("error"),console.warn(r),null)}async function lt(e,t,r){const n=await Ie(e,t,r);if(n.ok)return Se(await n.blob(),r.includes(".zip"));throw console.warn("error"),console.warn(r),n.statusText}function ct(e){return`META_${e}`}class ft{constructor(t,r=1,n="DATA"){m(this,"__name");m(this,"__version");m(this,"__storeName");m(this,"__logEnabled");m(this,"__db");this.__name=t,this.__version=r,this.__storeName=n,this.__logEnabled=!1}enableLog(){this.__logEnabled=!0}__logStart(t){this.__logEnabled&&console.time(`ModelStoreLog_${this.__name}_${this.__storeName}_${t}`)}__logEnd(t){this.__logEnabled&&console.timeEnd(`ModelStoreLog_${this.__name}_${this.__storeName}_${t}`)}close(){return new Promise(t=>{this.__db&&(this.__db.close(),t(!0))})}__open(){return new Promise((t,r)=>{if(this.__db)t(this.__db);else{const n=indexedDB.open(this.__name,this.__version);n.onupgradeneeded=()=>{const o=n.result;o.objectStoreNames.contains(this.__name)||o.createObjectStore(this.__storeName)},n.onblocked=o=>{this.__logEnd("getKey"),r({type:"onblocked",event:o})},n.onerror=o=>{this.__logEnd("getKey"),r({type:"onblocked",event:o})},n.onsuccess=()=>{this.__db=n.result,t(n.result)}}})}getUUID(){return crypto.randomUUID()}getKey(t){return new Promise(async(r,n)=>{this.__logStart("getKey");try{const s=(await this.__open()).transaction(this.__storeName);s.onerror=i=>{this.__logEnd("getKey"),n({type:"store tx error",event:i})};const c=s.objectStore(this.__storeName).get(t);c.onsuccess=()=>{this.__logEnd("getKey"),r(c.result)}}catch(o){this.__logEnd("getKey"),n(o)}})}setKey(t,r){return new Promise(async(n,o)=>{var s;this.__logStart("setKey");try{const c=(await this.__open()).transaction(this.__storeName,"readwrite");c.onerror=d=>{this.__logEnd("setKey"),o({type:"store tx error",event:d})};const l=c.objectStore(this.__storeName).put(r,t);l.onsuccess=()=>{this.__logEnd("setKey"),n(l.result)},(s=l.transaction)==null||s.commit()}catch(f){this.__logEnd("setKey"),o(f)}})}getAllKeys(){return new Promise(async(t,r)=>{this.__logStart("getAllKeys");try{const o=(await this.__open()).transaction(this.__storeName,"readwrite");o.onerror=c=>{this.__logEnd("getAllKeys"),r({type:"store tx error",event:c})};const f=o.objectStore(this.__storeName).getAllKeys();f.onsuccess=()=>{this.__logEnd("getAllKeys"),t(f.result)}}catch(n){this.__logEnd("getAllKeys"),r(n)}})}deleteKey(t){return new Promise(async(r,n)=>{this.__logStart("deleteKey");try{const s=(await this.__open()).transaction(this.__storeName,"readwrite");s.onerror=i=>{this.__logEnd("deleteKey"),n({type:"store tx error",event:i})};const c=s.objectStore(this.__storeName).delete(t);c.onsuccess=()=>{this.__logEnd("deleteKey"),r(c.result)}}catch(o){this.__logEnd("deleteKey"),n(o)}})}deleteDB(){return new Promise((t,r)=>{this.__logStart("deleteDB");const n=indexedDB.deleteDatabase(this.__name);n.onsuccess=()=>{this.__logEnd("deleteDB"),t(!0)},n.onerror=o=>{this.__logEnd("deleteDB"),r({type:"onblocked",event:o})}})}}function ut(e){const t={x:null,y:null,z:null},r={x:null,y:null,z:null};let n=0;for(;n<e.length;)for(let o=0;o<3;o++,n++){const s=e[n]||0;o===0&&(t.x===null&&(t.x=s),r.x===null&&(r.x=s),t.x<s&&(t.x=s),r.x>s&&(r.x=s)),o===1&&(t.y===null&&(t.y=s),r.y===null&&(r.y=s),t.y<s&&(t.y=s),r.y>s&&(r.y=s)),o===2&&(t.z===null&&(t.z=s),r.z===null&&(r.z=s),t.z<s&&(t.z=s),r.z>s&&(r.z=s))}return{max:{x:t.x||0,y:t.y||0,z:t.z||0},min:{x:r.x||0,y:r.y||0,z:r.z||0}}}class dt{async downloadFromAzure(t,r,n,o,s){try{let f=function(a,y){const E=a.split("/").pop()||"";return a.replace(E,`data/${y.replaceAll("$$","%24%24")}.zip`)};const c=new ft(r),i=await lt(t,n,s),l=new st;l.initModel(i);const d=[],h={};for(;await l.loadNextModel();){const a=await l.currentModel;if(a){const y=[];if(a.indexRef){const _=f(s,a.indexRef),u=ie(t,n,_,"uint32").then(p=>{p&&(a.index=p.slice(32))});y.push(u)}if(a.positionRef){const _=f(s,a.positionRef),u=ie(t,n,_,"float32").then(p=>{p&&(a.position=p.slice(32))});y.push(u)}if(a.vertexColorRef){const _=f(s,a.vertexColorRef),u=ie(t,n,_,"float32").then(p=>{p&&(a.vertexColor=p.slice(32))});y.push(u)}await Promise.all(y);const E=!0;try{if(E){const _=[],u=[],p=new Map;let D=0;for(let U=0;U<a.index.length;U++){const b=a.index[U]*3,R=a.position[b],C=a.position[b+1],O=a.position[b+2],w=R.toString()+C.toString()+O.toString();p.has(w)?_.push(p.get(w)):(_.push(D),p.set(w,D),D++,u.push(a.position[b]),u.push(a.position[b+1]),u.push(a.position[b+2]))}a.position=new Float32Array(u),a.index=new Uint32Array(_),a.id_sequence&&i.meta&&Object.keys(a.id_sequence).forEach(b=>{var W;const R=[],[C,O]=a.id_sequence[b];for(let j=C;j<O+1;j++){const G=_[j]*3;R.push(u[G]),R.push(u[G+1]),R.push(u[G+2])}const w=(W=i.meta[b])==null?void 0:W[0];w&&(h[w]=ut(R))})}}catch{throw console.error("error in index/position/json",a.indexRef,a.positionRef,s),`error in index/position/json,
                                ${a.indexRef},
                                ${a.positionRef},
                                ${s}`}if(a.position.length){const _=a.position,u=c.getUUID();await c.setKey(u,_.buffer),a.position=u}else console.warn("missing position on",a),a.position=null;if(a.vertexColor.length){const _=a.vertexColor,u=c.getUUID();await c.setKey(u,_.buffer),a.vertexColor=u}else a.vertexColor=null;if(a.index.length){const _=a.index,u=c.getUUID();await c.setKey(u,_.buffer),a.index=u}else console.warn("missing index on",a),a.index=null;await c.setKey(a.IdMapString,a),d.push(a.IdMapString)}}return await c.setKey(ct(o),{meta:i.meta,bbox:h}),await c.setKey(o,d),await c.close(),o}catch(f){console.error("error",o,f)}}}Y(dt)})();
