/**
 * Single-File Tailwind MFE Loader - Cross-Origin Compatible
 * 
 * This is a completely self-contained loader that:
 * 1. Detects its own script location
 * 2. Loads all MFE assets from the same base domain/path
 * 3. Works across different domains (site vs static files)
 * 
 * Usage (Auto-detection):
 * <div id="tailwind-mfe-container"></div>
 * <script src="http://your-static-server/path/singleFileLoader.js"></script>
 * 
 * Usage (Manual configuration if auto-detection fails):
 * <script>
 *   window.MFE_BASE_URL = 'http://nor-vltrx-t02.htseng.com/files/RepWebFileLibrary';
 * </script>
 * <div id="tailwind-mfe-container"></div>
 * <script src="http://your-static-server/path/singleFileLoader.js"></script>
 */

(function() {
  'use strict';
  
  console.log('🚀 Single-File MFE Loader starting...');
  
  const CONTAINER_ID = 'tailwind-mfe-container';
  const MFE_FOLDER_NAME = 'tailwind-mfe';
  
  /**
   * Get the current script element with multiple fallback methods
   */
  function getCurrentScript() {
    console.log('🔍 Searching for current script...');
    
    // Method 1: Modern browsers
    if (document.currentScript) {
      console.log('📍 Using document.currentScript:', document.currentScript.src);
      return document.currentScript;
    }
    
    // Method 2: Look for our specific script by checking src (search all scripts)
    const scripts = document.getElementsByTagName('script');
    console.log('📍 Total scripts found:', scripts.length);
    
    // First, try to find by exact filename match
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      if (script.src) {
        console.log(`📍 Script ${i}:`, script.src);
        if (script.src.includes('cssScopingLoader.js') || script.src.includes('singleFileLoader.js')) {
          console.log('✅ Found our script by filename match:', script.src);
          return script;
        }
      } else {
        console.log(`📍 Script ${i}: (no src - inline script)`);
      }
    }
    
    // Method 3: Look for last non-empty script src
    for (let i = scripts.length - 1; i >= 0; i--) {
      const script = scripts[i];
      if (script.src && script.src.trim() !== '') {
        console.log('📍 Using last non-empty script as fallback:', script.src);
        return script;
      }
    }
    
    console.error('❌ No suitable script found');
    return null;
  }
  
  /**
   * Get the base URL where this script is located with enhanced debugging
   */
  function getScriptBaseUrl() {
    console.log('🔍 Attempting to detect script base URL...');
    
    // Try multiple methods to get the script URL
    const currentScript = getCurrentScript();
    
    if (currentScript) {
      console.log('📍 Current script element found:', currentScript);
      console.log('📍 Script src attribute:', currentScript.src);
      
      if (currentScript.src) {
        const scriptSrc = currentScript.src;
        const lastSlash = scriptSrc.lastIndexOf('/');
        const baseUrl = lastSlash !== -1 ? scriptSrc.substring(0, lastSlash) : '';
        
        console.log('✅ Script base URL derived:', baseUrl);
        console.log('✅ Script full URL:', scriptSrc);
        
        if (baseUrl) {
          return baseUrl;
        } else {
          console.warn('⚠️ Base URL is empty after processing');
        }
      } else {
        console.warn('⚠️ Script element has no src attribute');
      }
    } else {
      console.error('❌ No script element found');
    }
    
    // Fallback: Try to construct from window.location if we have a hint
    console.log('🔄 Attempting fallback URL construction...');
    
    // Check if there's a global configuration
    if (window.MFE_BASE_URL) {
      console.log('✅ Using global MFE_BASE_URL:', window.MFE_BASE_URL);
      return window.MFE_BASE_URL;
    }
    
    console.error('❌ Could not determine script base URL');
    console.error('💡 Debugging info:');
    console.error('- document.currentScript:', document.currentScript);
    console.error('- All scripts:', Array.from(document.getElementsByTagName('script')).map(s => s.src));
    
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
