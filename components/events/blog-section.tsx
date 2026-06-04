"use client";

import { imageBaseUrl } from "@/lib/constants";
import { useGetBlogsQuery } from "@/lib/services/events-api";
import { isArray } from "@/lib/type-guards";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ServiceSection = () => {
    const { data: blogs, isLoading, isError } = useGetBlogsQuery();

    // Loading Skeleton
    if (isLoading) {
        return (
            <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-[2rem] border border-white/30 bg-white/80 shadow-xl backdrop-blur-xl animate-pulse"
                    >
                        {/* Image Skeleton */}
                        <div className="h-64 bg-gray-200" />

                        {/* Content Skeleton */}
                        <div className="space-y-4 p-7">
                            <div className="h-7 w-3/4 rounded bg-gray-200" />

                            <div className="space-y-2">
                                <div className="h-4 w-full rounded bg-gray-200" />
                                <div className="h-4 w-5/6 rounded bg-gray-200" />
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <div className="h-4 w-24 rounded bg-gray-200" />
                                <div className="h-12 w-12 rounded-2xl bg-gray-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Error State
    if (isError) {
        return (
            <div className="mt-20 flex min-h-[300px] items-center justify-center rounded-[2rem] border border-red-100 bg-red-50 p-10 text-center">
                <div>
                    <h3 className="text-2xl font-bold text-red-600">
                        Failed to load blogs
                    </h3>

                    <p className="mt-2 text-gray-600">
                        Something went wrong while fetching blogs.
                    </p>
                </div>
            </div>
        );
    }

    // Empty State
    if (!isArray(blogs) || blogs?.length === 0) {
        return (
            <div className="mt-20 flex min-h-[300px] items-center justify-center rounded-[2rem] border border-gray-200 bg-white p-10 text-center shadow-sm">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                        No Blogs Found
                    </h3>

                    <p className="mt-2 text-gray-500">
                        There are no blogs available right now.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogs?.slice(0, 3).map((blog) => (
                <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-teal-900/10"
                >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                        <Image
                            src={`${imageBaseUrl}${blog.image}`}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Icon */}
                        <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white shadow-xl backdrop-blur-md">
                            <Heart size={28} />
                        </div>

                        {/* Date Badge */}
                        <div className="absolute bottom-5 left-5 rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-white shadow-xl">
                            {blog.published_date}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-7">
                        <h3 className="text-2xl font-bold leading-snug text-gray-950 transition-colors duration-300 group-hover:text-teal-700">
                            {blog.title}
                        </h3>

                        <p className="mt-4 line-clamp-3 leading-relaxed text-gray-600">
                            {blog.short_description}
                        </p>

                        <div className="mt-8 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-500">
                                Read More
                            </span>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Glow */}
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-200/40 blur-3xl" />
                </Link>
            ))}
        </div>
    );
};

export default ServiceSection;