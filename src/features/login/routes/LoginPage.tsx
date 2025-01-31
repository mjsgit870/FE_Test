"use client";

import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Image, Paper, PasswordInput, TextInput } from "@mantine/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { formSchema } from "../schemas";
import { LoginForm } from "../types";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login, isLoading } = useAuth();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    login(data);
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} style={{ height: "100vh" }}>
      <Flex align="center" justify="center" flex={1}>
        <Paper component="form" maw={400} flex={1} onSubmit={handleSubmit(onSubmit)}>
          {/* logo */}
          <Image
            src={
              "https://png.pngtree.com/png-vector/20230620/ourmid/pngtree-3d-location-icon-map-logo-design-symbol-transparent-background-vector-png-image_7166709.png"
            }
            height={150}
            fit="contain"
            mb="md"
          />

          <Controller
            name="username"
            control={control}
            render={({ field }) => <TextInput label="Username" size="md" error={errors.username?.message} {...field} />}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput label="Password" size="md" mt="md" error={errors.password?.message} {...field} />
            )}
          />

          <Button type="submit" mt="xl" size="md" color="primary" disabled={isLoading} style={{ float: "right" }}>
            Login
          </Button>
        </Paper>
      </Flex>

      <Flex flex={1} visibleFrom="sm">
        <Image src="https://i.natgeofe.com/n/d635150e-c05f-4b39-b009-d36c2f3441ac/67256.jpg" fit="cover" />
      </Flex>
    </Flex>
  );
}
