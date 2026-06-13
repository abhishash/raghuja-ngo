"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  PlayCircle,
} from "lucide-react";

import { imageBaseUrl } from "@/lib/constants";
import { useGetVideosQuery } from "@/lib/services/events-api";
import VideoModal from "./modal/VideoModal";
import { useState } from "react";

const VlogCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl animate-pulse">

      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video bg-gray-200">

        {/* Play Button Skeleton */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-7">
        <div className="h-7 w-4/5 rounded bg-gray-200"></div>

        <div className="mt-3 h-7 w-3/5 rounded bg-gray-200"></div>

        <div className="mt-8 h-5 w-24 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

const Vlogs = () => {
  const [selectedVideo, setSelectedVideo] = useState("");

  const { data: vlogs, isLoading } = useGetVideosQuery();

  const latestVlogs = vlogs?.slice(0, 3);

  /* ------------------------------ Loading UI ----------------------------- */
  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <VlogCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  /* ------------------------------ Empty State ---------------------------- */
  if (!latestVlogs || latestVlogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-teal-200 bg-white px-6 py-20 text-center shadow-lg">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
          <PlayCircle
            size={40}
            className="text-teal-700"
          />
        </div>

        <h3 className="mt-6 text-3xl font-bold text-gray-950">
          No Videos Available
        </h3>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          Videos and stories will appear here once they are published.
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {latestVlogs.map((vlog) => {
          return (
            <div
              key={vlog.id}
              onClick={() => setSelectedVideo(vlog.video_url ?? `${imageBaseUrl}${vlog.video_file}`)}
              className="group overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >

              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">

                <Image
                  src={`${imageBaseUrl}${vlog.thumbnail}`}
                  alt={vlog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-gray-950">
                    <PlayCircle size={36} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-2xl font-bold leading-snug text-gray-950 transition-colors group-hover:text-teal-700">
                  {vlog.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      <VideoModal
        isOpen={!!selectedVideo}
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo("")}
      />
    </>

  );
};

export default Vlogs;