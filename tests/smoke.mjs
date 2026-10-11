import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

const html = await readFile("index.html", "utf8");
const metas = [
 {id:"tt0111161",type:"movie",name:"Les Évadés",year:1994,genres:["Drame"],imdbRating:"9.3",poster:"https://images.example.test/evades.jpg",description:"Un banquier est emprisonné."},
 {id:"tt0903747",type:"series",name:"Breaking Bad",year:2008,genres:["Drame","Crime"],imdbRating:"9.5",poster:"https://images.example.test/breakingbad.jpg",description:"Un professeur de chimie change de vie."}
];
function createFetch({fail=false}={}) {
 const calls=[];
 const fetch=async input=>{
  const url=String(input);calls.push(url);
  if(fail)return {ok:false,status:503,json:async()=>({})};
  if(url.includes("/catalog/movie/top.json"))return {ok:true,status:200,json:async()=>({metas:[metas[0]]})};
  if(url.includes("/catalog/series/top.json"))return {ok:true,status:200,json:async()=>({metas:[metas[1]]})};
  return {ok:false,status:404,json:async()=>({})};
 };
 return {fetch,calls};
}
async function waitFor(test,description,timeout=2500){const start=Date.now();while(Date.now()-start<timeout){if(test())return;await new Promise(r=>setTimeout(r,20))}throw Error("Timeout: "+description)}
function load(fetcher){const dom=new JSDOM(html,{url:"https://mansstyle59.github.io/voyo-streaming/",runScripts:"dangerously",pretendToBeVisual:true,beforeParse(w){w.fetch=fetcher;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};}});const errors=[];dom.window.addEventListener("error",e=>errors.push(e.message));return {dom,errors}}
{
 const mock=createFetch(),{dom,errors}=load(mock.fetch),doc=dom.window.document;
 await waitFor(()=>doc.querySelector("#sections .poster"),"real catalog cards should render");
 assert.match(doc.querySelector("#status").textContent,/1 films et 1 séries chargés/);
 assert.match(doc.querySelector("#sections").textContent,/Les Évadés/);
 assert.match(doc.querySelector("#sections").textContent,/Breaking Bad/);
 assert.ok(mock.calls.some(x=>x.includes("/catalog/movie/top.json")));
 assert.ok(mock.calls.some(x=>x.includes("/catalog/series/top.json")));
 doc.querySelector('[data-id="tt0111161"]').click();
 assert.ok(doc.querySelector("#detailModal").classList.contains("open"));
 assert.match(doc.querySelector("#detailBody").textContent,/Les Évadés/);
 doc.querySelector("#detailSave").click();
 assert.match(doc.querySelector("#detailSave").textContent,/Dans ma liste/);
 doc.querySelector('[data-view="list"]').click();
 assert.match(doc.querySelector("#sections").textContent,/Les Évadés/);
 const search=doc.querySelector("#search");search.value="Breaking";search.dispatchEvent(new dom.window.Event("input",{bubbles:true}));
 assert.match(doc.querySelector("#sections").textContent,/Breaking Bad/);
 assert.equal(errors.length,0,"no runtime errors: "+errors.join("; "));
 dom.window.close();console.log("PASS real catalog loading, search, details and saved list");
}
{
 const mock=createFetch({fail:true}),{dom,errors}=load(mock.fetch),doc=dom.window.document;
 await waitFor(()=>doc.querySelector("#status").textContent.includes("indisponible"),"catalog error should be visible");
 assert.match(doc.querySelector("#sections").textContent,/Impossible de charger/);
 assert.equal(errors.length,0,"error state should not crash");
 dom.window.close();console.log("PASS metadata failure is visible without fictitious fallback");
}
console.log("VOYO smoke tests completed successfully.");