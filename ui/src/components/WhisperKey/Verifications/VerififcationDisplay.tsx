import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from 'zkshield';

import { CredentialMetadata, CredentialField } from '../../../modules/CredentialMetadata';
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
const VerififcationDisplay = () => {
    const router = useRouter();
    const [created, setCreated] = useState({
        currentCredential: null as CredentialMetadata | null,
    });
    const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";
    const searchParams = useSearchParams();

    useEffect(() => {

        (async () => {

            const name = searchParams.get('name');
            const apiURL = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/metadata/${name}`;

            const requestHeaders = { "Content-Type": "application/json" };
            let createdCredential: CredentialMetadata;
            axios.get(apiURL)
                .then(function (response) {
                    // handle success
                    console.log("Get Credentials created - Success");
                    createdCredential = response!.data! as CredentialMetadata;
                    console.log(createdCredential);

                    setCreated({ ...created, currentCredential: createdCredential });

                    console.log("created Credential:" + createdCredential);
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

                            <h2 className="text-2xl font-bold sm:text-2xl">{created.currentCredential.name}</h2><br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-base label-text uppercase">Owner</span>
                                </label>
                                {created.currentCredential.owner}
                                <div className="divider"></div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-base label-text uppercase">Description</span>
                                </label>
                                {created.currentCredential.description}
                                <div className="divider"></div>
                            </div>
                            <h3 className="text-2xl font-bold sm:text-2xl">Fields</h3>
                            <table className="table">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {created.currentCredential.fields.map((field: CredentialField, index: number) => {
                                        return (<tr key={index}>
                                            <td></td>
                                            <td>{field.name}</td>
                                            <td>{field.type}</td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
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
export default VerififcationDisplay;