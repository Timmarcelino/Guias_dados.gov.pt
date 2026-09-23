import { notFound } from "next/navigation"; import type { Metadata } from "next"; import { loadContent } from "@/lib/content/repository"; import { buildRoutes, findRoute } from "@/lib/content/routes"; import { RouteContent } from "@/components/guides/RouteContent"; import { canonicalUrl } from "@/lib/site";
export const dynamicParams=false;
export function generateStaticParams(){return buildRoutes(loadContent()).filter(r=>r.segments.length>0).map(r=>({segments:r.segments}))}
export async function generateMetadata({params}:{params:Promise<{segments:string[]}>}):Promise<Metadata>{const {segments}=await params;const r=findRoute(loadContent(),segments);if(!r)return {};return {title:r.title,alternates:{canonical:canonicalUrl(r.path)}}}
export default async function GuideRoutePage({params}:{params:Promise<{segments:string[]}>}){const {segments}=await params;const r=findRoute(loadContent(),segments);if(!r)notFound();return <RouteContent route={r}/>}
