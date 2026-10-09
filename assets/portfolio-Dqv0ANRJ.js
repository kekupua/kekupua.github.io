import{r as b,j as s,R as be,N as Qe,L as Xe,u as $t,a as _t,H as jt,b as At,c as q,d as kt}from"./client-CmeWf7bw.js";function et(o,e){e===void 0&&(e={});var t=e.insertAt;if(!(!o||typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",t==="top"&&n.firstChild?n.insertBefore(a,n.firstChild):n.appendChild(a),a.styleSheet?a.styleSheet.cssText=o:a.appendChild(document.createTextNode(o))}}var Nt=`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&display=swap');
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
`;et(Nt);var St=`h1,
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
`;et(St);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $e=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol(),Ae=new Map;let tt=class{constructor(e,t){if(this._$cssResult$=!0,t!==_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Ae.get(this.cssText);return $e&&e===void 0&&(Ae.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}};const zt=o=>new tt(typeof o=="string"?o:o+"",_e),S=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((n,a,i)=>n+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+o[i+1],o[0]);return new tt(t,_e)},Rt=(o,e)=>{$e?o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const n=document.createElement("style"),a=window.litNonce;a!==void 0&&n.setAttribute("nonce",a),n.textContent=t.cssText,o.appendChild(n)})},ke=$e?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return zt(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ue;const Ne=window.reactiveElementPolyfillSupport,ve={toAttribute(o,e){switch(e){case Boolean:o=o?"":null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},nt=(o,e)=>e!==o&&(e==e||o==o),me={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:nt};let T=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,n)=>{const a=this._$Eh(n,t);a!==void 0&&(this._$Eu.set(a,n),e.push(a))}),e}static createProperty(e,t=me){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const n=typeof e=="symbol"?Symbol():"__"+e,a=this.getPropertyDescriptor(e,n,t);a!==void 0&&Object.defineProperty(this.prototype,e,a)}}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(a){const i=this[e];this[t]=a,this.requestUpdate(e,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||me}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,n=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const a of n)this.createProperty(a,t[a])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const a of n)t.unshift(ke(a))}else e!==void 0&&t.push(ke(e));return t}static _$Eh(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ev=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Ep(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,n;((t=this._$Em)!==null&&t!==void 0?t:this._$Em=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)===null||n===void 0||n.call(e))}removeController(e){var t;(t=this._$Em)===null||t===void 0||t.splice(this._$Em.indexOf(e)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Rt(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Em)===null||e===void 0||e.forEach(t=>{var n;return(n=t.hostConnected)===null||n===void 0?void 0:n.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Em)===null||e===void 0||e.forEach(t=>{var n;return(n=t.hostDisconnected)===null||n===void 0?void 0:n.call(t)})}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$Eg(e,t,n=me){var a,i;const l=this.constructor._$Eh(e,n);if(l!==void 0&&n.reflect===!0){const h=((i=(a=n.converter)===null||a===void 0?void 0:a.toAttribute)!==null&&i!==void 0?i:ve.toAttribute)(t,n.type);this._$Ei=e,h==null?this.removeAttribute(l):this.setAttribute(l,h),this._$Ei=null}}_$AK(e,t){var n,a,i;const l=this.constructor,h=l._$Eu.get(e);if(h!==void 0&&this._$Ei!==h){const r=l.getPropertyOptions(h),c=r.converter,x=(i=(a=(n=c)===null||n===void 0?void 0:n.fromAttribute)!==null&&a!==void 0?a:typeof c=="function"?c:null)!==null&&i!==void 0?i:ve.fromAttribute;this._$Ei=h,this[h]=x(t,r.type),this._$Ei=null}}requestUpdate(e,t,n){let a=!0;e!==void 0&&(((n=n||this.constructor.getPropertyOptions(e)).hasChanged||nt)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),n.reflect===!0&&this._$Ei!==e&&(this._$ES===void 0&&(this._$ES=new Map),this._$ES.set(e,n))):a=!1),!this.isUpdatePending&&a&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((a,i)=>this[i]=a),this._$Et=void 0);let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(e=this._$Em)===null||e===void 0||e.forEach(a=>{var i;return(i=a.hostUpdate)===null||i===void 0?void 0:i.call(a)}),this.update(n)):this._$EU()}catch(a){throw t=!1,this._$EU(),a}t&&this._$AE(n)}willUpdate(e){}_$AE(e){var t;(t=this._$Em)===null||t===void 0||t.forEach(n=>{var a;return(a=n.hostUpdated)===null||a===void 0?void 0:a.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(e){return!0}update(e){this._$ES!==void 0&&(this._$ES.forEach((t,n)=>this._$Eg(n,this[n],t)),this._$ES=void 0),this._$EU()}updated(e){}firstUpdated(e){}};T.finalized=!0,T.elementProperties=new Map,T.elementStyles=[],T.shadowRootOptions={mode:"open"},Ne==null||Ne({ReactiveElement:T}),((ue=globalThis.reactiveElementVersions)!==null&&ue!==void 0?ue:globalThis.reactiveElementVersions=[]).push("1.0.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe;const ae=globalThis.trustedTypes,Se=ae?ae.createPolicy("lit-html",{createHTML:o=>o}):void 0,k=`lit$${(Math.random()+"").slice(9)}$`,st="?"+k,Et=`<${st}>`,U=document,ie=(o="")=>U.createComment(o),Z=o=>o===null||typeof o!="object"&&typeof o!="function",ot=Array.isArray,Mt=o=>{var e;return ot(o)||typeof((e=o)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ze=/-->/g,Re=/>/g,z=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Ee=/'/g,Me=/"/g,at=/^(?:script|style|textarea)$/i,B=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Te=new WeakMap,I=U.createTreeWalker(U,129,null,!1),Tt=(o,e)=>{const t=o.length-1,n=[];let a,i=e===2?"<svg>":"",l=V;for(let r=0;r<t;r++){const c=o[r];let x,d,m=-1,p=0;for(;p<c.length&&(l.lastIndex=p,d=l.exec(c),d!==null);)p=l.lastIndex,l===V?d[1]==="!--"?l=ze:d[1]!==void 0?l=Re:d[2]!==void 0?(at.test(d[2])&&(a=RegExp("</"+d[2],"g")),l=z):d[3]!==void 0&&(l=z):l===z?d[0]===">"?(l=a??V,m=-1):d[1]===void 0?m=-2:(m=l.lastIndex-d[2].length,x=d[1],l=d[3]===void 0?z:d[3]==='"'?Me:Ee):l===Me||l===Ee?l=z:l===ze||l===Re?l=V:(l=z,a=void 0);const v=l===z&&o[r+1].startsWith("/>")?" ":"";i+=l===V?c+Et:m>=0?(n.push(x),c.slice(0,m)+"$lit$"+c.slice(m)+k+v):c+k+(m===-2?(n.push(void 0),r):v)}const h=i+(o[t]||"<?>")+(e===2?"</svg>":"");return[Se!==void 0?Se.createHTML(h):h,n]};let ye=class it{constructor({strings:e,_$litType$:t},n){let a;this.parts=[];let i=0,l=0;const h=e.length-1,r=this.parts,[c,x]=Tt(e,t);if(this.el=it.createElement(c,n),I.currentNode=this.el.content,t===2){const d=this.el.content,m=d.firstChild;m.remove(),d.append(...m.childNodes)}for(;(a=I.nextNode())!==null&&r.length<h;){if(a.nodeType===1){if(a.hasAttributes()){const d=[];for(const m of a.getAttributeNames())if(m.endsWith("$lit$")||m.startsWith(k)){const p=x[l++];if(d.push(m),p!==void 0){const v=a.getAttribute(p.toLowerCase()+"$lit$").split(k),$=/([.?@])?(.*)/.exec(p);r.push({type:1,index:i,name:$[2],strings:v,ctor:$[1]==="."?It:$[1]==="?"?Lt:$[1]==="@"?Pt:re})}else r.push({type:6,index:i})}for(const m of d)a.removeAttribute(m)}if(at.test(a.tagName)){const d=a.textContent.split(k),m=d.length-1;if(m>0){a.textContent=ae?ae.emptyScript:"";for(let p=0;p<m;p++)a.append(d[p],ie()),I.nextNode(),r.push({type:2,index:++i});a.append(d[m],ie())}}}else if(a.nodeType===8)if(a.data===st)r.push({type:2,index:i});else{let d=-1;for(;(d=a.data.indexOf(k,d+1))!==-1;)r.push({type:7,index:i}),d+=k.length-1}i++}}static createElement(e,t){const n=U.createElement("template");return n.innerHTML=e,n}};function O(o,e,t=o,n){var a,i,l,h;if(e===B)return e;let r=n!==void 0?(a=t._$Cl)===null||a===void 0?void 0:a[n]:t._$Cu;const c=Z(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==c&&((i=r==null?void 0:r._$AO)===null||i===void 0||i.call(r,!1),c===void 0?r=void 0:(r=new c(o),r._$AT(o,t,n)),n!==void 0?((l=(h=t)._$Cl)!==null&&l!==void 0?l:h._$Cl=[])[n]=r:t._$Cu=r),r!==void 0&&(e=O(o,r._$AS(o,e.values),r,n)),e}let Ht=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:n},parts:a}=this._$AD,i=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:U).importNode(n,!0);I.currentNode=i;let l=I.nextNode(),h=0,r=0,c=a[0];for(;c!==void 0;){if(h===c.index){let x;c.type===2?x=new lt(l,l.nextSibling,this,e):c.type===1?x=new c.ctor(l,c.name,c.strings,this,e):c.type===6&&(x=new Ut(l,this,e)),this.v.push(x),c=a[++r]}h!==(c==null?void 0:c.index)&&(l=I.nextNode(),h++)}return i}m(e){let t=0;for(const n of this.v)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},lt=class rt{constructor(e,t,n,a){var i;this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=a,this._$Cg=(i=a==null?void 0:a.isConnected)===null||i===void 0||i}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=O(this,e,t),Z(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==B&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):Mt(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==y&&Z(this._$AH)?this._$AA.nextSibling.data=e:this.S(U.createTextNode(e)),this._$AH=e}T(e){var t;const{values:n,_$litType$:a}=e,i=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=ye.createElement(a.h,this.options)),a);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===i)this._$AH.m(n);else{const l=new Ht(i,this),h=l.p(this.options);l.m(n),this.S(h),this._$AH=l}}_$AC(e){let t=Te.get(e.strings);return t===void 0&&Te.set(e.strings,t=new ye(e)),t}M(e){ot(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,a=0;for(const i of e)a===t.length?t.push(n=new rt(this.A(ie()),this.A(ie()),this,this.options)):n=t[a],n._$AI(i),a++;a<t.length&&(this._$AR(n&&n._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,t);e&&e!==this._$AB;){const a=e.nextSibling;e.remove(),e=a}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},re=class{constructor(e,t,n,a,i){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,a){const i=this.strings;let l=!1;if(i===void 0)e=O(this,e,t,0),l=!Z(e)||e!==this._$AH&&e!==B,l&&(this._$AH=e);else{const h=e;let r,c;for(e=i[0],r=0;r<i.length-1;r++)c=O(this,h[n+r],t,r),c===B&&(c=this._$AH[r]),l||(l=!Z(c)||c!==this._$AH[r]),c===y?e=y:e!==y&&(e+=(c??"")+i[r+1]),this._$AH[r]=c}l&&!a&&this.k(e)}k(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},It=class extends re{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===y?void 0:e}},Lt=class extends re{constructor(){super(...arguments),this.type=4}k(e){e&&e!==y?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}},Pt=class extends re{constructor(e,t,n,a,i){super(e,t,n,a,i),this.type=5}_$AI(e,t=this){var n;if((e=(n=O(this,e,t,0))!==null&&n!==void 0?n:y)===B)return;const a=this._$AH,i=e===y&&a!==y||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,l=e!==y&&(a===y||i);i&&this.element.removeEventListener(this.name,this,a),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,n;typeof this._$AH=="function"?this._$AH.call((n=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&n!==void 0?n:this.element,e):this._$AH.handleEvent(e)}},Ut=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){O(this,e)}};const He=window.litHtmlPolyfillSupport;He==null||He(ye,lt),((pe=globalThis.litHtmlVersions)!==null&&pe!==void 0?pe:globalThis.litHtmlVersions=[]).push("2.0.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ge;const le=globalThis.trustedTypes,Ie=le?le.createPolicy("lit-html",{createHTML:o=>o}):void 0,N=`lit$${(Math.random()+"").slice(9)}$`,ct="?"+N,Bt=`<${ct}>`,D=document,J=(o="")=>D.createComment(o),Q=o=>o===null||typeof o!="object"&&typeof o!="function",dt=Array.isArray,Ot=o=>{var e;return dt(o)||typeof((e=o)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Le=/-->/g,Pe=/>/g,R=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Ue=/'/g,Be=/"/g,ht=/^(?:script|style|textarea)$/i,Dt=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),E=Dt(1),W=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),Oe=new WeakMap,Wt=(o,e,t)=>{var n,a;const i=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:e;let l=i._$litPart$;if(l===void 0){const h=(a=t==null?void 0:t.renderBefore)!==null&&a!==void 0?a:null;i._$litPart$=l=new ee(e.insertBefore(J(),h),h,void 0,t??{})}return l._$AI(o),l},L=D.createTreeWalker(D,129,null,!1),Ft=(o,e)=>{const t=o.length-1,n=[];let a,i=e===2?"<svg>":"",l=Y;for(let r=0;r<t;r++){const c=o[r];let x,d,m=-1,p=0;for(;p<c.length&&(l.lastIndex=p,d=l.exec(c),d!==null);)p=l.lastIndex,l===Y?d[1]==="!--"?l=Le:d[1]!==void 0?l=Pe:d[2]!==void 0?(ht.test(d[2])&&(a=RegExp("</"+d[2],"g")),l=R):d[3]!==void 0&&(l=R):l===R?d[0]===">"?(l=a??Y,m=-1):d[1]===void 0?m=-2:(m=l.lastIndex-d[2].length,x=d[1],l=d[3]===void 0?R:d[3]==='"'?Be:Ue):l===Be||l===Ue?l=R:l===Le||l===Pe?l=Y:(l=R,a=void 0);const v=l===R&&o[r+1].startsWith("/>")?" ":"";i+=l===Y?c+Bt:m>=0?(n.push(x),c.slice(0,m)+"$lit$"+c.slice(m)+N+v):c+N+(m===-2?(n.push(void 0),r):v)}const h=i+(o[t]||"<?>")+(e===2?"</svg>":"");return[Ie!==void 0?Ie.createHTML(h):h,n]};class X{constructor({strings:e,_$litType$:t},n){let a;this.parts=[];let i=0,l=0;const h=e.length-1,r=this.parts,[c,x]=Ft(e,t);if(this.el=X.createElement(c,n),L.currentNode=this.el.content,t===2){const d=this.el.content,m=d.firstChild;m.remove(),d.append(...m.childNodes)}for(;(a=L.nextNode())!==null&&r.length<h;){if(a.nodeType===1){if(a.hasAttributes()){const d=[];for(const m of a.getAttributeNames())if(m.endsWith("$lit$")||m.startsWith(N)){const p=x[l++];if(d.push(m),p!==void 0){const v=a.getAttribute(p.toLowerCase()+"$lit$").split(N),$=/([.?@])?(.*)/.exec(p);r.push({type:1,index:i,name:$[2],strings:v,ctor:$[1]==="."?qt:$[1]==="?"?Vt:$[1]==="@"?Yt:ce})}else r.push({type:6,index:i})}for(const m of d)a.removeAttribute(m)}if(ht.test(a.tagName)){const d=a.textContent.split(N),m=d.length-1;if(m>0){a.textContent=le?le.emptyScript:"";for(let p=0;p<m;p++)a.append(d[p],J()),L.nextNode(),r.push({type:2,index:++i});a.append(d[m],J())}}}else if(a.nodeType===8)if(a.data===ct)r.push({type:2,index:i});else{let d=-1;for(;(d=a.data.indexOf(N,d+1))!==-1;)r.push({type:7,index:i}),d+=N.length-1}i++}}static createElement(e,t){const n=D.createElement("template");return n.innerHTML=e,n}}function F(o,e,t=o,n){var a,i,l,h;if(e===W)return e;let r=n!==void 0?(a=t._$Cl)===null||a===void 0?void 0:a[n]:t._$Cu;const c=Q(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==c&&((i=r==null?void 0:r._$AO)===null||i===void 0||i.call(r,!1),c===void 0?r=void 0:(r=new c(o),r._$AT(o,t,n)),n!==void 0?((l=(h=t)._$Cl)!==null&&l!==void 0?l:h._$Cl=[])[n]=r:t._$Cu=r),r!==void 0&&(e=F(o,r._$AS(o,e.values),r,n)),e}class Gt{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:n},parts:a}=this._$AD,i=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:D).importNode(n,!0);L.currentNode=i;let l=L.nextNode(),h=0,r=0,c=a[0];for(;c!==void 0;){if(h===c.index){let x;c.type===2?x=new ee(l,l.nextSibling,this,e):c.type===1?x=new c.ctor(l,c.name,c.strings,this,e):c.type===6&&(x=new Kt(l,this,e)),this.v.push(x),c=a[++r]}h!==(c==null?void 0:c.index)&&(l=L.nextNode(),h++)}return i}m(e){let t=0;for(const n of this.v)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class ee{constructor(e,t,n,a){var i;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=a,this._$Cg=(i=a==null?void 0:a.isConnected)===null||i===void 0||i}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),Q(e)?e===w||e==null||e===""?(this._$AH!==w&&this._$AR(),this._$AH=w):e!==this._$AH&&e!==W&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):Ot(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==w&&Q(this._$AH)?this._$AA.nextSibling.data=e:this.S(D.createTextNode(e)),this._$AH=e}T(e){var t;const{values:n,_$litType$:a}=e,i=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=X.createElement(a.h,this.options)),a);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===i)this._$AH.m(n);else{const l=new Gt(i,this),h=l.p(this.options);l.m(n),this.S(h),this._$AH=l}}_$AC(e){let t=Oe.get(e.strings);return t===void 0&&Oe.set(e.strings,t=new X(e)),t}M(e){dt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,a=0;for(const i of e)a===t.length?t.push(n=new ee(this.A(J()),this.A(J()),this,this.options)):n=t[a],n._$AI(i),a++;a<t.length&&(this._$AR(n&&n._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,t);e&&e!==this._$AB;){const a=e.nextSibling;e.remove(),e=a}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class ce{constructor(e,t,n,a,i){this.type=1,this._$AH=w,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=w}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,a){const i=this.strings;let l=!1;if(i===void 0)e=F(this,e,t,0),l=!Q(e)||e!==this._$AH&&e!==W,l&&(this._$AH=e);else{const h=e;let r,c;for(e=i[0],r=0;r<i.length-1;r++)c=F(this,h[n+r],t,r),c===W&&(c=this._$AH[r]),l||(l=!Q(c)||c!==this._$AH[r]),c===w?e=w:e!==w&&(e+=(c??"")+i[r+1]),this._$AH[r]=c}l&&!a&&this.k(e)}k(e){e===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class qt extends ce{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===w?void 0:e}}class Vt extends ce{constructor(){super(...arguments),this.type=4}k(e){e&&e!==w?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class Yt extends ce{constructor(e,t,n,a,i){super(e,t,n,a,i),this.type=5}_$AI(e,t=this){var n;if((e=(n=F(this,e,t,0))!==null&&n!==void 0?n:w)===W)return;const a=this._$AH,i=e===w&&a!==w||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,l=e!==w&&(a===w||i);i&&this.element.removeEventListener(this.name,this,a),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,n;typeof this._$AH=="function"?this._$AH.call((n=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&n!==void 0?n:this.element,e):this._$AH.handleEvent(e)}}class Kt{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}}const De=window.litHtmlPolyfillSupport;De==null||De(X,ee),((ge=globalThis.litHtmlVersions)!==null&&ge!==void 0?ge:globalThis.litHtmlVersions=[]).push("2.0.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var fe,xe;class j extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const n=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=n.firstChild),n}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Wt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return W}}j.finalized=!0,j._$litElement$=!0,(fe=globalThis.litElementHydrateSupport)===null||fe===void 0||fe.call(globalThis,{LitElement:j});const We=globalThis.litElementPolyfillSupport;We==null||We({LitElement:j});((xe=globalThis.litElementVersions)!==null&&xe!==void 0?xe:globalThis.litElementVersions=[]).push("3.0.1");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=o=>o??y;var G=S`
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
`,Zt=S`
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
`;class Jt extends j{static get properties(){return{type:{type:String},label:{type:String},href:{type:String},icon:{type:String},trailingIcon:{attribute:"trailing-icon",type:Boolean}}}static get styles(){return[G,Zt]}render(){const e=E`<ion-icon part='icon' name="${this.icon}"></ion-icon>`;return E`
      <button part='container' href=${ut(this.href)}>
        ${this.icon&&!this.trailingIcon?e:null}
        <slot class="st-text"> ${this.label} </slot>
        ${this.icon&&this.trailingIcon?e:null}
      </button>
    `}}customElements.define("st-button",Jt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qt={ATTRIBUTE:1},Xt=o=>(...e)=>({_$litDirective$:o,values:e});class en{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tn=Xt(class extends en{constructor(o){var e;if(super(o),o.type!==Qt.ATTRIBUTE||o.name!=="class"||((e=o.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){var t,n;if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.et=new Set(o.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!(!((t=this.et)===null||t===void 0)&&t.has(i))&&this.st.add(i);return this.render(e)}const a=o.element.classList;this.st.forEach(i=>{i in e||(a.remove(i),this.st.delete(i))});for(const i in e){const l=!!e[i];l===this.st.has(i)||!((n=this.et)===null||n===void 0)&&n.has(i)||(l?(a.add(i),this.st.add(i)):(a.remove(i),this.st.delete(i)))}return B}});var te=S`
  :host {
    display: block;
  }
  :host,
  * {
    box-sizing: border-box;
  }
`,nn=S`
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
`;class sn extends j{static get properties(){return{image:{type:String},href:{type:String},heading:{type:String},subheading:{type:String},description:{type:String},static:{type:Boolean},contain:{type:Boolean}}}static get styles(){return[te,G,nn]}render(){const e={wide:this.wide};return E`
      <a class="link" href=${ut(this.href)}>
        <div
          id="container"
          part="container"
          class="${tn(e)}"
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
    `}}customElements.define("st-card",sn);var on=S`
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
`;let an=class extends j{static get styles(){return[te,G,on]}render(){return E`
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
    `}};customElements.define("st-footer",an);var ln=S`
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
`;let rn=class extends j{constructor(){super(),this.layout="left"}static get properties(){return{layout:{type:String}}}static get styles(){return[te,G,ln]}render(){return E`
      <slot class="st-text-accent st-text-200" name="subheading"></slot>
      <slot class="st-text-accent st-text-500" name="heading"></slot>
      <slot class="st-text" name="description"></slot>
    `}};customElements.define("st-header",rn);var cn=S`
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
`;class dn extends j{static get properties(){return{alignment:{type:String}}}static get styles(){return[te,G,cn]}render(){return E`
      <nav part="container">
        <slot class="st-text-accent st-text-100"></slot>
      </nav>
    `}}customElements.define("st-nav",dn);var hn=S`
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
`;class un extends j{static get properties(){return{alignment:{type:String},heading:{type:String},subheading:{type:String},description:{type:String}}}static get styles(){return[te,G,hn]}render(){return E`
      <section part="container">
        <slot name="header"></slot>
        <slot class="st-text" part="default-content"></slot>
      </section>
    `}}customElements.define("st-section",un);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),pn=o=>o.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),Fe=o=>{const e=pn(o);return e.charAt(0).toUpperCase()+e.slice(1)},mt=(...o)=>o.filter((e,t,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===t).join(" ").trim(),gn=o=>{for(const e in o)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var fn={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xn=b.forwardRef(({color:o="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:n,className:a="",children:i,iconNode:l,...h},r)=>b.createElement("svg",{ref:r,...fn,width:e,height:e,stroke:o,strokeWidth:n?Number(t)*24/Number(e):t,className:mt("lucide",a),...!i&&!gn(h)&&{"aria-hidden":"true"},...h},[...l.map(([c,x])=>b.createElement(c,x)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(o,e)=>{const t=b.forwardRef(({className:n,...a},i)=>b.createElement(xn,{ref:i,iconNode:e,className:mt(`lucide-${mn(Fe(o))}`,`lucide-${o}`,n),...a}));return t.displayName=Fe(o),t};/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bn=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],vn=C("arrow-right",bn);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],wn=C("check",yn);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cn=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],$n=C("chevron-down",Cn);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _n=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}]],jn=C("clipboard",_n);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const An=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],kn=C("code-xml",An);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nn=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],Sn=C("download",Nn);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zn=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],Rn=C("external-link",zn);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const En=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],Mn=C("github",En);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tn=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],Hn=C("link",Tn);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const In=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]],Ln=C("linkedin",In);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pn=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],pt=C("mail",Pn);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Un=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M9 21V9",key:"1oto5p"}]],Ge=C("panels-top-left",Un);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bn=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],On=C("search",Bn);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dn=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]],Wn=C("server",Dn);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fn=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],Gn=C("shopping-cart",Fn),qn=""+new URL("qbHome-C6zrn5pd.png",import.meta.url).href,Vn=`
  I am a passionate Senior Frontend Engineer with over 10 years of experience building scalable web applications. 
  My journey began with a curiosity for how things work on the web, which quickly evolved into a career dedicated to crafting intuitive and performant user experiences.
  I'm originally from Honolulu, Hawaii and I graduated from the University of Hawaii at Manoa. I currently am employed in Irvine, CA working on exciting web technologies at NVIDIA.
  
  When I'm not coding, I'm enjoying life with my wife and two dogs, experimenting with new cooking recipes, or playing some of my favorite games such as Marvel Snap.
  I believe in the power of continuous learning and am currently diving into the world of Generative AI.
`,Yn=[{name:"React 18+",icon:s.jsx(kn,{className:"w-5 h-5"}),category:"frontend"},{name:"TypeScript",icon:s.jsx(Ge,{className:"w-5 h-5"}),category:"frontend"},{name:"Tailwind CSS",icon:s.jsx(Ge,{className:"w-5 h-5"}),category:"frontend"},{name:"Node.js",icon:s.jsx(Wn,{className:"w-5 h-5"}),category:"backend"}],Kn={projects:[{image:"/images/recipesByGpt.png",routerLink:"/recipesByGpt",heading:"Recipes By GPT",description:"A collection of recipes that I have made and have been designed by AI. Love a good meal!",tags:["web","react","typescript","API","AI","food"]},{image:"/images/snapchatLogo.png",href:"https://forbusiness.snapchat.com/",heading:"Snapchat BizX",subheading:"2022 - Present",description:"Meticulous design documentation, well-polished React views, a GraphQL-driven Java backend, and seamless integration with continuous deployment processes.",tags:["web","react","design","typescript","web components","API","GraphQL","java"]},{image:"/images/randomHearthstoneLogo.jpg",routerLink:"/random-hearthstone",heading:"Random Hearthstone Card",subheading:"2021",description:"Designed a service for fetching random Hearthstone cards.",tags:["web","react","design","javascript","web components","API","cache"]},{image:"https://bnetcmsus-a.akamaihd.net/cms/blog_header/0v/0VK49FWI9ERR1607483275276.jpg",href:"https://diabloimmortal.com/en-us/",heading:"Diablo Immortal",subheading:"2020",description:"Developed a service to simplify development and CI/CD of the Diablo Immortal website.",tags:["web","react","design","javascript"]},{image:"https://wallpapercave.com/wp/wp5314393.jpg",href:"https://playwarcraft3.com/en-us/",heading:"Warcraft III Reforged",subheading:"October 2019",description:"Developed a service to simplify development and CI/CD of the Warcraft III Reforged website.",tags:["web","react","design","javascript"]},{image:"https://cdn.wccftech.com/wp-content/uploads/2018/10/wow-classic.jpg",href:"https://worldofwarcraft.com/en-us/wowclassic",heading:"World of Warcraft Classic",subheading:"August 2019",description:"Developed a service to simplify development and CI/CD of the World of Warcraft Classic page.",tags:["web","react","design","javascript"]},{image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Unity_Technologies_logo.svg/1200px-Unity_Technologies_logo.svg.png",href:"https://docs.google.com/presentation/d/1Fq33iFpxeSOrHOFJPtdoQnsjSe66GE3GTr_Dzruenvg/edit?usp=sharing",heading:"Unity Game Development",subheading:"May 2019",description:"A Unity project integrated with Machine Learning to develop new and exciting mini games.",contain:!0,tags:["Unity","Native","Tensorflow","Machine Learning","University"]},{image:"https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Overwatch_League_logo.svg/1200px-Overwatch_League_logo.svg.png",href:"https://overwatchleague.com/en-us/",heading:"Overwatch League",subheading:"May 2018",description:"Returning as a 2nd year intern, I worked closely on the formation of the Overwatch League Franchise Website.",contain:!0,tags:["Web","React","Blizzard"]},{image:qn,href:"https://the-artists.github.io/",heading:"Questboards",subheading:"May 2018",description:"A project for helping connect users around the university campus to complete short-term jobs.",tags:["Web","React","Meteor","MongoDB"]},{image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.4vQcDh3AhM_ZLHZogJCzwgHaE8%26pid%3DApi&f=1",href:"https://github.com/kekupua/EE396/tree/master/tensorflow-for-poets-2",heading:"Rooms",subheading:"August 2017",description:"A machine learning application built on the Inception v3 Convolutional Neural Network for image recognition to gather classroom data.",tags:["Android Studio","Java","Tensorflow","Machine Learning"]},{image:"https://gameranx.com/wp-content/uploads/2016/03/Diablo-1024x640.jpg",href:"https://us.diablo3.com/en-us/",heading:"Diablo III Website",subheading:"May 2017",description:"As an intern, I contributed heavily to improvements for the Diablo III franchise website.",tags:["Web","Front-end","Blizzard"]}]};/*! *****************************************************************************
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
***************************************************************************** */var we=function(){return we=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},we.apply(this,arguments)};function Zn(o,e){var t={};for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&e.indexOf(n)<0&&(t[n]=o[n]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(o);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(o,n[a])&&(t[n[a]]=o[n[a]]);return t}var P="",K=null,oe=null,gt=null;function je(){P="",K!==null&&K.disconnect(),oe!==null&&(window.clearTimeout(oe),oe=null)}function qe(o){var e=["BUTTON","INPUT","SELECT","TEXTAREA"],t=["A","AREA"];return e.includes(o.tagName)&&!o.hasAttribute("disabled")||t.includes(o.tagName)&&o.hasAttribute("href")}function Ve(){var o=null;if(P==="#")o=document.body;else{var e=P.replace("#","");o=document.getElementById(e),o===null&&P==="#top"&&(o=document.body)}if(o!==null){gt(o);var t=o.getAttribute("tabindex");return t===null&&!qe(o)&&o.setAttribute("tabindex",-1),o.focus({preventScroll:!0}),t===null&&!qe(o)&&(o.blur(),o.removeAttribute("tabindex")),je(),!0}return!1}function Jn(o){window.setTimeout(function(){Ve()===!1&&(K===null&&(K=new MutationObserver(Ve)),K.observe(document,{attributes:!0,childList:!0,subtree:!0}),oe=window.setTimeout(function(){je()},o||1e4))},0)}function ft(o){return be.forwardRef(function(e,t){var n="";typeof e.to=="string"&&e.to.includes("#")?n="#"+e.to.split("#").slice(1).join("#"):typeof e.to=="object"&&typeof e.to.hash=="string"&&(n=e.to.hash);var a={};o===Qe&&(a.isActive=function(h,r){return h&&h.isExact&&r.hash===n});function i(h){je(),P=e.elementId?"#"+e.elementId:n,e.onClick&&e.onClick(h),P!==""&&!h.defaultPrevented&&h.button===0&&(!e.target||e.target==="_self")&&!(h.metaKey||h.altKey||h.ctrlKey||h.shiftKey)&&(gt=e.scroll||function(r){return e.smooth?r.scrollIntoView({behavior:"smooth"}):r.scrollIntoView()},Jn(e.timeout))}var l=Zn(e,["scroll","smooth","timeout","elementId"]);return be.createElement(o,we({},a,l,{onClick:i,ref:t}),e.children)})}var M=ft(Xe);ft(Qe);const Qn=()=>s.jsxs("section",{className:"relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-50",children:[s.jsx("div",{className:"absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-30 animate-pulse"}),s.jsx("div",{className:"absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-300 rounded-full blur-3xl opacity-20"}),s.jsxs("div",{className:"container mx-auto px-6 relative z-10 text-center flex flex-col justify-center items-center gap-6",children:[s.jsx("div",{className:"inline-block px-3 py-1 mb-6 border border-brand-200 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold tracking-wide",children:"Senior Frontend Engineer"}),s.jsxs("h1",{className:"text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6",children:["Sean Teramae ",s.jsx("br",{className:"hidden md:block"}),s.jsx("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500",children:"Senior Software Engineer"})]}),s.jsx("p",{className:"text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed",children:"I craft high-performance web applications with modern technologies. Specializing in React ecosystem and intuitive UI/UX design."}),s.jsx("div",{className:"flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto",children:Yn.map(o=>s.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-700 hover:border-brand-200 hover:shadow-md transition-all cursor-default",children:[s.jsx("span",{className:"text-brand-500",children:o.icon}),s.jsx("span",{className:"font-medium text-sm",children:o.name})]},o.name))}),s.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center items-center",children:[s.jsxs("a",{href:"mailto:seteramae@gmail.com",className:"flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 transform hover:-translate-y-1",children:[s.jsx(pt,{className:"w-5 h-5"}),"Get in Touch"]}),s.jsxs(M,{to:"/#projects",className:"flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-full font-semibold border border-slate-200 hover:border-brand-200 hover:bg-slate-50 transition-all",children:["View Projects",s.jsx(vn,{className:"w-4 h-4"})]})]})]}),s.jsx("div",{className:"absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400",children:s.jsx($n,{className:"w-6 h-6"})})]}),Xn=()=>s.jsx("section",{id:"about",className:"py-24 bg-white text-left",children:s.jsx("div",{className:"container mx-auto px-6",children:s.jsxs("div",{className:"flex flex-col lg:flex-row items-center gap-16",children:[s.jsxs("div",{className:"w-full lg:w-1/2 relative group",children:[s.jsx("div",{className:"absolute inset-0 bg-brand-600 rounded-2xl transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"}),s.jsxs("div",{className:"relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]",children:[s.jsx("img",{src:"/images/sue_sean2.jpg",alt:"Me and my wife",className:"w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"}),s.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6",children:s.jsx("p",{className:"text-white font-medium",children:"Myself and my wife, Sue"})})]})]}),s.jsxs("div",{className:"w-full lg:w-1/2 flex flex-col gap-2",children:[s.jsx("h2",{className:"text-sm font-bold text-brand-500 tracking-widest uppercase mb-3",children:"About Me"}),s.jsx("h3",{className:"text-3xl md:text-4xl font-bold text-slate-900 mb-6",children:"More than just code."}),s.jsx("div",{className:"space-y-4 text-lg text-slate-600 leading-relaxed flex flex-col gap-6",children:Vn.split(`
`).map((o,e)=>o.trim()&&s.jsx("p",{children:o},e))}),s.jsx("div",{className:"mt-8 pt-8 border-t border-slate-100",children:s.jsxs("div",{className:"flex gap-8",children:[s.jsxs("div",{children:[s.jsx("span",{className:"block text-3xl font-bold text-brand-600",children:"10+"}),s.jsx("span",{className:"text-sm text-slate-500",children:"Years Exp."})]}),s.jsxs("div",{children:[s.jsx("span",{className:"block text-3xl font-bold text-brand-600",children:"100%"}),s.jsx("span",{className:"text-sm text-slate-500",children:"Commitment"})]}),s.jsxs("div",{children:[s.jsx("span",{className:"block text-3xl font-bold text-brand-600",children:"∞"}),s.jsx("span",{className:"text-sm text-slate-500",children:"Impact"})]})]})})]})]})})}),es=()=>{const o=$t(),e=Kn.projects,t=n=>()=>{n.routerLink?o(n.routerLink):n.href&&window.open(n.href,"_blank","noopener noreferrer")};return s.jsx("section",{id:"projects",className:"py-24 bg-slate-50",children:s.jsxs("div",{className:"container mx-auto px-6",children:[s.jsxs("div",{className:"text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4",children:[s.jsx("h2",{className:"text-sm font-bold text-brand-500 tracking-widest uppercase mb-3",children:"My Work"}),s.jsx("h3",{className:"text-3xl md:text-4xl font-bold text-slate-900 mb-4",children:"Featured Projects"}),s.jsx("p",{className:"text-slate-600 text-lg mt-4",children:"A selection of projects that demonstrate my technical expertise and problem-solving capabilities."})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:e.map(n=>s.jsxs("div",{className:"bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col cursor-pointer",onClick:t(n),children:[s.jsxs("div",{className:"relative h-48 overflow-hidden",children:[s.jsx("img",{src:n.image,alt:n.heading,className:"w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"}),s.jsxs("div",{className:"absolute inset-0 bg-brand-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4",children:[n.routerLink&&s.jsx(M,{className:"p-2 bg-white rounded-full text-brand-900 hover:bg-brand-50 transition-colors",to:n.routerLink,children:s.jsx(Hn,{className:"w-5 h-5"})}),n.href&&s.jsx("a",{className:"p-2 bg-white rounded-full text-brand-900 hover:bg-brand-50 transition-colors",href:n.href,target:"_blank",rel:"noopener noreferrer",children:s.jsx(Rn,{className:"w-5 h-5"})})]})]}),s.jsxs("div",{className:"p-6 flex-1 flex flex-col gap-2",children:[s.jsx("h4",{className:"text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors",children:n.heading}),s.jsx("p",{className:"text-slate-600 mb-4 line-clamp-3 flex-1",title:n.description,children:n.description}),s.jsx("div",{className:"flex flex-wrap gap-2 mt-auto",children:n.tags.map(a=>s.jsx("span",{className:"px-2 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-md",children:a},a))})]})]},n.heading))})]})})},ts=()=>s.jsxs(be.Fragment,{children:[s.jsx(Qn,{}),s.jsx(Xn,{}),s.jsx(es,{})]}),ns=JSON.parse(`[{"id":1905,"name":"Perils in Paradise","slug":"perils-in-paradise","hyped":true,"type":"expansion","collectibleCount":183,"collectibleRevealedCount":183,"nonCollectibleCount":127,"nonCollectibleRevealedCount":123},{"id":1897,"name":"Whizbang's Workshop","slug":"whizbangs-workshop","hyped":false,"type":"expansion","collectibleCount":183,"collectibleRevealedCount":183,"nonCollectibleCount":97,"nonCollectibleRevealedCount":82},{"id":1941,"name":"Event","slug":"event","hyped":false,"type":"expansion","collectibleCount":12,"collectibleRevealedCount":12,"nonCollectibleCount":6,"nonCollectibleRevealedCount":0},{"id":1892,"name":"Showdown in the Badlands","slug":"showdown-in-the-badlands","hyped":false,"type":"expansion","collectibleCount":183,"collectibleRevealedCount":183,"nonCollectibleCount":90,"nonCollectibleRevealedCount":87},{"id":1858,"name":"TITANS","slug":"titans","hyped":false,"type":"expansion","collectibleCount":183,"collectibleRevealedCount":183,"nonCollectibleCount":168,"nonCollectibleRevealedCount":155},{"id":1809,"name":"Festival of Legends","slug":"festival-of-legends","hyped":false,"type":"expansion","collectibleCount":183,"collectibleRevealedCount":183,"nonCollectibleCount":75,"nonCollectibleRevealedCount":61},{"id":1898,"name":"Caverns of Time","slug":"caverns-of-time","hyped":false,"type":"","collectibleCount":147,"collectibleRevealedCount":147,"nonCollectibleCount":25,"nonCollectibleRevealedCount":23},{"id":1776,"name":"March of the Lich King","slug":"march-of-the-lich-king","hyped":false,"type":"expansion","collectibleCount":183,"collectibleRevealedCount":183,"nonCollectibleCount":137,"nonCollectibleRevealedCount":64},{"id":1869,"name":"Path of Arthas","slug":"path-of-arthas","hyped":false,"type":"","collectibleCount":26,"collectibleRevealedCount":26,"nonCollectibleCount":23,"nonCollectibleRevealedCount":4},{"id":1691,"name":"Murder at Castle Nathria","slug":"murder-at-castle-nathria","hyped":false,"type":"expansion","collectibleCount":170,"collectibleRevealedCount":170,"nonCollectibleCount":125,"nonCollectibleRevealedCount":53},{"id":1646,"name":"Classic Cards","slug":"classic-cards","hyped":false,"type":"","collectibleCount":382,"collectibleRevealedCount":382,"nonCollectibleCount":96,"nonCollectibleRevealedCount":63},{"id":1658,"name":"Voyage to the Sunken City","slug":"voyage-to-the-sunken-city","hyped":false,"type":"expansion","collectibleCount":170,"collectibleRevealedCount":170,"nonCollectibleCount":522,"nonCollectibleRevealedCount":78},{"id":1626,"name":"Fractured in Alterac Valley","slug":"fractured-in-alterac-valley","hyped":false,"type":"expansion","collectibleCount":170,"collectibleRevealedCount":170,"nonCollectibleCount":380,"nonCollectibleRevealedCount":107},{"id":1578,"name":"United in Stormwind","slug":"united-in-stormwind","hyped":false,"type":"expansion","collectibleCount":170,"collectibleRevealedCount":170,"nonCollectibleCount":317,"nonCollectibleRevealedCount":66},{"id":1525,"name":"Forged in the Barrens","slug":"forged-in-the-barrens","hyped":false,"type":"expansion","collectibleCount":170,"collectibleRevealedCount":170,"nonCollectibleCount":667,"nonCollectibleRevealedCount":82},{"id":1466,"name":"Madness at the Darkmoon Faire","slug":"madness-at-the-darkmoon-faire","hyped":false,"type":"expansion","collectibleCount":170,"collectibleRevealedCount":170,"nonCollectibleCount":359,"nonCollectibleRevealedCount":109},{"id":1443,"name":"Scholomance Academy","slug":"scholomance-academy","hyped":false,"type":"expansion","collectibleCount":135,"collectibleRevealedCount":135,"nonCollectibleCount":200,"nonCollectibleRevealedCount":62},{"id":1414,"name":"Ashes of Outland","slug":"ashes-of-outland","hyped":false,"type":"expansion","collectibleCount":135,"collectibleRevealedCount":135,"nonCollectibleCount":91,"nonCollectibleRevealedCount":55},{"id":1463,"name":"Demon Hunter Initiate","slug":"demonhunter-initiate","hyped":false,"type":"base","collectibleCount":20,"collectibleRevealedCount":20,"nonCollectibleCount":11,"nonCollectibleRevealedCount":3},{"id":1403,"name":"Galakrond’s Awakening","slug":"galakronds-awakening","hyped":false,"type":"adventure","collectibleCount":35,"collectibleRevealedCount":35,"nonCollectibleCount":12,"nonCollectibleRevealedCount":5},{"id":1347,"name":"Descent of Dragons","slug":"descent-of-dragons","hyped":false,"type":"expansion","collectibleCount":140,"collectibleRevealedCount":140,"nonCollectibleCount":61,"nonCollectibleRevealedCount":54},{"id":1158,"name":"Saviors of Uldum","slug":"saviors-of-uldum","hyped":false,"type":"expansion","collectibleCount":135,"collectibleRevealedCount":135,"nonCollectibleCount":50,"nonCollectibleRevealedCount":28},{"id":1130,"name":"Rise of Shadows","slug":"rise-of-shadows","hyped":false,"type":"expansion","collectibleCount":136,"collectibleRevealedCount":136,"nonCollectibleCount":55,"nonCollectibleRevealedCount":40},{"id":1129,"name":"Rastakhan’s Rumble","slug":"rastakhans-rumble","hyped":false,"type":"expansion","collectibleCount":135,"collectibleRevealedCount":135,"nonCollectibleCount":31,"nonCollectibleRevealedCount":27},{"id":1127,"name":"The Boomsday Project","slug":"the-boomsday-project","hyped":false,"type":"expansion","collectibleCount":136,"collectibleRevealedCount":136,"nonCollectibleCount":32,"nonCollectibleRevealedCount":25},{"id":1125,"name":"The Witchwood","slug":"the-witchwood","hyped":false,"type":"expansion","collectibleCount":135,"collectibleRevealedCount":135,"nonCollectibleCount":32,"nonCollectibleRevealedCount":26},{"id":1004,"name":"Kobolds and Catacombs","slug":"kobolds-and-catacombs","hyped":false,"type":"expansion","collectibleCount":135,"collectibleRevealedCount":135,"nonCollectibleCount":85,"nonCollectibleRevealedCount":75},{"id":1001,"name":"Knights of the Frozen Throne","slug":"knights-of-the-frozen-throne","hyped":false,"type":"expansion","collectibleCount":135,"collectibleRevealedCount":135,"nonCollectibleCount":127,"nonCollectibleRevealedCount":53},{"id":27,"name":"Journey to Un’Goro","slug":"journey-to-ungoro","hyped":false,"type":"expansion","collectibleCount":135,"collectibleRevealedCount":135,"nonCollectibleCount":57,"nonCollectibleRevealedCount":57},{"id":25,"name":"Mean Streets of Gadgetzan","slug":"mean-streets-of-gadgetzan","hyped":false,"type":"expansion","collectibleCount":132,"collectibleRevealedCount":132,"nonCollectibleCount":93,"nonCollectibleRevealedCount":84},{"id":23,"name":"One Night in Karazhan","slug":"one-night-in-karazhan","hyped":false,"type":"adventure","collectibleCount":45,"collectibleRevealedCount":45,"nonCollectibleCount":57,"nonCollectibleRevealedCount":55},{"id":21,"name":"Whispers of the Old Gods","slug":"whispers-of-the-old-gods","hyped":false,"type":"expansion","collectibleCount":134,"collectibleRevealedCount":134,"nonCollectibleCount":40,"nonCollectibleRevealedCount":26},{"id":20,"name":"League of Explorers","slug":"league-of-explorers","hyped":false,"type":"adventure","collectibleCount":45,"collectibleRevealedCount":45,"nonCollectibleCount":188,"nonCollectibleRevealedCount":15},{"id":15,"name":"The Grand Tournament","slug":"the-grand-tournament","hyped":false,"type":"expansion","collectibleCount":132,"collectibleRevealedCount":132,"nonCollectibleCount":27,"nonCollectibleRevealedCount":18},{"id":14,"name":"Blackrock Mountain","slug":"blackrock-mountain","hyped":false,"type":"adventure","collectibleCount":31,"collectibleRevealedCount":31,"nonCollectibleCount":175,"nonCollectibleRevealedCount":10},{"id":13,"name":"Goblins vs Gnomes","slug":"goblins-vs-gnomes","hyped":false,"type":"expansion","collectibleCount":123,"collectibleRevealedCount":123,"nonCollectibleCount":33,"nonCollectibleRevealedCount":20},{"id":12,"name":"Curse of Naxxramas","slug":"naxxramas","hyped":false,"type":"adventure","collectibleCount":30,"collectibleRevealedCount":30,"nonCollectibleCount":118,"nonCollectibleRevealedCount":114},{"id":1635,"name":"Legacy","slug":"legacy","aliasSetIds":[3,4],"hyped":false,"type":"","collectibleCount":450,"collectibleRevealedCount":445,"nonCollectibleCount":174,"nonCollectibleRevealedCount":127},{"id":1637,"name":"Core","slug":"core","hyped":false,"type":"","collectibleCount":291,"collectibleRevealedCount":291,"nonCollectibleCount":59,"nonCollectibleRevealedCount":12}]`),Ye=[{slug:"Pegasus",year:2024,svg:"https://images.blz-contentstack.com/v3/assets/bltc965041283bac56c/blt0136a847fd5a5b74/65c55bcddc7247cae3e8f320/PegasusSVG.svg",cardSets:[],name:"Year of the Pegasus",standard:!0,icon:"icon_cardset_yearofthePegasus"},{slug:"Wolf",year:2023,svg:"https://images.blz-contentstack.com/v3/assets/bltc965041283bac56c/blt436c5e93bf8faf2c/64079268ad9e38554653fb6b/YotW_SetIcon_Colored.svg",cardSets:[],name:"Year of the Wolf",standard:!0,icon:"icon_cardset_yearoftheWolf"},{slug:"hydra",year:2022,svg:"https://images.blz-contentstack.com/v3/assets/bltc965041283bac56c/blt63ce92e33c79ee7f/622902fe04503350d255bca6/YotH_SVG-01-01.svg",cardSets:["voyage-to-the-sunken-city"],name:"Year of the Hydra",standard:!0,icon:"icon_cardset_yearofthehydra"},{slug:"gryphon",year:2021,svg:"https://images.blz-contentstack.com/v3/assets/bltc965041283bac56c/bltd467577e4baabcf1/600740743e8106106f1bc575/year_icon_gryphon.svg",cardSets:["fractured-in-alterac-valley","united-in-stormwind","forged-in-the-barrens"],name:"Year of the Gryphon",standard:!1,icon:"icon_cardset_yearofthegryphon"},{slug:"phoenix",year:2020,svg:"https://images.blz-contentstack.com/v3/assets/bltc965041283bac56c/blt213931027a138c86/602700575e4a6c4d10dea67e/icon_year_phoenix.svg",cardSets:["madness-at-the-darkmoon-faire","scholomance-academy","ashes-of-outland"],name:"Year of the Phoenix",standard:!1,icon:"icon_cardset_yearofthephoenix"},{slug:"dragon",year:2019,svg:null,cardSets:["galakronds-awakening","descent-of-dragons","saviors-of-uldum","rise-of-shadows"],name:"Year of the Dragon",standard:!1,icon:"icon_cardset_yearofthedragon"},{slug:"raven",year:2018,svg:null,cardSets:["rastakhans-rumble","the-boomsday-project","the-witchwood"],name:"Year of the Raven",standard:!1,icon:"icon_cardset_yearoftheraven"},{slug:"mammoth",year:2017,svg:null,cardSets:["kobolds-and-catacombs","knights-of-the-frozen-throne","journey-to-ungoro"],name:"Year of the Mammoth",standard:!1,icon:"icon_cardset_yearofthemammoth"},{slug:"kraken",year:2016,svg:null,cardSets:["mean-streets-of-gadgetzan","one-night-in-karazhan","whispers-of-the-old-gods"],name:"Year of the Kraken",standard:!1,icon:"icon_cardset_yearofthekraken"},{slug:"classic",year:2015,svg:null,cardSets:["league-of-explorers","the-grand-tournament","blackrock-mountain","goblins-vs-gnomes","naxxramas"],name:"Years 1 & 2",standard:!1,yearRange:"2014-2015",icon:"icon_cardset_classic"},{slug:"standard",cardSets:["event","perils-in-paradise","whizbangs-workshop","showdown-in-the-badlands","titans","festival-of-legends","core"],name:"Standard Cards"},{slug:"wild",cardSets:["event","perils-in-paradise","caverns-of-time","whizbangs-workshop","showdown-in-the-badlands","path-of-arthas","titans","festival-of-legends","march-of-the-lich-king","murder-at-castle-nathria","voyage-to-the-sunken-city","core","legacy","fractured-in-alterac-valley","united-in-stormwind","forged-in-the-barrens","madness-at-the-darkmoon-faire","scholomance-academy","demonhunter-initiate","ashes-of-outland","galakronds-awakening","descent-of-dragons","saviors-of-uldum","rise-of-shadows","rastakhans-rumble","the-boomsday-project","the-witchwood","kobolds-and-catacombs","knights-of-the-frozen-throne","journey-to-ungoro","mean-streets-of-gadgetzan","one-night-in-karazhan","whispers-of-the-old-gods","league-of-explorers","the-grand-tournament","blackrock-mountain","goblins-vs-gnomes","naxxramas"],name:"Wild Cards"}],ss="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3e%3ctitle%3eStandard%3c/title%3e%3cpath%20d='M21.77,48.55A3.81,3.81,0,0,1,23.92,50l9.9-16.83A3.7,3.7,0,0,0,32,32.52a12.51,12.51,0,0,0-6.66,1.08l-8.7,15.16A12.57,12.57,0,0,1,21.77,48.55Z'%3e%3c/path%3e%3cpath%20d='M92.68,38.9H88.83s-3.34,0-3.44-2S85,31.81,85,31.81L89,26s1.73-2.53.92-4.15c0,0-.51-1.12-4.36-1.12H46.79a3.2,3.2,0,0,0-3,1.42c-1.12,1.73-26.24,44.07-26.24,44.07s-1.22,1.83,1,1.83l1.83-2.33,38.19,1.39s-1.67,3.19,1.82,8.74L24.5,74.74a24.07,24.07,0,0,1-3.88-2.36c-1.36-1.14-2.05-1.37-3-.23s-1.82,2.51-3.26,1.22-3.8-4.71-3.8-6.08,1.37-2.43,3.8-2.28A10.45,10.45,0,0,0,16.9,61.9l5.71-9.7c-1.6-1.51-6.12-.55-7.88-.09L8.59,62.81A5.48,5.48,0,0,0,7.17,69c1.42,4,2.84,7.39,5.17,8.1s4.36,1.12,5.47,0,1.32-1.82,2.33-.81a6.21,6.21,0,0,0,3.65,2.23c1.62.2,42.75,1.52,42.75,1.52a3.08,3.08,0,0,0,1.93-1.32c.71-1.11,24.21-36.37,24.21-36.37A3.12,3.12,0,0,0,92.68,38.9ZM50,51.16s-4.93.65-5.34-4,.81-10.36,2.63-13.4H65.73S57.57,48.52,50,51.16Zm13.91,23.6a2,2,0,0,1-1.42.81c-4.56-4.66-1.72-8.71-1.72-8.71a2.62,2.62,0,0,0,2.84-1.62L84,34.24a7.1,7.1,0,0,0,2.23,7.6S64.31,74.05,63.91,74.76Z'%3e%3c/path%3e%3cpath%20d='M35.39,30.49l4.46-7.57a1.9,1.9,0,0,0-1.47-2.86S33.72,19.35,32,22l-4.28,7.46C30,28.9,34,28.36,35.39,30.49Z'%3e%3c/path%3e%3c/svg%3e",os="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3e%3ctitle%3eWild%3c/title%3e%3cpath%20d='M97.48,50.62a17.91,17.91,0,0,0-3.25-8.74,1.26,1.26,0,0,1-.14-1.1c.89-2.48,2.4-5.93,2.17-6.72-.34-1.11-2.78-1-5,0a12.18,12.18,0,0,1-2.75.8,1.22,1.22,0,0,1-.84-.16c-4.11-2.35-11.86-3.37-17.3-2.42a12.4,12.4,0,0,0-1.69.44,1.25,1.25,0,0,1-1.26-.24c-2.1-1.89-5.26-4.49-6.61-4.42-2.11.11-1.44,4.89-1.33,7,0,.77.11,1.49.18,2.09a1.25,1.25,0,0,1-.48,1.14c-1.16.9-2.12,1.71-2.77,2.28a1.26,1.26,0,0,0-.14,1.76L61.08,48a1.26,1.26,0,0,0,1.78.13c2.56-2.25,9.87-8.11,15.73-7.48,7.22.77,9,7.77,9.22,10.66s-2.67,9.23-5.67,10.56S75.48,63,69.14,61,55.7,49.17,51.59,43.28,38.7,31.73,27.92,31.84l-.42,0c-1.27-2.35-4-7.45-4.13-8.47-.23-1.33-1.89-.88-3.34,1-1.17,1.54-3,6.07-3.4,10.75a1.29,1.29,0,0,1-.44.85A32.53,32.53,0,0,0,10,43.73a5.59,5.59,0,0,0-.5,1,1.28,1.28,0,0,1-1,.79l-3.22.31s-4.34.55-2.12,2.89c1.41,1.47,3.7,3,5.34,4.41A1.19,1.19,0,0,1,8.9,54a36,36,0,0,0,2.91,11c2.22,4.22,8.67,7.33,17.33,7.22a20.68,20.68,0,0,0,7.84-2,1.23,1.23,0,0,1,.94,0,8.83,8.83,0,0,1,2.22,1.28c2.23,1.78,4.23,3.67,5.89,3.67s2.67-4.22,1.34-7.33c-.31-.71-.6-1.37-.87-2a1.26,1.26,0,0,1,.41-1.52c.85-.62,1.54-1.15,2-1.52a1.27,1.27,0,0,0,.4-1.45,11.88,11.88,0,0,0-4.77-5.22,1.23,1.23,0,0,0-1.58.23c-3.61,4.11-10.41,7.55-14.59,7.45-4.45-.11-9.23-3.22-10.45-11.11s8.34-12.11,12-12S36.81,42.73,42,46.28,51.48,57.62,55.7,64c3.79,5.69,13.67,8.06,18.71,8.24a1.26,1.26,0,0,1,.84.36,25.5,25.5,0,0,0,4.45,3.73c2.22,1.23,4.56,1.67,5,0a65.07,65.07,0,0,1,1.48-6.69,1.24,1.24,0,0,1,.67-.7c2.53-1.16,4.69-2.47,5.63-3.72C94.81,62.06,97.7,56.28,97.48,50.62Z'%3e%3c/path%3e%3c/svg%3e",xt=({children:o,...e})=>{const t=e.className?`p-4 flex align-center flex-col justify-center gap-4 ${e.className}`:"p-4 flex align-center flex-col justify-center gap-4";return s.jsx("section",{...e,className:t,children:o})},bt=({children:o,...e})=>s.jsx("header",{className:"st-text-500",...e,children:o}),as=o=>{const e=o[Math.floor(Math.random()*o.length)];return ns.find(t=>t.slug===e)},Ke=async(o,e,t)=>{let n;return t?(n=await(await fetch(`/hearthstone/${o.slug}.json`)).json(),t({...e,[o.slug]:n})):n=e[o.slug],n.cards[Math.floor(Math.random()*n.cards.length)]},is=()=>{const[o,e]=b.useState({}),[t,n]=b.useState(""),[a,i]=b.useState({}),[l,h]=b.useState(window.localStorage.getItem("hrc-mode")||"wild"),[r,c]=b.useState(Ye.find(p=>p.slug===l).cardSets),x=b.useRef(null),d=async()=>{const p=as(r);n(p),o[p.slug]?i(await Ke(p,o)):i(await Ke(p,o,e))},m=p=>v=>{var $;if(p!==l){const ne=($=Ye.find(de=>de.slug===p))==null?void 0:$.cardSets;c(ne),h(p),window.localStorage.setItem("hrc-mode",p)}};return b.useEffect(()=>(d(),document.querySelector(".App").classList.add("isHearthstone"),()=>{document.querySelector(".App").classList.remove("isHearthstone")}),[]),b.useEffect(()=>{d()},[l]),s.jsxs(xt,{id:"main-section",className:"h-full w-full pt-20",children:[s.jsxs("div",{id:"card-section",ref:x,children:[s.jsxs("div",{className:"hs-controls",children:[s.jsx("st-button",{icon:"refresh",onClick:d}),s.jsxs("div",{className:"hs-sets",children:[s.jsx("button",{onClick:m("wild"),children:s.jsx("img",{src:os,className:`wild-set ${l==="wild"?"active":""}`})}),s.jsx("button",{onClick:m("standard"),children:s.jsx("img",{src:ss,className:`standard-set ${l==="standard"?"active":""}`})})]})]}),s.jsx("img",{src:a.image,alt:a.name,style:{maxWidth:"100%"}}),s.jsxs(bt,{layout:"center",children:[s.jsx("h2",{className:"st-text-400",children:t.name}),s.jsx("p",{className:"st-text-200",children:s.jsx("em",{children:a.flavorText})})]})]}),s.jsx(M,{to:"/",className:"text-brand-primary hover:underline mb-6 inline-block",children:"← Back to portfolio"})]})},H=[{id:"simple-mango-lassi",title:"Simple Mango Lassi",imageUrl:"/images/recipes/mangoLassi.png",description:"A refreshing and creamy mango yogurt drink, perfect for a hot day or as a sweet treat.",prepTime:"5 minutes",servings:"1-2",ingredients:[{name:"frozen mango cubes",amount:"1.5 cups"},{name:"plain yogurt",amount:"1 cup"},{name:"milk",amount:"½ cup"},{name:"sugar, honey, or agave",amount:"1-2 tbsp"},{name:"salt",amount:"a small pinch"},{name:"vanilla extract",amount:"a few drops"},{name:"ice cubes",amount:"optional"}],instructions:["Thaw mango slightly (optional): Let the frozen cubes sit for 5-10 minutes so they blend smoother.","Blend: Add mango, yogurt, milk, sweetener, salt, and vanilla (if using) into a blender.","Blend until smooth: Add more milk if you want it thinner, or more mango/yogurt if you want it thicker.","Taste and adjust: Add extra sweetness or a splash more milk if needed.","Serve immediately: Pour into a chilled glass."]},{id:"quick-bulgogi",title:"Quick Bulgogi",imageUrl:"/images/recipes/quickBulgogi.png",description:"A fast and flavorful Korean beef dish made with thinly sliced marinated beef, perfect for a weeknight dinner.",prepTime:"10 minutes",cookTime:"10 minutes",servings:"2-3",ingredients:[{name:"thinly sliced beef",amount:"~1 lb"},{name:"soy sauce",amount:"3 tbsp"},{name:"sugar or honey",amount:"1 tbsp"},{name:"sesame oil",amount:"1 tbsp"},{name:"minced garlic",amount:"2 tsp"},{name:"minced ginger",amount:"1 tsp"},{name:"mirin",amount:"1 tbsp"},{name:"onion",amount:"½ small"},{name:"green onion",amount:"1"},{name:"pear or apple",amount:"½ small"},{name:"sesame seeds",amount:"for garnish"}],instructions:["Marinate: In a bowl, mix soy sauce, sugar, sesame oil, garlic, ginger, mirin, and grated pear/apple. Add beef and sliced onion + green onion. Mix well. Let it sit for 10-15 minutes (or overnight for deeper flavor).","Cook: Heat a pan or skillet over medium-high heat. Add the beef mixture (no need for extra oil if it's fatty). Stir-fry for 5-7 minutes until browned and caramelized.","Finish: Sprinkle sesame seeds and a drizzle of sesame oil before serving.","Serve with steamed rice, kimchi, and lettuce leaves for wraps (ssam style).","You can also toss it into fried rice or top it on noodles for a fast meal."]},{id:"cajun-salmon",title:"Cajun Salmon",imageUrl:"/images/recipes/cajunSalmon.png",description:"A simple but incredible Cajun salmon recipe that hits all the right notes - smoky, spicy, buttery, and juicy inside with a perfect crust.",prepTime:"10 minutes",cookTime:"15 minutes",servings:"2-4",ingredients:[{name:"salmon fillets",amount:"2 (6-8 oz each)"},{name:"Cajun seasoning",amount:"1½ tbsp"},{name:"olive oil",amount:"1 tbsp"},{name:"butter",amount:"1 tbsp"},{name:"garlic",amount:"2 cloves"},{name:"lemon juice",amount:"1 tsp"},{name:"parsley or green onion",amount:"optional, for garnish"}],instructions:["Pat the salmon dry. This helps get a good sear. Then rub olive oil over both sides.","Coat with seasoning. Sprinkle Cajun seasoning evenly and press it in lightly.","Sear the salmon. Heat a skillet over medium-high heat. Once hot, add butter. When melted and sizzling, add the salmon (skin side down if using skin). Cook 4-5 minutes per side, depending on thickness, until it flakes easily and develops a golden crust.","Add garlic and lemon. In the last 30 seconds, toss minced garlic into the butter in the pan. Sauté just until fragrant, then drizzle lemon juice over the salmon.","Rest and serve. Garnish with chopped parsley or green onions. Serve with lemon wedges."]}],Ce=o=>s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,...o,children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),vt=o=>s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,...o,children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 13.5a5.995 5.995 0 00-3-5.197"})}),ls=()=>{const{id:o}=_t(),e=H.find(t=>t.id===o);return e?s.jsxs("div",{className:"max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-4 sm:p-8",children:[s.jsxs("div",{className:"flex flex-col items-center gap-4 mb-8",children:[s.jsx(M,{to:"/recipesByGpt",className:"text-brand-primary hover:underline mb-6 inline-block",children:"← Back to all recipes"}),s.jsx("h1",{className:"text-4xl sm:text-5xl font-extrabold text-text-primary mb-4",children:e.title}),s.jsx("p",{className:"text-lg text-text-secondary mb-8",children:e.description}),s.jsx("img",{src:e.imageUrl??"https://picsum.photos/800/600",alt:e.title,className:"w-full h-auto max-h-[500px] object-cover rounded-xl"})]}),s.jsxs("div",{className:"flex flex-wrap gap-6 justify-center bg-amber-50 rounded-xl p-6 mb-10 text-center",children:[s.jsxs("div",{className:"flex items-center gap-2 text-lg",children:[s.jsx(Ce,{className:"h-6 w-6 text-brand-primary"}),s.jsxs("div",{children:[s.jsx("span",{className:"font-bold block",children:"Prep Time"}),s.jsx("span",{children:e.prepTime})]})]}),e.cookTime&&s.jsxs("div",{className:"flex items-center gap-2 text-lg",children:[s.jsx(Ce,{className:"h-6 w-6 text-brand-primary"}),s.jsxs("div",{children:[s.jsx("span",{className:"font-bold block",children:"Cook Time"}),s.jsx("span",{children:e.cookTime})]})]}),s.jsxs("div",{className:"flex items-center gap-2 text-lg",children:[s.jsx(vt,{className:"h-6 w-6 text-brand-primary"}),s.jsxs("div",{children:[s.jsx("span",{className:"font-bold block",children:"Servings"}),s.jsxs("span",{children:[e.servings," people"]})]})]})]}),s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-10 text-left",children:[s.jsxs("div",{className:"md:col-span-1",children:[s.jsx("h2",{className:"text-3xl font-bold mb-4 border-b-4 border-brand-primary pb-2",children:"Ingredients"}),s.jsx("ul",{className:"list-disc list-inside space-y-2 text-text-secondary text-lg",children:e.ingredients.map(t=>s.jsxs("li",{children:[s.jsx("strong",{children:t.amount})," ",t.name]},t.name))})]}),s.jsxs("div",{className:"md:col-span-2",children:[s.jsx("h2",{className:"text-3xl font-bold mb-4 border-b-4 border-brand-secondary pb-2",children:"Instructions"}),s.jsx("ol",{className:"space-y-6 text-lg text-text-primary",children:e.instructions.map((t,n)=>s.jsxs("li",{className:"flex gap-4",children:[s.jsx("span",{className:"flex-shrink-0 bg-brand-secondary rounded-full h-8 w-8 flex items-center justify-center font-bold",children:n+1}),s.jsx("span",{className:"pt-0.5",children:t})]},n))})]})]})]}):s.jsxs("div",{className:"text-center py-20 gap-6 flex flex-col items-center",children:[s.jsx("h1",{className:"text-3xl font-bold mb-4",children:"Recipe not found!"}),s.jsx("p",{className:"text-text-secondary mb-8",children:"Sorry, we couldn't find the recipe you're looking for."}),s.jsx(M,{to:"/recipesByGpt",className:"bg-brand-primary font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors",children:"Back to Recipes"})]})},rs=({recipe:o})=>s.jsxs(Xe,{to:`/recipesByGpt/${o.id}`,className:"block group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl",children:[s.jsxs("div",{className:"relative",children:[s.jsx("img",{className:"w-full h-56 object-cover",src:o.imageUrl??"https://picsum.photos/500/600",alt:o.title}),s.jsx("div",{className:"absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"})]}),s.jsxs("div",{className:"p-6",children:[s.jsx("h2",{className:"text-2xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors duration-300",children:o.title}),s.jsx("p",{className:"text-text-secondary mb-4 h-20 overflow-hidden",children:o.description}),s.jsxs("div",{className:"flex justify-between items-center text-sm text-text-secondary border-t pt-4",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(Ce,{className:"h-5 w-5"}),s.jsx("span",{children:o.cookTime})]}),s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(vt,{className:"h-5 w-5"}),s.jsxs("span",{children:["Serves ",o.servings]})]})]})]})]}),cs=()=>s.jsxs(xt,{className:"animate-fade-in",children:[s.jsx(M,{to:"/",className:"text-brand-primary hover:underline mb-6 inline-block",children:"← Back to portfolio"}),s.jsxs(bt,{children:[s.jsx("h1",{children:"Our Recipe Collection"}),s.jsx("p",{className:"st-text-200",children:"Discover delicious, easy-to-follow recipes handcrafted with love. From weeknight dinners to special occasion feasts, find your next favorite meal here."})]}),s.jsx("div",{className:"mb-8 flex justify-end",children:s.jsx(M,{to:"/meal-prep",className:"rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-brand-700",children:"Plan my week →"})}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:H.map(o=>s.jsx(rs,{recipe:o},o.id))})]}),ds=()=>s.jsx("footer",{className:"bg-slate-900 text-white py-12 border-t border-slate-800",children:s.jsx("div",{className:"container mx-auto px-6",children:s.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center gap-6",children:[s.jsxs("div",{className:"text-center md:text-left",children:[s.jsx("h3",{className:"text-2xl font-bold mb-1",children:"Sean Teramae"}),s.jsxs("p",{className:"text-slate-400 text-sm",children:["© ",new Date().getFullYear()," All rights reserved."]})]}),s.jsxs("div",{className:"flex gap-6",children:[s.jsx("a",{href:"https://www.linkedin.com/in/sean-teramae-b89486123/",className:"text-slate-400 hover:text-brand-300 transition-colors",children:s.jsx(Ln,{className:"w-6 h-6"})}),s.jsx("a",{href:"mailto:seteramae@gmail.com",className:"text-slate-400 hover:text-brand-300 transition-colors",children:s.jsx(pt,{className:"w-6 h-6"})}),s.jsx("a",{href:"https://github.com/kekupua",className:"text-slate-400 hover:text-brand-300 transition-colors",children:s.jsx(Mn,{className:"w-6 h-6"})})]})]})})}),A=o=>o.toLowerCase().replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim().replace(/s$/,""),se=(o,e)=>{const t=o.ingredients.filter(n=>{const a=A(n.name);return[...e].some(i=>i===a||i.includes(a)||a.includes(i))}).length;return o.ingredients.length?t/o.ingredients.length:0},Ze=o=>o===1?"You have everything":o===0?"Nothing on hand":`${Math.round(o*100)}% on hand`,Je=o=>o===1?"bg-emerald-100 text-emerald-800 border-emerald-200":o>=.67?"bg-yellow-100 text-yellow-800 border-yellow-200":o>=.34?"bg-orange-100 text-orange-800 border-orange-200":o>0?"bg-red-100 text-red-800 border-red-200":"bg-red-200 text-red-900 border-red-300",hs=(o,e)=>{const t=new Map;return o.forEach(n=>{n.ingredients.forEach(a=>{const i=A(a.name),l=t.get(i);l?l.amounts.push(a.amount):t.set(i,{name:a.name,amounts:[a.amount]})})}),[...t.entries()].filter(([n])=>!e.has(n)).map(([,n])=>`- [ ] ${n.amounts.join(" + ")} ${n.name}`).join(`
`)},us=()=>{const[o,e]=b.useState([]),[t,n]=b.useState(""),[a,i]=b.useState(""),[l,h]=b.useState(new Set),[r,c]=b.useState(!1),x=b.useMemo(()=>{const u=new Map;return H.forEach(g=>{g.ingredients.forEach(f=>{const _=A(f.name);u.has(_)||u.set(_,f.name)})}),[...u.entries()].sort((g,f)=>g[1].localeCompare(f[1]))},[]),d=u=>{const g=A(u),f=new Set(v);f.has(g)?f.delete(g):f.add(g),n([...f].join(", "))},m=()=>n(""),p=b.useMemo(()=>H.filter(u=>o.includes(u.id)),[o]),v=b.useMemo(()=>new Set(t.split(/[,\n]/).map(A).filter(Boolean)),[t]),$=b.useMemo(()=>H.filter(u=>`${u.title} ${u.description}`.toLowerCase().includes(a.toLowerCase())),[a]),ne=b.useMemo(()=>hs(p,l),[p,l]),de=u=>{e(g=>g.includes(u)?g.filter(f=>f!==u):[...g,u]),h(new Set)},yt=u=>{const g=A(u);h(f=>{const _=new Set(f);return _.has(g)?_.delete(g):_.add(g),_})},wt=async()=>{await navigator.clipboard.writeText(ne||"No ingredients needed."),c(!0),window.setTimeout(()=>c(!1),1500)},Ct=()=>{const u=new Blob([`# Weekly Meal Prep

${ne||"- Nothing to buy!"}
`],{type:"text/markdown;charset=utf-8"}),g=URL.createObjectURL(u),f=document.createElement("a");f.href=g,f.download="meal-prep-grocery-list.md",f.click(),URL.revokeObjectURL(g)};return s.jsx("main",{className:"min-h-screen bg-slate-50 px-4 py-8 sm:px-6",children:s.jsxs("div",{className:"mx-auto max-w-7xl",children:[s.jsxs("div",{className:"mb-8",children:[s.jsx("a",{href:"#/recipesByGpt",className:"text-sm font-semibold text-brand-600 hover:underline",children:"← Recipe collection"}),s.jsx("h1",{className:"mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl",children:"Weekly Meal Prep"}),s.jsx("p",{className:"mx-auto! mt-3! max-w-3xl text-lg text-slate-600",children:"Pick the recipes you want, build one combined shopping list, or tell us what is already in your kitchen to see what you can make."})]}),s.jsxs("div",{className:"grid gap-8 lg:grid-cols-[1.35fr_0.65fr]",children:[s.jsxs("section",{className:"rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6",children:[s.jsxs("div",{className:"flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",children:[s.jsxs("div",{className:"flex flex-col gap-1 text-left",children:[s.jsx("h2",{className:"text-2xl font-bold text-slate-900",children:"Choose recipes"}),s.jsxs("p",{className:"mt-1 text-sm text-slate-500",children:[p.length," selected"]})]}),s.jsxs("label",{className:"relative block sm:w-64",children:[s.jsx(On,{className:"absolute left-3 top-2.5 h-5 w-5 text-slate-400"}),s.jsx("input",{value:a,onChange:u=>i(u.target.value),placeholder:"Search recipes...",className:"w-full rounded-xl border border-slate-300 py-2 pl-10 pr-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"})]})]}),s.jsx("div",{className:"mt-5 grid gap-4 sm:grid-cols-2",children:$.map(u=>{const g=o.includes(u.id),f=se(u,v);return s.jsxs("button",{type:"button",onClick:()=>de(u.id),className:`overflow-hidden rounded-2xl border text-left transition hover:-translate-y-0.5 hover:shadow-md ${g?"border-brand-500 ring-2 ring-brand-100":"border-slate-200"}`,children:[u.imageUrl&&s.jsx("img",{src:u.imageUrl,alt:"",className:"h-36 w-full object-cover"}),s.jsxs("div",{className:"p-4",children:[s.jsxs("div",{className:"flex items-start justify-between gap-3",children:[s.jsx("h3",{className:"font-bold text-slate-900",children:u.title}),g&&s.jsx("span",{className:"rounded-full bg-brand-600 p-1 text-white",children:s.jsx(wn,{className:"h-4 w-4"})})]}),s.jsx("p",{className:"mt-2 line-clamp-2 text-sm text-slate-500",children:u.description}),v.size>0&&s.jsx("span",{className:`mt-3 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${Je(f)}`,children:Ze(f)})]})]},u.id)})})]}),s.jsxs("section",{className:"rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6",children:[s.jsxs("div",{className:"flex flex-col gap-1 text-left",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(Gn,{className:"h-6 w-6 text-brand-600"}),s.jsx("h2",{className:"text-2xl font-bold text-slate-900",children:"Shopping list"})]}),s.jsx("p",{className:"mt-1 text-sm text-slate-500",children:"Combined ingredients from your selected recipes."})]}),p.length===0?s.jsx("div",{className:"mt-8 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500",children:"Select one or more recipes to build your list."}):s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"mt-5 space-y-2",children:Array.from(p.flatMap(u=>u.ingredients).reduce((u,g)=>{const f=A(g.name),_=u.get(f);return _?_.amounts.push(g.amount):u.set(f,{name:g.name,amounts:[g.amount]}),u},new Map).entries()).map(([u,g])=>s.jsxs("label",{className:"flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-slate-50",children:[s.jsx("input",{type:"checkbox",checked:l.has(u),onChange:()=>yt(g.name),className:"mt-1 h-4 w-4 rounded border-slate-300 text-brand-600"}),s.jsxs("span",{className:l.has(u)?"text-slate-400 line-through":"text-slate-700",children:[s.jsx("strong",{children:g.amounts.join(" + ")})," ",g.name]})]},u))}),s.jsxs("div",{className:"mt-5 grid grid-cols-2 gap-2",children:[s.jsxs("button",{type:"button",onClick:wt,className:"flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white hover:bg-slate-700",children:[s.jsx(jn,{className:"h-4 w-4"}),r?"Copied!":"Copy"]}),s.jsxs("button",{type:"button",onClick:Ct,className:"flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-brand-700",children:[s.jsx(Sn,{className:"h-4 w-4"}),"Export .md"]})]})]})]})]}),s.jsxs("section",{className:"mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6",children:[s.jsxs("div",{className:"flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",children:[s.jsxs("div",{className:"flex flex-col gap-1 text-left",children:[s.jsx("h2",{className:"text-2xl font-bold text-slate-900",children:"What can I make?"}),s.jsx("p",{className:"mt-1 text-sm text-slate-500",children:"Enter ingredients you already have, separated by commas or new lines."})]}),s.jsxs("div",{className:"flex gap-2 text-xs font-medium",children:[s.jsx("span",{className:"rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-800",children:"All"}),s.jsx("span",{className:"rounded-full bg-yellow-100 px-2.5 py-1 text-yellow-800",children:"Most"}),s.jsx("span",{className:"rounded-full bg-orange-100 px-2.5 py-1 text-orange-800",children:"Some"}),s.jsx("span",{className:"rounded-full bg-red-200 px-2.5 py-1 text-red-900",children:"None"})]})]}),s.jsxs("div",{className:"mt-4 flex flex-wrap gap-2",children:[x.map(([u,g])=>{const f=v.has(u);return s.jsx("button",{type:"button",onClick:()=>d(g),"aria-pressed":f,className:`rounded-full border px-3 py-1.5 text-sm font-medium transition ${f?"border-brand-600 bg-brand-600 text-white shadow-sm":"border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:bg-brand-50"}`,children:g},u)}),v.size>0&&s.jsx("button",{type:"button",onClick:m,className:"rounded-full px-3 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-100",children:"Clear all"})]}),s.jsx("textarea",{value:t,onChange:u=>n(u.target.value),placeholder:"beef, soy sauce, garlic, rice, eggs...",rows:3,className:"mt-4 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"}),s.jsx("div",{className:"mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:[...H].sort((u,g)=>se(g,v)-se(u,v)).map(u=>{const g=se(u,v);return s.jsxs("article",{className:`rounded-2xl border p-4 transition ${v.size?Je(g):"border-slate-200 bg-white"}`,children:[s.jsxs("div",{className:"flex items-start justify-between gap-3",children:[s.jsx("h3",{className:"font-bold",children:u.title}),s.jsx("span",{className:"whitespace-nowrap rounded-full bg-white/70 px-2 py-1 text-xs font-bold",children:v.size?Ze(g):null})]}),s.jsx("div",{className:"mt-3 h-2 overflow-hidden rounded-full bg-white/70",children:s.jsx("div",{className:"h-full rounded-full bg-current transition-all",style:{width:`${g*100}%`}})}),v.size>0&&s.jsxs("p",{className:"mt-2 text-xs",children:[u.ingredients.filter(f=>{const _=A(f.name);return[...v].some(he=>he===_||he.includes(_)||_.includes(he))}).length," ","of ",u.ingredients.length," ingredients available"]})]},u.id)})})]})]})})},ms=()=>s.jsxs("div",{className:"App",children:[s.jsx(jt,{children:s.jsxs(At,{children:[s.jsx(q,{path:"/",element:s.jsx(ts,{})}),s.jsx(q,{path:"/random-hearthstone",element:s.jsx(is,{})}),s.jsx(q,{path:"/recipesByGpt",element:s.jsx(cs,{})}),s.jsx(q,{path:"/recipesByGpt/:id",element:s.jsx(ls,{})}),s.jsx(q,{path:"/meal-prep",element:s.jsx(us,{})})]})}),s.jsx(ds,{})]}),ps=kt.createRoot(document.getElementById("root"));ps.render(s.jsx(b.StrictMode,{children:s.jsx(ms,{})}));
