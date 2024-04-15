import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Verifiers | Whisper Key",
  description:
    "This is the Verifiers page for Whisper Key.",
};

const VerifiersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Verifiers" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default VerifiersPage;
