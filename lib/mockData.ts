// Mock data for NGO website

export const ngoInfo = {
  name: 'Raghuja SocialWelfare Foundation',
  tagline: 'Enhancing mobility and functionality with advanced technology.',
  mission: 'Challenging disabilities, enabling lives through innovative prosthetic technology and rehabilitation services.',
  vision: 'A world where individuals with disabilities have access to quality prosthetic limbs and rehabilitation services.',
  founded: 2015,
  description: 'Raghuja SocialWelfare Foundationis a non-profit organization dedicated to providing advanced prosthetic limbs and rehabilitation services to individuals with disabilities.',
  contact: {
    email: 'ngo@raghujasocialwelfarefoundation.com',
    phone: '+91 9548335369',
    address: 'Village Gadhi Dharajeet Chitaura, Shamshabad Agra, Shamshabad, AGRA, Uttar Pradesh, INDIA - 283125'
  }
}

export const services = [
  {
    id: 1,
    title: 'Prosthetic Limbs',
    description: 'Advanced prosthetic limbs with cutting-edge technology',
    icon: '🦿',
    longDescription:
      'We provide state-of-the-art prosthetic limbs designed to enhance mobility and restore confidence in individuals with limb disabilities.',
    impact: '3000+ limbs provided',
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Rehabilitation Services',
    description: 'Comprehensive rehabilitation and physical therapy',
    icon: '⚕️',
    longDescription:
      'Our rehabilitation programs include physiotherapy, occupational therapy, and vocational training to help individuals regain independence.',
    impact: '5000+ individuals rehabilitated',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Training & Support',
    description: 'Skill development and community support programs',
    icon: '🎓',
    longDescription:
      'We offer training programs and ongoing support to ensure individuals can live fulfilling, independent lives.',
    impact: '2000+ trained beneficiaries',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'
  }
]

export const campaigns = [
  {
    id: 1,
    title: 'Provide 100 Prosthetic Limbs',
    description: 'Help us provide advanced prosthetic limbs to those in need',
    target: 500000,
    current: 325000,
    image: '/api/placeholder/400/300',
    category: 'Prosthetic Limbs',
    deadline: '2024-12-31',
    donors: 1240,
    story: 'Many individuals with limb disabilities lack access to quality prosthetics. Your donation will help restore mobility and independence.'
  },
  {
    id: 2,
    title: 'Rehabilitation Camp Drive',
    description: 'Free rehabilitation services for 500 individuals',
    target: 150000,
    current: 89500,
    image: '/api/placeholder/400/300',
    category: 'Rehabilitation',
    deadline: '2024-11-15',
    donors: 456,
    story: 'Remote areas lack access to rehabilitation services. Your donation will provide comprehensive therapy to those in need.'
  },
  {
    id: 3,
    title: 'Skill Training Program',
    description: 'Vocational training for 200 individuals',
    target: 200000,
    current: 156800,
    image: '/api/placeholder/400/300',
    category: 'Training',
    deadline: '2024-10-31',
    donors: 892,
    story: 'Help us equip individuals with the skills they need to become self-reliant and productive members of society.'
  },
  {
    id: 4,
    title: 'Mobile Prosthetic Clinic',
    description: 'Bring prosthetic services to rural areas',
    target: 300000,
    current: 198500,
    image: '/api/placeholder/400/300',
    category: 'Prosthetic Limbs',
    deadline: '2024-12-15',
    donors: 567,
    story: 'Rural communities have limited access to prosthetic services. Help us reach out to those who need us most.'
  }
]

export const teamMembers = [
  {
    id: 1,
    name: 'Priya Kumar',
    role: 'Founder & Executive Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    bio: 'Social entrepreneur with 15+ years of experience in NGO sector'
  },
  {
    id: 2,
    name: 'Amit Sharma',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    bio: 'Passionate about sustainable development and community welfare'
  },
  {
    id: 3,
    name: 'Neha Patel',
    role: 'Education Program Head',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    bio: 'Dedicated to transforming lives through quality education'
  },
  {
    id: 4,
    name: 'Rajesh Singh',
    role: 'Healthcare Coordinator',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop',
    bio: 'Medical professional committed to accessible healthcare'
  }
]

export const events = [
  {
    id: 1,
    title: 'Annual Fundraiser Gala',
    date: '2024-06-15',
    time: '18:00',
    location: 'Grand Hotel, New Delhi',
    description:
      'Join us for an evening of celebration, donor appreciation, and community impact stories supporting healthcare and education initiatives.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    attendees: 250,
  },

  {
    id: 2,
    title: 'Education Summit 2024',
    date: '2024-07-20',
    time: '09:00',
    location: 'Convention Center, Mumbai',
    description:
      'Discussing innovation, digital learning, and equal educational opportunities for underserved children and communities.',
    image:
      'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop',
    attendees: 500,
  },

  {
    id: 3,
    title: 'Health Awareness Week',
    date: '2024-08-01',
    time: '10:00',
    location: 'Multiple Locations',
    description:
      'Free medical checkups, awareness drives, rehabilitation support, and healthcare education programs for families.',
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop',
    attendees: 1000,
  },

  {
    id: 4,
    title: 'Community Outreach Program',
    date: '2024-09-10',
    time: '14:00',
    location: 'Rural District',
    description:
      'Food distribution drives, medical camps, and community engagement programs helping families in need.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
    attendees: 150,
  },
]

export const vlogs = [
  {
    id: 1,
    title: 'A Day in the Life of Our Scholars',
    thumbnail:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    videoId: 'dQw4w9WgXcQ',
    views: 2500,
    date: '2024-05-20',
  },

  {
    id: 2,
    title: 'Impact of Our Healthcare Program',
    thumbnail:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop',
    videoId: 'dQw4w9WgXcQ',
    views: 1800,
    date: '2024-05-15',
  },

  {
    id: 3,
    title: 'Building Hope: Our Education Initiative',
    thumbnail:
      'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop',
    videoId: 'dQw4w9WgXcQ',
    views: 3200,
    date: '2024-05-10',
  },

  {
    id: 4,
    title: 'Stories of Change & Transformation',
    thumbnail:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
    videoId: 'dQw4w9WgXcQ',
    views: 4100,
    date: '2024-05-05',
  },
]

export const donationReceipt = {
  organizationName: '',
  organizationAddress: '123 Healthcare Lane, Bangalore, India',
  organizationEmail: 'info@inalifoundation.org',
  taxId: 'IND123456789'
}
