"use client";

import { imageBaseUrl } from "@/lib/constants";
import { useGetTeamsQuery } from "@/lib/services/master-api";
import { Users2 } from "lucide-react";
import Image from "next/image";

const Team = () => {
    const { data: supportingMembers, isLoading } = useGetTeamsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {supportingMembers?.map((member) => (
                <div
                    key={member.id}
                    className="group overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                    {/* Image */}
                    <div className="relative h-72 overflow-hidden">
                        <Image
                            src={`${imageBaseUrl}${member.image}`}
                            alt={member.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-7">
                        <div className="inline-flex rounded-full bg-teal-50 px-4 py-1 text-sm font-semibold text-teal-700">
                            {member.designation}
                        </div>

                        <h3 className="mt-5 text-2xl font-bold text-gray-950">
                            {member.name}
                        </h3>

                        <p className="mt-4 leading-relaxed text-gray-600">
                            {member.short_description}
                        </p>

                        <div className="mt-8 flex items-center gap-2 text-teal-700">
                            <Users2 size={18} />
                            <span className="font-medium">
                                {member.highlight_text || "Community Impact Team"}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Team;