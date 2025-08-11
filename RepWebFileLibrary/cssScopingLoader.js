/**
 * External Tailwind MFE Launcher
 * 
 * This file should be placed next to the "tailwind-mfe" folder on your server.
 * It dynamically loads and executes the cssScopingLoader.js from the tailwind-mfe folder.
 * 
 * Usage in Shell App:
 * <div id="tailwind-mfe-container"></div>
 * <script src="/path/to/loadTailwindMFE.js"></script>
 */

(function() {
  'use strict';
  
  console.log('🚀 External Tailwind MFE Launcher starting...');
  
  // Configuration
  const MFE_FOLDER_NAME = 'tailwind-mfe';
  const LOADER_FILENAME = 'cssScopingLoader.js';
  const CONTAINER_ID = 'tailwind-mfe-container';
  
  /**
   * Get the base path where this launcher script is located
   */
  function getBasePath() {
    // Get the current script's URL
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const scriptSrc = currentScript.src;
    
    // Extract the directory path (remove the filename)
    const lastSlash = scriptSrc.lastIndexOf('/');
    return lastSlash !== -1 ? scriptSrc.substring(0, lastSlash) : '';
  }
  
  /**
   * Load and execute the CSS Scoping Loader
   */
  async function loadMFELoader() {
    try {
      // Check if container exists
      const container = document.getElementById(CONTAINER_ID);
      if (!container) {
        console.error(`❌ Container #${CONTAINER_ID} not found. Please add <div id="${CONTAINER_ID}"></div> to your HTML.`);
        return;
      }
      
      console.log('✅ Container found, loading MFE loader...');
      
      // Construct the path to the CSS Scoping Loader
      const basePath = getBasePath();
      const loaderPath = `${basePath}/${MFE_FOLDER_NAME}/${LOADER_FILENAME}`;
      
      console.log(`📦 Loading CSS Scoping Loader from: ${loaderPath}`);
      
      // Create and load the script
      const script = document.createElement('script');
      script.src = loaderPath;
      script.type = 'text/javascript';
      
      // Handle load success
      script.onload = function() {
        console.log('✅ CSS Scoping Loader loaded successfully');
      };
      
      // Handle load error
      script.onerror = function() {
        console.error(`❌ Failed to load CSS Scoping Loader from: ${loaderPath}`);
        console.error('Please ensure:');
        console.error(`1. The "${MFE_FOLDER_NAME}" folder exists next to this launcher script`);
        console.error(`2. The "${LOADER_FILENAME}" file exists inside the "${MFE_FOLDER_NAME}" folder`);
        console.error('3. The server is serving static files correctly');
      };
      
      // Add script to document
      document.head.appendChild(script);
      
    } catch (error) {
      console.error('❌ Error in MFE Launcher:', error);
    }
  }
  
  /**
   * Initialize the launcher when DOM is ready
   */
  function initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadMFELoader);
    } else {
      // DOM is already ready
      loadMFELoader();
    }
  }
  
  // Start the launcher
  initialize();
  
})();
