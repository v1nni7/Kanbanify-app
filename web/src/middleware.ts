export { default } from "next-auth/middleware";

export const config = { matcher: ["/boards", "/board/:path*"] };
