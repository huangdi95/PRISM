'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Publication } from '@/types/publication';
import { renderHighlightedText } from "../publications/PublicationsList";

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({
    publications,
    title = 'Selected Publications',
    enableOnePageMode = false
}: SelectedPublicationsProps) {
    const sortedPublications = [...publications].sort((a, b) => {
        return b.year - a.year;
    });

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{title}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    View All →
                </Link>
            </div>

            <div className="space-y-4">
                {sortedPublications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                        {/* 
                           修改说明：
                           1. 父容器保持 flex-row，默认 items-stretch，这保证了左右两栏高度一致。
                           2. 图片容器移除了 md:aspect-[4/3]，改为 md:aspect-auto md:h-full。
                              这使得在桌面端图片高度会跟随右侧文字内容的高度自动拉伸。
                        */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {pub.preview && (
                                <div className="w-full md:w-48 flex-shrink-0">
                                    <div className="relative rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-700 w-full aspect-video md:aspect-auto md:h-full">
                                        <Image
                                            src={`/papers/${pub.preview}`}
                                            alt={pub.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* text section */}
                            <div className="flex-1 flex flex-col">
                                <h3 className="font-semibold text-primary mb-2 leading-tight">
                                    {pub.title}
                                </h3>

                                <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-1">
                                    {pub.authors.map((author, idx) => (
                                        <span key={idx}>
                                            <span
                                                className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} 
                                                    ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}
                                            >
                                                {author.name}
                                            </span>
                                            {author.isCorresponding && (
                                                <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                            )}
                                            {idx < pub.authors.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>

                                <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-2">
                                    {renderHighlightedText(pub.journal || pub.conference)}
                                </p>

                                {pub.description && (
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
                                        {pub.description}
                                    </p>
                                )}

                                {/* Links / Tags Section */}
                                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                                    {pub.projectpage && (
                                        <a
                                            href={pub.projectpage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors"
                                        >
                                            Project Page
                                        </a>
                                    )}
                                    {pub.paperlink && (
                                        <a
                                            href={pub.paperlink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors"
                                        >
                                            Paper
                                        </a>
                                    )}
                                    {pub.code && (
                                        <a
                                            href={pub.code}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors"
                                        >
                                            Code
                                        </a>
                                    )}
                                    {pub.data && (
                                        <a
                                            href={pub.data}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors"
                                        >
                                            Data
                                        </a>
                                    )}
                                    {pub.model && (
                                        <a
                                            href={pub.model}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors"
                                        >
                                            Model
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}