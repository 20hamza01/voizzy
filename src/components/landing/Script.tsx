
import React, { useEffect } from "react";

const Script = () => {
  useEffect(() => {
    // Function to check if an element is in viewport
    const isInViewport = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    };

    // Function to handle scroll animations
    const handleScrollAnimation = () => {
      const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
      
      scrollRevealElements.forEach((element) => {
        if (isInViewport(element) && !element.classList.contains('revealed')) {
          element.classList.add('revealed');
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Initial check for elements in viewport
    handleScrollAnimation();

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  return null;
};

export default Script;
