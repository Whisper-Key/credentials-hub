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
      <ZkShield 
            ignoreConnectForTesting={false}
            localAccount='EKEnaPrfADEKKPAV5AT57sjD22qRQ7cuxEPGW9LafMwd638R2EUH'
            autoLaunch={true}
          >
              <ECommerce />

      </ZkShield>
    </DefaultLayout>
  );
};

export default CredentialsPage;
