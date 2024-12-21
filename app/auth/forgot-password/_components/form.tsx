"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import * as y from "yup";

const schema = y.object({
  email: y
    .string()
    .email("Insira um e-mail válido")
    .required("Insira o seu e-mail"),
});

type ForgotPasswordFormData = y.InferType<typeof schema>;

export function ForgotPasswordForm() {
  const methods = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(schema),
  });
  
  return (
    <>
      <form className="w-full flex flex-col gap-3.5">
        <Input
          name="email"
          label="E-mail"
          required
          methods={methods}
          type="email"
          placeholder="Insira o seu e-mail"
          leftIcon={{
            element: User,
          }}
        />
        <Button className="mt-2.5">Solicitar troca</Button>
      </form>
    </>
  );
}
