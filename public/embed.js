
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
  
  // Add the animation style
  const styleElement = document.createElement('style');
  styleElement.textContent = `@keyframes voizzy-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
  document.head.appendChild(styleElement);

  // Fetch testimonials from the API
  const baseUrl = currentScript.src.replace('/embed.js', '');
  // Request HTML format specifically for the script embed
  const apiUrl = `${baseUrl}/functions/get-public-testimonials?userId=${userId}&limit=${limit}&layout=${layout}&format=html`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text(); // Get response as text since we're expecting HTML
    })
    .then(html => {
      // Set the HTML directly since we're now getting formatted HTML from the server
      container.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading Voizzy testimonials:', error);
      container.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Unable to load testimonials</div>';
    });
})();
