"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Home from "@/components/Home";
import Login from "@/routes/public/Login";
import { useAppContext } from "@/statemanagement/appContext";
import { useEffect } from "react";
import { AppCookie } from "@/services/cookies";
import { useRouter } from 'next/navigation'
export default function Page() {
  const { state }: any = useAppContext();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const role = await AppCookie.getCookie("role")
      if (state.isLoggedIn) {
        if (role === 'admin') {
          router.push("admin/home")
        }
      }
    })()
  }, [state.isLoggedIn])
  return (
    <div>
      {
        !state?.isLoggedIn && <Login />
      }
    </div>
  );
}
