import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="flex flex-col flex-1">{children}</div>;
}

export default AuthLayout;
