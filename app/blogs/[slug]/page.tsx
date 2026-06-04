
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import BlogDetails from "@/components/events/blog-detail";

interface BlogPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogDetailsPage({
    params,
}: BlogPageProps) {

    const { slug } = await params;

    return (
        <BlogDetails slug={slug} />
    );
}