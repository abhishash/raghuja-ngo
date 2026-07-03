'use client'

import { useState } from 'react'
import Link from 'next/link'
import { generateIdCardPDF, generateMemberId, isValidPhone } from '@/lib/membershipUtils'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle,
  FileText,
  Home,
  Loader2,
  LockKeyhole,
  MailIcon,
  Phone,
  ShieldCheck,
  UploadCloud,
  UserRound,
} from 'lucide-react'
import { useCreateRegistrationMutation } from '@/lib/services/registration-api'
import { toast } from 'sonner'

interface FormData {
  name: string
  mobile: string
  address: string
  idProofType: string
  idProofNumber: string
  email: string;
  idProofFile: File | null
}

const idProofOptions = [
  'Aadhaar Card',
  'PAN Card',
  'Voter ID',
  'Driving License',
  'Passport',
  'Disability Certificate',
]

export default function Membership() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: "",
    mobile: '',
    address: '',
    idProofType: '',
    idProofNumber: '',
    idProofFile: null as File | null,

  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [memberId, setMemberId] = useState('')

  const [otpEnabled, setOtpEnabled] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otp, setOtp] = useState('')
  const [demoOtp, setDemoOtp] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim())
      newErrors.name = "Full name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";

    if (!formData.mobile.trim())
      newErrors.mobile = "Mobile number is required";
    else if (!isValidPhone(formData.mobile))
      newErrors.mobile = "Enter a valid 10 digit mobile number";

    if (!formData.address.trim())
      newErrors.address = "Address is required";

    if (!formData.idProofType)
      newErrors.idProofType = "Select an ID proof type";

    if (!formData.idProofNumber.trim())
      newErrors.idProofNumber = "ID proof number is required";

    // ID Proof File Validation
    if (!formData.idProofFile) {
      newErrors.idProofFile = "Please upload your ID proof";
    } else {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];

      if (!allowedTypes.includes(formData.idProofFile.type)) {
        newErrors.idProofFile =
          "Only JPG, PNG and PDF files are allowed";
      }

      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (formData.idProofFile.size > maxSize) {
        newErrors.idProofFile = "File size must be less than 5MB";
      }
    }

    if (otpEnabled && !otpVerified)
      newErrors.otp = "Please verify OTP or turn off OTP verification";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }

    if (name === 'mobile') {
      setOtpSent(false)
      setOtpVerified(false)
      setOtp('')
      setDemoOtp('')
    }
  }

  const [createRegistration, { isLoading }] = useCreateRegistrationMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.mobile);
      form.append("address", formData.address);
      form.append("id_proof_type", formData.idProofType);
      form.append("id_proof_number", formData.idProofNumber);

      if (formData.idProofFile) {
        form.append("id_proof_file", formData.idProofFile);
      }

      const response = await createRegistration(form as any).unwrap();

      if (response) {
        toast.success("Registration successfully created");
        setFormData({
          name: '',
          email: "",
          mobile: '',
          address: '',
          idProofType: '',
          idProofNumber: '',
          idProofFile: null
        })
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    } catch (err: any) {
      const validationErrors = err?.data?.errors;

      if (validationErrors) {
        Object.keys(validationErrors).forEach((field) => {
          toast.error(validationErrors[field][0]);
        });
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  const handleDownloadIdCard = async () => {
    try {
      const blob = await generateIdCardPDF({
        id: memberId,
        name: formData.name,
        email: 'Not provided',
        phone: formData.mobile,
        address: formData.address,
        registrationDate: new Date().toISOString(),
        memberId,
      })

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${formData.name}-ID-Card.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating ID card:', error)
    }
  }

  return (

    <>
      <section className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center gap-10 text-center">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-bold text-teal-700 shadow-sm">
                <BadgeCheck size={16} />
                Member registration
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-950 md:text-6xl">
                Register once. Stay connected with every camp, update, and support program.
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-700 md:text-xl">
                Share your basic details so our team can identify members, coordinate care, and keep your records ready for future programs.
              </p>

            </div>

            <div className="grid w-full gap-5 md:grid-cols-3">
              <div className="group rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <UserRound size={26} />
                </div>
                <p className="mt-5 text-lg font-bold text-gray-950">Basic identity</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">Capture member name, mobile number, and complete address in one clean step.</p>
              </div>
              <div className="group rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-50 text-yellow-700 transition-colors group-hover:bg-yellow-500 group-hover:text-white">
                  <FileText size={26} />
                </div>
                <p className="mt-5 text-lg font-bold text-gray-950">ID proof</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">Select Aadhaar, PAN, voter ID, passport, or another approved proof type.</p>
              </div>
              <div className="group rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <ShieldCheck size={26} />
                </div>
                <p className="mt-5 text-lg font-bold text-gray-950">Optional OTP</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">Turn on mobile verification only when you need an extra confirmation step.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {submitted ? (
        <section className="bg-white px-4 py-20">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-lg md:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                <CheckCircle className="text-teal-600" size={48} />
              </div>

              <h2 className="mt-8 text-4xl font-bold text-gray-900">Registration complete</h2>
              <p className="mt-4 text-lg text-gray-700">
                Welcome, {formData.name}. Your member profile has been created successfully.
              </p>

              <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-left">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Member ID</p>
                    <p className="mt-1 text-2xl font-bold text-teal-700">{memberId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Mobile</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">{formData.mobile}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">ID Proof</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">{formData.idProofType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">OTP Status</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {otpEnabled ? 'Verified' : 'Skipped'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={handleDownloadIdCard}
                  className="rounded bg-teal-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-teal-700"
                >
                  Download ID Card
                </button>
                {/* <Link
                  href="/membership/dashboard"
                  className="rounded border-2 border-teal-600 px-5 py-3 font-semibold text-teal-700 transition-colors hover:bg-teal-50"
                >
                  View Dashboard
                </Link> */}
              </div>

              <Link
                href="/donate"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-700 transition-colors hover:text-teal-800"
              >
                Support a donation campaign <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white px-4 py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="rounded-lg bg-teal-600 p-8 text-white lg:sticky lg:top-24 lg:h-fit">
              <LockKeyhole size={34} />
              <h2 className="mt-6 text-3xl font-bold">Your details stay organized and private.</h2>
              <p className="mt-4 leading-relaxed text-white/90">
                This form captures only the essentials needed for membership records and program coordination.
              </p>
              <div className="mt-8 space-y-4">
                {['Required fields are clearly marked', 'OTP is optional', 'ID card can be downloaded after registration'].map(
                  (item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 flex-shrink-0 text-yellow-300" size={20} />
                      <p className="text-sm font-medium text-white/95">{item}</p>
                    </div>
                  )
                )}
              </div>
            </aside>

            <div id="member-registration-form" className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Membership Registration Form</h2>
                <p className="mt-3 text-gray-600">Fill in the member details below. You can verify mobile with OTP if required.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-800">
                      Full Name *
                    </label>
                    <div className="relative">
                      <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full rounded border px-12 py-3 outline-none transition focus:ring-2 focus:ring-teal-600 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter full name"
                      />
                    </div>
                    {errors.name && <p className="mt-2 text-sm font-medium text-red-600">{errors.name}</p>}
                  </div>
                  <div className=''>
                    <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-800">
                      Email *
                    </label>
                    <div className="relative">
                      <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full rounded border px-12 py-3 outline-none transition focus:ring-2 focus:ring-teal-600 ${errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Enter Email"
                      />
                    </div>
                    {errors.email && <p className="mt-2 text-sm font-medium text-red-600">{errors.email}</p>}
                  </div>

                  <div className='col-span-2'>
                    <label htmlFor="mobile" className="mb-2 block text-sm font-bold text-gray-800">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className={`w-full rounded border px-12 py-3 outline-none transition focus:ring-2 focus:ring-teal-600 ${errors.mobile ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="10 digit mobile number"
                      />
                    </div>
                    {errors.mobile && <p className="mt-2 text-sm font-medium text-red-600">{errors.mobile}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="mb-2 block text-sm font-bold text-gray-800">
                    Address *
                  </label>
                  <div className="relative">
                    <Home className="absolute left-4 top-4 text-gray-400" size={20} />
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full resize-none rounded border px-12 py-3 outline-none transition focus:ring-2 focus:ring-teal-600 ${errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="House number, street, city, state, pincode"
                    />
                  </div>
                  {errors.address && <p className="mt-2 text-sm font-medium text-red-600">{errors.address}</p>}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* ID Proof Type */}
                  <div>
                    <label
                      htmlFor="idProofType"
                      className="mb-2 block text-sm font-bold text-gray-800"
                    >
                      ID Proof Type *
                    </label>

                    <select
                      id="idProofType"
                      name="idProofType"
                      value={formData.idProofType}
                      onChange={handleInputChange}
                      className={`w-full rounded border px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-600 ${errors.idProofType ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                      <option value="">Select ID proof</option>
                      {idProofOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {errors.idProofType && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {errors.idProofType}
                      </p>
                    )}
                  </div>

                  {/* ID Proof Number */}
                  <div>
                    <label
                      htmlFor="idProofNumber"
                      className="mb-2 block text-sm font-bold text-gray-800"
                    >
                      ID Proof Number *
                    </label>

                    <div className="relative">
                      <FileText
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        id="idProofNumber"
                        name="idProofNumber"
                        type="text"
                        value={formData.idProofNumber}
                        onChange={handleInputChange}
                        className={`w-full rounded border px-12 py-3 outline-none transition focus:ring-2 focus:ring-teal-600 ${errors.idProofNumber ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="Enter ID proof number"
                      />
                    </div>

                    {errors.idProofNumber && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {errors.idProofNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* File Upload */}
                <div className="mt-6">
                  <label
                    htmlFor="idProofFile"
                    className="mb-2 block text-sm font-bold text-gray-800"
                  >
                    Upload ID Proof *
                  </label>

                  <label
                    htmlFor="idProofFile"
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition hover:border-teal-600 hover:bg-teal-50 ${errors.idProofFile ? "border-red-500" : "border-gray-300"
                      }`}
                  >
                    <UploadCloud className="mb-3 text-teal-600" size={40} />

                    <span className="text-sm font-semibold text-gray-700">
                      Click to upload or drag & drop
                    </span>

                    <span className="mt-1 text-xs text-gray-500">
                      JPG, PNG, PDF (Max 5MB)
                    </span>

                    {formData.idProofFile && (
                      <span className="mt-3 rounded bg-teal-100 px-3 py-1 text-sm text-teal-700">
                        {formData.idProofFile.name}
                      </span>
                    )}
                  </label>

                  <input
                    id="idProofFile"
                    name="idProofFile"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData((prev) => ({
                          ...prev,
                          idProofFile: file,
                        }));
                      }
                    }}
                  />

                  {errors.idProofFile && (
                    <p className="mt-2 text-sm font-medium text-red-600">
                      {errors.idProofFile}
                    </p>
                  )}
                </div>

                <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-900">
                  By registering, you agree to receive membership updates, camp details, and program communication from the foundation.
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded bg-yellow-500 px-6 py-4 font-bold text-white transition-colors hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading && <Loader2 className="animate-spin" size={20} />}
                  {isLoading ? 'Creating membership...' : 'Complete Registration'}
                </button>
              </form>

              {/* <p className="mt-6 text-center text-sm text-gray-600">
                Already registered?{' '}
                <Link href="/membership/dashboard" className="font-bold text-teal-700 hover:text-teal-800">
                  View dashboard
                </Link>
              </p> */}
            </div>
          </div>
        </section>
      )}

    </>
  )
}
