
(function() {
  // Find the script tag that includes this script
  const scripts = document.getElementsByTagName('script');
  const currentScript = document.currentScript || scripts[scripts.length - 1];
  
  // Get attributes from the script tag
  const userId = currentScript.getAttribute('data-user');
  const limit = currentScript.getAttribute('data-limit') || '3';
  const theme = currentScript.getAttribute('data-theme') || 'light';

  if (!userId) {
    console.error("Voizzy Widget: data-user attribute is required");
    return;
  }

  // Create iframe element
  const iframe = document.createElement('iframe');
  iframe.src = `${currentScript.src.substring(0, currentScript.src.lastIndexOf('/'))}}/widget/${userId}?limit=${limit}&theme=${theme}`;
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '350px';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.zIndex = '9999';
  iframe.style.overflow = 'hidden';
  
  // Append iframe to the document body
  document.body.appendChild(iframe);
})();
