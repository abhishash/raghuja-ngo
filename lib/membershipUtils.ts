import jsPDF from 'jspdf'

export interface Member {
  id: string
  name: string
  email: string
  phone: string
  address: string
  registrationDate: string
  memberId: string
}

// Generate unique member ID
export function generateMemberId(): string {
  const prefix = 'HF'
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(5, '0')
  return `${prefix}${year}${month}${randomNum}`
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{10,}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

// Generate ID Card PDF
export async function generateIdCardPDF(member: Member): Promise<Blob> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 53.98] // Credit card size
  })

  // Set colors
  doc.setFillColor(26, 108, 90) // Primary green color
  doc.rect(0, 0, 85.6, 53.98, 'F')

  // White text
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('HOPE FOUNDATION', 5, 8)
  doc.text('Member ID Card', 5, 14)

  // Member details
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text(`Name: ${member.name}`, 5, 22)
  doc.text(`Member ID: ${member.memberId}`, 5, 27)
  doc.text(`Phone: ${member.phone}`, 5, 32)
  doc.text(`Email: ${member.email}`, 5, 37)
  doc.text(`Registered: ${new Date(member.registrationDate).toLocaleDateString()}`, 5, 42)

  // Footer
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(7)
  doc.text('Join us in making a difference', 5, 50)
  doc.text('info@hopefoundation.org', 60, 50)

  return doc.output('blob')
}

// Generate donation receipt PDF
export async function generateReceiptPDF(
  donorName: string,
  amount: number,
  campaignTitle: string,
  transactionId: string,
  organizationName: string,
  organizationEmail: string,
  organizationAddress: string,
  taxId: string
): Promise<Blob> {
  const doc = new jsPDF()
  const pageHeight = doc.internal.pageSize.getHeight()
  const pageWidth = doc.internal.pageSize.getWidth()

  // Header
  doc.setFillColor(26, 108, 90)
  doc.rect(0, 0, pageWidth, 30, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text(organizationName, 20, 15)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('DONATION RECEIPT', 20, 25)

  // Receipt Details
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)

  let yPos = 45

  doc.text('RECEIPT DETAILS', 20, yPos)
  yPos += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Transaction ID: ${transactionId}`, 20, yPos)
  yPos += 8
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, yPos)
  yPos += 15

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('DONOR INFORMATION', 20, yPos)
  yPos += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Name: ${donorName}`, 20, yPos)
  yPos += 8
  doc.text(`Campaign: ${campaignTitle}`, 20, yPos)
  yPos += 8
  doc.text(`Amount Donated: ₹${amount.toLocaleString('en-IN')}`, 20, yPos)
  yPos += 15

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('ORGANIZATION INFORMATION', 20, yPos)
  yPos += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(organizationName, 20, yPos)
  yPos += 8
  doc.text(organizationAddress, 20, yPos)
  yPos += 8
  doc.text(organizationEmail, 20, yPos)
  yPos += 8
  doc.text(`Tax ID: ${taxId}`, 20, yPos)
  yPos += 15

  // Footer
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.text('Thank you for your generous donation!', 20, pageHeight - 20)
  doc.text('This receipt is for your records and tax purposes.', 20, pageHeight - 15)

  return doc.output('blob')
}
