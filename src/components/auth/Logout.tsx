import { doLogout } from "@/app/actions";
import React from "react";

const Logout = () => {
  return (
    <form action={doLogout}>
      <button className="bg-blue-400 text-white my-2 p-1 rounded" type="submit">
        Logout
      </button>
    </form>
  );
};

export default Logout;
