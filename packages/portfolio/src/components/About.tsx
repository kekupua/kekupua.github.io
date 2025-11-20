import React from 'react';
import { ABOUT_TEXT } from '../lib/data';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white text-left">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Large Image */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-brand-600 rounded-2xl transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
              <img
                src="/images/sue_sean2.jpg"
                alt="Me and my wife"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium">Myself and my wife, Sue</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-3">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              More than just code.
            </h3>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed flex flex-col gap-6">
              {ABOUT_TEXT.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="flex gap-8">
                <div>
                  <span className="block text-3xl font-bold text-brand-600">10+</span>
                  <span className="text-sm text-slate-500">Years Exp.</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-brand-600">100%</span>
                  <span className="text-sm text-slate-500">Commitment</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-brand-600">∞</span>
                  <span className="text-sm text-slate-500">Impact</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

