import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API Service class
class ApiService {
  // Authentication endpoints
  static async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }

  static async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  static async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  }

  static async refreshToken(refreshToken) {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  }

  static async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }

  static async resetPassword(token, password) {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  }

  // User management endpoints
  static async getUsers(params = {}) {
    const response = await api.get('/users', { params });
    return response.data;
  }

  static async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  static async createUser(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  }

  static async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  }

  static async updateUserStatus(id, status) {
    const response = await api.put(`/users/${id}/status`, { status });
    return response.data;
  }

  static async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }

  static async getUserStatistics() {
    const response = await api.get('/users/statistics');
    return response.data;
  }

  // Visitor management endpoints
  static async getVisitors(params = {}) {
    const response = await api.get('/visitors', { params });
    return response.data;
  }

  static async createVisitor(visitorData) {
    const response = await api.post('/visitors', visitorData);
    return response.data;
  }

  static async updateVisitor(id, visitorData) {
    const response = await api.put(`/visitors/${id}`, visitorData);
    return response.data;
  }

  static async updateVisitorStatus(id, status) {
    const response = await api.put(`/visitors/${id}/status`, { status });
    return response.data;
  }

  static async deleteVisitor(id) {
    const response = await api.delete(`/visitors/${id}`);
    return response.data;
  }

  static async getVisitorStatistics() {
    const response = await api.get('/visitors/statistics');
    return response.data;
  }

  // Maintenance endpoints
  static async getMaintenanceRequests(params = {}) {
    const response = await api.get('/maintenance', { params });
    return response.data;
  }

  static async createMaintenanceRequest(requestData) {
    const response = await api.post('/maintenance', requestData);
    return response.data;
  }

  static async updateMaintenanceRequest(id, requestData) {
    const response = await api.put(`/maintenance/${id}`, requestData);
    return response.data;
  }

  static async updateMaintenanceStatus(id, status) {
    const response = await api.put(`/maintenance/${id}/status`, { status });
    return response.data;
  }

  static async deleteMaintenanceRequest(id) {
    const response = await api.delete(`/maintenance/${id}`);
    return response.data;
  }

  static async getMaintenanceStatistics() {
    const response = await api.get('/maintenance/statistics');
    return response.data;
  }

  // Finance endpoints
  static async getTransactions(params = {}) {
    const response = await api.get('/finance/transactions', { params });
    return response.data;
  }

  static async createTransaction(transactionData) {
    const response = await api.post('/finance/transactions', transactionData);
    return response.data;
  }

  static async updateTransaction(id, transactionData) {
    const response = await api.put(`/finance/transactions/${id}`, transactionData);
    return response.data;
  }

  static async processPayment(paymentData) {
    const response = await api.post('/finance/payments', paymentData);
    return response.data;
  }

  static async getFinanceStatistics() {
    const response = await api.get('/finance/statistics');
    return response.data;
  }

  // Communication endpoints
  static async getAnnouncements(params = {}) {
    const response = await api.get('/communication/announcements', { params });
    return response.data;
  }

  static async createAnnouncement(announcementData) {
    const response = await api.post('/communication/announcements', announcementData);
    return response.data;
  }

  static async updateAnnouncement(id, announcementData) {
    const response = await api.put(`/communication/announcements/${id}`, announcementData);
    return response.data;
  }

  static async deleteAnnouncement(id) {
    const response = await api.delete(`/communication/announcements/${id}`);
    return response.data;
  }

  static async getDiscussionForums(params = {}) {
    const response = await api.get('/communication/forums', { params });
    return response.data;
  }

  static async createDiscussionPost(postData) {
    const response = await api.post('/communication/forums', postData);
    return response.data;
  }

  static async updateDiscussionPost(id, postData) {
    const response = await api.put(`/communication/forums/${id}`, postData);
    return response.data;
  }

  static async deleteDiscussionPost(id) {
    const response = await api.delete(`/communication/forums/${id}`);
    return response.data;
  }

  // Amenities endpoints
  static async getFacilities(params = {}) {
    const response = await api.get('/amenities/facilities', { params });
    return response.data;
  }

  static async createFacility(facilityData) {
    const response = await api.post('/amenities/facilities', facilityData);
    return response.data;
  }

  static async updateFacility(id, facilityData) {
    const response = await api.put(`/amenities/facilities/${id}`, facilityData);
    return response.data;
  }

  static async deleteFacility(id) {
    const response = await api.delete(`/amenities/facilities/${id}`);
    return response.data;
  }

  static async bookFacility(bookingData) {
    const response = await api.post('/amenities/bookings', bookingData);
    return response.data;
  }

  static async getFacilityBookings(params = {}) {
    const response = await api.get('/amenities/bookings', { params });
    return response.data;
  }

  // Administration endpoints
  static async getDashboardData() {
    const response = await api.get('/administration/dashboard');
    return response.data;
  }

  static async getSystemStatistics() {
    const response = await api.get('/administration/statistics');
    return response.data;
  }

  static async getSystemHealth() {
    const response = await api.get('/administration/health');
    return response.data;
  }

  // File upload endpoints
  static async uploadFile(file, type = 'general') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async deleteFile(fileId) {
    const response = await api.delete(`/upload/${fileId}`);
    return response.data;
  }

  // Utility methods
  static setAuthToken(token) {
    localStorage.setItem('accessToken', token);
  }

  static setRefreshToken(token) {
    localStorage.setItem('refreshToken', token);
  }

  static getAuthToken() {
    return localStorage.getItem('accessToken');
  }

  static getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  static clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  static isAuthenticated() {
    return !!this.getAuthToken();
  }

  // Error handling helper
  static handleApiError(error) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return data.message || 'Bad request. Please check your input.';
        case 401:
          return 'Authentication failed. Please login again.';
        case 403:
          return 'Access denied. You don\'t have permission to perform this action.';
        case 404:
          return 'Resource not found.';
        case 429:
          return 'Too many requests. Please try again later.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return data.message || 'An unexpected error occurred.';
      }
    } else if (error.request) {
      // Network error
      return 'Network error. Please check your internet connection.';
    } else {
      // Other error
      return error.message || 'An unexpected error occurred.';
    }
  }
}

export default ApiService;
