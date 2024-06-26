import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CredentialMetadata, CredentialField } from '../../../modules/CredentialMetadata';
import Router from "next/router";
import { AddressExtensions } from "@/modules/AddressExtensions";


const VerificationTemplatesList = () => {

  const [verifications, setVerifications] = useState([]);

  const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";

  useEffect(() => {

    (async () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/api/verifications/templates/${address}`;

        let result = [];
        try {
          const response = await fetch(apiUrl);
          result = await response.json();
          setVerifications(result);
        } catch (error) {
          console.error('Error trying to fetch Credential Metadata', error);
        }
    })();

}, []);

const navigateToVerification = (credential: any) => {
  // navigate to route using nextjs
  Router.push('verification-display/?id=' + credential.id);
}
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex gap-4 justify-end">
        <Link href='verification-template-create' className="btn btn-sm btn-primary">Create Template</Link>
      </div>

      <div className="flex flex-col">
        
        <div className="overflow-x-auto">

          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Template Name</th>
                <th>Issuer</th>
                <th>Credential Type</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {verifications.map((verification: any, index: number) => (
                        <tr key={index} onClick={() => navigateToVerification(verification!)} style={{cursor: "pointer"}}>
                          <th>{index + 1}</th>
                          <td>{verification.name}</td>
                            <td>{AddressExtensions.getShortAddress(verification.issuer)}</td>
                            <td>{verification.credentialType}</td>
                           {/* <td>{new Date(verification.created.seconds * 1000).toISOString()}</td> */}
                        </tr>
                    ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default VerificationTemplatesList;
