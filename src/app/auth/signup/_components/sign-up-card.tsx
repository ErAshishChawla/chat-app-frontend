"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { signUpSchema, signupSchemaType } from "@/zod-schemas/signup-schema";
import ProfileImageUpload from "@/app/auth/signup/_components/profile-image-upload";

function SignUpCard() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    resetField,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<signupSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      profilePicture: undefined,
    },
  });

  // Preview State
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const setPreview = (val: string | null) => setPicturePreview(val);

  const onSubmit = (data: signupSchemaType) => {
    console.log(data);
    console.log(errors);

    // Reset the form after submission
    reset();
    setPicturePreview(null);
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-full max-w-[768px]">
      <Card>
        <CardHeader className="gap-4">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <h1 className="text-3xl">Sign Up</h1>
        </CardHeader>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-8">
              <div>
                <ProfileImageUpload
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  preview={picturePreview}
                  setPreview={setPreview}
                />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        className="focus:outline-none"
                        type="text"
                        label="First name"
                        isInvalid={errors.firstName ? true : false}
                        errorMessage={errors.firstName?.message}
                        isDisabled={isSubmitting}
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        className="focus:outline-none"
                        type="text"
                        label="Last name"
                        isInvalid={errors.lastName ? true : false}
                        errorMessage={errors.lastName?.message}
                        isDisabled={isSubmitting}
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        className="focus:outline-none"
                        type="email"
                        label="Email"
                        isInvalid={errors.email ? true : false}
                        errorMessage={errors.email?.message}
                        isDisabled={isSubmitting}
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => {
                    return (
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
                        {...field}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex-row-reverse gap-4">
            <Button
              color={"primary"}
              fullWidth
              type="submit"
              isLoading={isSubmitting}
            >
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default SignUpCard;
