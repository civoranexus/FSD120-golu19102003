import React, { createContext, useContext, useReducer, useEffect } from 'react';
import ApiService from '../services/api';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  visitors: [],
  maintenanceRequests: [],
  transactions: [],
  announcements: [],
  notifications: [],
  systemStats: null,
  theme: 'light',
  language: 'en'
};

// Action types
const actionTypes = {
  // Authentication
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  UPDATE_USER: 'UPDATE_USER',
  
  // Loading
  SET_LOADING: 'SET_LOADING',
  
  // Error
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // Visitors
  SET_VISITORS: 'SET_VISITORS',
  ADD_VISITOR: 'ADD_VISITOR',
  UPDATE_VISITOR: 'UPDATE_VISITOR',
  DELETE_VISITOR: 'DELETE_VISITOR',
  
  // Maintenance
  SET_MAINTENANCE_REQUESTS: 'SET_MAINTENANCE_REQUESTS',
  ADD_MAINTENANCE_REQUEST: 'ADD_MAINTENANCE_REQUEST',
  UPDATE_MAINTENANCE_REQUEST: 'UPDATE_MAINTENANCE_REQUEST',
  DELETE_MAINTENANCE_REQUEST: 'DELETE_MAINTENANCE_REQUEST',
  
  // Finance
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  
  // Communication
  SET_ANNOUNCEMENTS: 'SET_ANNOUNCEMENTS',
  ADD_ANNOUNCEMENT: 'ADD_ANNOUNCEMENT',
  UPDATE_ANNOUNCEMENT: 'UPDATE_ANNOUNCEMENT',
  DELETE_ANNOUNCEMENT: 'DELETE_ANNOUNCEMENT',
  
  // Notifications
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  
  // System Stats
  SET_SYSTEM_STATS: 'SET_SYSTEM_STATS',
  
  // UI
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    // Authentication
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    // Loading
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    // Error
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    // Visitors
    case actionTypes.SET_VISITORS:
      return {
        ...state,
        visitors: action.payload
      };
    
    case actionTypes.ADD_VISITOR:
      return {
        ...state,
        visitors: [...state.visitors, action.payload]
      };
    
    case actionTypes.UPDATE_VISITOR:
      return {
        ...state,
        visitors: state.visitors.map(visitor =>
          visitor.id === action.payload.id ? action.payload : visitor
        )
      };
    
    case actionTypes.DELETE_VISITOR:
      return {
        ...state,
        visitors: state.visitors.filter(visitor => visitor.id !== action.payload)
      };
    
    // Maintenance
    case actionTypes.SET_MAINTENANCE_REQUESTS:
      return {
        ...state,
        maintenanceRequests: action.payload
      };
    
    case actionTypes.ADD_MAINTENANCE_REQUEST:
      return {
        ...state,
        maintenanceRequests: [...state.maintenanceRequests, action.payload]
      };
    
    case actionTypes.UPDATE_MAINTENANCE_REQUEST:
      return {
        ...state,
        maintenanceRequests: state.maintenanceRequests.map(request =>
          request.id === action.payload.id ? action.payload : request
        )
      };
    
    case actionTypes.DELETE_MAINTENANCE_REQUEST:
      return {
        ...state,
        maintenanceRequests: state.maintenanceRequests.filter(request => request.id !== action.payload)
      };
    
    // Finance
    case actionTypes.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
    
    case actionTypes.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    
    case actionTypes.UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        )
      };
    
    case actionTypes.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      };
    
    // Communication
    case actionTypes.SET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload
      };
    
    case actionTypes.ADD_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [...state.announcements, action.payload]
      };
    
    case actionTypes.UPDATE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.map(announcement =>
          announcement.id === action.payload.id ? action.payload : announcement
        )
      };
    
    case actionTypes.DELETE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.filter(announcement => announcement.id !== action.payload)
      };
    
    // Notifications
    case actionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    
    case actionTypes.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload ? { ...notification, read: true } : notification
        )
      };
    
    case actionTypes.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };
    
    // System Stats
    case actionTypes.SET_SYSTEM_STATS:
      return {
        ...state,
        systemStats: action.payload
      };
    
    // UI
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check authentication on app load
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = ApiService.getAuthToken();
        if (token) {
          // Verify token and get user data
          const response = await ApiService.getUserById('me');
          dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: { user: response.data }
          });
        }
      } catch (error) {
        // Token is invalid, clear it
        ApiService.clearTokens();
        dispatch({ type: actionTypes.LOGOUT });
      } finally {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };

    initializeApp();
  }, []);

  // Action creators
  const actions = {
    // Authentication
    login: async (credentials) => {
      dispatch({ type: actionTypes.LOGIN_START });
      try {
        const response = await ApiService.login(credentials);
        const { user, accessToken, refreshToken } = response.data;
        
        ApiService.setAuthToken(accessToken);
        ApiService.setRefreshToken(refreshToken);
        
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { user }
        });
        
        return response;
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          payload: errorMessage
        });
        throw error;
      }
    },

    register: async (userData) => {
      dispatch({ type: actionTypes.REGISTER_START });
      try {
        const response = await ApiService.register(userData);
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          payload: response.data
        });
        return response;
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          payload: errorMessage
        });
        throw error;
      }
    },

    logout: () => {
      ApiService.clearTokens();
      dispatch({ type: actionTypes.LOGOUT });
    },

    updateUser: (userData) => {
      dispatch({
        type: actionTypes.UPDATE_USER,
        payload: userData
      });
    },

    // Error handling
    setError: (error) => {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error
      });
    },

    clearError: () => {
      dispatch({ type: actionTypes.CLEAR_ERROR });
    },

    // Visitors
    fetchVisitors: async (params = {}) => {
      try {
        const response = await ApiService.getVisitors(params);
        dispatch({
          type: actionTypes.SET_VISITORS,
          payload: response.data.data || response.data
        });
        return response;
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: errorMessage
        });
        throw error;
      }
    },

    addVisitor: async (visitorData) => {
      try {
        const response = await ApiService.createVisitor(visitorData);
        dispatch({
          type: actionTypes.ADD_VISITOR,
          payload: response.data.data || response.data
        });
        return response;
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: errorMessage
        });
        throw error;
      }
    },

    updateVisitor: async (id, visitorData) => {
      try {
        const response = await ApiService.updateVisitor(id, visitorData);
        dispatch({
          type: actionTypes.UPDATE_VISITOR,
          payload: response.data.data || response.data
        });
        return response;
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: errorMessage
        });
        throw error;
      }
    },

    deleteVisitor: async (id) => {
      try {
        await ApiService.deleteVisitor(id);
        dispatch({
          type: actionTypes.DELETE_VISITOR,
          payload: id
        });
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: errorMessage
        });
        throw error;
      }
    },

    // Maintenance
    fetchMaintenanceRequests: async (params = {}) => {
      try {
        const response = await ApiService.getMaintenanceRequests(params);
        dispatch({
          type: actionTypes.SET_MAINTENANCE_REQUESTS,
          payload: response.data.data || response.data
        });
        return response;
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: errorMessage
        });
        throw error;
      }
    },

    addMaintenanceRequest: async (requestData) => {
      try {
        const response = await ApiService.createMaintenanceRequest(requestData);
        dispatch({
          type: actionTypes.ADD_MAINTENANCE_REQUEST,
          payload: response.data.data || response.data
        });
        return response;
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: errorMessage
        });
        throw error;
      }
    },

    // Finance
    fetchTransactions: async (params = {}) => {
      try {
        const response = await ApiService.getTransactions(params);
        dispatch({
          type: actionTypes.SET_TRANSACTIONS,
          payload: response.data.data || response.data
        });
        return response;
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: errorMessage
        });
        throw error;
      }
    },

    // System Stats
    fetchSystemStats: async () => {
      try {
        const response = await ApiService.getSystemStatistics();
        dispatch({
          type: actionTypes.SET_SYSTEM_STATS,
          payload: response.data.data || response.data
        });
        return response;
      } catch (error) {
        const errorMessage = ApiService.handleApiError(error);
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: errorMessage
        });
        throw error;
      }
    },

    // UI
    setTheme: (theme) => {
      localStorage.setItem('theme', theme);
      dispatch({
        type: actionTypes.SET_THEME,
        payload: theme
      });
    },

    setLanguage: (language) => {
      localStorage.setItem('language', language);
      dispatch({
        type: actionTypes.SET_LANGUAGE,
        payload: language
      });
    }
  };

  const value = {
    ...state,
    ...actions,
    actionTypes
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
