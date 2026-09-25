import { Issue } from "@/app/generated/prisma/client";
import { Status } from "@/app/generated/prisma/enums";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import Pagination from "../components/Pagination";
import IssueTable, { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; orderBy?: string; page: string }>;
}) => {
  const params = await searchParams;
  const { status } = params;

  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status as Status)
    ? (status as Status)
    : undefined;

  const where = { status: validStatus };

  const orderBy = columnNames.includes(params.orderBy as keyof Issue)
    ? { [params.orderBy as keyof Issue]: "asc" }
    : undefined;

  const page = parseInt(params.page || "1") || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  console.log("PARAMS:", params);
  console.log("PAGE:", page);
  console.log("ISSUE COUNT:", issueCount);

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={params} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export default IssuesPage;
