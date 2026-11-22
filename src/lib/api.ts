
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

type ApiOptions = RequestInit & {
  token?: string;
  auth?: boolean;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const {
    token,
    auth = false,
    headers,
    ...requestOptions
  } = options;

  let accessToken = token;

  // Get JWT automatically for protected API requests.
  if (auth && !accessToken) {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error("Authentication required. Please sign in again.");
    }

    accessToken = data.token;
  }

  const requestHeaders = new Headers(headers);

  // Do not set JSON content type for file uploads.
  if (!(requestOptions.body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
  ...requestOptions,
  headers: requestHeaders,
  credentials: "include",
  cache: "no-store",
});

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}
