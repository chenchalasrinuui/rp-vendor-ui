"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useReducer } from "react";
import { appReducer } from '../statemanagement/appReducer'
import { init } from '../statemanagement/init'
import { AppCtxProvider } from '../statemanagement/appContext'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppCookie } from "@/services/cookies";
const inter = Inter({ subsets: ["latin"] });

interface State {
  isLoggedIn: boolean;
}
interface loginAction {
  type: 'LOGIN';
  payload: any
}

type Action = loginAction

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(appReducer, init)
  useEffect(() => {
    (async () => {
      const isLoggedIn = await AppCookie.hasToken()
      dispatch({
        type: 'LOGIN',
        payload: isLoggedIn
      })
    })()

  }, [])
  const obj: { state: any, dispatch: any } = {
    state,
    dispatch
  }
  return (
    <html lang="en">
      <head>
        <title>verndor-admin-app</title>
      </head>
      <body className={inter.className}>
        <AppCtxProvider myData={obj}>
          <Header />
          {children}
          <Footer />
        </AppCtxProvider>
      </body>
    </html>
  );
}
