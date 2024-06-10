"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useReducer } from "react";
import { appReducer } from '../statemanagement/appReducer'
import { init } from '../statemanagement/init'
import { AppCtxProvider } from '../statemanagement/appContext'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppCookie } from "@/services/cookies";
const inter = Inter({ subsets: ["latin"] });
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { AdminMenu } from "@/routes/private/admin/AdminMenu/AdminMenu";
import { VendorMenu } from "@/routes/private/vendor/VendorMenu";
import { useRouter } from 'next/navigation'
import { Loader } from "@/reusableComponents/Loader";
import { Toaster } from "@/reusableComponents/Toaster";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

interface State {
  isLoggedIn: boolean;
  role: string,
  uid: string,
  isShowLoader: boolean,
  isShowToaster: boolean
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
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(appReducer, init);
  const router = useRouter()
  useEffect(() => {
    (async () => {
      const isLoggedIn = await AppCookie.hasToken()
      if (!isLoggedIn) {
        router.push("/")
      }
      const role = await AppCookie.getCookie('role')
      const uid = await AppCookie.getCookie("uid")
      dispatch({
        type: 'LOGIN',
        payload: {
          isLoggedIn,
          role,
          uid
        }
      })
    })()

  }, [])
  type objType = {
    state: any,
    dispatch: any
  }
  const obj: objType = {
    state,
    dispatch,
  }
  return (
    <html lang="en">
      <head>
        <title>verndor-admin-app</title>
      </head>
      <body className={inter.className}>
        <AppCtxProvider myData={obj}>
          <ApolloProvider client={client}>
            <Header />
            {state?.isLoggedIn && state?.role === 'admin' && <AdminMenu />}
            {state?.isLoggedIn && state?.role === 'vendor' && <VendorMenu />}
            {children}
            <Footer />
            {state?.isShowLoader && <Loader />}
            {state?.isShowToaster && <Toaster />}
          </ApolloProvider>
        </AppCtxProvider>

      </body>
    </html>
  );
}
