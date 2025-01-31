import { loginService, setAuthCookie } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      // Set token to cookie
      setAuthCookie(data.access_token, data.expires_in);

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      toast(error.message, { type: "error" });
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
