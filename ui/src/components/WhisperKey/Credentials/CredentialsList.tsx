import { AddressExtensions } from "@/modules/AddressExtensions";
import { CredentialMetadata } from "@/modules/CredentialMetadata";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";


const CredentialsList = () => {

  const [credentials, setCredentials] = useState([]);
  const [pendingCredentials, setPendingCredentials] = useState([]);

  const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";

  useEffect(() => {

    (async () => {
      let apiURL = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/issuedby/${address}`;

      let requestHeaders = { "Content-Type": "application/json" };
      axios.get(apiURL)
        .then(function (response) {
          // handle success
          console.log("Get Credentials issued - Success");
          console.log(response);
          setCredentials(response!.data!);
          console.log("created Credentials:" + response!.data!);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });

      apiURL = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/pending/issuedby/${address}`;

      requestHeaders = { "Content-Type": "application/json" };
      axios.get(apiURL)
        .then(function (response) {
          // handle success
          console.log("Get Credentials pending - Success");
          console.log(response);
          setPendingCredentials(response!.data!);
          console.log("Pending Credentials:" + response!.data!);
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

  const navigateToPendingCred = (credential: any) => {
    // navigate to route using nextjs
    Router.push(`credential-display/?name=${credential.credential.credentialType}&address=${credential.owner}&state=pending`);
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white text-right">
        <Link href='credential-issue' className="btn btn-sm btn-primary">Issue Credential</Link>
      </h4>

      <div className="flex flex-col">
        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Issued" checked readOnly />
          <div role="tabpanel" className="tab-content p-2">
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
                  <tr key={index} onClick={() => navigateToCred(credential!)} style={{ cursor: "pointer" }}>
                    <th>{index + 1}</th>
                    <td>{AddressExtensions.getShortAddress(credential.owner)}</td>
                    <td>{credential.credentialType}</td>
                    <td>[Issue date missing]</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Pending" />
          <div role="tabpanel" className="tab-content p-2">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Issued To</th>
                  <th>Amount Due</th>
                  <th>Type</th>
                  <th>Issue Date</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {pendingCredentials != null && pendingCredentials.length > 0 && pendingCredentials.map((credential: any, index: number) => (
                  <tr key={index} onClick={() => navigateToPendingCred(credential!)} style={{ cursor: "pointer" }}>
                    <th>{index + 1}</th>
                    <td>{AddressExtensions.getShortAddress(credential.owner)}</td>
                    <td>{credential.paymentAmount}</td>
                    <td>{credential.credential.credentialType}</td>
                    <td>[Issue date missing]</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

        </div>
        <div className="overflow-x-auto">


        </div>

      </div>
    </div>
  );
};

export default CredentialsList;
