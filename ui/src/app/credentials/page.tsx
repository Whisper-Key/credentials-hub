import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Credentials | Whisper Key",
  description:
    "This is the Credentials page for Whisper Key",
};

const CredentialsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Credentials" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default CredentialsPage;
