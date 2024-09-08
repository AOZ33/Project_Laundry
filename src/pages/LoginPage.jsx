import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Input,
} from "@nextui-org/react";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { boolean, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../lib/axios';
import { toast } from "sonner";

const loginFormSchema = z.object({
    username: z.string().min(4, "Username harus mengandung setidaknya 4 karakter"),
    password: z.string().min(8, "Password harus mengandung setidaknya 8 karakter")
      // .regex(/[A-Z]/, "Password harus mengandung huruf kapital")
      // .regex(/[0-9]/, "Password harus mengandung angka")
      // .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password harus mengandung simbol"),
  });

const LoginPage = () => {
    const { handleSubmit, control } = useForm({
      defaultValues: {
        name: "",
        email: "",
        username: "",
        password: "",
      },
        resolver: zodResolver(loginFormSchema),
    });
    
    const navigate = useNavigate()

    const loginUser = async (data) => {
        try {
          const response = await axiosInstance.post("/auth/login", data);
          // const result = await axios.post("http://localhost:5173/api/v1/auth/login", {
          //   username: data.username,
          //   password: data.password,
    
          // })
          // console.log(result)
          // reset();
          const token = response.data.data.token
    
          if(response.status === 201){
            console.log(token)
            toast.success("Login berhasil");
            localStorage.setItem("nilai token", token)
            navigate("/produk")
          }
          
        
        } catch (error) {
          console.log('Error:', error);
          toast.error("Login gagal, silakan coba lagi");
        }
      };

    return(
        
        <div className="flex h-screen items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader className="font-semibold text-lg justify-center">Login</CardHeader>
                <Divider />
                <CardBody >
                <form
              onSubmit={handleSubmit(loginUser)}
              className="flex flex-col gap-4"
            >
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
                    autoComplete="current-password"
                  />
                )}
              />
              <Button className="bg-[#8c7851] text-white" type="submit">Login</Button>
            </form>
                    
                </CardBody>
                <CardFooter>
                <div className="flex -mt-[15px] mb-[15px] mx-0 text-[14px]">
                    <p>Don't have acoount?,
                        <Link to="/registrasi">Register</Link>
                    </p>
                </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;