import { m as mockCompanies } from "./index-Do5ZqSWG.js";
class HTTPInterceptor {
  originalFetch;
  isActive = false;
  constructor() {
    this.originalFetch = window.fetch.bind(window);
  }
  start() {
    if (this.isActive) {
      console.warn("HTTP Interceptor is already active");
      return;
    }
    window.fetch = this.interceptedFetch.bind(this);
    this.isActive = true;
    console.log("✅ MSW: HTTP Interceptor started (Service Worker fallback)");
  }
  stop() {
    if (!this.isActive) return;
    window.fetch = this.originalFetch;
    this.isActive = false;
    console.log("MSW: HTTP Interceptor stopped");
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
