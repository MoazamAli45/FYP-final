"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { handleUpdateOnboarding } from "@/lib/cognitoActions";
import { useRouter } from "next/navigation";

const EditLayout = () => {
  const router = useRouter();

  return (
    <>
      <nav className="flex items-center justify-between px-2  sm:px-4 py-4">
        <span className="hidden md:opacity-0 md:block">Rezlinks</span>
        <div className="flex gap-2">
          <Image
            src="/assets/logo-new.svg"
            alt="Logo"
            width={135}
            height={40}
          />
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-primary text-base font-medium">
            500 credits left
          </span>
          <Image
            src={"/assets/onboard/avatar.svg"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </nav>
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 w-full  max-w-screen-xl mx-auto">
        <Link
          href="/onboarding/choose-template"
          className="flex items-center gap-2 uppercase"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Templates</span>
        </Link>
        <button
          onClick={async () => {
            await handleUpdateOnboarding();
            router?.push("/overview");
          }}
          className="flex items-center gap-2 uppercase"
        >
          <span>Skip</span>
        </button>
      </div>
    </>
  );
};

export default EditLayout;
