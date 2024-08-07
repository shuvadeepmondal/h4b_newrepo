import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "../interfaces";

export const useRegister = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isSucess, setisSucess] = useState<boolean>(false);
  const router = useRouter();

  const register = async ({
    name,
    email,
    password,
    phone,
  }: RegisterFormData) => {
    setisLoading(true);
    setError(false);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/api/v0.1/auth/register`,
        {
          email,
          password,
          name,
          phone,
        }
      );
      setisSucess(true);
      setisLoading(false);
      setTimeout(() => {
        console.log("Hello");
      }, 4000);
      router.push("/login");
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
      setisSucess(false);
      setisLoading(false);
    }
  };
  return { register, error, isLoading, isSucess };
};
