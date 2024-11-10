"use server";

import { signIn, signOut } from "../auth";

export async function googleLogin(actionData: unknown) {
  const action = actionData.get("action");

  await signIn(action, {redirectTo: "/"})
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
