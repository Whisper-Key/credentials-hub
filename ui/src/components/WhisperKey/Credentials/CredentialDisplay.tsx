import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from 'zkshield';

import { CredentialMetadata, CredentialField } from '../../../modules/CredentialMetadata';
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
const CredentialDisplay = () => {
    const router = useRouter();
    const [created, setCreated] = useState({
        currentCredential: null as any | null,
    });
    const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";
    const searchParams = useSearchParams();
    const excludeKeys: string[] = ['hash', 'id'];

    useEffect(() => {

        (async () => {

            const name = searchParams.get('name');
            const address = searchParams.get('address');
      
            const apiURL = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/${name}/${address}`;

            const requestHeaders = { "Content-Type": "application/json" };
            axios.get(apiURL)
                .then(function (response) {
                    // handle success
                    console.log("Get Credentials created - Success");
                    setCreated({ ...created, currentCredential: response!.data! });

                    console.log("created Credential:" + response!.data!);
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


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

            {created.currentCredential != null &&
                <div className=''>
                <div className="" id="">
                    <div className="">
                        <h2 className="text-2xl font-bold sm:text-2xl">{created.currentCredential.credentialType}</h2><br />
                        {Object.keys(created.currentCredential)
                            .filter(key => !excludeKeys.includes(key))
                            .map(key => (

                                <div key={key} className="form-control">
                                    <label className="label">
                                        <span className="text-base label-text uppercase">{key}</span>
                                    </label>
                                    {created.currentCredential[key]}
                                    <div className="divider"></div> 
                                </div>
                            ))}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </div>
            </div>
            }
        </div>
    );
}
export default CredentialDisplay;