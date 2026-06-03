"use client";

import { useState } from "react";
import { ArrowRight, Loader2, X } from "lucide-react";
import { useRegisterForEventMutation } from "@/lib/services/events-api";

interface RegisterPopupProps {
    eventId: number;
}

const RegisterPopup = ({ eventId }: RegisterPopupProps) => {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [successMessage, setSuccessMessage] = useState("");

    const [register, { isLoading }] = useRegisterForEventMutation();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (errors[e.target.name]) {
            setErrors((prev) => ({
                ...prev,
                [e.target.name]: [],
            }));
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setErrors({});
        setSuccessMessage("");

        try {
            const response = await register({
                event_id: eventId.toString(),
                ...formData,
            })?.unwrap();


            setSuccessMessage("Registration completed successfully!");

            setFormData({
                name: "",
                email: "",
                phone: "",
            });



        } catch (error: any) {
            setSuccessMessage(error?.data?.message ?? "Something Went Wrong! Please Try Again");
        } finally {
            setTimeout(() => {
                setOpen(false);
                setSuccessMessage("");
            }, 1500);
        };
    }

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-teal-700 transition hover:bg-teal-600 hover:text-white"
            >
                Register Now
                <ArrowRight size={18} />
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

                    <div className="relative w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-2xl">

                        {/* Close */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-100 hover:text-red-500"
                        >
                            <X size={20} />
                        </button>

                        <div>
                            <h2 className="text-3xl font-black text-gray-900">
                                Event Registration
                            </h2>

                            <p className="mt-3 text-gray-600">
                                Fill in your details to reserve your spot for this event.
                            </p>
                        </div>

                        {/* Success */}
                        {successMessage && (
                            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                {successMessage}
                            </div>
                        )}

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6"
                        >
                            {/* Name */}
                            <div className="flex flex-col text-start">
                                <label className="mb-2 block text-start text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-teal-500"
                                />

                                {errors.name?.[0] && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.name[0]}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col text-start">
                                <label className="mb-2 block text-sm text-start font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-teal-500"
                                />

                                {errors.email?.[0] && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.email[0]}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col text-start">
                                <label className="mb-2 block text-start text-sm font-semibold text-gray-700">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-teal-500"
                                />

                                {errors.phone?.[0] && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.phone[0]}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-6 py-4 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Register Now
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};


export default RegisterPopup;