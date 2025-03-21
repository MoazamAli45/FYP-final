"use client";
import Decide from "@/components/onboard/decide";
import UploadResume from "@/components/onboard/upload-resume";
import useAuthUser from "@/hooks/use-auth-user";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const user = useAuthUser();
  const searchParams = useSearchParams();

  //   On basis of Query Page will be shown
  const type = searchParams.get("type") || "decide"; // Default to "choose"
  return type === "upload" ? <UploadResume user={user} /> : <Decide />;
};

export default Page;
