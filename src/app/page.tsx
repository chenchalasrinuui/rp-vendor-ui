"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Home from "@/components/Home";
import Login from "@/components/Login";
import { useAppContext } from "@/statemanagement/appContext";

export default function Page() {
  const { state }: any = useAppContext();
  return (
    <div>
      {
        state?.isLoggedIn ? <Home /> : <Login />
      }
    </div>
  );
}
