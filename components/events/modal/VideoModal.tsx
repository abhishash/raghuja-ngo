"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

export default function VideoModal({
    isOpen,
    onClose,
    videoUrl,
}: VideoModalProps) {


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getEmbedUrl = (url: string) => {
        const match = url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
        );

        if (!match) return url;

        return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white p-2"
                >
                    <X size={20} />
                </button>

                <div className="aspect-video">
                    <iframe
                        src={getEmbedUrl(videoUrl)}
                        className="h-full w-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}