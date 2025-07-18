import React, { PropsWithChildren } from "react";
import { Header } from "./header";

export function Page({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 space-y-8">{children}</div>
    </>
  );
}
