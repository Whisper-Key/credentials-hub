import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ZkShield } from "zkshield";
import ECommerce from "@/components/Dashboard/E-commerce";
import VerificationsList from "@/components/WhisperKey/Verifications/VerificationsList";

export const metadata: Metadata = {
  title: "Verifiers | Whisper Key",
  description:
    "This is the Verifiers page for Whisper Key",
};

const VerificationsPage = () => {
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
               <Breadcrumb pageName="Verifiers" />

<div className="flex flex-col gap-10">
  <VerificationsList />
</div>

      </ZkShield>
    </DefaultLayout>
  );
};

export default VerificationsPage;
