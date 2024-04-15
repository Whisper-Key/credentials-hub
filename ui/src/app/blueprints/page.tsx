import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Blueprints | Whisper Key",
  description:
    "This is the Blueprints page for Whisper Key.",
};

const BlueprintsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blueprints" />

      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default BlueprintsPage;
