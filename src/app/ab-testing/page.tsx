import Calculator from "@/components/pages/abTesting/Calculator";
import React from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <>
      <Calculator />
    </>
  );
};

export default page;
