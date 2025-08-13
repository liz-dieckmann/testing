/**
 * Tailwind MFE Loader - Production Ready
 * 
 * Deploy as sibling to tailwind-mfe folder:
 * /files/RepWebFileLibrary/
 * ├── tailwindMFE.js          ← THIS FILE
 * └── tailwind-mfe/           ← Bundle folder
 *     └── dist/assets/         ← Assets
 * 
 * Usage:
 * <div id="tailwind-mfe-container"></div>
 * <script src="http://nor-vltrx-t02.htseng.com/files/RepWebFileLibrary/tailwindMFE.js"></script>
 */

(function() {
  'use strict';
  
  console.log('🚀 Tailwind MFE Loader starting...');
  
  const CONTAINER_ID = 'tailwind-mfe-container';
  
  // Production configuration - current build assets
  const CONFIG = {
    baseUrl: 'http://nor-vltrx-t02.htseng.com/files/RepWebFileLibrary',
    css: 'style-BBk5VI_e.css',
    bootstrap: '__federation_expose_Mount-BlhroOrS.js',
    mfeFolder: 'tailwind-mfe'
  };
  
  function showSpinner(container) {
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; padding: 40px; font-family: system-ui, sans-serif; color: #666;">
        <div style="width: 20px; height: 20px; border: 2px solid #e5e7eb; border-top: 2px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 12px;"></div>
        Loading Tailwind MFE...
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
      </div>
    `;
  }
  
  function showError(container, message, details = '') {
    container.innerHTML = `
      <div style="padding: 20px; border: 1px solid #fecaca; border-radius: 8px; background-color: #fef2f2; font-family: system-ui, sans-serif; color: #dc2626; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">❌ Tailwind MFE Loading Failed</h3>
        <p style="margin: 0 0 10px 0; font-size: 14px;">${message}</p>
        ${details ? `<details style="margin-top: 10px;"><summary style="cursor: pointer; font-size: 12px; color: #7f1d1d;">Technical Details</summary><pre style="margin: 10px 0 0 0; padding: 10px; background: #fee2e2; border-radius: 4px; font-size: 11px; overflow-x: auto;">${details}</pre></details>` : ''}
      </div>
    `;
  }
  
  function loadCSS(cssUrl) {
    return new Promise((resolve, reject) => {
      console.log('📄 Loading CSS:', cssUrl);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssUrl;
      link.onload = () => {
        console.log('✅ CSS loaded successfully');
        resolve();
      };
      link.onerror = (error) => {
        console.error('❌ CSS failed to load:', error);
        reject(new Error(`CSS failed to load: ${cssUrl}`));
      };
      document.head.appendChild(link);
    });
  }
  
  async function loadMFE() {
    const container = document.getElementById(CONTAINER_ID);
    if (!container) {
      console.error(`❌ Container element #${CONTAINER_ID} not found`);
      return;
    }
    
    try {
      showSpinner(container);
      
      // Load CSS first
      const cssUrl = `${CONFIG.baseUrl}/${CONFIG.mfeFolder}/dist/assets/${CONFIG.css}`;
      await loadCSS(cssUrl);
      
      // Load bootstrap module
      const bootstrapUrl = `${CONFIG.baseUrl}/${CONFIG.mfeFolder}/dist/assets/${CONFIG.bootstrap}`;
      console.log('📦 Loading bootstrap module:', bootstrapUrl);
      
      const module = await import(bootstrapUrl);
      console.log('✅ Bootstrap module loaded:', module);
      
      // Get mount function
      const mount = module.mount || module.default?.mount || module.default;
      if (!mount) {
        throw new Error('Mount function not found in bootstrap module');
      }
      
      console.log('🎯 Mounting MFE to container...');
      const result = mount(container);
      
      if (result) {
        console.log('🎉 Tailwind MFE mounted successfully!');
      } else {
        throw new Error('Mount function returned null/undefined');
      }
      
    } catch (error) {
      console.error('❌ MFE loading failed:', error);
      
      // Check if it's a CORS error
      if (error.message.includes('CORS') || 
          error.message.includes('cross-origin') ||
          error.message.includes('Failed to fetch') ||
          error.name === 'TypeError') {
        
        showError(container, 
          'Cross-origin request blocked by browser security policy.',
          `The static file server needs CORS headers for JavaScript files.

Server Configuration Needed:
Add these headers for .js files on ${CONFIG.baseUrl}:

Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS

Contact your server administrator to add these headers.

Error: ${error.message}`
        );
      } else {
        showError(container, 
          'Failed to load microfrontend.',
          `Error: ${error.message}`
        );
      }
    }
  }
  
  // Auto-load when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMFE);
  } else {
    loadMFE();
  }
  
})();
