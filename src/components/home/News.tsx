'use client';

import { motion } from 'framer-motion';
// import SectionTitle from "@/components/shared/SectionTitle";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

const markdownComponents = {
  // 自定义 a 标签渲染
  a: (props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
};

function parseRedTags(content: string) {
  // 使用正则匹配 [red]...[/red] 并替换成 HTML span
  return content.replace(/<red>(.*?)<\/red>/g, (_match, p1) => {
    return `<span class="text-red-500 font-semibold">${p1}</span>`;
  });
}


export default function News({ items, title = 'News' }: NewsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">{item.date}</span>
                        {/* <p className="text-sm text-neutral-700">{item.content}</p> */}
                        {/* <p className="text-sm text-neutral-700" dangerouslySetInnerHTML={{ __html: item.content }} /> */}
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                                {parseRedTags(item.content)}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
