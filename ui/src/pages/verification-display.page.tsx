import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ZkShield } from "zkshield";
import ECommerce from "@/components/Dashboard/E-commerce";
import BlueprintForm from "@/components/WhisperKey/Blueprints/BlueprintForm";
import BlueprintDisplay from "@/components/WhisperKey/Blueprints/BlueprintDisplay";
import CredentialDisplay from "@/components/WhisperKey/Credentials/CredentialDisplay";
import VerififcationDisplay from "@/components/WhisperKey/Verifications/VerififcationDisplay";

export const metadata: Metadata = {
  title: "Credentials | Whisper Key",
  description:
    "This is the Credentials page for Whisper Key",
};

const CreateBlueprintPage = () => {
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
            <div className="mx-auto max-w-242.5">
               <Breadcrumb pageName="Display Verification" previousPage="Verifications" previousPageLink="verifications"  />

<div className="flex flex-col gap-10">
  <VerififcationDisplay />
</div>
</div>
      </ZkShield>
    </DefaultLayout>
  );
};

export default CreateBlueprintPage;
