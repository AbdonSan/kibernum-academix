export const API_URL = "http://localhost:8080/api";

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error en la solicitud");
  }

  return response.json();
};


{/*
export const API_URL = import.meta.env.VITE_API_URL;

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });
  return res.json();
};
*/}
// src/lib/api.js
{/*
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchWithAuth:", error.message);
    throw error;
  }
};
*/}

