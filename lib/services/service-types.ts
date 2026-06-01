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

export type Campaign = {
  id: number;
  name: string;
  short_description: string;
  target_amount: string;
  raised_amount: string;
  image: string;
  description: string;
  progress_percentage: number;
};

export type CampaignResponse = {
  status: boolean;
  message: string;
  data: Campaign[];
}

export type CampaignDetailsResponse = {
  status: boolean;
  message: string;
  data: Campaign;
};

export type CreateOrderPayload = {
    campaign_id : number;
    name: string;
    email: string;
    phone: string;
    amount: string;
}