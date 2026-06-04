"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { useGetBlogBySlugQuery } from "@/lib/services/events-api";
import { imageBaseUrl } from "@/lib/constants";

export default function BlogDetails({
    slug,
}: {
    slug: string;
}) {
    const { data: blog, isLoading, isError } =
        useGetBlogBySlugQuery(slug);

    // Loading State
    if (isLoading) {
        return (
            <section className="animate-pulse bg-gradient-to-b from-teal-50 via-white to-white">
                {/* Hero Skeleton */}
                <div className="relative h-[450px] overflow-hidden bg-gray-200">
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute inset-0 flex items-center">
                        <div className="mx-auto w-full max-w-5xl px-6">
                            {/* Back Button */}
                            <div className="mb-6 h-10 w-36 rounded-full bg-white/30" />

                            {/* Title */}
                            <div className="space-y-4">
                                <div className="h-12 w-3/4 rounded bg-white/40" />
                                <div className="h-12 w-1/2 rounded bg-white/30" />
                            </div>

                            {/* Meta */}
                            <div className="mt-8 flex gap-6">
                                <div className="h-5 w-32 rounded bg-white/30" />
                                <div className="h-5 w-40 rounded bg-white/30" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="mx-auto max-w-4xl px-6 py-20">
                    <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl md:p-12">
                        <div className="space-y-4">
                            <div className="h-6 w-full rounded bg-gray-200" />
                            <div className="h-6 w-5/6 rounded bg-gray-200" />
                        </div>

                        <div className="mt-10 space-y-4">
                            <div className="h-5 w-full rounded bg-gray-200" />
                            <div className="h-5 w-full rounded bg-gray-200" />
                            <div className="h-5 w-11/12 rounded bg-gray-200" />
                            <div className="h-5 w-10/12 rounded bg-gray-200" />
                            <div className="h-5 w-9/12 rounded bg-gray-200" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Error / Not Found State
    if (isError || !blog) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-20">
                <div className="max-w-xl text-center">
                    <h1 className="text-5xl font-bold text-gray-900">
                        Blog Not Found
                    </h1>

                    <p className="mt-5 text-lg text-gray-600">
                        The blog you are looking for does not exist or has been removed.
                    </p>

                    <Link
                        href="/blogs"
                        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
                    >
                        <ArrowLeft size={18} />
                        Back to Blogs
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-b from-teal-50 via-white to-white">
            {/* Hero */}
            <div className="relative h-[450px] overflow-hidden">
                <Image
                    src={`${imageBaseUrl}${blog.image}`}
                    alt={blog.title}
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/55" />

                <div className="absolute inset-0 flex items-center">
                    <div className="mx-auto w-full max-w-5xl px-6">
                        <Link
                            href="/"
                            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                        >
                            <ArrowLeft size={16} />
                            Back to Blogs
                        </Link>

                        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
                            {blog.title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <User size={18} />
                                <span>{blog.author}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarDays size={18} />
                                <span>{blog.published_date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-4xl px-6 py-20">
                <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl md:p-12">
                    <p className="text-xl leading-relaxed text-gray-600">
                        {blog.short_description}
                    </p>

                    <div className="prose prose-lg mt-10 max-w-none text-gray-700">
                        <p>{blog.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}