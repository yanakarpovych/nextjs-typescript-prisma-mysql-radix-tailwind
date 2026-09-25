import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
  matcher: ["/issues/new", "/issues/:id/edit"],
};
