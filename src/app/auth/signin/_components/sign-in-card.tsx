"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, loginSchemaType } from "@/zod-schemas/signin-schema";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Button,
  Input,
} from "@nextui-org/react";
import { EyeIcon, EyeOff } from "lucide-react";

//Todo: Add Api For on Submit
// Todo: if api returns error, set it to the form

function SignInCard() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data: loginSchemaType) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-96">
      <Card>
        <CardHeader className="gap-4">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <h1 className="text-3xl">Sign In</h1>
        </CardHeader>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="gap-6 py-8 px-4">
            <Input
              type="email"
              label="Email"
              isInvalid={errors.email ? true : false}
              errorMessage={errors.email?.message}
              isDisabled={isSubmitting}
              {...register("email")}
            />
            <Input
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={showPassword ? "text" : "password"}
              label="Password"
              isInvalid={errors.password ? true : false}
              errorMessage={errors.password?.message}
              isDisabled={isSubmitting}
              {...register("password")}
            />
          </CardBody>
          <Divider />
          <CardFooter className="flex-row-reverse gap-4">
            <Button
              color={"primary"}
              fullWidth
              type="submit"
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default SignInCard;
