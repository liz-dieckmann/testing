/**
 * CORS Workaround MFE Loader - Uses Script Tags Instead of ES Modules
 * 
 * This loader bypasses CORS issues by using traditional script tags
 * instead of ES module imports, which don't require CORS headers.
 */

(function() {
  'use strict';
  
  console.log('🚀 CORS Workaround MFE Loader starting...');
  
  const CONTAINER_ID = 'tailwind-mfe-container';
  
  // Hardcoded configuration
  const HARDCODED_CONFIG = {
    baseUrl: 'http://nor-vltrx-t02.htseng.com/files/RepWebFileLibrary',
    css: 'style-DQMKYuWw.css',
    bootstrap: '__federation_expose_Mount-lj_xqXyM.js',
    mfeFolder: 'tailwind-mfe'
  };
  
  /**
   * Load CSS with promise
   */
  function loadCSS(url) {
    return new Promise((resolve, reject) => {
      console.log('🎨 Loading CSS:', url);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => {
        console.log('✅ CSS loaded successfully');
        resolve();
      };
      link.onerror = () => {
        console.error('❌ CSS failed to load');
        reject(new Error('CSS loading failed'));
      };
      document.head.appendChild(link);
    });
  }
  
  /**
   * Load JavaScript with script tag (bypasses CORS for modules)
   */
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      console.log('📥 Loading script:', url);
      const script = document.createElement('script');
      script.src = url;
      script.type = 'module'; // Still use module type but via script tag
      script.onload = () => {
        console.log('✅ Script loaded successfully');
        resolve();
      };
      script.onerror = () => {
        console.error('❌ Script failed to load');
        reject(new Error('Script loading failed'));
      };
      document.head.appendChild(script);
    });
  }
  
  /**
   * Wait for global mount function to be available
   */
  function waitForMount(timeout = 10000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      function checkMount() {
        // Check if the mount function is available globally
        if (window.__MFE_MOUNT__) {
          console.log('✅ Mount function found');
          resolve(window.__MFE_MOUNT__);
          return;
        }
        
        // Check for federation runtime
        if (window.__webpack_require__ && window.__webpack_require__.cache) {
          console.log('✅ Webpack runtime detected, trying to find mount...');
          // Try to find the mount function in the webpack cache
          const cache = window.__webpack_require__.cache;
          for (const key in cache) {
            const module = cache[key];
            if (module && module.exports && module.exports.mount) {
              console.log('✅ Mount function found in webpack cache');
              resolve(module.exports.mount);
              return;
            }
          }
        }
        
        if (Date.now() - startTime > timeout) {
          reject(new Error('Mount function not found within timeout'));
          return;
        }
        
        setTimeout(checkMount, 100);
      }
      
      checkMount();
    });
  }
  
  /**
   * Show error message in container
   */
  function showError(container, message, details = '') {
    container.innerHTML = `
      <div style="
        padding: 20px; 
        border: 2px solid #ef4444; 
        border-radius: 8px; 
        background: #fef2f2; 
        color: #dc2626;
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 20px auto;
      ">
        <h3 style="margin: 0 0 10px 0; color: #dc2626;">⚠️ Microfrontend Loading Failed</h3>
        <p style="margin: 0 0 10px 0; font-size: 14px;">${message}</p>
        ${details ? `<details style="margin-top: 10px;">
          <summary style="cursor: pointer; font-weight: bold;">Technical Details</summary>
          <pre style="margin: 10px 0; padding: 10px; background: #fee2e2; border-radius: 4px; font-size: 12px; overflow-x: auto;">${details}</pre>
        </details>` : ''}
        <div style="margin: 15px 0; padding: 10px; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 4px;">
          <h4 style="margin: 0 0 5px 0; color: #92400e;">💡 Server Configuration Needed</h4>
          <p style="margin: 0; font-size: 12px; color: #92400e;">
            The static file server needs CORS headers for JavaScript files. 
            Add <code>Access-Control-Allow-Origin: *</code> header for .js files.
          </p>
        </div>
      </div>
    `;
  }
  
  /**
   * Show loading message
   */
  function showLoading(container) {
    container.innerHTML = `
      <div style="
        padding: 20px; 
        text-align: center; 
        color: #6b7280;
        font-family: Arial, sans-serif;
      ">
        <div style="
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #e5e7eb;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 10px;
        "></div>
        Loading Microfrontend...
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </div>
    `;
  }
  
  /**
   * Main loader function
   */
  async function loadMFE() {
    const container = document.getElementById(CONTAINER_ID);
    if (!container) {
      console.error(`❌ Container #${CONTAINER_ID} not found`);
      return;
    }
    
    try {
      console.log('📦 Starting MFE loading...');
      showLoading(container);
      
      // Create asset URLs
      const cssUrl = `${HARDCODED_CONFIG.baseUrl}/${HARDCODED_CONFIG.mfeFolder}/assets/${HARDCODED_CONFIG.css}`;
      const bootstrapUrl = `${HARDCODED_CONFIG.baseUrl}/${HARDCODED_CONFIG.mfeFolder}/assets/${HARDCODED_CONFIG.bootstrap}`;
      
      console.log('🔗 Asset URLs:', { cssUrl, bootstrapUrl });
      
      // Load CSS (this should work)
      await loadCSS(cssUrl);
      
      // Try to load the bootstrap script
      try {
        await loadScript(bootstrapUrl);
        
        // Wait for mount function to be available
        const mountFunction = await waitForMount();
        
        // Add scoping class
        container.classList.add('tailwind-mfe-scope');
        console.log('✅ Added CSS scoping class');
        
        // Clear loading message
        container.innerHTML = '';
        
        // Mount MFE
        console.log('🎯 Mounting MFE...');
        await mountFunction(container);
        console.log('✅ MFE mounted successfully!');
        
      } catch (scriptError) {
        console.error('❌ Script loading failed:', scriptError);
        
        // Show CORS-specific error message
        if (scriptError.message.includes('CORS') || scriptError.message.includes('cross-origin')) {
          showError(
            container,
            'CORS Error: The static file server is blocking cross-origin JavaScript module loading.',
            `The server at ${HARDCODED_CONFIG.baseUrl} needs to be configured to send CORS headers for JavaScript files.\n\nRequired header: Access-Control-Allow-Origin: *\n\nError: ${scriptError.message}`
          );
        } else {
          showError(
            container,
            'JavaScript Loading Failed: The microfrontend bootstrap script could not be loaded.',
            `URL: ${bootstrapUrl}\nError: ${scriptError.message}`
          );
        }
      }
      
    } catch (error) {
      console.error('❌ MFE Loading failed:', error);
      showError(
        container, 
        error.message,
        `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`
      );
    }
  }
  
  /**
   * Initialize when DOM is ready
   */
  function initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadMFE);
    } else {
      setTimeout(loadMFE, 100);
    }
  }
  
  // Start the process
  initialize();
  
})();
