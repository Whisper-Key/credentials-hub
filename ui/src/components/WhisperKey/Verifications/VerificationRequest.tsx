import Authentication from '@/modules/Authentication';
import { useEffect, useState, useContext, Component, ChangeEvent } from "react";
// import { AuthContext } from '@/components/layout/AuthPage';
import { AuthContext } from 'zkshield';
import VerificationRequestDetail from './VerificationTemplateDetail';
import QRCodeScanner from '../../QRCodeScanner';
import Router from "next/router";

const VerificationRequest = () => {
  const [selectedCredential, setSelectedCredential] = useState<any | null>(null);
  const [owner, setOwner] = useState<any | null>(null);
  const [credentialMetaDataList, setCredentialMetaDataList] = useState<any[]>([]);
  const [authState, setAuthState] = useContext(AuthContext);
  const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedCredentialObject = credentialMetaDataList.find(vc => vc.name === selectedValue);
    // Do something with the selectedCredentialObject, such as updating state
    setSelectedCredential(selectedCredentialObject || null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setOwner(selectedValue);
  }

  const requestVerification = (e: any) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/api/verifications/`;
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // You can add other headers here if needed
      },
      body: JSON.stringify({ requestor: address, owner: owner, template: selectedCredential, status: 'pending'})
    };
    const response = fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => Router.push('verifications'));
  }

  useEffect(() => {
    // This will log the updated value after the state has been successfully updated
    console.log(selectedCredential?.name);
  }, [selectedCredential]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('authState: ', authState);
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/api/verifications/templates/${address}`;

        console.log('credsAPi: ', apiUrl)
        if (!apiUrl) {
          throw new Error('API URL not defined in environment variables.');
        }
        let result = [];
        try {
          const response = await fetch(apiUrl);
          result = await response.json();
        } catch (error) {
          console.error('Error trying to fetch Credential Metadata', error);
        }

        let creds: any[] = result;
  
        setCredentialMetaDataList(creds);
      } catch (error) {
        console.error('Error trying to fetch Credential Metadata', error);
      }
    }
    fetchData();
  }, []);

  return (

        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <div className=''>
        <div className="" id="">
          <div className="">
             
              <div>

                <h2 className='text-2xl font-bold sm:text-2xl'>Choose a Verification Template</h2>

                <div className="form-control">
                  <label className="label">
                    <span className="text-base label-text vc-fieldName"></span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs "
                    onChange={handleSelectChange}>
                    <option>Select a Template</option>
                    {credentialMetaDataList.map((vc, index) => (
                      <option key={vc.name}>{vc.name}</option>
                    ))};
                  </select>
                </div>
                <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Owner</span>
          </label>
          <div className="join">
            <QRCodeScanner uniqueID="promote-form-scan" className="btn join-item" />
            <input id='owner' name="owner" onChange={handleInputChange} className="input input-bordered join-item " />
          </div>
          {/* <input type="text" id="name" className="input input-bordered w-full max-w-xs" placeholder="Enter the address of the intended owner" /> */}
        </div>
        <div className='mt-6'>
          <button type='submit' onClick={requestVerification} className="btn btn-primary">Request</button>
        </div>
              </div>
            <br />
            <div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>



  );
}

export default VerificationRequest;
