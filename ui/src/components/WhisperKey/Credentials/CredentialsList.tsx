import { AddressExtensions } from "@/modules/AddressExtensions";
import { CredentialMetadata } from "@/modules/CredentialMetadata";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";


const CredentialsList = () => {

  const [credentials, setCcredentials] = useState([]);
  const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";

  useEffect(() => {

    (async () => {
        const apiURL = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/issuedby/${address}`;

        const requestHeaders = { "Content-Type": "application/json" };
        let createdCredentials: CredentialMetadata[] = [];
        axios.get(apiURL)
            .then(function (response) {
                // handle success
                console.log("Get Credentials issued - Success");
                console.log(response);
                setCcredentials(response!.data!);
                console.log("created Credentials:" + response!.data!);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    })();

}, []);


const navigateToCred = (credential: any) => {
  // navigate to route using nextjs
  Router.push(`credential-display/?name=${credential.credentialType}&address=${credential.owner}`);
}
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white text-right">
        <Link href='credential-issue' className="btn btn-sm btn-primary">Issue Credential</Link>
      </h4>

      <div className="flex flex-col">
        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Issued" />
          <div role="tabpanel" className="tab-content p-2">
          </div>
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Pending" />
          <div role="tabpanel" className="tab-content p-2"></div>

        </div>
        <div className="overflow-x-auto">

          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Credential Identifier</th>
                <th>Type</th>
                <th>Issue Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {credentials.map((credential: any, index: number) => (
                  <tr key={index} onClick={() => navigateToCred(credential!)} style={{cursor: "pointer"}}>
                    <th>{index + 1}</th>
                      <td>{AddressExtensions.getShortAddress(credential.owner)}</td>
                      <td>{credential.credentialType}</td>
                      <td>[Issue date missing]</td>
                  </tr>
              ))}
              
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default CredentialsList;
