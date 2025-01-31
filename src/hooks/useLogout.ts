import { logoutService, removeAuthCookie } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logoutService,
    onSuccess: (data) => {
      // Set token to cookie
      removeAuthCookie();

      // Redirect to dashboard
      router.push("/login");
    },
    // onError: (error) => {
    //   toast(error.message, { type: "error" });
    // },
  });

  return {
    logout: () =>
      new Promise((resolve, reject) => {
        logoutMutation.mutate(undefined, {
          onSuccess: resolve,
          onError: reject,
        });
      }),
    isLoading: logoutMutation.isPending,
  };
};
