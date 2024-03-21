"use client";

import React from "react";

import NextUiProvider from "./nextui-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <>
      <NextUiProvider>{children}</NextUiProvider>
    </>
  );
}

export default Providers;
