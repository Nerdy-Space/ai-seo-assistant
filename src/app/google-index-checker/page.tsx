import React from "react";
import Checker from "../../components/pages/indexChecker/Checker";
import { auth } from "../auth";
import { redirect } from "next/navigation";

const GoogleIndexChecker = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");
  return (
    <div>
      <Checker />
    </div>
  );
};

export default GoogleIndexChecker;
