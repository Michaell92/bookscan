import{G as L,H as w,j as t,r as y,o as r,c as _,a as s,t as n,F,f as B,g as v,h as C,p as D,d as j}from"./vendor.778c391c.js";import{_ as I,u as x}from"./index.1439d68f.js";const S={setup(){const i=x(),h=L(),a=w({}),o=t(()=>i.apiKey),p=t(()=>`https://www.googleapis.com/books/v1/volumes/${h.params.id}?key=${o.value}`),u=t(()=>a.categories?a.categories.join(", "):""),l=t(()=>a.authors?a.authors.join(", "):""),g=t(()=>Math.floor(a.averageRating)),m=t(()=>`https://books.google.com/books?id=${h.params.id}&sitesec=reviews`),k=t(()=>a.imageLinks?a.imageLinks.thumbnail:""),f=t(()=>{let c=[];if(a.dimensions)for(const d in a.dimensions)c.push(`${d}: ${a.dimensions[d]}`);return c.join(", ")});async function b(){try{const d=await(await fetch(p.value)).json();console.log(d.volumeInfo),Object.assign(a,d.volumeInfo)}catch(c){console.log(c)}}return b(),{categoriesFinal:u,ratingFloor:g,authorsFinal:l,reviewLink:m,imageLink:k,dimensions:f,book:a}}},e=i=>(D("data-v-70ab9675"),i=i(),j(),i),N={class:"container"},A={id:"main"},H={id:"main-left"},M=["src","alt"],P=["innerHTML"],R={id:"info"},G={id:"rating",class:"card"},K={key:0,class:"rating font-s"},T=e(()=>s("span",{class:"span-lead"},"Average rating:",-1)),V=["href"],E=["href"],O={key:1,class:"font-s alt-rating"},q={id:"reviewLink",class:"card"},z=e(()=>s("span",{class:"spanLead"},"Google review:",-1)),J=["href"],Q={id:"author",class:"card"},U=e(()=>s("span",{class:"spanLead"},"Author:",-1)),W={id:"categories",class:"card"},X=e(()=>s("span",{class:"spanLead"},"Categories:",-1)),Y={id:"dimensions",class:"card"},Z=e(()=>s("span",{class:"spanLead"},"Dimensions:",-1)),$={id:"language",class:"card"},ss=e(()=>s("span",{class:"spanLead"},"Language:",-1)),os={id:"pageCount",class:"card"},as=e(()=>s("span",{class:"spanLead"},"Page Count:",-1)),ns={id:"publishedDate",class:"card"},es=e(()=>s("span",{class:"spanLead"},"Published date:",-1)),ts={id:"publisher",class:"card"},is=e(()=>s("span",{class:"spanLead"},"Publisher:",-1));function rs(i,h,a,o,p,u){const l=y("font-awesome-icon");return r(),_("div",N,[s("div",A,[s("div",H,[s("h2",null,n(o.book.title),1),s("img",{src:o.imageLink,alt:o.book.title},null,8,M)]),s("div",{id:"main-right",innerHTML:o.book.description},null,8,P)]),s("div",R,[s("div",G,[o.ratingFloor>0?(r(),_("div",K,[T,s("a",{href:o.reviewLink,target:"_blank",class:"stars"},[s("div",null,[(r(!0),_(F,null,B(o.ratingFloor,g=>(r(),v(l,{key:g,icon:"star"}))),128))]),o.book.averageRating>o.ratingFloor?(r(),v(l,{key:0,icon:"star-half-alt",style:{"margin-top":"-1px"}})):C("",!0)],8,V),s("a",{href:o.reviewLink,target:"_blank",id:"ratingNumber"},n(o.book.ratingsCount),9,E)])):(r(),_("span",O,"No reviews"))]),s("div",q,[z,s("a",{href:o.reviewLink,target:"_blank"},n(o.reviewLink),9,J)]),s("div",Q,[U,s("span",null,n(o.authorsFinal),1)]),s("div",W,[X,s("span",null,n(o.categoriesFinal),1)]),s("div",Y,[Z,s("span",null,n(o.dimensions),1)]),s("div",$,[ss,s("span",null,n(o.book.language),1)]),s("div",os,[as,s("span",null,n(o.book.pageCount),1)]),s("div",ns,[es,s("span",null,n(o.book.publishedDate),1)]),s("div",ts,[is,s("span",null,n(o.book.publisher),1)])])])}var ls=I(S,[["render",rs],["__scopeId","data-v-70ab9675"]]);export{ls as default};