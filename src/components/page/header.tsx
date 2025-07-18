import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, LogOut } from "lucide-react";
import { useLogout } from "@tesseral/tesseral-react";

export function Header() {
  const logout = useLogout();

  function handleLogout() {
    logout();
    window.location.href = "https://console.tesseral.com";
  }

  return (
    <header className="w-full border-b">
      <div className="container mx-auto py-4 flex flex-row items-center justify-between">
        <a href="https://tesseral.com" target="_blank">
          <img
            src="/images/tesseral-logo-black.svg"
            alt="Tesseral"
            className="max-h-6 mr-2"
          />
        </a>

        <div className="space-x-2 flex items-center">
          <a href="https://console.tesseral.com" target="_blank">
            <Button size="sm">
              Tesseral Console
              <ArrowRight />
            </Button>
          </a>
          <Button onClick={handleLogout} size="sm" variant="outline">
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
