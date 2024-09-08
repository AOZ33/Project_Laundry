import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { boolean, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";


const SignUpFormSchema = z.object({
    name: z.string().min(4, "Nama harus mengandung setidaknya 4 karakter"),
    email: z.string().email("Email tidak valid"),
    username: z.string().min(4, "Username harus mengandung setidaknya 4 karakter"),
    password: z.string().min(8, "Password harus mengandung setidaknya 8 karakter")
      .regex(/[A-Z]/, "Password harus mengandung huruf kapital")
      .regex(/[0-9]/, "Password harus mengandung angka")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password harus mengandung simbol"),
  });

  const RegisterPage = () => {
    const { handleSubmit, control, reset } = useForm({
      defaultValues: {
        name: "",
        email: "",
        username: "",
        password: "",
      },
      resolver: zodResolver(SignUpFormSchema),
    });

    const registerUser = async (data) => {
        try {
          const userData = { ...data, role: "employee" }
          const response = await axiosInstance.post("/auth/register", userData);
          // reset();
          console.log(response)
          if(response.status === 201){
            toast.success("Pendaftaran berhasil");
            reset()
          }
         
        } catch (error) {
          console.log('Error:', error);
          toast.error("Pendaftaran gagal, silakan coba lagi");
        }
      };

  return(
      
      <div className="flex h-screen items-center justify-center">
          <Card className="w-[400px]">
              <CardHeader className="font-semibold text-lg justify-center">Sign Up</CardHeader>
              <Divider />
              <CardBody >
              <form
              onSubmit={handleSubmit(registerUser)}
              className="flex flex-col gap-4"
            >
                <FaUser />
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Name"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="name"
                  />
                )}
              />

              <FaEnvelope />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="email"
                    label="Email"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="email"
                  />
                )}
              />

              <FaUser />
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Username"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="username"
                  />
                )}
              />

              <FaLock />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="new-password"
                  />
                )}
              />
              <Button className="bg-[#8c7851] text-white" type="submit">Sign Up</Button>
            </form>
                  
              </CardBody>
              <CardFooter>
              <div className="flex -mt-[15px] mb-[15px] mx-0 text-[14px]">
                    <p>Already have an acoount?,
                        <Link to="/">Login</Link>
                    </p>
                </div>
              </CardFooter>
          </Card>
      </div>
  );
};

export default RegisterPage;