import CampaignDetails from '@/components/campaign/campaign-details'
type Props = {
    params: {
        id: string
    }
}
export default async function CampaignDetailsPage({ params }: Props) {
    const { id } = await params

    return (
        <CampaignDetails id={id} />
    )
}