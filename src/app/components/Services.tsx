import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Code, Palette, BarChart, Cloud, Smartphone, Lock } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with the latest technologies and best practices.',
    features: ['React & TypeScript', 'Responsive Design', 'Performance Optimized'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: ['React Native', 'Native Performance', 'App Store Ready'],
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment solutions for your business.',
    features: ['AWS & Azure', 'Auto-scaling', '99.9% Uptime'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that delight users and drive engagement.',
    features: ['User Research', 'Prototyping', 'Design Systems'],
  },
  {
    icon: BarChart,
    title: 'Analytics',
    description: 'Comprehensive analytics and reporting to make informed business decisions.',
    features: ['Real-time Data', 'Custom Dashboards', 'Predictive Insights'],
  },
  {
    icon: Lock,
    title: 'Security',
    description: 'Enterprise-grade security solutions to protect your data and users.',
    features: ['Encryption', 'Compliance', '24/7 Monitoring'],
  },
];

export const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-6">
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
