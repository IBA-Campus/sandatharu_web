import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Palette, Sprout, Clock } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: "Freshness Guaranteed",
    desc: "Flowers harvested at dawn and delivered within hours to ensure maximum freshness and longevity."
  },
  {
    icon: Palette,
    title: "Custom Designs",
    desc: "Every arrangement is crafted to match your vision, from traditional poruwa to modern wedding aesthetics."
  },
  {
    icon: Sprout,
    title: "Eco-Friendly Sourcing",
    desc: "Sustainably grown on our organic farms with environmentally responsible practices throughout."
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Reliable delivery across Kandy, Colombo, and island-wide with careful handling for every order."
  }
];

const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-rose-soft to-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="heading-serif text-4xl md:text-5xl text-emerald-deep"
          >
            Why Choose Sandatharu Agro
          </motion.h2>
        </div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-glass hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-forest/10 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-amber-warm/20">
                <feature.icon className="w-7 h-7 text-emerald-forest transition-colors duration-300 group-hover:text-amber-warm" />
              </div>
              <h3 className="text-xl font-bold text-emerald-deep mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
