
(function() {
  // Prevent multiple instances
  if (window.VoizzyWidget) {
    console.warn("Voizzy Widget already initialized");
    return;
  }
  
  window.VoizzyWidget = {
    initialized: true
  };

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

  // Create container for the widget
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  // Create floating message
  const message = document.createElement('div');
  message.className = 'widget-message';
  message.innerHTML = 'See what others are saying.';
  message.style.position = 'fixed';
  message.style.bottom = '70px';
  message.style.right = '70px';
  message.style.backgroundColor = '#0EA5E9';  // Changed to blue
  message.style.color = 'white';
  message.style.padding = '10px 16px';
  message.style.borderRadius = '20px';
  message.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  message.style.fontSize = '13px';
  message.style.fontWeight = '500';
  message.style.maxWidth = '220px';
  message.style.opacity = '0';
  message.style.transform = 'translateY(10px)';
  message.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  message.style.pointerEvents = 'none';
  message.style.display = 'flex';
  message.style.alignItems = 'center';
  message.style.gap = '8px';
  message.style.lineHeight = '1.4';

  // Responsive adjustments
  message.innerHTML += `
    <style>
      @media (max-width: 640px) {
        .widget-message {
          right: 60px !important;
          bottom: 65px !important;
          font-size: 12px !important;
          padding: 8px 14px !important;
        }
      }
    </style>
  `;

  // Add chat bubble icon using SVG
  const bubbleIcon = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  message.innerHTML = bubbleIcon + message.innerHTML;

  container.appendChild(message);

  // Create iframe for testimonials content
  const iframe = document.createElement('iframe');
  iframe.src = `${currentScript.src.substring(0, currentScript.src.lastIndexOf('/'))}/widget/${userId}?limit=${limit}&theme=${theme}`;
  iframe.style.position = 'fixed';
  iframe.style.bottom = '80px';
  iframe.style.right = '20px';
  iframe.style.width = '350px';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';
  iframe.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  iframe.style.display = 'none';
  iframe.style.opacity = '0';
  iframe.style.transform = 'scale(0.95)';
  iframe.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  container.appendChild(iframe);

  // Create toggle button
  const button = document.createElement('button');
  button.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.width = '48px';
  button.style.height = '48px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#0EA5E9'; // Changed to blue
  button.style.color = '#ffffff';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
  button.style.transition = 'transform 0.2s ease';
  container.appendChild(button);

  // Add hover effect
  button.addEventListener('mouseover', () => {
    button.style.transform = 'scale(1.05)';
  });
  button.addEventListener('mouseout', () => {
    button.style.transform = 'scale(1)';
  });

  // Show message with animation after a short delay
  setTimeout(() => {
    message.style.opacity = '1';
    message.style.transform = 'translateY(0)';
  }, 1000);

  // Toggle iframe visibility and hide message
  let isOpen = false;
  button.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      iframe.style.display = 'block';
      // Force reflow
      iframe.offsetHeight;
      iframe.style.opacity = '1';
      iframe.style.transform = 'scale(1)';
      message.style.opacity = '0';
      message.style.transform = 'translateY(10px)';
      button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    } else {
      iframe.style.opacity = '0';
      iframe.style.transform = 'scale(0.95)';
      setTimeout(() => {
        iframe.style.display = 'none';
      }, 300);
      button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
  });
})();
