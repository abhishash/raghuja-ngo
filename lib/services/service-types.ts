export type CMSItem = {
    id: number;
    category: string;
    name: string;
    url: string;
};

export type CMSData = {
    community: CMSItem[];
    links: CMSItem[];
    legal: CMSItem[];
};

export type CMSResponse = {
    status: boolean;
    message: string;
    data: CMSData;
};

export type GalleryItem = {
    title: string;
    link: string;
    image: string;
};

export type GalleryResponse = {
    status: string;
    data: GalleryItem[];
};