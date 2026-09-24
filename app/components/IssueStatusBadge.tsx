import { Badge, Flex } from "@radix-ui/themes";
import { Status } from "../generated/prisma/enums";

const statusMap: Record<
  Status,
  { label: string; color: "blue" | "orange" | "green" }
> = {
  OPEN: { label: "Open", color: "blue" },
  IN_PROGRESS: { label: "In Progress", color: "orange" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
