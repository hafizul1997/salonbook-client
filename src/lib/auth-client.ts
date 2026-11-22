
import { createAuthClient } from "better-auth/react";
import {
  jwtClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_AUTH_URL ||
    "http://localhost:5000",

  fetchOptions: {
    credentials: "include",
  },

  plugins: [
    jwtClient(),

    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          required: false,
        },
        isBlocked: {
          type: "boolean",
          required: false,
        },
      },
    }),
  ],
});
