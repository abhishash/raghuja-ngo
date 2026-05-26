// Mock data for NGO website

export const ngoInfo = {
  name: 'RAGHUJA SOCIALWELFARE Foundation',
  tagline: 'Enhancing mobility and functionality with advanced technology.',
  mission: 'Challenging disabilities, enabling lives through innovative prosthetic technology and rehabilitation services.',
  vision: 'A world where individuals with disabilities have access to quality prosthetic limbs and rehabilitation services.',
  founded: 2015,
  description: 'RAGHUJA SOCIALWELFARE Foundation is a non-profit organization dedicated to providing advanced prosthetic limbs and rehabilitation services to individuals with disabilities.',
  contact: {
    email: 'info@inalifoundation.org',
    phone: '+91 9876543210',
    address: '123 Healthcare Lane, Bangalore, India'
  }
}

export const services = [
  {
    id: 1,
    title: 'Prosthetic Limbs',
    description: 'Advanced prosthetic limbs with cutting-edge technology',
    icon: '🦿',
    longDescription: 'We provide state-of-the-art prosthetic limbs designed to enhance mobility and restore confidence in individuals with limb disabilities.',
    impact: '3000+ limbs provided',
    image: '/api/placeholder/400/300'
  },
  {
    id: 2,
    title: 'Rehabilitation Services',
    description: 'Comprehensive rehabilitation and physical therapy',
    icon: '⚕️',
    longDescription: 'Our rehabilitation programs include physiotherapy, occupational therapy, and vocational training to help individuals regain independence.',
    impact: '5000+ individuals rehabilitated',
    image: '/api/placeholder/400/300'
  },
  {
    id: 3,
    title: 'Training & Support',
    description: 'Skill development and community support programs',
    icon: '🎓',
    longDescription: 'We offer training programs and ongoing support to ensure individuals can live fulfilling, independent lives.',
    impact: '2000+ trained beneficiaries',
    image: '/api/placeholder/400/300'
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
    image: '/api/placeholder/300/300',
    bio: 'Social entrepreneur with 15+ years of experience in NGO sector'
  },
  {
    id: 2,
    name: 'Amit Sharma',
    role: 'Head of Operations',
    image: '/api/placeholder/300/300',
    bio: 'Passionate about sustainable development and community welfare'
  },
  {
    id: 3,
    name: 'Neha Patel',
    role: 'Education Program Head',
    image: '/api/placeholder/300/300',
    bio: 'Dedicated to transforming lives through quality education'
  },
  {
    id: 4,
    name: 'Rajesh Singh',
    role: 'Healthcare Coordinator',
    image: '/api/placeholder/300/300',
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
    description: 'Join us for an evening of celebration and giving back',
    image: '/api/placeholder/400/300',
    attendees: 250
  },
  {
    id: 2,
    title: 'Education Summit 2024',
    date: '2024-07-20',
    time: '09:00',
    location: 'Convention Center, Mumbai',
    description: 'Discussing innovations in education for underprivileged children',
    image: '/api/placeholder/400/300',
    attendees: 500
  },
  {
    id: 3,
    title: 'Health Awareness Week',
    date: '2024-08-01',
    time: '10:00',
    location: 'Multiple Locations',
    description: 'Free health checkups and awareness programs',
    image: '/api/placeholder/400/300',
    attendees: 1000
  },
  {
    id: 4,
    title: 'Community Outreach Program',
    date: '2024-09-10',
    time: '14:00',
    location: 'Rural District',
    description: 'Food distribution and medical camps',
    image: '/api/placeholder/400/300',
    attendees: 150
  }
]

export const vlogs = [
  {
    id: 1,
    title: 'A Day in the Life of Our Scholars',
    thumbnail: '/api/placeholder/400/225',
    videoId: 'dQw4w9WgXcQ',
    views: 2500,
    date: '2024-05-20'
  },
  {
    id: 2,
    title: 'Impact of Our Healthcare Program',
    thumbnail: '/api/placeholder/400/225',
    videoId: 'dQw4w9WgXcQ',
    views: 1800,
    date: '2024-05-15'
  },
  {
    id: 3,
    title: 'Building Hope: Our Education Initiative',
    thumbnail: '/api/placeholder/400/225',
    videoId: 'dQw4w9WgXcQ',
    views: 3200,
    date: '2024-05-10'
  },
  {
    id: 4,
    title: 'Stories of Change & Transformation',
    thumbnail: '/api/placeholder/400/225',
    videoId: 'dQw4w9WgXcQ',
    views: 4100,
    date: '2024-05-05'
  }
]

export const donationReceipt = {
  organizationName: '',
  organizationAddress: '123 Healthcare Lane, Bangalore, India',
  organizationEmail: 'info@inalifoundation.org',
  taxId: 'IND123456789'
}
