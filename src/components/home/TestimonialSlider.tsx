import React from 'react';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Student',
    quote: 'Cogneflux transformed how I study complex subjects. The visual connections helped me retain information like never before.',
    avatar: '/avatars/avatar1.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Miller',
    role: 'Professor',
    quote: 'My students have shown remarkable improvement in concept comprehension since I started using Cogneflux in my lectures.',
    avatar: '/avatars/avatar2.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Daniel Lee',
    role: 'Researcher',
    quote: 'Cogneflux helps me visualize complex relationships between different research areas, revealing insights I would have missed.',
    avatar: '/avatars/avatar3.jpg',
    rating: 4,
  },
];

const TestimonialSlider: React.FC = () => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <div 
          key={testimonial.id} 
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                className={`${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'} w-5 h-5`} 
              />
            ))}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{testimonial.quote}"</p>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              {/* Uncomment when you have actual images */}
              {/* <Image 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                width={48} 
                height={48} 
              /> */}
              <span className="text-xl font-bold">{testimonial.name[0]}</span>
            </div>
            <div>
              <h4 className="font-bold">{testimonial.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialSlider;