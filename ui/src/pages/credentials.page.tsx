import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ZkShield } from "zkshield";
import ECommerce from "@/components/Dashboard/E-commerce";

export const metadata: Metadata = {
  title: "Credentials | Whisper Key",
  description:
    "This is the Credentials page for Whisper Key",
};

const CredentialsPage = () => {
  return (
    <DefaultLayout>
      <ZkShield mainContainerClassName="min-h-screen"
      innerContainerClassName="hero-content text-center"
      selectProviderClassName="selectProviderContainer"
      headerClassName="shieldHeader"
            ignoreConnectForTesting={false}
            localAccount='EKEnaPrfADEKKPAV5AT57sjD22qRQ7cuxEPGW9LafMwd638R2EUH'
            autoLaunch={true}
          >
               <Breadcrumb pageName="Credentials" />

<div className="flex flex-col gap-10">
  <TableOne />
</div>

      </ZkShield>
    </DefaultLayout>
  );
};

export default CredentialsPage;
