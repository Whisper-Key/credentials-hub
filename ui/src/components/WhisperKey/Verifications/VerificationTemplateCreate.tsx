import Authentication from '@/modules/Authentication';
import { useEffect, useState, useContext, Component, ChangeEvent } from "react";
// import { AuthContext } from '@/components/layout/AuthPage';
import { AuthContext } from 'zkshield';
import VerificationRequestDetail from './VerificationTemplateDetail';
import QRCodeScanner from '../../QRCodeScanner';

const VerificationTemplateCreate = () => {
  const [selectedCredential, setSelectedCredential] = useState<any | null>(null);
  const [credentialMetaDataList, setCredentialMetaDataList] = useState<any[]>([]);
  const [authState, setAuthState] = useContext(AuthContext);
  const address = "B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg";
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedCredentialObject = credentialMetaDataList.find(vc => vc.name === selectedValue);
    selectedCredentialObject!.issuer = authState.userAddress;
    // Do something with the selectedCredentialObject, such as updating state
    setSelectedCredential(selectedCredentialObject || null);
  };

  useEffect(() => {
    // This will log the updated value after the state has been successfully updated
    console.log(selectedCredential?.name);
  }, [selectedCredential]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('authState: ', authState);
        const credsApi = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/all`;

        console.log('credsAPi: ', credsApi)
        if (!credsApi) {
          throw new Error('API URL not defined in environment variables.');
        }
        let result = [];
        try {
          const response = await fetch(credsApi);
          result = await response.json();
        } catch (error) {
          console.error('Error trying to fetch Credential Metadata', error);
        }

        let creds: any[] = result;
  
        setCredentialMetaDataList([...new Set(creds)]);
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
            <form className="">
             
              <div>

                <h2 className='text-2xl font-bold sm:text-2xl'>Choose a Credential</h2>

                <div className="form-control">
                  <label className="label">
                    <span className="text-base label-text vc-fieldName"></span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs "
                    onChange={handleSelectChange}>
                    <option>Select a Credential</option>
                    {credentialMetaDataList.map((vc, index) => (
                      <option key={vc.name}>{vc.name}</option>
                    ))};
                  </select>
                </div>

              </div>
            </form>
            <br />
            <div>
              {selectedCredential !== null && (<VerificationRequestDetail credentialMetadata={selectedCredential}></VerificationRequestDetail>)}
            </div>
          </div>
          
        </div>
      </div>
    </div>



  );
}

export default VerificationTemplateCreate;
