import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import type { TOCItemType } from "fumadocs-core/toc";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { getMDXComponents } from "@/components/mdx";
import { source } from "@/lib/source";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);

  if (!page) {
    return {};
  }

  return {
    title: page.data.title,
    description: page.data.description
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);

  if (!page) {
    notFound();
  }

  const pageData = page.data as typeof page.data & {
    body: ComponentType<{ components?: ReturnType<typeof getMDXComponents> }>;
    toc?: TOCItemType[];
  };
  const MDX = pageData.body;

  return (
    <DocsPage toc={pageData.toc ?? []}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}
