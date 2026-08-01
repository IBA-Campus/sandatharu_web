import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building, Flower2, Sprout, Award, Leaf, Sparkles } from 'lucide-react';

const Counter = ({ target, suffix, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const duration = 2000;
      
      // easeOutExpo easing function
      const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        setCount(Math.floor(easeOutExpo(progress) * target));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center">
      <Icon className="w-12 h-12 text-amber-warm mb-4" />
      <div className="text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-white/70 text-lg font-medium">{label}</div>
    </div>
  );
};

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Uncompromising Quality',
      desc: 'Every floral installation undergoes rigorous quality checks. We use only the freshest, hand-selected blooms to ensure lasting beauty in every space we style.'
    },
    {
      icon: Leaf,
      title: 'Sustainability First',
      desc: 'From our organic farms to biodegradable packaging, every step of our process is designed to minimize environmental impact and promote ecological balance.'
    },
    {
      icon: Sparkles,
      title: 'Luxury Aesthetic',
      desc: 'We blend contemporary international design trends with Sri Lanka\'s rich botanical heritage to create installations that feel both globally refined and locally authentic.'
    }
  ];

  return (
    <div className="w-full">
      {/* Section 1: Brand Story (Hero-like intro) */}
      <section className="w-full py-32 bg-gradient-to-r from-emerald-deep to-emerald-forest flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="heading-serif text-white text-5xl md:text-6xl mb-4">
            Our Story
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-light">
            Where Eco-Tourism Agriculture Meets Luxury Hotel Floral Styling
          </p>
        </motion.div>
      </section>

      {/* Section 2: Story Content */}
      <section className="w-full py-24 bg-cream px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Images */}
          <div className="relative w-full h-[500px] flex justify-center items-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              src="/Flower/3.jpeg"
              alt="Hotel Lobby Styling"
              className="absolute w-4/5 h-4/5 object-cover rounded-2xl -rotate-2 shadow-lg z-10 top-0 left-0"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              src="/kothmale/2.jpeg"
              alt="Our Farm"
              className="absolute w-3/5 h-3/5 object-cover rounded-2xl rotate-2 shadow-2xl z-20 bottom-0 right-0 border-4 border-white"
            />
          </div>

          {/* Right Column: Text */}
          <div className="flex flex-col space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="heading-serif text-3xl md:text-4xl text-emerald-deep"
            >
              Crafting Botanical Elegance for Hospitality & Nature
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600 leading-relaxed"
            >
              Sandatharu Agro was born from a vision to bridge two beautiful worlds — the refined elegance of luxury hospitality and the raw, sustainable beauty of eco-tourism agriculture. Based in the serene landscapes near Kandy, we cultivate premium flowers using organic farming practices.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 leading-relaxed"
            >
              Our team of skilled botanical designers work closely with hotels, resorts, and eco-tourism ventures to create stunning fresh floral installations that elevate guest experiences while championing environmental sustainability.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 leading-relaxed font-medium"
            >
              From transforming five-star hotel lobbies with breathtaking botanical arrangements to showcasing sustainable agriculture through immersive farm-tour experiences, Sandatharu Agro is redefining how nature meets luxury.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section 3: Animated Counters */}
      <section className="w-full py-20 bg-emerald-deep px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <Counter target={50} suffix="+" label="Luxury Hotels Styled" icon={Building} />
          <Counter target={1000} suffix="+" label="Fresh Harvests Delivered" icon={Flower2} />
          <Counter target={100} suffix="%" label="Eco-Friendly Agriculture" icon={Sprout} />
        </div>
      </section>

      {/* Section 4: Values Grid */}
      <section className="w-full py-24 bg-cream px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="heading-serif text-4xl text-center text-emerald-deep mb-16"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-white rounded-2xl p-8 shadow-glass hover:shadow-glass-lg hover:scale-105 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-forest/20 to-emerald-deep/20 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-emerald-forest" />
                </div>
                <h3 className="heading-serif text-2xl text-emerald-deep mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
