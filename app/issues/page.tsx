import { IssueStatusBadge, Link } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { Status } from "@/app/generated/prisma/enums";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; orderBy?: string }>;
}) => {
  const params = await searchParams;
  const { status } = params;

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status as Status)
    ? (status as Status)
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(params.orderBy as keyof Issue)
    ? { [params.orderBy as keyof Issue]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
    orderBy,
  });

  return (
    <>
      <IssueActions></IssueActions>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    pathname: "/issues",
                    query: {
                      ...(status ? { status } : {}),
                      ...(orderBy ? { orderBy } : {}),
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell className="text-center md:text-left">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPage;
