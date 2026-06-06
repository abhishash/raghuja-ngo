import { CMS } from "@/lib/constants";
import { fetchHandler, methods } from "@/lib/fetch-handler";
import { CmsResponse } from "@/lib/types";
import type { Metadata } from "next";
export const revalidate = 3600;

type Props = {
    params: {
        urlkey: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { urlkey } = await params;

    const res = await fetchHandler({
        endpoint: `cms/${urlkey}`,
        method: "GET",
    });

    const page = res?.data;

    return {
        title: page?.meta_title || page?.name,
        description: page?.meta_description || page?.name,
    };
}

export async function generateStaticParams() {
    const res = await fetchHandler<CmsResponse>({
        ...(CMS as {
            endpoint: string;
            method: methods;
        }),
    });

    const cmsurl = res?.data;
    const pages = Object.values(cmsurl).flat();

    return pages
        .map((page: any) => ({
            urlkey: page.url === "/" ? "" : page?.url ?? "",
        }))
        .filter((item) => item.urlkey);

}

const CMSPage = async ({ params }: { params: Promise<{ urlkey: string }> }) => {
    const { urlkey } = await params;
    const res = await fetchHandler({
        endpoint: `cms/${urlkey}`,
        method: "GET",
    });
    const page = res?.data;
    return (
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-16">
            <h1 className="text-3xl text-center font-bold mb-6">
                {page?.name}
            </h1>

            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                    __html: page?.description || "",
                }}
            />
        </div>
    )
}

export default CMSPage;