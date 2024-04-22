import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CredentialMetadata, CredentialField } from '../../../modules/CredentialMetadata';
import Router from "next/router";


const BlueprintList = () => {

  const [created, setCreated] = useState({
      credentials: [] as any,
      currentCredential: { fields: [] } as any,
  });

  const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";

  useEffect(() => {

    (async () => {
        const apiURL = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/created/${address}`;

        const requestHeaders = { "Content-Type": "application/json" };
        let createdCredentials: CredentialMetadata[] = [];
        axios.get(apiURL)
            .then(function (response) {
                // handle success
                console.log("Get Credentials created - Success");
                console.log(response);
                createdCredentials = response!.data! as CredentialMetadata[];
                setCreated({ ...created, credentials: createdCredentials });

                console.log("created Credentials:" + createdCredentials);
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
  Router.push('blueprint-display/?name=' + credential.id);
}
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex gap-4 justify-end">
        <Link href='blueprint-create' className="btn btn-sm btn-primary">Create Blueprint</Link>
      </div>

      <div className="flex flex-col">
        
        <div className="overflow-x-auto">

          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {created.credentials.map((credential: any, index: number) => (
                        <tr key={index} onClick={() => navigateToCred(credential!)} style={{cursor: "pointer"}}>
                          <th>{index + 1}</th>
                            <td>{credential.name}</td>
                            <td>{credential.description}</td>
                            <td>{new Date(credential.created.seconds * 1000).toISOString()}</td>
                        </tr>
                    ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default BlueprintList;
