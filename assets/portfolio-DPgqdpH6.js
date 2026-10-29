const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./HearthstoneRandomCard-BwDmNW84.js","./client-Dlbw7WXd.js","./Header-CoKQlZXS.js","./preload-helper-Dp1pzeXC.js","./chevron-down-DCn7hpzv.js","./index-DR_ms2Q-.js","./external-link-BnZlpOwq.js","./HearthstoneRandomCard-DH9-hN4V.css","./RecipeListPage-Kbyw7tyO.js","./recipes-DlhLQujm.js","./UsersIcon-XAgyy_7M.js","./RecipeDetailPage-m42z33SD.js","./MealPrepPage-BfADMV4m.js","./search-C5Kc9JZX.js","./check-D5QwCNKL.js"])))=>i.map(i=>d[i]);
var st=Object.defineProperty;var nt=(i,e,t)=>e in i?st(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var ge=(i,e,t)=>nt(i,typeof e!="symbol"?e+"":e,t);import{j as r,R as le,r as y,c as it,a as ot,b as rt}from"./client-Dlbw7WXd.js";import{_ as Y}from"./preload-helper-Dp1pzeXC.js";import{c as z,A as at,C as lt}from"./chevron-down-DCn7hpzv.js";import{N as Le,L as ct,u as dt,H as ht,a as pt,R as ut,b as U}from"./index-DR_ms2Q-.js";import{E as mt}from"./external-link-BnZlpOwq.js";function Ue(i,e){e===void 0&&(e={});var t=e.insertAt;if(!(!i||typeof document>"u")){var s=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",t==="top"&&s.firstChild?s.insertBefore(n,s.firstChild):s.appendChild(n),n.styleSheet?n.styleSheet.cssText=i:n.appendChild(document.createTextNode(i))}}var gt=`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@200;400;700&display=swap');

/* Breakpoints: 320, 480, 640, 960, 1200, 1400, 1600 */
/* Mobile First Tokens */
html {
  scroll-behavior: smooth;

  /* Views */
  --view-min: 320px;
  --view-xs: 480px;
  --view-sm: 640px;
  --view-md: 960px;
  --view-lg: 1200px;
  --view-xl: 1400px;
  --view-xxl: 1600px;
  --view-max: 2600px;

  /* Fonts */
  --font-family-default: 'Lato';
  --font-family-accent: 'Montserrat';
  --font-size-050: 0.563rem;
  --font-size-075: 0.75rem;
  --font-size-100: 1rem;
  --font-size-200: 1.333rem;
  --font-size-300: 1.777rem;
  --font-size-400: calc(2.369rem * 0.65);
  --font-size-500: calc(3.157rem * 0.65);
  --font-size-600: calc(4.209rem * 0.65);
  --font-size-700: calc(5.610rem * 0.65);
  --font-size-800: calc(7.478rem * 0.65);

  /* Sizes */
  --size-base: 8px;
  --size-025: calc(var(--size-base) * 0.25);
  --size-050: calc(var(--size-base) * 0.5);
  --size-075: calc(var(--size-base) * 0.75);
  --size-100: var(--size-base);
  --size-150: calc(var(--size-base) * 1.5);
  --size-200: calc(var(--size-base) * 2);
  --size-300: calc(var(--size-base) * 3);
  --size-400: calc(var(--size-base) * 4);
  --size-500: calc(var(--size-base) * 5);
  --size-600: calc(var(--size-base) * 6);
  --size-700: calc(var(--size-base) * 7);
  --size-800: calc(var(--size-base) * 8);
  --size-900: calc(var(--size-base) * 9);
  --size-1000: calc(var(--size-base) * 10);

  /* Colors */
  --color-gray-100: rgb(105, 105, 105);
  --color-gray-200: rgb(128, 128, 128);
  --color-gray-300: rgb(169, 169, 169);
  --color-gray-400: rgb(192, 192, 192);
  --color-gray-500: rgb(211, 211, 211);
  --color-gray-600: rgb(220, 220, 220);

  --color-white-100: rgba(255, 255, 255, 0.1);
  --color-white-200: rgba(255, 255, 255, 0.2);
  --color-white-300: rgba(255, 255, 255, 0.3);
  --color-white-400: rgba(255, 255, 255, 0.4);
  --color-white-500: rgba(255, 255, 255, 0.5);
  --color-white-600: rgba(255, 255, 255, 0.6);
  --color-white-700: rgba(255, 255, 255, 0.7);
  --color-white-800: rgba(255, 255, 255, 0.8);
  --color-white-900: rgba(255, 255, 255, 0.9);

  --color-black-100: rgba(0, 0, 0, 0.1);
  --color-black-200: rgba(0, 0, 0, 0.2);
  --color-black-300: rgba(0, 0, 0, 0.3);
  --color-black-400: rgba(0, 0, 0, 0.4);
  --color-black-500: rgba(0, 0, 0, 0.5);
  --color-black-600: rgba(0, 0, 0, 0.6);
  --color-black-700: rgba(0, 0, 0, 0.7);
  --color-black-800: rgba(0, 0, 0, 0.8);
  --color-black-900: rgba(0, 0, 0, 0.9);

  --color-theme-1: #fffeec;
  --color-theme-2: #fbf9e1;
  --color-theme-3: #37392e;
  --color-theme-4: #19647e;
  --color-theme-5: #28afb0;

  --section-bg-1: #fbf9e1;
  --section-bg-2: #fffeec;
  --section-vertical-padding: var(--size-400);
  --section-horizontal-padding: var(--size-400);
  --section-padding: var(--section-vertical-padding) var(--section-horizontal-padding);
  --section-max-width: var(--view-xxl);
  /* Constants */
  --z-index-nav: 50;
}
/* Tablet */
@media screen and (min-width: 768px) {
  html {
    --font-size-400: calc(2.369rem * .8);
    --font-size-500: calc(3.157rem * .8);
    --font-size-600: calc(4.209rem * .8);
    --font-size-700: calc(5.610rem * .8);
    --font-size-800: calc(7.478rem * .8);
    --section-vertical-padding: var(--size-600);
    --section-horizontal-padding: var(--size-600);
  }
}
/* Desktop */
@media screen and (min-width: 1200px) {
  html {
    --font-size-400: 2.369rem;
    --font-size-500: 3.157rem;
    --font-size-600: 4.209rem;
    --font-size-700: 5.610rem;
    --font-size-800: 7.478rem;
    --section-vertical-padding: var(--size-700);
    --section-horizontal-padding: var(--size-700);
  }
}
/* Ultra Wide */
@media screen and (min-width: 1600px) {
  html {
    --section-vertical-padding: var(--size-1000);
    --section-horizontal-padding: var(--size-1000);
  }
}
`;Ue(gt);var ft=`h1,
h2,
h3,
h4,
h5,
h6,
p,
a {
  margin: 0;
}
a {
  text-decoration: none;
}
.st-text,
.st-text::slotted(*) {
  font-family: var(--font-family-default), sans-serif;
  font-size: var(--font-size-100);
  line-height: 1.6;
}
.st-text-accent,
.st-text-accent::slotted(*) {
  font-family: var(--font-family-accent), sans-serif;
  font-size: var(--font-size-500);
  line-height: 1.2;
}
.st-text-100,
.st-text-100::slotted(*) {
  font-size: var(--font-size-100);
}
.st-text-200,
.st-text-200::slotted(*) {
  font-size: var(--font-size-200);
}
.st-text-300,
.st-text-300::slotted(*) {
  font-size: var(--font-size-300);
}
.st-text-400,
.st-text-400::slotted(*) {
  font-size: var(--font-size-400);
}
.st-text-500,
.st-text-500::slotted(*) {
  font-size: var(--font-size-500);
}
.st-text-600,
.st-text-600::slotted(*) {
  font-size: var(--font-size-600);
}
.st-text-700,
.st-text-700::slotted(*) {
  font-size: var(--font-size-700);
}
.st-text-800,
.st-text-800::slotted(*) {
  font-size: var(--font-size-800);
}
`;Ue(ft);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ue=Symbol(),fe=new Map;let Oe=class{constructor(e,t){if(this._$cssResult$=!0,t!==ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=fe.get(this.cssText);return pe&&e===void 0&&(fe.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}};const vt=i=>new Oe(typeof i=="string"?i:i+"",ue),A=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,n,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new Oe(t,ue)},xt=(i,e)=>{pe?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const s=document.createElement("style"),n=window.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})},ve=pe?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return vt(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var se;const xe=window.reactiveElementPolyfillSupport,ce={toAttribute(i,e){switch(e){case Boolean:i=i?"":null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},De=(i,e)=>e!==i&&(e==e||i==i),ne={attribute:!0,type:String,converter:ce,reflect:!1,hasChanged:De};let S=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,s)=>{const n=this._$Eh(s,t);n!==void 0&&(this._$Eu.set(n,s),e.push(n))}),e}static createProperty(e,t=ne){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){const o=this[e];this[t]=n,this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ne}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of s)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const n of s)t.unshift(ve(n))}else e!==void 0&&t.push(ve(e));return t}static _$Eh(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ev=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Ep(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,s;((t=this._$Em)!==null&&t!==void 0?t:this._$Em=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$Em)===null||t===void 0||t.splice(this._$Em.indexOf(e)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return xt(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Em)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Em)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$Eg(e,t,s=ne){var n,o;const a=this.constructor._$Eh(e,s);if(a!==void 0&&s.reflect===!0){const h=((o=(n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==null&&o!==void 0?o:ce.toAttribute)(t,s.type);this._$Ei=e,h==null?this.removeAttribute(a):this.setAttribute(a,h),this._$Ei=null}}_$AK(e,t){var s,n,o;const a=this.constructor,h=a._$Eu.get(e);if(h!==void 0&&this._$Ei!==h){const l=a.getPropertyOptions(h),c=l.converter,m=(o=(n=(s=c)===null||s===void 0?void 0:s.fromAttribute)!==null&&n!==void 0?n:typeof c=="function"?c:null)!==null&&o!==void 0?o:ce.fromAttribute;this._$Ei=h,this[h]=m(t,l.type),this._$Ei=null}}requestUpdate(e,t,s){let n=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||De)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$Ei!==e&&(this._$ES===void 0&&(this._$ES=new Map),this._$ES.set(e,s))):n=!1),!this.isUpdatePending&&n&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((n,o)=>this[o]=n),this._$Et=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$Em)===null||e===void 0||e.forEach(n=>{var o;return(o=n.hostUpdate)===null||o===void 0?void 0:o.call(n)}),this.update(s)):this._$EU()}catch(n){throw t=!1,this._$EU(),n}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$Em)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(e){return!0}update(e){this._$ES!==void 0&&(this._$ES.forEach((t,s)=>this._$Eg(s,this[s],t)),this._$ES=void 0),this._$EU()}updated(e){}firstUpdated(e){}};S.finalized=!0,S.elementProperties=new Map,S.elementStyles=[],S.shadowRootOptions={mode:"open"},xe==null||xe({ReactiveElement:S}),((se=globalThis.reactiveElementVersions)!==null&&se!==void 0?se:globalThis.reactiveElementVersions=[]).push("1.0.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ie;const Z=globalThis.trustedTypes,be=Z?Z.createPolicy("lit-html",{createHTML:i=>i}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,Be="?"+$,bt=`<${Be}>`,T=document,Q=(i="")=>T.createComment(i),W=i=>i===null||typeof i!="object"&&typeof i!="function",We=Array.isArray,yt=i=>{var e;return We(i)||typeof((e=i)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,$e=/>/g,w=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_e=/'/g,Ae=/"/g,Fe=/^(?:script|style|textarea)$/i,H=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),we=new WeakMap,k=T.createTreeWalker(T,129,null,!1),$t=(i,e)=>{const t=i.length-1,s=[];let n,o=e===2?"<svg>":"",a=O;for(let l=0;l<t;l++){const c=i[l];let m,d,p=-1,u=0;for(;u<c.length&&(a.lastIndex=u,d=a.exec(c),d!==null);)u=a.lastIndex,a===O?d[1]==="!--"?a=ye:d[1]!==void 0?a=$e:d[2]!==void 0?(Fe.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=w):d[3]!==void 0&&(a=w):a===w?d[0]===">"?(a=n??O,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,m=d[1],a=d[3]===void 0?w:d[3]==='"'?Ae:_e):a===Ae||a===_e?a=w:a===ye||a===$e?a=O:(a=w,n=void 0);const x=a===w&&i[l+1].startsWith("/>")?" ":"";o+=a===O?c+bt:p>=0?(s.push(m),c.slice(0,p)+"$lit$"+c.slice(p)+$+x):c+$+(p===-2?(s.push(void 0),l):x)}const h=o+(i[t]||"<?>")+(e===2?"</svg>":"");return[be!==void 0?be.createHTML(h):h,s]};let de=class Ve{constructor({strings:e,_$litType$:t},s){let n;this.parts=[];let o=0,a=0;const h=e.length-1,l=this.parts,[c,m]=$t(e,t);if(this.el=Ve.createElement(c,s),k.currentNode=this.el.content,t===2){const d=this.el.content,p=d.firstChild;p.remove(),d.append(...p.childNodes)}for(;(n=k.nextNode())!==null&&l.length<h;){if(n.nodeType===1){if(n.hasAttributes()){const d=[];for(const p of n.getAttributeNames())if(p.endsWith("$lit$")||p.startsWith($)){const u=m[a++];if(d.push(p),u!==void 0){const x=n.getAttribute(u.toLowerCase()+"$lit$").split($),b=/([.?@])?(.*)/.exec(u);l.push({type:1,index:o,name:b[2],strings:x,ctor:b[1]==="."?At:b[1]==="?"?wt:b[1]==="@"?jt:ee})}else l.push({type:6,index:o})}for(const p of d)n.removeAttribute(p)}if(Fe.test(n.tagName)){const d=n.textContent.split($),p=d.length-1;if(p>0){n.textContent=Z?Z.emptyScript:"";for(let u=0;u<p;u++)n.append(d[u],Q()),k.nextNode(),l.push({type:2,index:++o});n.append(d[p],Q())}}}else if(n.nodeType===8)if(n.data===Be)l.push({type:2,index:o});else{let d=-1;for(;(d=n.data.indexOf($,d+1))!==-1;)l.push({type:7,index:o}),d+=$.length-1}o++}}static createElement(e,t){const s=T.createElement("template");return s.innerHTML=e,s}};function I(i,e,t=i,s){var n,o,a,h;if(e===H)return e;let l=s!==void 0?(n=t._$Cl)===null||n===void 0?void 0:n[s]:t._$Cu;const c=W(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),c===void 0?l=void 0:(l=new c(i),l._$AT(i,t,s)),s!==void 0?((a=(h=t)._$Cl)!==null&&a!==void 0?a:h._$Cl=[])[s]=l:t._$Cu=l),l!==void 0&&(e=I(i,l._$AS(i,e.values),l,s)),e}let _t=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:s},parts:n}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:T).importNode(s,!0);k.currentNode=o;let a=k.nextNode(),h=0,l=0,c=n[0];for(;c!==void 0;){if(h===c.index){let m;c.type===2?m=new qe(a,a.nextSibling,this,e):c.type===1?m=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(m=new Nt(a,this,e)),this.v.push(m),c=n[++l]}h!==(c==null?void 0:c.index)&&(a=k.nextNode(),h++)}return o}m(e){let t=0;for(const s of this.v)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},qe=class Ge{constructor(e,t,s,n){var o;this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=n,this._$Cg=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),W(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==H&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):yt(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==g&&W(this._$AH)?this._$AA.nextSibling.data=e:this.S(T.createTextNode(e)),this._$AH=e}T(e){var t;const{values:s,_$litType$:n}=e,o=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=de.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(s);else{const a=new _t(o,this),h=a.p(this.options);a.m(s),this.S(h),this._$AH=a}}_$AC(e){let t=we.get(e.strings);return t===void 0&&we.set(e.strings,t=new de(e)),t}M(e){We(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,n=0;for(const o of e)n===t.length?t.push(s=new Ge(this.A(Q()),this.A(Q()),this,this.options)):s=t[n],s._$AI(o),n++;n<t.length&&(this._$AR(s&&s._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},ee=class{constructor(e,t,s,n,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=g}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,n){const o=this.strings;let a=!1;if(o===void 0)e=I(this,e,t,0),a=!W(e)||e!==this._$AH&&e!==H,a&&(this._$AH=e);else{const h=e;let l,c;for(e=o[0],l=0;l<o.length-1;l++)c=I(this,h[s+l],t,l),c===H&&(c=this._$AH[l]),a||(a=!W(c)||c!==this._$AH[l]),c===g?e=g:e!==g&&(e+=(c??"")+o[l+1]),this._$AH[l]=c}a&&!n&&this.k(e)}k(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},At=class extends ee{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===g?void 0:e}},wt=class extends ee{constructor(){super(...arguments),this.type=4}k(e){e&&e!==g?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}},jt=class extends ee{constructor(e,t,s,n,o){super(e,t,s,n,o),this.type=5}_$AI(e,t=this){var s;if((e=(s=I(this,e,t,0))!==null&&s!==void 0?s:g)===H)return;const n=this._$AH,o=e===g&&n!==g||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==g&&(n===g||o);o&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}},Nt=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}};const je=window.litHtmlPolyfillSupport;je==null||je(de,qe),((ie=globalThis.litHtmlVersions)!==null&&ie!==void 0?ie:globalThis.litHtmlVersions=[]).push("2.0.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oe;const X=globalThis.trustedTypes,Ne=X?X.createPolicy("lit-html",{createHTML:i=>i}):void 0,_=`lit$${(Math.random()+"").slice(9)}$`,Je="?"+_,zt=`<${Je}>`,M=document,F=(i="")=>M.createComment(i),V=i=>i===null||typeof i!="object"&&typeof i!="function",Ke=Array.isArray,St=i=>{var e;return Ke(i)||typeof((e=i)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ze=/-->/g,Se=/>/g,j=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ke=/'/g,Ee=/"/g,Ze=/^(?:script|style|textarea)$/i,kt=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),N=kt(1),P=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),Ce=new WeakMap,Et=(i,e,t)=>{var s,n;const o=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:e;let a=o._$litPart$;if(a===void 0){const h=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=a=new G(e.insertBefore(F(),h),h,void 0,t??{})}return a._$AI(i),a},E=M.createTreeWalker(M,129,null,!1),Ct=(i,e)=>{const t=i.length-1,s=[];let n,o=e===2?"<svg>":"",a=D;for(let l=0;l<t;l++){const c=i[l];let m,d,p=-1,u=0;for(;u<c.length&&(a.lastIndex=u,d=a.exec(c),d!==null);)u=a.lastIndex,a===D?d[1]==="!--"?a=ze:d[1]!==void 0?a=Se:d[2]!==void 0?(Ze.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=j):d[3]!==void 0&&(a=j):a===j?d[0]===">"?(a=n??D,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,m=d[1],a=d[3]===void 0?j:d[3]==='"'?Ee:ke):a===Ee||a===ke?a=j:a===ze||a===Se?a=D:(a=j,n=void 0);const x=a===j&&i[l+1].startsWith("/>")?" ":"";o+=a===D?c+zt:p>=0?(s.push(m),c.slice(0,p)+"$lit$"+c.slice(p)+_+x):c+_+(p===-2?(s.push(void 0),l):x)}const h=o+(i[t]||"<?>")+(e===2?"</svg>":"");return[Ne!==void 0?Ne.createHTML(h):h,s]};class q{constructor({strings:e,_$litType$:t},s){let n;this.parts=[];let o=0,a=0;const h=e.length-1,l=this.parts,[c,m]=Ct(e,t);if(this.el=q.createElement(c,s),E.currentNode=this.el.content,t===2){const d=this.el.content,p=d.firstChild;p.remove(),d.append(...p.childNodes)}for(;(n=E.nextNode())!==null&&l.length<h;){if(n.nodeType===1){if(n.hasAttributes()){const d=[];for(const p of n.getAttributeNames())if(p.endsWith("$lit$")||p.startsWith(_)){const u=m[a++];if(d.push(p),u!==void 0){const x=n.getAttribute(u.toLowerCase()+"$lit$").split(_),b=/([.?@])?(.*)/.exec(u);l.push({type:1,index:o,name:b[2],strings:x,ctor:b[1]==="."?Ht:b[1]==="?"?It:b[1]==="@"?Mt:te})}else l.push({type:6,index:o})}for(const p of d)n.removeAttribute(p)}if(Ze.test(n.tagName)){const d=n.textContent.split(_),p=d.length-1;if(p>0){n.textContent=X?X.emptyScript:"";for(let u=0;u<p;u++)n.append(d[u],F()),E.nextNode(),l.push({type:2,index:++o});n.append(d[p],F())}}}else if(n.nodeType===8)if(n.data===Je)l.push({type:2,index:o});else{let d=-1;for(;(d=n.data.indexOf(_,d+1))!==-1;)l.push({type:7,index:o}),d+=_.length-1}o++}}static createElement(e,t){const s=M.createElement("template");return s.innerHTML=e,s}}function R(i,e,t=i,s){var n,o,a,h;if(e===P)return e;let l=s!==void 0?(n=t._$Cl)===null||n===void 0?void 0:n[s]:t._$Cu;const c=V(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),c===void 0?l=void 0:(l=new c(i),l._$AT(i,t,s)),s!==void 0?((a=(h=t)._$Cl)!==null&&a!==void 0?a:h._$Cl=[])[s]=l:t._$Cu=l),l!==void 0&&(e=R(i,l._$AS(i,e.values),l,s)),e}class Tt{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:s},parts:n}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:M).importNode(s,!0);E.currentNode=o;let a=E.nextNode(),h=0,l=0,c=n[0];for(;c!==void 0;){if(h===c.index){let m;c.type===2?m=new G(a,a.nextSibling,this,e):c.type===1?m=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(m=new Pt(a,this,e)),this.v.push(m),c=n[++l]}h!==(c==null?void 0:c.index)&&(a=E.nextNode(),h++)}return o}m(e){let t=0;for(const s of this.v)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class G{constructor(e,t,s,n){var o;this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=n,this._$Cg=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),V(e)?e===f||e==null||e===""?(this._$AH!==f&&this._$AR(),this._$AH=f):e!==this._$AH&&e!==P&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):St(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==f&&V(this._$AH)?this._$AA.nextSibling.data=e:this.S(M.createTextNode(e)),this._$AH=e}T(e){var t;const{values:s,_$litType$:n}=e,o=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=q.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(s);else{const a=new Tt(o,this),h=a.p(this.options);a.m(s),this.S(h),this._$AH=a}}_$AC(e){let t=Ce.get(e.strings);return t===void 0&&Ce.set(e.strings,t=new q(e)),t}M(e){Ke(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,n=0;for(const o of e)n===t.length?t.push(s=new G(this.A(F()),this.A(F()),this,this.options)):s=t[n],s._$AI(o),n++;n<t.length&&(this._$AR(s&&s._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class te{constructor(e,t,s,n,o){this.type=1,this._$AH=f,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,n){const o=this.strings;let a=!1;if(o===void 0)e=R(this,e,t,0),a=!V(e)||e!==this._$AH&&e!==P,a&&(this._$AH=e);else{const h=e;let l,c;for(e=o[0],l=0;l<o.length-1;l++)c=R(this,h[s+l],t,l),c===P&&(c=this._$AH[l]),a||(a=!V(c)||c!==this._$AH[l]),c===f?e=f:e!==f&&(e+=(c??"")+o[l+1]),this._$AH[l]=c}a&&!n&&this.k(e)}k(e){e===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ht extends te{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===f?void 0:e}}class It extends te{constructor(){super(...arguments),this.type=4}k(e){e&&e!==f?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class Mt extends te{constructor(e,t,s,n,o){super(e,t,s,n,o),this.type=5}_$AI(e,t=this){var s;if((e=(s=R(this,e,t,0))!==null&&s!==void 0?s:f)===P)return;const n=this._$AH,o=e===f&&n!==f||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==f&&(n===f||o);o&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class Pt{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}}const Te=window.litHtmlPolyfillSupport;Te==null||Te(q,G),((oe=globalThis.litHtmlVersions)!==null&&oe!==void 0?oe:globalThis.litHtmlVersions=[]).push("2.0.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var re,ae;class v extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return P}}v.finalized=!0,v._$litElement$=!0,(re=globalThis.litElementHydrateSupport)===null||re===void 0||re.call(globalThis,{LitElement:v});const He=globalThis.litElementPolyfillSupport;He==null||He({LitElement:v});((ae=globalThis.litElementVersions)!==null&&ae!==void 0?ae:globalThis.litElementVersions=[]).push("3.0.1");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=i=>i??g;var L=A`
h1,
h2,
h3,
h4,
h5,
h6,
p,
a {
  margin: 0;
}
a {
  text-decoration: none;
}
.st-text,
.st-text::slotted(*) {
  font-family: var(--font-family-default), sans-serif;
  font-size: var(--font-size-100);
  line-height: 1.6;
}
.st-text-accent,
.st-text-accent::slotted(*) {
  font-family: var(--font-family-accent), sans-serif;
  font-size: var(--font-size-500);
  line-height: 1.2;
}
.st-text-100,
.st-text-100::slotted(*) {
  font-size: var(--font-size-100);
}
.st-text-200,
.st-text-200::slotted(*) {
  font-size: var(--font-size-200);
}
.st-text-300,
.st-text-300::slotted(*) {
  font-size: var(--font-size-300);
}
.st-text-400,
.st-text-400::slotted(*) {
  font-size: var(--font-size-400);
}
.st-text-500,
.st-text-500::slotted(*) {
  font-size: var(--font-size-500);
}
.st-text-600,
.st-text-600::slotted(*) {
  font-size: var(--font-size-600);
}
.st-text-700,
.st-text-700::slotted(*) {
  font-size: var(--font-size-700);
}
.st-text-800,
.st-text-800::slotted(*) {
  font-size: var(--font-size-800);
}
`,Rt=A`
  :host {
    --icon-gap: var(--size-100);
    --icon-size: var(--size-200);

    display: inline-block;
    user-select: none;
  }
  [part='container'] {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;

    display: inline-grid;
    grid-auto-flow: column;
    gap: var(--icon-gap);
    align-items: center;
    cursor: pointer;
    border-radius: var(--size-050);
    padding: var(--size-200);
    background-color: var(--color-gray-400);
    text-decoration: none;
    box-shadow: var(--color-black-600) 1px 1px 8px;
    color: var(--color-black-800);
  }
  [part='container']:hover {
    color: black;
  }
  :host([type='primary']) [part='container'] {
    background-color: var(--color-theme-5);
    color: var(--color-white-800);
  }
  :host([type='secondary']) [part='container'] {
    background-color: var(--color-theme-3);
    color: var(--color-white-800);
  }
  :host([type]) [part='container']:hover {
    color: white;
  }
  
  [part='icon'] {
    width: var(--icon-size);
    height: var(--icon-size);
  }
`;class Lt extends v{static get properties(){return{type:{type:String},label:{type:String},href:{type:String},icon:{type:String},trailingIcon:{attribute:"trailing-icon",type:Boolean}}}static get styles(){return[L,Rt]}render(){const e=N`<ion-icon part='icon' name="${this.icon}"></ion-icon>`;return N`
      <button part='container' href=${Qe(this.href)}>
        ${this.icon&&!this.trailingIcon?e:null}
        <slot class="st-text"> ${this.label} </slot>
        ${this.icon&&this.trailingIcon?e:null}
      </button>
    `}}customElements.define("st-button",Lt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut={ATTRIBUTE:1},Ot=i=>(...e)=>({_$litDirective$:i,values:e});class Dt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt=Ot(class extends Dt{constructor(i){var e;if(super(i),i.type!==Ut.ATTRIBUTE||i.name!=="class"||((e=i.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(e=>i[e]).join(" ")+" "}update(i,[e]){var t,s;if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.et=new Set(i.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!(!((t=this.et)===null||t===void 0)&&t.has(o))&&this.st.add(o);return this.render(e)}const n=i.element.classList;this.st.forEach(o=>{o in e||(n.remove(o),this.st.delete(o))});for(const o in e){const a=!!e[o];a===this.st.has(o)||!((s=this.et)===null||s===void 0)&&s.has(o)||(a?(n.add(o),this.st.add(o)):(n.remove(o),this.st.delete(o)))}return H}});var J=A`
  :host {
    display: block;
  }
  :host,
  * {
    box-sizing: border-box;
  }
`,Wt=A`
  :host {
    display: inline-block;
    width: 310px;
  }
  #container {
    border: var(--size-050) solid var(--color-gray-400);
    border-radius: var(--size-200);
    overflow: hidden;
    position: relative;
    overflow: hidden;
    padding-bottom: 56.25%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .link {
    color: black;
  }
  .image::part(container) {
    max-width: 100%;
    max-height: 100%;
  }
  .transparent-label {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--size-300);
    background: var(--color-white-800);
    position: absolute;
    bottom: 0;
    left: 0;
    transition: transform 0.4s;
  }
  st-header {
    gap: var(--size-050);
  }
  #container:hover .transparent-label {
    transform: translateY(0);
  }
  :host([static]) .transparent-label {
    transform: none;
  }
  :host([contain]) #container {
    background-size: contain;
  }
  @media screen and (min-width: 960px) {
    .transparent-label {
      transform: translateY(100%);
    }
  }
`;class Ft extends v{static get properties(){return{image:{type:String},href:{type:String},heading:{type:String},subheading:{type:String},description:{type:String},static:{type:Boolean},contain:{type:Boolean}}}static get styles(){return[J,L,Wt]}render(){const e={wide:this.wide};return N`
      <a class="link" href=${Qe(this.href)}>
        <div
          id="container"
          part="container"
          class="${Bt(e)}"
          style="background-image: url(${this.image})"
        >
          <div class="transparent-label">
            <st-header>
              <slot name="subheading" slot="subheading"></slot>
              <slot class="st-text-300" name="heading" slot="heading"></slot>
              <slot name="description" slot="description"></slot>
            </st-header>
          </div>
        </div>
      </a>
    `}}customElements.define("st-card",Ft);var Vt=A`
#section {
  background-color: #37392e;
}
#section::part(container) {
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
st-header {
  color: var(--color-white-700);
  gap: var(--size-075);
  margin-bottom: var(--size-200);
}
.social-icons {
  display: inline-grid;
  grid-auto-flow: column;
  gap: var(--size-100);
}
ion-icon {
  font-size: var(--size-400);
  color: var(--color-white-700);
}
ion-icon:hover {
  color: var(--color-white-900);
}
`;let qt=class extends v{static get styles(){return[J,L,Vt]}render(){return N`
      <footer part="container">
        <st-section id="section" exportparts="container: section-container">
          <st-header layout="center">
            <h2 slot="heading">Contact</h2>
            <p slot="description">Irvine, CA</p>
          </st-header>
          <div class="social-icons">
            <a
              class="social-icon"
              href="mailto:seteramae@gmail.com?Subject=Hi!"
              target="_blank"
              title="mail"
            >
              <ion-icon name="mail"></ion-icon>
            </a>
            <a
              class="social-icon"
              href="https://www.linkedin.com/in/sean-teramae-b89486123/"
              target="_blank"
              title="linkedin"
            >
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a
              class="social-icon"
              href="https://github.com/kekupua"
              target="_blank"
              title="github"
            >
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </div>
        </st-section>
      </footer>
    `}};customElements.define("st-footer",qt);var Gt=A`
  :host {
    display: grid;
    gap: var(--size-200);
    max-width: 720px;
    text-align: left;
  }
  :host([layout='center']) {
    text-align: center;
    margin: 0 auto;
  }
`;class Jt extends v{constructor(){super(),this.layout="left"}static get properties(){return{layout:{type:String}}}static get styles(){return[J,L,Gt]}render(){return N`
      <slot class="st-text-accent st-text-200" name="subheading"></slot>
      <slot class="st-text-accent st-text-500" name="heading"></slot>
      <slot class="st-text" name="description"></slot>
    `}}customElements.define("st-header",Jt);var Kt=A`
  :host {
    background: var(--section-bg-1);
    position: sticky;
    top: 0;
    z-index: var(--z-index-nav);
  }
  :host([alignment='center']) {
    text-align: center;
  }
  :host([alignment='right']) {
    text-align: right;
  }
  ::slotted(*) {
    display: inline-block;
    padding: var(--size-200) var(--size-300);
    color: black;
  }
  ::slotted(*:hover) {
    color: var(--color-gray-200);
  }
`;class Zt extends v{static get properties(){return{alignment:{type:String}}}static get styles(){return[J,L,Kt]}render(){return N`
      <nav part="container">
        <slot class="st-text-accent st-text-100"></slot>
      </nav>
    `}}customElements.define("st-nav",Zt);var Qt=A`
  :host {
    --header-margin: var(--size-300);

    padding: var(--section-padding);
  }
  /* Container is used to constrain content on wide screens */
  [part='container'] {
    margin: auto;
    max-width: var(--section-max-width);
    width: 100%;
    text-align: left;
  }
  :host([type='secondary']) [part='container'] {
    background-color: gray;
  }
  :host([alignment='center']) [part='container'],
  :host([alignment='center']) [name='header']::slotted(*) {
    text-align: center;
  }
  :host([alignment='right']) [part='container'],
  :host([alignment='right']) [name='header']::slotted(*) {
    text-align: right;
  }

  [name='header']::slotted([slot='header']:last-of-type) {
    margin-bottom: var(--header-margin);
  }

  :not([name])::slotted(st-section) {
    --section-padding: 0;
  }
  :not([name])::slotted(st-section:not(:last-child)) {
    margin-bottom: var(--section-vertical-padding);
  }
`;class Xt extends v{static get properties(){return{alignment:{type:String},heading:{type:String},subheading:{type:String},description:{type:String}}}static get styles(){return[J,L,Qt]}render(){return N`
      <section part="container">
        <slot name="header"></slot>
        <slot class="st-text" part="default-content"></slot>
      </section>
    `}}customElements.define("st-section",Xt);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],es=z("code-xml",Yt);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ts=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],ss=z("github",ts);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],Ie=z("link",ns);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const is=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]],os=z("linkedin",is);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rs=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],Xe=z("mail",rs);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M9 21V9",key:"1oto5p"}]],Me=z("panels-top-left",as);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ls=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]],cs=z("server",ls),ds=""+new URL("qbHome-C6zrn5pd.png",import.meta.url).href,hs=`
  I am a passionate Senior Frontend Engineer with over 10 years of experience building scalable web applications. 
  My journey began with a curiosity for how things work on the web, which quickly evolved into a career dedicated to crafting intuitive and performant user experiences.
  I'm originally from Honolulu, Hawaii and I graduated from the University of Hawaii at Manoa. I currently am employed in Irvine, CA working on exciting web technologies at NVIDIA.
  
  When I'm not coding, I'm enjoying life with my wife and two dogs, experimenting with new cooking recipes, or playing some of my favorite games such as Marvel Snap.
  I believe in the power of continuous learning and am currently diving into the world of Generative AI.
`,ps=[{name:"React 18+",icon:r.jsx(es,{className:"w-5 h-5"}),category:"frontend"},{name:"TypeScript",icon:r.jsx(Me,{className:"w-5 h-5"}),category:"frontend"},{name:"Tailwind CSS",icon:r.jsx(Me,{className:"w-5 h-5"}),category:"frontend"},{name:"Node.js",icon:r.jsx(cs,{className:"w-5 h-5"}),category:"backend"}],us={projects:[{image:"/images/maple/victoria-sky.webp",localHref:"/maple/",heading:"Maple Fieldguide",description:"A nostalgic MapleStory Classic World reference: Warrior mobs, drop rarity, skills, equipment, quests, and training routes.",tags:["react","typescript","gaming","reference guide"]},{image:"/images/mortgage-home.svg",localHref:"/mortgage/",heading:"Room to Grow",description:"A calmer way to plan for home. Explore monthly housing costs, estimate upfront cash, and compare mortgage scenarios together.",tags:["react","typescript","finance","calculator"]},{image:"/images/eat-project.jpg",localHref:"/eat/",heading:"What Should We Eat?",description:"Find your next meal together. Discover nearby restaurants, explore the map, save a shortlist, or let a surprise pick decide.",tags:["react","typescript","Leaflet","OpenStreetMap","food"]},{image:"/images/recipesByGpt.png",routerLink:"/recipesByGpt",heading:"Recipes By GPT",description:"A collection of recipes that I have made and have been designed by AI. Love a good meal!",tags:["web","react","typescript","API","AI","food"]},{image:"/images/snapchatLogo.png",href:"https://forbusiness.snapchat.com/",heading:"Snapchat BizX",subheading:"2022 - Present",description:"Meticulous design documentation, well-polished React views, a GraphQL-driven Java backend, and seamless integration with continuous deployment processes.",tags:["web","react","design","typescript","web components","API","GraphQL","java"]},{image:"/images/randomHearthstoneLogo.jpg",routerLink:"/random-hearthstone",heading:"Random Hearthstone Card",subheading:"2021",description:"Designed a service for fetching random Hearthstone cards.",tags:["web","react","design","javascript","web components","API","cache"]},{image:"https://bnetcmsus-a.akamaihd.net/cms/blog_header/0v/0VK49FWI9ERR1607483275276.jpg",href:"https://diabloimmortal.com/en-us/",heading:"Diablo Immortal",subheading:"2020",description:"Developed a service to simplify development and CI/CD of the Diablo Immortal website.",tags:["web","react","design","javascript"]},{image:"https://wallpapercave.com/wp/wp5314393.jpg",href:"https://playwarcraft3.com/en-us/",heading:"Warcraft III Reforged",subheading:"October 2019",description:"Developed a service to simplify development and CI/CD of the Warcraft III Reforged website.",tags:["web","react","design","javascript"]},{image:"https://cdn.wccftech.com/wp-content/uploads/2018/10/wow-classic.jpg",href:"https://worldofwarcraft.com/en-us/wowclassic",heading:"World of Warcraft Classic",subheading:"August 2019",description:"Developed a service to simplify development and CI/CD of the World of Warcraft Classic page.",tags:["web","react","design","javascript"]},{image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Unity_Technologies_logo.svg/1200px-Unity_Technologies_logo.svg.png",href:"https://docs.google.com/presentation/d/1Fq33iFpxeSOrHOFJPtdoQnsjSe66GE3GTr_Dzruenvg/edit?usp=sharing",heading:"Unity Game Development",subheading:"May 2019",description:"A Unity project integrated with Machine Learning to develop new and exciting mini games.",contain:!0,tags:["Unity","Native","Tensorflow","Machine Learning","University"]},{image:"https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Overwatch_League_logo.svg/1200px-Overwatch_League_logo.svg.png",href:"https://overwatchleague.com/en-us/",heading:"Overwatch League",subheading:"May 2018",description:"Returning as a 2nd year intern, I worked closely on the formation of the Overwatch League Franchise Website.",contain:!0,tags:["Web","React","Blizzard"]},{image:ds,href:"https://the-artists.github.io/",heading:"Questboards",subheading:"May 2018",description:"A project for helping connect users around the university campus to complete short-term jobs.",tags:["Web","React","Meteor","MongoDB"]},{image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.4vQcDh3AhM_ZLHZogJCzwgHaE8%26pid%3DApi&f=1",href:"https://github.com/kekupua/EE396/tree/master/tensorflow-for-poets-2",heading:"Rooms",subheading:"August 2017",description:"A machine learning application built on the Inception v3 Convolutional Neural Network for image recognition to gather classroom data.",tags:["Android Studio","Java","Tensorflow","Machine Learning"]},{image:"https://gameranx.com/wp-content/uploads/2016/03/Diablo-1024x640.jpg",href:"https://us.diablo3.com/en-us/",heading:"Diablo III Website",subheading:"May 2017",description:"As an intern, I contributed heavily to improvements for the Diablo III franchise website.",tags:["Web","Front-end","Blizzard"]}]};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var he=function(){return he=Object.assign||function(e){for(var t,s=1,n=arguments.length;s<n;s++){t=arguments[s];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},he.apply(this,arguments)};function ms(i,e){var t={};for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&e.indexOf(s)<0&&(t[s]=i[s]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(i);n<s.length;n++)e.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(i,s[n])&&(t[s[n]]=i[s[n]]);return t}var C="",B=null,K=null,Ye=null;function me(){C="",B!==null&&B.disconnect(),K!==null&&(window.clearTimeout(K),K=null)}function Pe(i){var e=["BUTTON","INPUT","SELECT","TEXTAREA"],t=["A","AREA"];return e.includes(i.tagName)&&!i.hasAttribute("disabled")||t.includes(i.tagName)&&i.hasAttribute("href")}function Re(){var i=null;if(C==="#")i=document.body;else{var e=C.replace("#","");i=document.getElementById(e),i===null&&C==="#top"&&(i=document.body)}if(i!==null){Ye(i);var t=i.getAttribute("tabindex");return t===null&&!Pe(i)&&i.setAttribute("tabindex",-1),i.focus({preventScroll:!0}),t===null&&!Pe(i)&&(i.blur(),i.removeAttribute("tabindex")),me(),!0}return!1}function gs(i){window.setTimeout(function(){Re()===!1&&(B===null&&(B=new MutationObserver(Re)),B.observe(document,{attributes:!0,childList:!0,subtree:!0}),K=window.setTimeout(function(){me()},i||1e4))},0)}function et(i){return le.forwardRef(function(e,t){var s="";typeof e.to=="string"&&e.to.includes("#")?s="#"+e.to.split("#").slice(1).join("#"):typeof e.to=="object"&&typeof e.to.hash=="string"&&(s=e.to.hash);var n={};i===Le&&(n.isActive=function(h,l){return h&&h.isExact&&l.hash===s});function o(h){me(),C=e.elementId?"#"+e.elementId:s,e.onClick&&e.onClick(h),C!==""&&!h.defaultPrevented&&h.button===0&&(!e.target||e.target==="_self")&&!(h.metaKey||h.altKey||h.ctrlKey||h.shiftKey)&&(Ye=e.scroll||function(l){return e.smooth?l.scrollIntoView({behavior:"smooth"}):l.scrollIntoView()},gs(e.timeout))}var a=ms(e,["scroll","smooth","timeout","elementId"]);return le.createElement(i,he({},n,a,{onClick:o,ref:t}),e.children)})}var tt=et(ct);et(Le);const fs=()=>r.jsxs("section",{className:"relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-50",children:[r.jsx("div",{className:"absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-30 animate-pulse"}),r.jsx("div",{className:"absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-300 rounded-full blur-3xl opacity-20"}),r.jsxs("div",{className:"container mx-auto px-6 relative z-10 text-center flex flex-col justify-center items-center gap-6",children:[r.jsx("div",{className:"inline-block px-3 py-1 mb-6 border border-brand-200 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold tracking-wide",children:"Senior Frontend Engineer"}),r.jsxs("h1",{className:"text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6",children:["Sean Teramae ",r.jsx("br",{className:"hidden md:block"}),r.jsx("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500",children:"Senior Software Engineer"})]}),r.jsx("p",{className:"text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed",children:"I craft high-performance web applications with modern technologies. Specializing in React ecosystem and intuitive UI/UX design."}),r.jsx("div",{className:"flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto",children:ps.map(i=>r.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-700 hover:border-brand-200 hover:shadow-md transition-all cursor-default",children:[r.jsx("span",{className:"text-brand-500",children:i.icon}),r.jsx("span",{className:"font-medium text-sm",children:i.name})]},i.name))}),r.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center items-center",children:[r.jsxs("a",{href:"mailto:seteramae@gmail.com",className:"flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 transform hover:-translate-y-1",children:[r.jsx(Xe,{className:"w-5 h-5"}),"Get in Touch"]}),r.jsxs(tt,{to:"/#projects",className:"flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-full font-semibold border border-slate-200 hover:border-brand-200 hover:bg-slate-50 transition-all",children:["View Projects",r.jsx(at,{className:"w-4 h-4"})]})]})]}),r.jsx("div",{className:"absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400",children:r.jsx(lt,{className:"w-6 h-6"})})]}),vs=()=>r.jsx("section",{id:"about",className:"py-24 bg-white text-left",children:r.jsx("div",{className:"container mx-auto px-6",children:r.jsxs("div",{className:"flex flex-col lg:flex-row items-center gap-16",children:[r.jsxs("div",{className:"w-full lg:w-1/2 relative group",children:[r.jsx("div",{className:"absolute inset-0 bg-brand-600 rounded-2xl transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"}),r.jsxs("div",{className:"relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]",children:[r.jsx("img",{src:"/images/sue_sean2.jpg",loading:"lazy",decoding:"async",alt:"Me and my wife",className:"w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"}),r.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6",children:r.jsx("p",{className:"text-white font-medium",children:"Myself and my wife, Sue"})})]})]}),r.jsxs("div",{className:"w-full lg:w-1/2 flex flex-col gap-2",children:[r.jsx("h2",{className:"text-sm font-bold text-brand-500 tracking-widest uppercase mb-3",children:"About Me"}),r.jsx("h3",{className:"text-3xl md:text-4xl font-bold text-slate-900 mb-6",children:"More than just code."}),r.jsx("div",{className:"space-y-4 text-lg text-slate-600 leading-relaxed flex flex-col gap-6",children:hs.split(`
`).map((i,e)=>i.trim()&&r.jsx("p",{children:i},e))}),r.jsx("div",{className:"mt-8 pt-8 border-t border-slate-100",children:r.jsxs("div",{className:"flex gap-8",children:[r.jsxs("div",{children:[r.jsx("span",{className:"block text-3xl font-bold text-brand-600",children:"10+"}),r.jsx("span",{className:"text-sm text-slate-500",children:"Years Exp."})]}),r.jsxs("div",{children:[r.jsx("span",{className:"block text-3xl font-bold text-brand-600",children:"100%"}),r.jsx("span",{className:"text-sm text-slate-500",children:"Commitment"})]}),r.jsxs("div",{children:[r.jsx("span",{className:"block text-3xl font-bold text-brand-600",children:"∞"}),r.jsx("span",{className:"text-sm text-slate-500",children:"Impact"})]})]})})]})]})})}),xs=()=>{const i=dt(),e=us.projects,t=s=>()=>{s.localHref?window.location.assign(s.localHref):s.routerLink?i(s.routerLink):s.href&&window.open(s.href,"_blank","noopener noreferrer")};return r.jsx("section",{id:"projects",className:"py-24 bg-slate-50",children:r.jsxs("div",{className:"container mx-auto px-6",children:[r.jsxs("div",{className:"text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4",children:[r.jsx("h2",{className:"text-sm font-bold text-brand-500 tracking-widest uppercase mb-3",children:"My Work"}),r.jsx("h3",{className:"text-3xl md:text-4xl font-bold text-slate-900 mb-4",children:"Featured Projects"}),r.jsx("p",{className:"text-slate-600 text-lg mt-4",children:"A selection of projects that demonstrate my technical expertise and problem-solving capabilities."})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:e.map(s=>r.jsxs("div",{className:"bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col cursor-pointer",onClick:t(s),children:[r.jsxs("div",{className:"relative h-48 overflow-hidden",children:[r.jsx("img",{src:s.image,loading:"lazy",decoding:"async",alt:s.heading,className:"w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"}),r.jsxs("div",{className:"absolute inset-0 bg-brand-900/80 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4",children:[s.localHref&&r.jsx("a",{className:"p-3 bg-white rounded-full text-brand-900 hover:bg-brand-50 transition-colors",href:s.localHref,"aria-label":`Open ${s.heading}`,onClick:n=>n.stopPropagation(),children:r.jsx(Ie,{className:"w-5 h-5"})}),s.routerLink&&r.jsx(tt,{className:"p-2 bg-white rounded-full text-brand-900 hover:bg-brand-50 transition-colors",to:s.routerLink,children:r.jsx(Ie,{className:"w-5 h-5"})}),s.href&&r.jsx("a",{className:"p-2 bg-white rounded-full text-brand-900 hover:bg-brand-50 transition-colors",href:s.href,target:"_blank",rel:"noopener noreferrer",children:r.jsx(mt,{className:"w-5 h-5"})})]})]}),r.jsxs("div",{className:"p-6 flex-1 flex flex-col gap-2",children:[r.jsx("h4",{className:"text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors",children:s.heading}),r.jsx("p",{className:"text-slate-600 mb-4 line-clamp-3 flex-1",title:s.description,children:s.description}),r.jsx("div",{className:"flex flex-wrap gap-2 mt-auto",children:s.tags.map(n=>r.jsx("span",{className:"px-2 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-md",children:n},n))})]})]},s.heading))})]})})},bs=()=>r.jsxs(le.Fragment,{children:[r.jsx(fs,{}),r.jsx(vs,{}),r.jsx(xs,{})]});function ys(){const[i,e]=y.useState(""),[t,s]=y.useState(!1);async function n(o=!1){s(!0);const a=await it(o?"CLEAR_PROJECT_CACHE":"CACHE_STATUS");e(a.ok?o?"Downloaded project files cleared. Reopen projects online to save them again.":`${((a.bytes||0)/1024/1024).toFixed(1)} MB of downloaded project files saved.`:"Offline storage is unavailable in this browser."),s(!1)}return r.jsxs("details",{className:"mt-8 text-left text-sm text-slate-300 max-w-xl mx-auto",onToggle:o=>{o.currentTarget.open&&n()},children:[r.jsx("summary",{className:"cursor-pointer font-semibold",children:"Install & offline storage"}),r.jsxs("div",{className:"mt-4 space-y-3",children:[r.jsx("p",{children:"On iPhone, open this site in Safari, tap Share, then Add to Home Screen. On Android, choose Install app or Add to Home screen from your browser menu."}),r.jsx("p",{children:"Projects download as you open them. Saved files may be removed to free up space. Online services still need a connection."}),r.jsx("p",{children:"Clear downloaded project files below to free space. Your saved preferences and the portfolio home stay on this device. This also clears Little Wonders downloads."}),r.jsx("button",{type:"button",disabled:t,onClick:()=>void n(!0),className:"border border-slate-500 rounded px-3 py-2 disabled:opacity-50",children:"Clear downloaded project files"}),r.jsx("p",{role:"status","aria-live":"polite",children:i})]})]})}const $s=()=>r.jsx("footer",{className:"bg-slate-900 text-white py-12 border-t border-slate-800",children:r.jsxs("div",{className:"container mx-auto px-6",children:[r.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center gap-6",children:[r.jsxs("div",{className:"text-center md:text-left",children:[r.jsx("h3",{className:"text-2xl font-bold mb-1",children:"Sean Teramae"}),r.jsxs("p",{className:"text-slate-400 text-sm",children:["© ",new Date().getFullYear()," All rights reserved."]})]}),r.jsxs("div",{className:"flex gap-6",children:[r.jsx("a",{href:"https://www.linkedin.com/in/sean-teramae-b89486123/",className:"text-slate-400 hover:text-brand-300 transition-colors",children:r.jsx(os,{className:"w-6 h-6"})}),r.jsx("a",{href:"mailto:seteramae@gmail.com",className:"text-slate-400 hover:text-brand-300 transition-colors",children:r.jsx(Xe,{className:"w-6 h-6"})}),r.jsx("a",{href:"https://github.com/kekupua",className:"text-slate-400 hover:text-brand-300 transition-colors",children:r.jsx(ss,{className:"w-6 h-6"})})]})]}),r.jsx(ys,{})]})}),_s=y.lazy(()=>Y(()=>import("./HearthstoneRandomCard-BwDmNW84.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url)),As=y.lazy(()=>Y(()=>import("./RecipeListPage-Kbyw7tyO.js"),__vite__mapDeps([8,1,9,5,10,2,3,4,6]),import.meta.url).then(i=>({default:i.RecipeListPage}))),ws=y.lazy(()=>Y(()=>import("./RecipeDetailPage-m42z33SD.js"),__vite__mapDeps([11,1,9,10,5,3,4,6]),import.meta.url).then(i=>({default:i.RecipeDetailPage}))),js=y.lazy(()=>Y(()=>import("./MealPrepPage-BfADMV4m.js"),__vite__mapDeps([12,1,9,13,4,14]),import.meta.url).then(i=>({default:i.MealPrepPage})));class Ns extends y.Component{constructor(){super(...arguments);ge(this,"state",{failed:!1})}static getDerivedStateFromError(){return{failed:!0}}render(){return this.state.failed?r.jsxs("main",{className:"p-12",role:"alert",children:[r.jsx("h1",{className:"text-2xl font-bold",children:"This project could not load"}),r.jsx("p",{children:"Connect to the internet and reopen it to download its files."}),r.jsx("a",{href:"/",children:"Back to portfolio"})]}):this.props.children}}function zs(){const i=pt();return r.jsx(Ns,{children:r.jsx(y.Suspense,{fallback:r.jsx("p",{role:"status",className:"p-12",children:"Loading project…"}),children:r.jsxs(ut,{children:[r.jsx(U,{path:"/",element:r.jsx(bs,{})}),r.jsx(U,{path:"/random-hearthstone",element:r.jsx(_s,{})}),r.jsx(U,{path:"/recipesByGpt",element:r.jsx(As,{})}),r.jsx(U,{path:"/recipesByGpt/:id",element:r.jsx(ws,{})}),r.jsx(U,{path:"/meal-prep",element:r.jsx(js,{})})]})})},i.pathname)}const Ss=()=>r.jsxs("div",{className:"App",children:[r.jsx(ht,{children:r.jsx(zs,{})}),r.jsx($s,{})]}),ks=ot.createRoot(document.getElementById("root"));ks.render(r.jsx(y.StrictMode,{children:r.jsx(Ss,{})}));rt();export{tt as H};
