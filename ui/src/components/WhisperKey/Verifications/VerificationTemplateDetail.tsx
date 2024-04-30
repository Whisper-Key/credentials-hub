import React, { ChangeEvent, FormEvent, Component, useContext, useState } from 'react';

import QRCodeScanner from '../../QRCodeScanner';
import Authentication from '@/modules/Authentication';
// import { AuthContext } from "@/components/layout/AuthPage";
import { AuthContext } from 'zkshield';

import Router from 'next/router';
import { SHA256 } from 'crypto-js';
import { Field, Signature, Scalar, PublicKey } from 'o1js';


interface CredentialFormProps {
  credentialMetadata: any;
}

const VerificationTemplateDetail: React.FC<CredentialFormProps> = ({ credentialMetadata }) => {
  const { fields } = credentialMetadata;
  const [authState, setAuthState] = useContext(AuthContext) as any;
  const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";

  const initialCode = 'this.credentialIssuer.assertEquals(issuer);';
  console.log('credentialMetadata issuer', credentialMetadata.owner);
  const [state, setState] = useState({
    formData: {
      issuer: credentialMetadata.owner,
      templateOwner: address,
      credentialType: credentialMetadata.name,
      verificationLogic: initialCode,
    } as any,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target);
    setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
    console.log(state.formData);
  };
  const handleTextAreaChange = (e: any) => {
    console.log("Text area change", e);

    const { name, value } = e.target;
    setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
    console.log(state.formData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // state.formData.issuer = authState.userAddress; // the credential owner is issuing the credential
    // state.formData.credentialType = credentialMetadata.name;
    // Process the form data, you can access it from this.state.formData
    console.log('Form Data:', state.formData);
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Issuing Verifiable Credential, please wait this can take a few mins`, alertNeedsSpinner: true });
    Router.back();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const credStr = JSON.stringify(state.formData);
    const hash = SHA256(credStr).toString();
    //const hash = '1216d101a5016fbbcb8c0df2896be04517197aea2f92a4f5fdd117a6633795ae';
    const signResult = await (window as any).mina?.signMessage({ message: hash }).catch((err: any) => err);
    // const signature = new Signature(Field(signResult.signature.field), Scalar.fromBigInt(BigInt(signResult.signature.scalar)));
    // const baseSig = signature.toBase58();
    // console.log("base58", baseSig);


    var ownerWalletAddress = state.formData.owner;

    fetchData({ data: state.formData, hash: hash, signResult: signResult });
    
  };
  const fetchData = async (formData: any) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/api/verifications/templates`;
    if (!apiUrl) {
      throw new Error('API URL not defined in environment variables.');
    }
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // You can add other headers here if needed
      },
      body: JSON.stringify(state.formData)
    };
    try {

    const response = fetch(apiUrl, requestOptions)
    .then((response) => {
      console.log('api response from issuing cred', response);
      return response.json()})
    .then((data) => {
      console.log(data);
          let transactionLink = `<a href="${data.transactionUrl}" class="btn btn-sm" target="_blank">View transaction</a>`;
           setAuthState({ ...authState, alertAvailable: true, alertMessage: `Credential issued ${transactionLink}`, alertNeedsSpinner: false });
        })
    .catch((err: any) => console.error('Error trying to fetch Credential Metadata', err));
    } catch (error) {
      console.error('Error trying to fetch Credential Metadata', error);
    }
  }


  return (
    <div className='grid grid-cols-1 space-y-6'>
      <div className='divider'></div>
      <h2 className='text-2xl font-bold sm:text-2xl'>Template Details</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Template Name</span>
          </label>
          <div>
            <input type='text' name='name' onChange={handleInputChange} className="input input-bordered w-full max-w-xs" placeholder="Enter Template Name" />
          </div>
        </div>
      <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Issuer Address</span>
          </label>
          <div>
            {credentialMetadata.owner}
          </div>
        </div>
          <div className='divider'></div>
        <p>
          <h3>Template Logic</h3>
        <pre>
          verify(oracleSignature, verification, owner, issuer, credentialType, {fields.map((field: any) => field.name).join(', ')}) &#123;
        </pre>

          <textarea className='p-4' name="verificationLogic" cols={60} rows={10} onChange={handleTextAreaChange}>
          {state.formData.verificationLogic}
          </textarea>
        </p>
        <pre>
          <code>
            this.emitEvent('verified', verification);
            </code>
        </pre>
        <pre>
          
        &#125;
        </pre>
        <div className='mt-6'>
          <button type='submit' className="btn btn-primary">Create Template</button>
        </div>
      </form>
    </div>
  );
}



export default VerificationTemplateDetail;
