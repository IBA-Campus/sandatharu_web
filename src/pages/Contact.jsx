import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, MessageCircle, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          name: '',
          phone: '',
          service: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', detail: '+94 77 230 6876' },
    { icon: MapPin, title: 'Location', detail: 'No 86, Mahaweli Breeze, Udathenna, Gurudeniya' },
    { icon: Mail, title: 'Email', detail: 'sandatharuagro@gmail.com' },
    { icon: Clock, title: 'Hours', detail: 'Mon-Sat: 7:00 AM - 7:00 PM' }
  ];

  return (
    <main className="w-full bg-cream min-h-screen">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-emerald-deep to-emerald-forest relative overflow-hidden pt-32">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-serif text-white text-5xl mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto text-lg"
          >
            We would love to hear from you. Reach out for hotel interior decor or eco-tourism agriculture inquiries.
          </motion.p>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
          <div className="blob-green absolute top-[-10%] left-[-10%] w-[40%] h-[60%]"></div>
          <div className="blob-gold absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%]"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Column (Contact Info Cards) */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 flex items-center space-x-4 border border-white/50"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-forest/10 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-emerald-forest" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-deep text-lg">{info.title}</h3>
                  <p className="text-gray-600">{info.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column (Inquiry Form) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-2xl shadow-glass-lg p-8 relative overflow-hidden"
          >
            <h2 className="heading-serif text-2xl text-emerald-deep mb-8">Send Us an Inquiry</h2>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-emerald-forest/10 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-forest" />
                  </motion.div>
                  <h3 className="heading-serif text-2xl text-emerald-deep mb-2">Thank you!</h3>
                  <p className="text-gray-600">We'll get back to you soon.</p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="float-input-group relative">
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder=" " 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="peer w-full px-4 pt-6 pb-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-forest focus:ring-1 focus:ring-emerald-forest transition-colors"
                  />
                  <label htmlFor="name" className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-forest peer-valid:top-2 peer-valid:text-xs">
                    Full Name
                  </label>
                </div>

                <div className="float-input-group relative">
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder=" " 
                    required 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="peer w-full px-4 pt-6 pb-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-forest focus:ring-1 focus:ring-emerald-forest transition-colors"
                  />
                  <label htmlFor="phone" className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-forest peer-valid:top-2 peer-valid:text-xs">
                    Phone Number
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="service" className="text-sm text-gray-600 ml-1">Service Needed</label>
                  <select 
                    id="service" 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-forest focus:ring-1 focus:ring-emerald-forest transition-colors"
                  >
                    <option value="" disabled>Select a Service</option>
                    <option value="Hotel Interior Decor">Hotel Interior Decor</option>
                    <option value="Eco Tourism Agriculture">Eco Tourism Agriculture</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              <div className="float-input-group relative h-full">
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder=" " 
                  rows="4" 
                  required 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="peer w-full px-4 pt-6 pb-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-forest focus:ring-1 focus:ring-emerald-forest transition-colors resize-none"
                ></textarea>
                <label htmlFor="message" className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-forest peer-valid:top-2 peer-valid:text-xs">
                  Message
                </label>
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full btn-gold rounded-lg py-4 flex items-center justify-center space-x-2 relative disabled:opacity-80 disabled:cursor-not-allowed overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {status === 'sending' ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-amber-warm"
                    >
                      <Loader2 className="w-6 h-6 text-emerald-deep animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <span>Send Inquiry</span>
                      <Send className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* Floating WhatsApp CTA */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse-ring opacity-50 pointer-events-none"></div>
        <a 
          href="https://wa.me/94772306876" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-10"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-white px-3 py-1.5 rounded-lg shadow-md text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Chat with us
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
        </div>
      </div>
    </main>
  );
}
