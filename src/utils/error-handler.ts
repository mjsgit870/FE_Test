// utils/error-handler.ts
export class ApiError extends Error {
  public readonly status: number;
  public readonly errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = "ApiError";
  }
}

export const handleAxiosError = (error: any): ApiError => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 422:
        return new ApiError(data.message[0] || "Validation failed", status, data.message);
      case 401:
        return new ApiError(data.message || "Unauthorized access", status);
      case 403:
        return new ApiError(data.message || "Forbidden access", status);
      case 404:
        return new ApiError(data.message || "Resource not found", status);
      default:
        return new ApiError(data.message || "Something went wrong", status);
    }
  }

  if (error.request) {
    return new ApiError("No response received from server", 0);
  }

  return new ApiError(error.message || "Unknown error occurred", 500);
};
