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
    <div className="grid gap-10 md:grid-cols-3">
      {testimonials.map((testimonial) => (
      <div
        key={testimonial.id}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="flex mb-5">
        {[...Array(5)].map((_, i) => (
          <FiStar
          key={i}
          className={`${
            i < testimonial.rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
          } w-5 h-5`}
          />
        ))}
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed before:content-['“'] before:mr-1 before:font-serif before:text-2xl before:text-gray-400 dark:before:text-gray-600 after:content-['”'] after:ml-1 after:font-serif after:text-2xl after:text-gray-400 dark:after:text-gray-600">
        {testimonial.quote}
        </p>

        <div className="flex items-center">
        <div className="w-14 h-14 rounded-full overflow-hidden mr-4 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
          {/* Uncomment when you have actual images */}
          {/* <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={56}
          height={56}
          className="object-cover"
          /> */}
          <span className="text-2xl font-semibold">{testimonial.name[0]}</span>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{testimonial.role}</p>
        </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default TestimonialSlider;