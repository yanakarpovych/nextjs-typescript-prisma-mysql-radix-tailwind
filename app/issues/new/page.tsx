"use client"

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(
  () => import("../_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton></IssueFormSkeleton>
  }
);

const NewIssuePage = () => {
  return <IssueForm></IssueForm>;
};

export default NewIssuePage;
