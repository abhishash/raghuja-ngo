"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGetFAQQuery } from "@/lib/services/master-api";
import { isArray } from "@/lib/type-guards";

const FAQSection = () => {
    const { data: faqs, isLoading, isError } = useGetFAQQuery();
    const [openIndex, setOpenIndex] = useState<number | null>(0);


    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Loading State
    if (isLoading) {
        return (
            <section className="py-20">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="mb-14 text-center">
                        <div className="mx-auto h-10 w-72 animate-pulse rounded bg-gray-200" />
                        <div className="mx-auto mt-4 h-5 w-96 animate-pulse rounded bg-gray-100" />
                    </div>

                    <div className="space-y-5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="h-6 w-3/4 rounded bg-gray-200" />
                                    <div className="h-6 w-6 rounded bg-gray-200" />
                                </div>

                                <div className="mt-5 space-y-3">
                                    <div className="h-4 w-full rounded bg-gray-100" />
                                    <div className="h-4 w-5/6 rounded bg-gray-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Error State
    if (isError) {
        return (
            <section className="py-20">
                <div className="mx-auto max-w-3xl rounded-3xl border border-red-100 bg-red-50 p-10 text-center">
                    <h3 className="text-2xl font-bold text-red-600">
                        Failed to load FAQs
                    </h3>

                    <p className="mt-3 text-gray-600">
                        Something went wrong while fetching FAQs.
                    </p>
                </div>
            </section>
        );
    }

    // Empty State
    if (!isArray(faqs)) {
        return (
            <section className="py-20">
                <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-800">
                        No FAQs Available
                    </h3>

                    <p className="mt-3 text-gray-500">
                        FAQs will appear here once added.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-b from-white to-teal-50 py-20">
            <div className="mx-auto max-w-4xl px-6">
                {/* Heading */}
                <div className="mb-14 text-center">
                    <span className="rounded-full bg-teal-100 px-5 py-2 text-sm font-semibold text-teal-700">
                        FAQs
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold text-gray-900 md:text-5xl">
                        Frequently Asked Questions
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
                        Find answers to the most commonly asked questions.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-5">
                    {faqs?.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="flex w-full items-center justify-between gap-5 p-6 text-left"
                                >
                                    <h3 className="text-lg font-bold text-gray-900 md:text-xl">
                                        {faq.name}
                                    </h3>

                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    >
                                        <ChevronDown size={20} />
                                    </div>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ${isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 pb-6 text-base leading-relaxed text-gray-600">
                                            {faq.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;