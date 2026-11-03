import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton.tsx';

const N8N_FORM_URL = 'https://shripad4567.app.n8n.cloud/form/ff47b7a9-f7d3-44aa-a669-c6467c055bfe';

interface EnquiryFormSectionProps {
  whatsappLink?: string;
}

export const EnquiryFormSection: React.FC<EnquiryFormSectionProps> = ({ whatsappLink }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessRequirement, setBusinessRequirement] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Basic validation
    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (!businessRequirement.trim()) {
      setErrorMessage('Please describe your business requirement.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      // Map to n8n form field IDs as defined in the n8n form trigger
      formData.append('field-0', name.trim());
      formData.append('field-1', phoneNumber.trim());
      formData.append('field-2', ''); // Optional email field
      formData.append('field-3', businessRequirement.trim());
      
      // Also send descriptive field keys for downstream workflows
      formData.append('Name', name.trim());
      formData.append('Phone number', phoneNumber.trim());
      formData.append('Business Requirement', businessRequirement.trim());

      const response = await fetch(N8N_FORM_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        setName('');
        setPhoneNumber('');
        setBusinessRequirement('');
      } else {
        setErrorMessage('Failed to submit your enquiry. Please try again or reach out on WhatsApp.');
      }
    } catch (err) {
      console.error('Enquiry form submission error:', err);
      setErrorMessage('Network error occurred while sending your enquiry. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry-form" className="py-24 md:py-36 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1B2A4A]/60 block mb-3">
          Get in touch
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1B2A4A] tracking-tight">
          Request a website callback
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#1B2A4A]/75 leading-relaxed">
          Leave your details below. I will review your requirements and reach out directly.
        </p>
      </div>

      <div className="bg-[#F7F1E6] border border-[#1B2A4A]/12 rounded-[28px] p-8 sm:p-12 shadow-xs">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-10 text-center space-y-4"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-[#E8590C]/15 text-[#E8590C] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-[#1B2A4A] tracking-tight">
                Enquiry received
              </h3>
              <p className="text-base sm:text-lg text-[#1B2A4A]/80 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. I have received your request and will call you back shortly.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="text-sm font-semibold text-[#1B2A4A] underline underline-offset-4 hover:text-[#E8590C] transition-colors"
                >
                  Submit another enquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {errorMessage && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <span className="flex-1">{errorMessage}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="enquiry-name"
                  className="block text-sm font-semibold text-[#1B2A4A] mb-2"
                >
                  Name
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-[#F7F1E6] border border-[#1B2A4A]/20 focus:border-[#E8590C] focus:ring-2 focus:ring-[#E8590C]/20 rounded-xl px-4 py-3.5 text-base text-[#1B2A4A] placeholder-[#1B2A4A]/40 outline-none transition-all disabled:opacity-60"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="block text-sm font-semibold text-[#1B2A4A] mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  required
                  disabled={isSubmitting}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 9632172938"
                  className="w-full bg-[#F7F1E6] border border-[#1B2A4A]/20 focus:border-[#E8590C] focus:ring-2 focus:ring-[#E8590C]/20 rounded-xl px-4 py-3.5 text-base text-[#1B2A4A] placeholder-[#1B2A4A]/40 outline-none transition-all disabled:opacity-60"
                />
              </div>

              {/* Business Requirement */}
              <div>
                <label
                  htmlFor="enquiry-requirement"
                  className="block text-sm font-semibold text-[#1B2A4A] mb-2"
                >
                  Business Requirement
                </label>
                <textarea
                  id="enquiry-requirement"
                  required
                  rows={4}
                  disabled={isSubmitting}
                  value={businessRequirement}
                  onChange={(e) => setBusinessRequirement(e.target.value)}
                  placeholder="Briefly describe what website you need for your business (number of pages, features, or timeline)..."
                  className="w-full bg-[#F7F1E6] border border-[#1B2A4A]/20 focus:border-[#E8590C] focus:ring-2 focus:ring-[#E8590C]/20 rounded-xl px-4 py-3.5 text-base text-[#1B2A4A] placeholder-[#1B2A4A]/40 outline-none transition-all disabled:opacity-60 resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E8590C] text-[#1B2A4A] font-semibold text-base shadow-sm hover:bg-[#d44f08] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed select-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting enquiry...</span>
                    </>
                  ) : (
                    <span>Submit enquiry</span>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
