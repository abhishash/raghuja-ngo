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
  donors: number;
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
    campaign_id?: string;
    name: string;
    email: string;
    phone: string;
    amount: number;
}

export type verifyPaymentPayload = {
  campaign_id: string;
  donation_id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export type Prefill = {
  name: string;
  email: string;
  contact: string;
};

export type DonationOrderData = {
  donation_id: number;
  campaign_id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  amount: string;
  amount_in_paise: number;
  currency: string;
  receipt: string;
  razorpay_key: string;
  razorpay_order_id: string;
  prefill: Prefill;
};

export type DonationOrderResponse = {
  status: boolean;
  message: string;
  data: DonationOrderData;
};

export interface EventItem {
  id: number;
  title: string;
  description: string;
  location: string;
  event_date: string;
  month: string;
  day: string;
  attendees: string;
  link: string | null;
  image: string;
}

export interface EventsResponse {
  status: boolean;
  data: EventItem[];
}

export interface EventDetailsData {
  id: number;
  title: string;
  description: string;
  location: string;
  event_date: string;
  month: string;
  day: string;
  attendees: string;
  link: string | null;
  image: string;
}

export interface EventDetailsResponse {
  status: boolean;
  data: EventDetailsData;
}

export interface VideoItem {
  id: number;
  title: string;
  video_type: string;
  thumbnail: string;
  video_url: string;
  video_file: string | null;
}

export interface VideosResponse {
  status: boolean;
  data: VideoItem[];
}