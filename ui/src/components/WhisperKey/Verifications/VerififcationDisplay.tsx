import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from 'zkshield';

import { CredentialMetadata, CredentialField } from '../../../modules/CredentialMetadata';
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { AddressExtensions } from '@/modules/AddressExtensions';
const VerififcationDisplay = () => {
    const router = useRouter();

  const [verification, setVerification] = useState(null as any | null);

    const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";
    const searchParams = useSearchParams();

    useEffect(() => {

        (async () => {
            const id = searchParams.get('id');
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/api/verifications/${address}/${id}`;
    
            let result = [];
            try {
              const response = await fetch(apiUrl);
              result = await response.json();
              setVerification(result);
            } catch (error) {
              console.error('Error trying to fetch Verification', error);
            }
        })();
    
    }, []);


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

            {verification != null &&
                <div className=''>
                    <div className="" id="">
                        <div className="">

                            <h2 className="text-2xl font-bold sm:text-2xl">{verification.credentialType} Verification</h2><br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-base label-text uppercase">Owner</span>
                                </label>
                                {AddressExtensions.getShortAddress(verification.owner)}
                                <div className="divider"></div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-base label-text uppercase">Status</span>
                                </label>
                                {verification.status}
                                <div className="divider"></div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-base label-text uppercase">Issuer</span>
                                </label>
                                {AddressExtensions.getShortAddress(verification.template.issuer)}
                                <div className="divider"></div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-base label-text uppercase">Verification Date</span>
                                </label>
                                {new Date(verification.verificationDate.seconds * 1000).toISOString()}
                                <div className="divider"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            }
        </div>
    );
}
export default VerififcationDisplay;