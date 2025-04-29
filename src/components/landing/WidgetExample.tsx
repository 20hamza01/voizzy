
import React from "react";
import { StarIcon, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const WidgetExample = () => {
  return (
    <div className="bg-gradient-to-r from-sky-50 to-white py-24 overflow-hidden relative">
      <div className="absolute w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -top-32 -right-32 animate-pulse-slow"></div>
      <div className="absolute w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bottom-0 left-20 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <span className="inline-block text-base font-semibold leading-7 text-sky-600">Easy to integrate</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Showcase testimonials anywhere on your site
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our floating widget displays your testimonials in a beautiful, attention-grabbing format that doesn't disrupt the user experience.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Browser mockup */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 animate-float-up">
              {/* Browser header */}
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="ml-4 bg-white rounded-md flex-1 h-6 flex items-center px-3">
                  <span className="text-xs text-gray-400">yourwebsite.com</span>
                </div>
              </div>
              
              {/* Website content mockup */}
              <div className="p-4 bg-white relative min-h-[400px]">
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-4"></div>
                <div className="w-3/4 h-6 bg-gray-200 rounded-md mb-3"></div>
                <div className="w-full h-4 bg-gray-100 rounded-md mb-2"></div>
                <div className="w-full h-4 bg-gray-100 rounded-md mb-2"></div>
                <div className="w-5/6 h-4 bg-gray-100 rounded-md mb-6"></div>
                
                <div className="w-full h-40 bg-gray-100 rounded-lg mb-6"></div>
                <div className="w-2/3 h-6 bg-gray-200 rounded-md mb-3"></div>
                <div className="w-full h-4 bg-gray-100 rounded-md mb-2"></div>
                <div className="w-full h-4 bg-gray-100 rounded-md mb-2"></div>
                
                {/* Widget button */}
                <div className="absolute bottom-6 right-6">
                  <div className="relative">
                    <button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg animate-pulse">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {/* Widget popup */}
                    <div className="absolute bottom-16 right-0 w-80 max-w-xs shadow-xl rounded-lg bg-white border border-gray-100 transform transition-all animate-scale-in">
                      <div className="p-4">
                        <h3 className="font-medium text-base text-center text-sky-500 mb-4">Wall of love</h3>
                        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                          {/* Testimonial items */}
                          {[1, 2, 3].map((i) => (
                            <Card key={i} className="border-none shadow-sm">
                              <CardContent className="p-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>U{i}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-2">
                                      <p className="text-sm font-medium">User {i}</p>
                                      <div className="flex">
                                        {[...Array(5)].map((_, star) => (
                                          <StarIcon 
                                            key={star} 
                                            className={`h-3 w-3 ${star < 5 ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} 
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600 mt-2">
                                  {i === 1 && "This product has completely transformed our workflow. Highly recommend!"}
                                  {i === 2 && "Easy to use and the customer support is absolutely fantastic."}
                                  {i === 3 && "Great value for money. We've seen a 40% increase in conversions."}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100 text-center text-xs text-gray-500">
                          Powered by Voizzy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature points */}
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Boost credibility with social proof</h3>
            
            <div className="space-y-5">
              {[
                {
                  title: "Floating Widget",
                  desc: "Non-intrusive testimonial widget that appears when visitors click, without interrupting their browsing experience."
                },
                {
                  title: "Curated Reviews",
                  desc: "Show only your best testimonials to maximize impact and conversions."
                },
                {
                  title: "Multiple Display Options",
                  desc: "Choose between floating widget, embedded wall, or inline testimonials to fit your website design."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-sky-100 rounded-full p-2 flex-shrink-0">
                    <Check className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetExample;
