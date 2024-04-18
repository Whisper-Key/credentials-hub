import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ZkShield } from "zkshield";
import ECommerce from "@/components/Dashboard/E-commerce";
import BlueprintList from "@/components/WhisperKey/Blueprints/BlueprintList";

export const metadata: Metadata = {
  title: "Blueprints | Whisper Key",
  description:
    "This is the Blueprints page for Whisper Key",
};

const BlueprintsPage = () => {
  return (
    <DefaultLayout>
      <ZkShield mainContainerClassName="min-h-screen"
        innerContainerClassName="hero-content text-center"
        selectProviderClassName="selectProviderContainer"
        headerClassName="shieldHeader"
        ignoreConnectForTesting={true}
        localAccount='EKEnaPrfADEKKPAV5AT57sjD22qRQ7cuxEPGW9LafMwd638R2EUH'
        autoLaunch={true}
      >
        <Breadcrumb pageName="Blueprints" />

        <div className="flex flex-col gap-10">
          <BlueprintList />
        </div>

      </ZkShield>
    </DefaultLayout>
  );
};

export default BlueprintsPage;
