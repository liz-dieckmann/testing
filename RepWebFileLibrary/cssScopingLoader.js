/**
 * Single-File Tailwind MFE Loader - Cross-Origin Compatible
 * 
 * This is a completely self-contained loader that:
 * 1. Detects its own script location
 * 2. Loads all MFE assets from the same base domain/path
 * 3. Works across different domains (site vs static files)
 * 
 * Usage:
 * <div id="tailwind-mfe-container"></div>
 * <script src="http://your-static-server/path/singleFileLoader.js"></script>
 */

(function() {
  'use strict';
  
  console.log('🚀 Single-File MFE Loader starting...');
  
  const CONTAINER_ID = 'tailwind-mfe-container';
  const MFE_FOLDER_NAME = 'tailwind-mfe';
  
  /**
   * Get the current script element
   */
  function getCurrentScript() {
    if (document.currentScript) {
      return document.currentScript;
    }
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  }
  
  /**
   * Get the base URL where this script is located
   */
  function getScriptBaseUrl() {
    const currentScript = getCurrentScript();
    
    if (currentScript && currentScript.src) {
      const scriptSrc = currentScript.src;
      const lastSlash = scriptSrc.lastIndexOf('/');
      const baseUrl = lastSlash !== -1 ? scriptSrc.substring(0, lastSlash) : '';
      console.log('📍 Script base URL:', baseUrl);
      console.log('📍 Script full URL:', scriptSrc);
      return baseUrl;
    }
    
    console.error('❌ Could not determine script URL');
    return '';
  }
  
  /**
   * Create absolute URL for MFE assets
   */
  function createAssetUrl(baseUrl, relativePath) {
    // Remove leading slash from relative path if present
    const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
    const fullUrl = `${baseUrl}/${MFE_FOLDER_NAME}/${cleanPath}`;
    console.log('🔗 Asset URL created:', fullUrl);
    return fullUrl;
  }
  
  /**
   * Load CSS file
   */
  function loadCSS(url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => {
        console.log('✅ CSS loaded:', url);
        resolve();
      };
      link.onerror = () => {
        console.error('❌ CSS failed to load:', url);
        reject(new Error(`Failed to load CSS: ${url}`));
      };
      document.head.appendChild(link);
    });
  }
  
  /**
   * Load JavaScript module
   */
  async function loadModule(url) {
    try {
      console.log('📥 Loading module:', url);
      const module = await import(url);
      console.log('✅ Module loaded:', url);
      return module;
    } catch (error) {
      console.error('❌ Module failed to load:', url, error);
      throw error;
    }
  }
  
  /**
   * Main loader function
   */
  async function loadMFE() {
    try {
      console.log('📦 Starting MFE loading process...');
      
      // Step 1: Get base URL from script location
      const baseUrl = getScriptBaseUrl();
      if (!baseUrl) {
        throw new Error('Could not determine script base URL');
      }
      
      // Step 2: Check container
      const container = document.getElementById(CONTAINER_ID);
      if (!container) {
        throw new Error(`Container #${CONTAINER_ID} not found`);
      }
      console.log('✅ Container found');
      
      // Step 3: Load manifest
      const manifestUrl = createAssetUrl(baseUrl, 'mfe-manifest.json');
      console.log('📋 Loading manifest from:', manifestUrl);
      
      const manifestResponse = await fetch(manifestUrl);
      if (!manifestResponse.ok) {
        throw new Error(`Failed to load manifest: ${manifestResponse.status} ${manifestResponse.statusText}`);
      }
      
      const manifest = await manifestResponse.json();
      console.log('✅ Manifest loaded:', manifest);
      
      // Step 4: Load CSS
      const cssUrl = createAssetUrl(baseUrl, `assets/${manifest.css}`);
      await loadCSS(cssUrl);
      
      // Step 5: Load and mount bootstrap
      const bootstrapUrl = createAssetUrl(baseUrl, `assets/${manifest.bootstrap}`);
      const bootstrap = await loadModule(bootstrapUrl);
      
      // Step 6: Add scoping class and mount
      container.classList.add('tailwind-mfe-scope');
      console.log('✅ Added CSS scoping class to container');
      
      // Mount the MFE
      if (bootstrap.mount) {
        console.log('🎯 Mounting MFE...');
        await bootstrap.mount(container);
        console.log('✅ MFE mounted successfully!');
      } else {
        console.error('❌ Bootstrap module does not export mount function');
      }
      
    } catch (error) {
      console.error('❌ MFE Loading failed:', error);
      
      // Show user-friendly error in container
      const container = document.getElementById(CONTAINER_ID);
      if (container) {
        container.innerHTML = `
          <div style="padding: 20px; border: 2px solid #ef4444; border-radius: 8px; background: #fef2f2; color: #dc2626;">
            <h3 style="margin: 0 0 10px 0;">⚠️ Microfrontend Loading Failed</h3>
            <p style="margin: 0; font-size: 14px;">${error.message}</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #991b1b;">Check browser console for detailed error information.</p>
          </div>
        `;
      }
    }
  }
  
  /**
   * Initialize when DOM is ready
   */
  function initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadMFE);
    } else {
      loadMFE();
    }
  }
  
  // Start the process
  initialize();
  
})();
