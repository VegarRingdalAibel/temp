(function(){"use strict";const ae=Symbol("Comlink.proxy"),Ue=Symbol("Comlink.endpoint"),Pe=Symbol("Comlink.releaseProxy"),G=Symbol("Comlink.thrown"),le=e=>typeof e=="object"&&e!==null||typeof e=="function",Be={canHandle:e=>le(e)&&e[ae],serialize(e){const{port1:t,port2:r}=new MessageChannel;return V(e,t),[r,[r]]},deserialize(e){return e.start(),Te(e)}},De={canHandle:e=>le(e)&&G in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},ce=new Map([["proxy",Be],["throw",De]]);function V(e,t=self){t.addEventListener("message",function r(n){if(!n||!n.data)return;const{id:o,type:s,path:f}=Object.assign({path:[]},n.data),l=(n.data.argumentList||[]).map(k);let i;try{const c=f.slice(0,-1).reduce((h,a)=>h[a],e),d=f.reduce((h,a)=>h[a],e);switch(s){case"GET":i=d;break;case"SET":c[f.slice(-1)[0]]=k(n.data.value),i=!0;break;case"APPLY":i=d.apply(c,l);break;case"CONSTRUCT":{const h=new d(...l);i=Oe(h)}break;case"ENDPOINT":{const{port1:h,port2:a}=new MessageChannel;V(e,a),i=he(h,[h])}break;case"RELEASE":i=void 0;break;default:return}}catch(c){i={value:c,[G]:0}}Promise.resolve(i).catch(c=>({value:c,[G]:0})).then(c=>{const[d,h]=J(c);t.postMessage(Object.assign(Object.assign({},d),{id:o}),h),s==="RELEASE"&&(t.removeEventListener("message",r),fe(t))})}),t.start&&t.start()}function Ne(e){return e.constructor.name==="MessagePort"}function fe(e){Ne(e)&&e.close()}function Te(e,t){return q(e,[],t)}function W(e){if(e)throw new Error("Proxy has been released and is not useable")}function q(e,t=[],r=function(){}){let n=!1;const o=new Proxy(r,{get(s,f){if(W(n),f===Pe)return()=>B(e,{type:"RELEASE",path:t.map(l=>l.toString())}).then(()=>{fe(e),n=!0});if(f==="then"){if(t.length===0)return{then:()=>o};const l=B(e,{type:"GET",path:t.map(i=>i.toString())}).then(k);return l.then.bind(l)}return q(e,[...t,f])},set(s,f,l){W(n);const[i,c]=J(l);return B(e,{type:"SET",path:[...t,f].map(d=>d.toString()),value:i},c).then(k)},apply(s,f,l){W(n);const i=t[t.length-1];if(i===Ue)return B(e,{type:"ENDPOINT"}).then(k);if(i==="bind")return q(e,t.slice(0,-1));const[c,d]=ue(l);return B(e,{type:"APPLY",path:t.map(h=>h.toString()),argumentList:c},d).then(k)},construct(s,f){W(n);const[l,i]=ue(f);return B(e,{type:"CONSTRUCT",path:t.map(c=>c.toString()),argumentList:l},i).then(k)}});return o}function Fe(e){return Array.prototype.concat.apply([],e)}function ue(e){const t=e.map(J);return[t.map(r=>r[0]),Fe(t.map(r=>r[1]))]}const de=new WeakMap;function he(e,t){return de.set(e,t),e}function Oe(e){return Object.assign(e,{[ae]:!0})}function J(e){for(const[t,r]of ce)if(r.canHandle(e)){const[n,o]=r.serialize(e);return[{type:"HANDLER",name:t,value:n},o]}return[{type:"RAW",value:e},de.get(e)||[]]}function k(e){switch(e.type){case"HANDLER":return ce.get(e.name).deserialize(e.value);case"RAW":return e.value}}function B(e,t,r){return new Promise(n=>{const o=Le();e.addEventListener("message",function s(f){!f.data||!f.data.id||f.data.id!==o||(e.removeEventListener("message",s),n(f.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),r)})}function Le(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var x=Uint8Array,R=Uint16Array,ge=Uint32Array,ye=new x([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),we=new x([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),$e=new x([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),pe=function(e,t){for(var r=new R(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var o=new ge(r[30]),n=1;n<30;++n)for(var s=r[n];s<r[n+1];++s)o[s]=s-r[n]<<5|n;return[r,o]},_e=pe(ye,2),xe=_e[0],je=_e[1];xe[28]=258,je[258]=28;for(var We=pe(we,0),He=We[0],Y=new R(32768),y=0;y<32768;++y){var C=(y&43690)>>>1|(y&21845)<<1;C=(C&52428)>>>2|(C&13107)<<2,C=(C&61680)>>>4|(C&3855)<<4,Y[y]=((C&65280)>>>8|(C&255)<<8)>>>1}for(var T=function(e,t,r){for(var n=e.length,o=0,s=new R(t);o<n;++o)e[o]&&++s[e[o]-1];var f=new R(t);for(o=0;o<t;++o)f[o]=f[o-1]+s[o-1]<<1;var l;if(r){l=new R(1<<t);var i=15-t;for(o=0;o<n;++o)if(e[o])for(var c=o<<4|e[o],d=t-e[o],h=f[e[o]-1]++<<d,a=h|(1<<d)-1;h<=a;++h)l[Y[h]>>>i]=c}else for(l=new R(n),o=0;o<n;++o)e[o]&&(l[o]=Y[f[e[o]-1]++]>>>15-e[o]);return l},F=new x(288),y=0;y<144;++y)F[y]=8;for(var y=144;y<256;++y)F[y]=9;for(var y=256;y<280;++y)F[y]=7;for(var y=280;y<288;++y)F[y]=8;for(var ve=new x(32),y=0;y<32;++y)ve[y]=5;var Ge=T(F,9,1),Ve=T(ve,5,1),X=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},M=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},Z=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},qe=function(e){return(e+7)/8|0},Q=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var n=new(e.BYTES_PER_ELEMENT==2?R:e.BYTES_PER_ELEMENT==4?ge:x)(r-t);return n.set(e.subarray(t,r)),n},Je=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],v=function(e,t,r){var n=new Error(t||Je[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,v),!r)throw n;return n},Ye=function(e,t,r){var n=e.length;if(!n||r&&r.f&&!r.l)return t||new x(0);var o=!t||r,s=!r||r.i;r||(r={}),t||(t=new x(n*3));var f=function(ze){var ke=t.length;if(ze>ke){var Re=new x(Math.max(ke*2,ze));Re.set(t),t=Re}},l=r.f||0,i=r.p||0,c=r.b||0,d=r.l,h=r.d,a=r.m,w=r.n,m=n*8;do{if(!d){l=M(e,i,1);var g=M(e,i+1,3);if(i+=3,g)if(g==1)d=Ge,h=Ve,a=9,w=5;else if(g==2){var K=M(e,i,31)+257,E=M(e,i+10,15)+4,A=K+M(e,i+5,31)+1;i+=14;for(var I=new x(A),P=new x(19),p=0;p<E;++p)P[$e[p]]=M(e,i+p*3,7);i+=E*3;for(var O=X(P),L=(1<<O)-1,$=T(P,O,1),p=0;p<A;){var Ae=$[M(e,i,L)];i+=Ae&15;var u=Ae>>>4;if(u<16)I[p++]=u;else{var D=0,H=0;for(u==16?(H=3+M(e,i,3),i+=2,D=I[p-1]):u==17?(H=3+M(e,i,7),i+=3):u==18&&(H=11+M(e,i,127),i+=7);H--;)I[p++]=D}}var Ie=I.subarray(0,K),z=I.subarray(K);a=X(Ie),w=X(z),d=T(Ie,a,1),h=T(z,w,1)}else v(1);else{var u=qe(i)+4,_=e[u-4]|e[u-3]<<8,U=u+_;if(U>n){s&&v(0);break}o&&f(c+_),t.set(e.subarray(u,U),c),r.b=c+=_,r.p=i=U*8,r.f=l;continue}if(i>m){s&&v(0);break}}o&&f(c+131072);for(var gt=(1<<a)-1,yt=(1<<w)-1,oe=i;;oe=i){var D=d[Z(e,i)&gt],N=D>>>4;if(i+=D&15,i>m){s&&v(0);break}if(D||v(2),N<256)t[c++]=N;else if(N==256){oe=i,d=null;break}else{var Ce=N-254;if(N>264){var p=N-257,j=ye[p];Ce=M(e,i,(1<<j)-1)+xe[p],i+=j}var se=h[Z(e,i)&yt],ie=se>>>4;se||v(3),i+=se&15;var z=He[ie];if(ie>3){var j=we[ie];z+=Z(e,i)&(1<<j)-1,i+=j}if(i>m){s&&v(0);break}o&&f(c+131072);for(var Ke=c+Ce;c<Ke;c+=4)t[c]=t[c-z],t[c+1]=t[c+1-z],t[c+2]=t[c+2-z],t[c+3]=t[c+3-z];c=Ke}}r.l=d,r.p=oe,r.b=c,r.f=l,d&&(l=1,r.m=a,r.d=h,r.n=w)}while(!l);return c==t.length?t:Q(t,0,c)},Xe=new x(0),S=function(e,t){return e[t]|e[t+1]<<8},b=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},ee=function(e,t){return b(e,t)+b(e,t+4)*4294967296};function Ze(e,t){return Ye(e,t)}var te=typeof TextDecoder<"u"&&new TextDecoder,Qe=0;try{te.decode(Xe,{stream:!0}),Qe=1}catch{}var et=function(e){for(var t="",r=0;;){var n=e[r++],o=(n>127)+(n>223)+(n>239);if(r+o>e.length)return[t,Q(e,r-1)];o?o==3?(n=((n&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):o&1?t+=String.fromCharCode((n&31)<<6|e[r++]&63):t+=String.fromCharCode((n&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(n)}};function me(e,t){if(t){for(var r="",n=0;n<e.length;n+=16384)r+=String.fromCharCode.apply(null,e.subarray(n,n+16384));return r}else{if(te)return te.decode(e);var o=et(e),s=o[0],f=o[1];return f.length&&v(8),s}}var tt=function(e,t){return t+30+S(e,t+26)+S(e,t+28)},rt=function(e,t,r){var n=S(e,t+28),o=me(e.subarray(t+46,t+46+n),!(S(e,t+8)&2048)),s=t+46+n,f=b(e,t+20),l=r&&f==4294967295?nt(e,s):[f,b(e,t+24),b(e,t+42)],i=l[0],c=l[1],d=l[2];return[S(e,t+10),i,c,o,s+S(e,t+30)+S(e,t+32),d]},nt=function(e,t){for(;S(e,t)!=1;t+=4+S(e,t+2));return[ee(e,t+12),ee(e,t+4),ee(e,t+20)]};function Ee(e,t){for(var r={},n=e.length-22;b(e,n)!=101010256;--n)(!n||e.length-n>65558)&&v(13);var o=S(e,n+8);if(!o)return{};var s=b(e,n+16),f=s==4294967295;f&&(n=b(e,n-12),b(e,n)!=101075792&&v(13),o=b(e,n+32),s=b(e,n+48));for(var l=t&&t.filter,i=0;i<o;++i){var c=rt(e,s,f),d=c[0],h=c[1],a=c[2],w=c[3],m=c[4],g=c[5],u=tt(e,g);s=m,(!l||l({name:w,size:h,originalSize:a,compression:d}))&&(d?d==8?r[w]=Ze(e.subarray(u,u+h),new x(a)):v(14,"unknown compression type "+d):r[w]=Q(e,u,u+h))}return r}async function Me(e){const t=new FileReader;return new Promise((r,n)=>{t.onloadend=o=>{var s;o.target?r((s=o.target)==null?void 0:s.result):r(null)},t.onerror=n,t.readAsArrayBuffer(e)})}async function ot(e){const t=new FileReader;return new Promise((r,n)=>{t.onloadend=o=>{o.target?r(o.target.result):r(null)},t.onerror=n,t.readAsText(e)})}async function be(e,t){if(t){const r=await Me(e);if(r instanceof ArrayBuffer){const n=Ee(new Uint8Array(r)),o=Object.keys(n)[0];if(o){const s=me(n[o]);if(s&&typeof s=="string")return JSON.parse(s)}}return null}else{const r=await ot(e);return r&&typeof r=="string"?JSON.parse(r):null}}class st{constructor(){this.currentModel=null}async loadUrl(t){try{const n=await fetch("/temp/"+t),o=await be(await n.blob(),t.includes("zip"));this.initModel(o)}catch(r){console.log(t,r),this.initModel(null)}}initModel(t){var r;this.data=t,this.currentIdMapIndex=-1,this.worldIndex=-1,this.worldLength=((r=t==null?void 0:t.world)==null?void 0:r.length)|0,this.worldIdMapKeys=[]}loadNextModel(){return this.currentModel=this.loadNextModelInternal(),!!this.currentModel}loadNextModelInternal(){return this.data?this.currentWorld?(this.currentIdMapIndex<this.worldIdMapKeys.length-1&&this.currentIdMapIndex++,this.currentIdMapIndex>=0&&(this.currentModel=this.nextId()),this.currentIdMapIndex===this.worldIdMapKeys.length-1&&(this.currentWorld=null,this.worldIdMapKeys=[],this.currentIdMapIndex=-1),this.currentModel):(this.worldIndex++,this.worldIndex<this.worldLength?(this.currentWorld=this.data.world[this.worldIndex],this.worldIdMapKeys=Object.keys(this.currentWorld.id_map),this.currentModel=this.loadNextModelInternal(),this.currentModel):(this.currentModel=null,null)):null}transferModel(){if(!this.currentModel)return null;const t=this.currentModel;return this.currentModel=null,he(t,[t.index.buffer,t.position.buffer,t.vertexColor.buffer])}nextId(){var g;const t=this.worldIdMapKeys[this.currentIdMapIndex],r=(g=this.currentWorld)==null?void 0:g.id_map[t],n=this.currentWorld;if(!r||!n)throw"error with idmap"+t+", "+this.currentIdMapIndex;const o=new Uint32Array(r.index),s=new Float32Array(r.position||[]),f=new Float32Array(r.vertexColor||[]),l=r.color||[0,0,0,1],i=r.matrix,c=r.instances,d=r.wireframeGeometry,h=r.id_sequence;let a=null;typeof r.position=="string"&&(a=r.position);let w=null;typeof r.index=="string"&&(w=r.index);let m=null;return typeof r.vertexColor=="string"&&(m=r.vertexColor),{IdMapString:t,wireframeGeometry:d,color:l,vertexColor:f,vertexColorRef:m,position:s,positionRef:a,matrix:i,instance:c,id_sequence:h,index:o,indexRef:w}}}let re;async function it(){if(!re){const e=await fetch("/azure_config.json");e.ok?re=await e.json().catch(()=>{console.error("unable to get azure config")}):console.error("unable to get azure config")}return re}async function Se(e,t,r){const n=await it();return await fetch(`${n.ENV_AZURE_STORAGE_URL}/${t}/${r}`,{headers:{"cache-control":"no-cache",pragma:"no-cache","x-ms-version":"2021-04-10","x-ms-date":new Date().toUTCString(),authorization:`Bearer ${e}`}})}async function at(e,t){const r=await Me(e);if(r instanceof ArrayBuffer){const n=Ee(new Uint8Array(r)),o=Object.keys(n)[0];if(o)return t==="uint32"?new Uint32Array(n[o].buffer):new Float32Array(n[o].buffer)}return null}async function ne(e,t,r,n){const o=await Se(e,t,r);return o.ok?await at(await o.blob(),n):(console.warn("error"),console.warn(r),null)}async function lt(e,t,r){const n=await Se(e,t,r);if(n.ok)return be(await n.blob(),r.includes(".zip"));throw console.warn("error"),console.warn(r),n.statusText}function ct(e){return`META_${e}`}function ft(e){return`BOUDNING_${e}`}class ut{constructor(t,r=1,n="DATA"){this.__name=t,this.__version=r,this.__storeName=n,this.__logEnabled=!1}enableLog(){this.__logEnabled=!0}__logStart(t){this.__logEnabled&&console.time(`ModelStoreLog_${this.__name}_${this.__storeName}_${t}`)}__logEnd(t){this.__logEnabled&&console.timeEnd(`ModelStoreLog_${this.__name}_${this.__storeName}_${t}`)}close(){return new Promise(t=>{this.__db&&(this.__db.close(),t(!0))})}__open(){return new Promise((t,r)=>{if(this.__db)t(this.__db);else{const n=indexedDB.open(this.__name,this.__version);n.onupgradeneeded=()=>{const o=n.result;o.objectStoreNames.contains(this.__name)||o.createObjectStore(this.__storeName)},n.onblocked=o=>{this.__logEnd("getKey"),r({type:"onblocked",event:o})},n.onerror=o=>{this.__logEnd("getKey"),r({type:"onblocked",event:o})},n.onsuccess=()=>{this.__db=n.result,t(n.result)}}})}getUUID(){return crypto.randomUUID()}getKey(t){return new Promise(async(r,n)=>{this.__logStart("getKey");try{const s=(await this.__open()).transaction(this.__storeName);s.onerror=i=>{this.__logEnd("getKey"),n({type:"store tx error",event:i})};const l=s.objectStore(this.__storeName).get(t);l.onsuccess=()=>{this.__logEnd("getKey"),r(l.result)}}catch(o){this.__logEnd("getKey"),n(o)}})}setKey(t,r){return new Promise(async(n,o)=>{var s;this.__logStart("setKey");try{const l=(await this.__open()).transaction(this.__storeName,"readwrite");l.onerror=d=>{this.__logEnd("setKey"),o({type:"store tx error",event:d})};const c=l.objectStore(this.__storeName).put(r,t);c.onsuccess=()=>{this.__logEnd("setKey"),n(c.result)},(s=c.transaction)==null||s.commit()}catch(f){this.__logEnd("setKey"),o(f)}})}getAllKeys(){return new Promise(async(t,r)=>{this.__logStart("getAllKeys");try{const o=(await this.__open()).transaction(this.__storeName,"readwrite");o.onerror=l=>{this.__logEnd("getAllKeys"),r({type:"store tx error",event:l})};const f=o.objectStore(this.__storeName).getAllKeys();f.onsuccess=()=>{this.__logEnd("getAllKeys"),t(f.result)}}catch(n){this.__logEnd("getAllKeys"),r(n)}})}deleteKey(t){return new Promise(async(r,n)=>{this.__logStart("deleteKey");try{const s=(await this.__open()).transaction(this.__storeName,"readwrite");s.onerror=i=>{this.__logEnd("deleteKey"),n({type:"store tx error",event:i})};const l=s.objectStore(this.__storeName).delete(t);l.onsuccess=()=>{this.__logEnd("deleteKey"),r(l.result)}}catch(o){this.__logEnd("deleteKey"),n(o)}})}deleteDB(){return new Promise((t,r)=>{this.__logStart("deleteDB");const n=indexedDB.deleteDatabase(this.__name);n.onsuccess=()=>{this.__logEnd("deleteDB"),t(!0)},n.onerror=o=>{this.__logEnd("deleteDB"),r({type:"onblocked",event:o})}})}}function dt(e){const t={x:null,y:null,z:null},r={x:null,y:null,z:null};let n=0;for(;n<e.length;)for(let o=0;o<3;o++,n++){const s=e[n]||0;o===0&&(t.x===null&&(t.x=s),r.x===null&&(r.x=s),t.x<s&&(t.x=s),r.x>s&&(r.x=s)),o===1&&(t.y===null&&(t.y=s),r.y===null&&(r.y=s),t.y<s&&(t.y=s),r.y>s&&(r.y=s)),o===2&&(t.z===null&&(t.z=s),r.z===null&&(r.z=s),t.z<s&&(t.z=s),r.z>s&&(r.z=s))}return{max:{x:t.x||0,y:t.y||0,z:t.z||0},min:{x:r.x||0,y:r.y||0,z:r.z||0}}}class ht{async downloadFromAzure(t,r,n,o,s){try{let f=function(a,w){const m=a.split("/").pop()||"";return a.replace(m,`data/${w.replaceAll("$$","%24%24")}.zip`)};const l=new ut(r),i=await lt(t,n,s),c=new st;c.initModel(i),i.meta&&await l.setKey(ct(o),i.meta);const d=[],h={};for(;await c.loadNextModel();){const a=await c.currentModel;if(a){const w=[];if(a.indexRef){const g=f(s,a.indexRef),u=ne(t,n,g,"uint32").then(_=>{_&&(a.index=_.slice(32))});w.push(u)}if(a.positionRef){const g=f(s,a.positionRef),u=ne(t,n,g,"float32").then(_=>{_&&(a.position=_.slice(32))});w.push(u)}if(a.vertexColorRef){const g=f(s,a.vertexColorRef),u=ne(t,n,g,"float32").then(_=>{_&&(a.vertexColor=_.slice(32))});w.push(u)}await Promise.all(w);const m=!0;try{if(m){const g=[],u=[],_=new Map;let U=0;for(let K=0;K<a.index.length;K++){const E=a.index[K]*3,A=a.position[E],I=a.position[E+1],P=a.position[E+2],p=A.toString()+I.toString()+P.toString();_.has(p)?g.push(_.get(p)):(g.push(U),_.set(p,U),U++,u.push(a.position[E]),u.push(a.position[E+1]),u.push(a.position[E+2]))}a.position=new Float32Array(u),a.index=new Uint32Array(g),a.id_sequence&&i.meta&&Object.keys(a.id_sequence).forEach(E=>{var O;const A=[],[I,P]=a.id_sequence[E];for(let L=I;L<P+1;L++){const $=g[L]*3;A.push(u[$]),A.push(u[$+1]),A.push(u[$+2])}const p=(O=i.meta[E])==null?void 0:O[0];p&&(h[p]=dt(A))})}}catch{throw console.error("error in index/position/json",a.indexRef,a.positionRef,s),`error in index/position/json,
                                ${a.indexRef},
                                ${a.positionRef},
                                ${s}`}if(a.position.length){const g=a.position,u=l.getUUID();await l.setKey(u,g.buffer),a.position=u}else console.warn("missing position on",a),a.position=null;if(a.vertexColor.length){const g=a.vertexColor,u=l.getUUID();await l.setKey(u,g.buffer),a.vertexColor=u}else a.vertexColor=null;if(a.index.length){const g=a.index,u=l.getUUID();await l.setKey(u,g.buffer),a.index=u}else console.warn("missing index on",a),a.index=null;await l.setKey(a.IdMapString,a),d.push(a.IdMapString)}}return await l.setKey(ft(o),h),await l.setKey(o,d),await l.close(),o}catch(f){console.error("error",o,f)}}}V(ht)})();
