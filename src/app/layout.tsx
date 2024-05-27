"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useReducer } from "react";
import { appReducer } from '../statemanagement/appReducer'
import { init } from '../statemanagement/init'
import { AppCtxProvider } from '../statemanagement/appContext'
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, dispatch] = useReducer(appReducer, init)
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppCtxProvider myData={{ state, dispatch }}>
          {children}
        </AppCtxProvider>
      </body>
    </html>
  );
}
