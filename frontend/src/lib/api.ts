// API configuration - change this URL when your backend is ready
const API_BASE_URL = "https://your-render-url.onrender.com/api";

export const apiConfig = {
  baseUrl: API_BASE_URL,
};

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem("gdg_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options?.headers },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new ApiError(
        data.message || `Request failed with status ${response.status}`,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    // Network error - server not reachable
    throw new ApiError(
      "Unable to connect to server. Please check if the backend is running.",
      503
    );
  }
}

export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<{ token: string; user: { name: string; email: string } }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    ),

  signup: (name: string, email: string, password: string) =>
    apiFetch<{ token: string; user: { name: string; email: string } }>(
      "/auth/signup",
      {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      }
    ),
};

export const chaptersApi = {
  getAll: () => apiFetch<any[]>("/chapters"),
  getById: (id: string) => apiFetch<any>(`/chapters/${id}`),
};

export const eventsApi = {
  getAll: () => apiFetch<any[]>("/events"),
  getByChapter: (chapterId: string) =>
    apiFetch<any[]>(`/events/${chapterId}`),
};

export { ApiError };
