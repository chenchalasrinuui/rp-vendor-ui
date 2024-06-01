"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useReducer } from "react";
import { appReducer } from '../statemanagement/appReducer'
import { init } from '../statemanagement/init'
import { AppCtxProvider } from '../statemanagement/appContext'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppCookie } from "@/services/cookies";
const inter = Inter({ subsets: ["latin"] });
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

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
          {children}
          <Footer />
          </ApolloProvider>
        </AppCtxProvider>
      </body>
    </html>
  );
}
