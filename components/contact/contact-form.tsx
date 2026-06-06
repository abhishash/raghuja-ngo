"use client";

import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useContactUsMutation } from "@/lib/services/master-api";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState("");

    const [contactUs, { isLoading }] = useContactUsMutation();

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }


        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit mobile number";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Please select a subject";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message =
                "Message should be at least 10 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSuccessMessage("");

        if (!validateForm()) return;

        try {
            const response = await contactUs(formData).unwrap();

            if (response?.status) {
                setSuccessMessage(
                    "Message sent successfully!"
                );

                setFormData({
                    name: "",
                    phone: "",
                    subject: "",
                    message: "",
                });

                setErrors({});
            }
        } catch (error: any) {
            if (error?.data?.errors) {
                const apiErrors: Record<string, string> = {};

                Object.keys(error.data.errors).forEach((key) => {
                    apiErrors[key] = error.data.errors[key][0];
                });

                setErrors(apiErrors);
            }

            setSuccessMessage(
                error?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
        >
            {/* Success Message */}
            {successMessage && (
                <div className="rounded border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {successMessage}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-bold text-gray-800"
                    >
                        Full Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full rounded border border-gray-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-600"
                    />

                    {errors.name && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-bold text-gray-800"
                    >
                        Mobile Number
                    </label>

                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        className="w-full rounded border border-gray-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-600"
                    />

                    {errors.phone && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.phone}
                        </p>
                    )}
                </div>
            </div>

            {/* Subject */}
            <div>
                <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-bold text-gray-800"
                >
                    Subject
                </label>

                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-600"
                >
                    <option value="">Select Subject</option>
                    <option value="Member registration help">
                        Member registration help
                    </option>
                    <option value="Donation enquiry">
                        Donation enquiry
                    </option>
                    <option value="Prosthetic support">
                        Prosthetic support
                    </option>
                    <option value="Volunteer or partnership">
                        Volunteer or partnership
                    </option>
                    <option value="Other">
                        Other
                    </option>
                </select>

                {errors.subject && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.subject}
                    </p>
                )}
            </div>

            {/* Message */}
            <div>
                <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-gray-800"
                >
                    Message
                </label>

                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message"
                    className="w-full resize-none rounded border border-gray-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-600"
                />

                {errors.message && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.message}
                    </p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded bg-teal-600 px-6 py-3 font-bold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isLoading ? (
                    <>
                        <Loader2
                            size={18}
                            className="animate-spin"
                        />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message
                        <Send size={18} />
                    </>
                )}
            </button>
        </form>
    );
};

export default ContactForm;