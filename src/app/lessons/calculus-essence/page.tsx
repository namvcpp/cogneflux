'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiPlay, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import React from 'react';

// Main lesson content in the style of 3Blue1Brown
const lessonContent = `
# The Essence of Calculus

Calculus is fundamentally about the study of change. It has two main branches: differential calculus, which studies rates of change and slopes of curves, and integral calculus, which studies accumulation of quantities.

## The Intuition Behind Derivatives

A derivative represents the instantaneous rate of change of a function with respect to one of its variables. Visually, it's the slope of the tangent line at any point on the function's graph.

Consider a curve y = f(x). As we zoom in on a particular point, the curve looks increasingly like a straight line. The derivative f'(x) gives us the slope of this line.

## The Power of Integration

Integration is the process of finding the area under a curve. It's the reverse process of differentiation.

The area under a curve f(x) from a to b is given by the definite integral:

∫(a,b) f(x) dx

This represents the accumulated change over an interval, just as derivatives represent instantaneous change at a point.

## The Fundamental Theorem of Calculus

The fundamental theorem of calculus establishes the connection between differentiation and integration.

It states that if F(x) is an antiderivative of f(x), then:

∫(a,b) f(x) dx = F(b) - F(a)

This means the area under the curve f(x) from a to b equals the difference in the values of any antiderivative F(x) evaluated at the endpoints.

## Applications in Physics

Calculus provides the mathematical framework for much of physics:
- Velocity is the derivative of position with respect to time
- Acceleration is the derivative of velocity with respect to time
- Work done by a varying force is found using integration

Understanding these connections between rates of change and accumulation is the true essence of calculus.
`;

export default function CalculusLesson() {
    const [expandedSection, setExpandedSection] = useState<string | null>('derivatives');
    
    const toggleSection = (section: string) => {
        if (expandedSection === section) {
            setExpandedSection(null);
        } else {
            setExpandedSection(section);
        }
    };
    
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 font-sans relative">
            {/* Lesson Header */}
            <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    The Essence of Calculus
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                    Understanding the fundamental concepts of calculus through visual intuition.
                </p>
            </header>
            
            {/* Main lesson content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left sidebar with sections */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4 bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                        <h3 className="text-lg font-semibold mb-4">Lesson Sections</h3>
                        <nav className="space-y-2">
                            {[
                                { id: 'introduction', name: 'Introduction' },
                                { id: 'derivatives', name: 'Understanding Derivatives' },
                                { id: 'integration', name: 'The Power of Integration' },
                                { id: 'fundamental-theorem', name: 'Fundamental Theorem of Calculus' },
                                { id: 'applications', name: 'Applications in Physics' }
                            ].map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => setExpandedSection(section.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors 
                                        ${expandedSection === section.id 
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {section.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
                
                {/* Main content */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Introduction Section */}
                    <section id="introduction" className="scroll-mt-20">
                        <h2 className="text-3xl font-bold mb-4">Introduction to Calculus</h2>
                        <div className="prose dark:prose-invert max-w-none">
                            <p>
                                Calculus is fundamentally about the study of change. It provides a framework
                                for modeling systems in which change occurs, and a way to deduce the predictions
                                of such models.
                            </p>
                            
                            <div className="my-6 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <div className="aspect-video relative">
                                    <Image
                                        src="/images/calculus-intro.png"
                                        alt="Visualization of calculus concepts"
                                        width={800}
                                        height={450}
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="p-4 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                                            <FiPlay size={24} />
                                        </button>
                                    </div>
                                </div>
                                <div className="py-2 px-3 text-sm text-gray-600 dark:text-gray-300">
                                    Visual introduction to the key ideas of calculus
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Derivatives Section */}
                    <section id="derivatives" className="scroll-mt-20">
                        <button 
                            className="flex items-center justify-between w-full text-left"
                            onClick={() => toggleSection('derivatives')}
                        >
                            <h2 className="text-3xl font-bold">Understanding Derivatives</h2>
                            {expandedSection === 'derivatives' ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        
                        {expandedSection === 'derivatives' && (
                            <div className="mt-4 prose dark:prose-invert max-w-none">
                                <p>
                                    A derivative represents the instantaneous rate of change of a function with respect
                                    to one of its variables. Visually, it's the slope of the tangent line at any
                                    point on the function's graph.
                                </p>
                                
                                <div className="my-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4">
                                    <h4 className="text-xl font-semibold mb-2">Key Insight</h4>
                                    <p>
                                        As we zoom in on a curve at a point, it looks increasingly like a straight line.
                                        The derivative gives us the slope of this line.
                                    </p>
                                </div>
                                
                                <div className="my-6 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <div className="aspect-video relative">
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                            <p className="text-center text-gray-500 dark:text-gray-400">
                                                [Interactive derivative visualization]
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold mt-8">Mathematical Definition</h3>
                                <p>
                                    The derivative of a function f(x) is defined as:
                                </p>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 my-4 rounded-lg overflow-x-auto">
                                    <code className="text-lg">
                                        f'(x) = lim<sub>h→0</sub> (f(x+h) - f(x)) / h
                                    </code>
                                </div>
                                <p>
                                    This represents the limit of the average rate of change as the time interval approaches zero.
                                </p>
                            </div>
                        )}
                    </section>
                    
                    {/* Integration Section */}
                    <section id="integration" className="scroll-mt-20">
                        <button 
                            className="flex items-center justify-between w-full text-left"
                            onClick={() => toggleSection('integration')}
                        >
                            <h2 className="text-3xl font-bold">The Power of Integration</h2>
                            {expandedSection === 'integration' ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        
                        {expandedSection === 'integration' && (
                            <div className="mt-4 prose dark:prose-invert max-w-none">
                                <p>
                                    Integration is the process of finding the area under a curve. While derivatives
                                    give us instantaneous rates of change, integrals give us accumulated change.
                                </p>
                                
                                <div className="my-6 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <div className="aspect-video relative">
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                            <p className="text-center text-gray-500 dark:text-gray-400">
                                                [Interactive integration visualization]
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold mt-8">Definite Integrals</h3>
                                <p>
                                    The definite integral of a function f(x) from a to b represents the area under
                                    the curve between x = a and x = b:
                                </p>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 my-4 rounded-lg overflow-x-auto">
                                    <code className="text-lg">
                                        ∫<sub>a</sub><sup>b</sup> f(x) dx
                                    </code>
                                </div>
                            </div>
                        )}
                    </section>
                    
                    {/* Other sections */}
                    {/* ...similar sections for Fundamental Theorem and Applications... */}
                </div>
            </div>
        </div>
    );
}
