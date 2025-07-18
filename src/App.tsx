import React from "react";
import { Page } from "./components/page";
import { TesseralProvider } from "@tesseral/tesseral-react";
import { TESSERAL_PUBLISHABLE_KEY } from "./config";
import { User } from "./components/user/User";
import { Organization } from "./components/organization/Organization";

export function App() {
  return (
    <TesseralProvider publishableKey={TESSERAL_PUBLISHABLE_KEY}>
      <Page>
        <h1 className="text-2xl font-extrabold tracking-tight text-balance">
          You're logged in!
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Organization />
          <User />
        </div>
      </Page>
    </TesseralProvider>
  );
}
