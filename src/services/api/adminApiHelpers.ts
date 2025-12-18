/**
 * This file provides utility functions for direct HTTP calls using axios
 * Use these when Redux Query hooks are not suitable (e.g., file uploads, downloads, or one-off requests)
 */

import axiosInstance from "./axiosInstance";
import type {
  AdminStats,
  AdminUser,
  AdminTrip,
  AdminBooking,
  AdminProfile,
} from "./adminApi";

// Admin Stats
export const fetchAdminStats = async (): Promise<AdminStats> => {
  const response = await axiosInstance.get("/admin/stats");
  return response.data;
};

// User Management
export const fetchAllUsers = async (): Promise<AdminUser[]> => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

export const suspendUserById = async (
  userId: string
): Promise<{ success: boolean }> => {
  const response = await axiosInstance.post(`/admin/users/${userId}/suspend`);
  return response.data;
};

export const activateUserById = async (
  userId: string
): Promise<{ success: boolean }> => {
  const response = await axiosInstance.post(`/admin/users/${userId}/activate`);
  return response.data;
};

export const deleteUserById = async (
  userId: string
): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete(`/admin/users/${userId}`);
  return response.data;
};

// Trip Management
export const fetchAllTrips = async (): Promise<AdminTrip[]> => {
  const response = await axiosInstance.get("/admin/trips");
  return response.data;
};

export const cancelTripById = async (
  tripId: string
): Promise<{ success: boolean }> => {
  const response = await axiosInstance.post(`/admin/trips/${tripId}/cancel`);
  return response.data;
};

// Booking Management
export const fetchAllBookings = async (): Promise<AdminBooking[]> => {
  const response = await axiosInstance.get("/admin/bookings");
  return response.data;
};

// Profile Management
export const fetchAdminProfile = async (): Promise<AdminProfile> => {
  const response = await axiosInstance.get("/admin/profile");
  return response.data;
};

export const updateAdminProfile = async (
  data: Partial<AdminProfile>
): Promise<AdminProfile> => {
  const response = await axiosInstance.put("/admin/profile", data);
  return response.data;
};

// File Upload (Example for future use)
export const uploadFile = async (
  file: File,
  endpoint: string
): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Export Download (Example for future use)
export const downloadReport = async (reportType: string): Promise<Blob> => {
  const response = await axiosInstance.get(`/admin/reports/${reportType}`, {
    responseType: "blob",
  });

  return response.data;
};
