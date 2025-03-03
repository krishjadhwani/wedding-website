// src/api/apiService.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interface for better type safety
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number | null;
}

// Generic function to handle API requests with proper error handling
async function apiRequest<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await apiClient(config);
    return {
      data: response.data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    // Log error to backend
    logError(error).catch(console.error);

    const axiosError = error as AxiosError<{ detail?: string }>;
    return {
      data: null,
      error: axiosError.response?.data?.detail || axiosError.message || 'Unknown error occurred',
      status: axiosError.response?.status || null,
    };
  }
}

// Log errors to backend
async function logError(error: unknown): Promise<void> {
  try {
    await apiClient.post('/log-error', { error: String(error) });
  } catch (e) {
    console.error('Failed to log error:', e);
  }
}

// API Request Type Interfaces
export interface WeddingInfo {
  event: string;
  date: string;
  location: string;
}

export interface Guest {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  status: string;
}

export interface RSVPResponse {
  rsvp_code: string;
  group_name: string;
  guests: Guest[];
}

export interface RSVPUpdateRequest {
  rsvp_code: string;
  guest_id: number;
  status: string;
}

export interface ValidationResponse {
  success: boolean;
}

// API Functions
export async function fetchWeddingInfo(): Promise<ApiResponse<WeddingInfo>> {
  return apiRequest<WeddingInfo>({
    method: 'GET',
    url: '/info',
  });
}

export async function validatePassword(password: string): Promise<ApiResponse<ValidationResponse>> {
  return apiRequest<ValidationResponse>({
    method: 'POST',
    url: '/validate-password',
    data: { password },
  });
}

export async function fetchInvitation(firstName: string, lastName: string): Promise<ApiResponse<RSVPResponse>> {
  return apiRequest<RSVPResponse>({
    method: 'GET',
    url: '/invite',
    params: { first_name: firstName, last_name: lastName },
  });
}

export async function submitRSVP(
  rsvpCode: string,
  guestId: number,
  status: string
): Promise<ApiResponse<{ message: string }>> {
  return apiRequest<{ message: string }>({
    method: 'POST',
    url: '/rsvp',
    data: {
      rsvp_code: rsvpCode,
      guest_id: guestId,
      status,
    },
  });
}

export default {
  fetchWeddingInfo,
  validatePassword,
  fetchInvitation,
  submitRSVP,
};