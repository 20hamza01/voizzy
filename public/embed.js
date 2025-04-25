
(function() {
  // Find the script tag that includes this script
  const scripts = document.getElementsByTagName('script');
  const currentScript = document.currentScript || scripts[scripts.length - 1];
  
  // Get attributes from the script tag
  const userId = currentScript.getAttribute('data-user');
  const limit = currentScript.getAttribute('data-limit') || '3';
  const layout = currentScript.getAttribute('data-layout') || 'grid';

  if (!userId) {
    console.error("Voizzy Testimonials: data-user attribute is required");
    return;
  }

  // Find the container element or create one
  let container = document.getElementById('voizzy-testimonials');
  if (!container) {
    container = document.createElement('div');
    container.id = 'voizzy-testimonials';
    currentScript.parentNode.insertBefore(container, currentScript);
  }

  // Set loading state
  container.innerHTML = '<div style="display: flex; justify-content: center; padding: 20px;"><div style="border: 3px solid rgba(0,0,0,0.1); border-radius: 50%; border-top: 3px solid #3498db; width: 30px; height: 30px; animation: voizzy-spin 1s linear infinite;"></div></div>';
  container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';
  
  // Add the animation style
  const styleElement = document.createElement('style');
  styleElement.textContent = `@keyframes voizzy-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
  document.head.appendChild(styleElement);

  // Fetch testimonials from the API
  const baseUrl = currentScript.src.replace('/embed.js', '');
  const apiUrl = `${baseUrl}/embed/${userId}?limit=${limit}&layout=${layout}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      // Extract just the testimonials container from the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const testimonialContainer = doc.querySelector('.bg-gray-50');
      
      if (testimonialContainer) {
        container.innerHTML = '';
        container.appendChild(testimonialContainer);
      } else {
        throw new Error('Could not find testimonials in response');
      }
    })
    .catch(error => {
      console.error('Error loading Voizzy testimonials:', error);
      container.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Unable to load testimonials</div>';
    });
})();
