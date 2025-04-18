import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-primary-100">
              Have questions about Furniture Hub? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email Us</h3>
              <a href="mailto:info@furniturehub.eg" className="text-primary-600 hover:text-primary-800">
                info@furniturehub.eg
              </a>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Call Us</h3>
              <a href="tel:+20123456789" className="text-secondary-600 hover:text-secondary-800">
                +20 12 345 6789
              </a>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visit Us</h3>
              <p className="text-gray-700">
                123 Furniture District, Cairo, Egypt
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                {isSuccess ? (
                  <div className="bg-success-50 text-success-800 p-4 rounded-lg mb-6 text-center">
                    <p className="font-medium">Thank you for your message!</p>
                    <p className="mt-1">We'll get back to you as soon as possible.</p>
                    <Button 
                      className="mt-4"
                      onClick={() => setIsSuccess(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="bg-error-50 text-error-800 p-4 rounded-lg mb-6">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Tell us how we can assist you..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Button 
                        type="submit" 
                        isLoading={isSubmitting}
                        className="flex items-center"
                      >
                        <Send size={16} className="mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">How do I create an account?</h3>
                <p className="text-gray-600">
                  To create an account, click on the "Sign In" button in the top-right corner of the page, then select "Sign up" on the login page. Follow the instructions to complete your registration.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">Is it free to join Furniture Hub?</h3>
                <p className="text-gray-600">
                  Yes, basic membership is completely free. We also offer premium features for businesses looking for enhanced visibility and additional functionality.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">How do I update my profile information?</h3>
                <p className="text-gray-600">
                  After logging in, visit your Dashboard and select "Edit Profile" to update your information, add images, and more.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">Can I list multiple businesses on one account?</h3>
                <p className="text-gray-600">
                  Currently, each account is associated with one business profile. If you need to list multiple businesses, you'll need separate accounts for each.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}