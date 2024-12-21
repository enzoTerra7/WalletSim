"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/trpc/routes/authRoutes/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { LockKeyhole, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import * as y from "yup";
import { useRouter } from "next/navigation";

type RegisterFormData = y.InferType<typeof RegisterSchema>;

export function RegisterForm() {
  const router = useRouter();
  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  const { mutate: register, isLoading } = trpc.auth.register.useMutation({
    onSuccess(data) {
      setCookie("token", data.data.token, {
        maxAge: 60 * 60 * 24,
      });
      setCookie("user", JSON.stringify(data.data.user));
      toast.success("Usuário criado com sucesso!");
      router.push("/auth/wallet-create");
    },
    onError(error) {
      console.log(error);
      toast.error(error.message);
    },
  });
  return (
    <>
      <form
        onSubmit={methods.handleSubmit((e) => register({ ...e }))}
        className="w-full flex flex-col gap-3.5"
      >
        <Input
          name="email"
          label="E-mail"
          required
          id="email"
          methods={methods}
          disabled={isLoading}
          type="email"
          placeholder="Insira o seu e-mail"
          leftIcon={{
            element: Mail,
          }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <Input
            name="password"
            label="Senha"
            required
            id="password"
            methods={methods}
            disabled={isLoading}
            type="password"
            placeholder="Insira a sua senha"
            leftIcon={{
              element: LockKeyhole,
            }}
          />
          <Input
            name="confirmPassword"
            label="Confirme sua senha"
            required
            id="confirmPassword"
            methods={methods}
            disabled={isLoading}
            type="password"
            placeholder="Repita a senha informada"
            leftIcon={{
              element: LockKeyhole,
            }}
          />
        </div>
        <Input
          name="name"
          label="Nome"
          required
          id="name"
          methods={methods}
          disabled={isLoading}
          placeholder="Insira o seu nome"
          leftIcon={{
            element: User,
          }}
        />
        <Button isLoading={isLoading} className="mt-2.5">
          Cadastrar
        </Button>
      </form>
    </>
  );
}
