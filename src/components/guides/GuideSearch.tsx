"use client";
import { useMemo, useState } from "react";
import { SearchInput } from "@/components/agora/SearchInput";
import { withBasePath } from "@/lib/site";
type Item={id:string;guideId:string;title:string;intro:string;text:string;url:string};
export function GuideSearch({items}:{items:Item[]}){const[q,setQ]=useState("");const hits=useMemo(()=>{const n=q.trim().toLocaleLowerCase("pt-PT");return n?items.filter(i=>i.text.toLocaleLowerCase("pt-PT").includes(n)).slice(0,12):[]},[q,items]);return <section aria-labelledby="pesquisa-guias" className="my-32"><h2 id="pesquisa-guias" className="text-xl-bold mb-16">Pesquisar nos guias</h2><SearchInput label="Pesquisar nos guias" hideLabel value={q} onChange={e=>setQ(e.currentTarget.value)} placeholder="Ex.: publicar dados"/><p className="mt-8 text-sm" role="status" aria-live="polite">{q?`${hits.length} ${hits.length===1?"resultado":"resultados"}`:""}</p>{hits.length>0&&<ul className="mt-16 flex flex-col gap-12">{hits.map(i=><li key={i.id}><a className="underline" href={withBasePath(i.url)}><strong>{i.title}</strong><span className="block">{i.intro}</span></a></li>)}</ul>}</section>}
