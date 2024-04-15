import { BRAND } from "@/types/brand";
import Image from "next/image";


const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex gap-4 justify-end">
        <button className="btn btn-sm btn-primary">Request Verification</button>
        <button className="btn btn-sm btn-accent">Deploy Verification Contract</button>
      </div>

      <div className="flex flex-col">
        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Verfied" checked />
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
                <th>Onwer</th>
                <th>Type</th>
                <th>Verified Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>B62qoQDqsg...7oZbyiPYEg</td>
                <td>Passport</td>
                <td>2024-03-12 11:34 AM</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>B62qoQDqsg...7oZbyiPYEg</td>
                <td>Driver's License</td>
                <td>2024-02-09 1:16 PM</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>B62qoQDqsg...7oZbyiPYEg</td>
                <td>Passport</td>
                <td>2024-02-15 12:54 PM</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default TableOne;
