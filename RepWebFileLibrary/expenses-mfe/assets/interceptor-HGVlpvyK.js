import { m as mockCompanies } from "./index-uZx0pVZp.js";
class HTTPInterceptor {
  originalFetch;
  originalXHR;
  isActive = false;
  constructor() {
    this.originalFetch = window.fetch.bind(window);
    this.originalXHR = window.XMLHttpRequest;
  }
  start() {
    if (this.isActive) {
      console.warn("HTTP Interceptor is already active");
      return;
    }
    window.fetch = this.interceptedFetch.bind(this);
    window.XMLHttpRequest = this.createInterceptedXHR();
    this.isActive = true;
    console.log("✅ MSW: HTTP Interceptor started (Service Worker fallback)");
  }
  stop() {
    if (!this.isActive) return;
    window.fetch = this.originalFetch;
    window.XMLHttpRequest = this.originalXHR;
    this.isActive = false;
    console.log("MSW: HTTP Interceptor stopped");
  }
  createInterceptedXHR() {
    const originalXHR = this.originalXHR;
    const interceptor = this;
    return class extends originalXHR {
      _url = "";
      _method = "GET";
      set onreadystatechange(handler) {
        console.log(`🔧 MSW: Setting onreadystatechange handler for ${this._url || "unknown"}`);
        super.onreadystatechange = handler;
      }
      get onreadystatechange() {
        return super.onreadystatechange;
      }
      open(method, url, async, user, password) {
        this._method = method.toUpperCase();
        this._url = typeof url === "string" ? url : url.toString();
        console.log(`🌐 MSW: XHR.open called - ${this._method} ${this._url}`);
        const shouldMock = this._url.includes("/api/") || this._url.includes("localhost:3001");
        super.open(method, url, async ?? true, user, password);
        if (shouldMock) {
          console.log(`🔄 MSW: Intercepting XHR ${this._method} ${this._url}`);
          const mockResponse = interceptor.getMockResponse(this._method, new URL(this._url).pathname, this._url);
          if (mockResponse) {
            console.log(`✅ MSW: Mocked XHR response for ${this._method} ${this._url}`);
            const self = this;
            const waitForHandlers = async () => {
              console.log(`⏳ MSW: Waiting for handlers to be set up for ${self._url}`);
              await Promise.resolve();
              let attempts = 0;
              while (!self.onreadystatechange && attempts < 10) {
                await new Promise((resolve) => setTimeout(resolve, 5));
                attempts++;
                console.log(`⏳ MSW: Waiting attempt ${attempts} for ${self._url}`);
              }
              console.log(`🔍 MSW: Handler check complete for ${self._url}, handler exists: ${!!self.onreadystatechange}`);
            };
            const triggerReadyStateEvents = () => {
              console.log(`🔄 MSW: Starting readyState transitions for ${self._url}`);
              try {
                Object.defineProperty(self, "readyState", { value: 2, configurable: true });
                console.log(`🔄 MSW: Triggering readyState 2 (HEADERS_RECEIVED) for ${self._url}`);
                if (self.onreadystatechange) {
                  self.onreadystatechange(new Event("readystatechange"));
                  console.log(`✅ MSW: readyState 2 event triggered successfully`);
                }
                Object.defineProperty(self, "readyState", { value: 3, configurable: true });
                console.log(`🔄 MSW: Triggering readyState 3 (LOADING) for ${self._url}`);
                if (self.onreadystatechange) {
                  self.onreadystatechange(new Event("readystatechange"));
                  console.log(`✅ MSW: readyState 3 event triggered successfully`);
                }
                Object.defineProperty(self, "readyState", { value: 4, configurable: true });
                console.log(`🔄 MSW: Triggering readyState 4 (DONE) for ${self._url}`);
                if (self.onreadystatechange) {
                  self.onreadystatechange(new Event("readystatechange"));
                  console.log(`✅ MSW: readyState 4 event triggered successfully`);
                } else {
                  console.log(`❌ MSW: Still no onreadystatechange handler for ${self._url}`);
                }
                if (self.onload) {
                  console.log(`✅ MSW: Triggering onload for ${self._url}`);
                  self.onload(new ProgressEvent("load", {
                    lengthComputable: true,
                    loaded: self.responseText.length,
                    total: self.responseText.length
                  }));
                } else {
                  console.log(`⚠️ MSW: No onload handler for ${self._url}`);
                }
              } catch (error) {
                console.error(`❌ MSW: Error during readyState transitions for ${self._url}:`, error);
              }
            };
            this.send = async (body) => {
              console.log(`📦 MSW: send() called for ${self._method} ${self._url}`, body);
              console.log(`📦 MSW: Sending mock data for ${self._method} ${self._url}:`, mockResponse.data);
              Object.defineProperty(self, "status", { value: mockResponse.status, configurable: true });
              Object.defineProperty(self, "statusText", { value: "OK", configurable: true });
              Object.defineProperty(self, "response", { value: JSON.stringify(mockResponse.data), configurable: true });
              Object.defineProperty(self, "responseText", { value: JSON.stringify(mockResponse.data), configurable: true });
              Object.defineProperty(self, "responseType", { value: "", configurable: true });
              self.getResponseHeader = (name) => {
                if (name.toLowerCase() === "content-type") {
                  return "application/json";
                }
                return null;
              };
              self.getAllResponseHeaders = () => {
                return "content-type: application/json\r\n";
              };
              console.log(`📡 MSW: Mock XHR properties set - status: ${self.status}`);
              console.log(`📄 MSW: Response data:`, self.responseText);
              await waitForHandlers();
              triggerReadyStateEvents();
            };
            return;
          }
        }
      }
    };
  }
  async interceptedFetch(input, init) {
    const request = new Request(input, init);
    const url = new URL(request.url);
    const isApiCall = url.pathname.startsWith("/api/") || url.href.includes("/api/") || url.hostname === "localhost" && url.port === "3001";
    if (!isApiCall) {
      return this.originalFetch(input, init);
    }
    console.log(`🔄 MSW: Intercepting ${request.method} ${request.url}`);
    const mockResponse = this.getMockResponse(request.method, url.pathname, request.url);
    if (mockResponse) {
      console.log(`✅ MSW: Mocked response for ${request.method} ${request.url}`);
      return new Response(JSON.stringify(mockResponse.data), {
        status: mockResponse.status,
        statusText: "OK",
        headers: {
          "Content-Type": "application/json",
          ...mockResponse.headers
        }
      });
    }
    console.log(`⚠️ MSW: No mock found for ${request.method} ${request.url}, using real request`);
    return this.originalFetch(input, init);
  }
  getMockResponse(method, pathname, fullUrl) {
    if (method === "GET" && (pathname === "/api/companies" || fullUrl.includes("/api/companies"))) {
      return {
        status: 200,
        data: mockCompanies
      };
    }
    if (method === "GET" && (pathname.startsWith("/api/expenses") || fullUrl.includes("/api/expenses"))) {
      return {
        status: 200,
        data: {
          expenses: [],
          total: 0,
          page: 1,
          limit: 10
        }
      };
    }
    if (method === "GET" && (pathname.includes("/form-settings") || fullUrl.includes("/form-settings"))) {
      return {
        status: 200,
        data: {
          sections: [
            {
              id: "basic",
              title: "Basic Information",
              fields: ["date", "amount", "description"]
            },
            {
              id: "details",
              title: "Details",
              fields: ["category", "vendor", "receipt"]
            }
          ]
        }
      };
    }
    return null;
  }
}
const httpInterceptor = new HTTPInterceptor();
export {
  httpInterceptor
};
