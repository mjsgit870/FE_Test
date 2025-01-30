import { loginService, setAuthCookie } from "@/services/auth.service";
import { ApiError } from "@/utils/error-handler";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      // Set token to cookie
      setAuthCookie(data.token);

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 422) {
        const { errors } = error;
        const firstError = errors ? Object.values(errors)[0] : "Unknown error";

        return toast(firstError, { type: "error", theme: "colored" });
      }

      return toast(error.message, { type: "error", theme: "colored" });
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
