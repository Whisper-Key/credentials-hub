import { BRAND } from "@/types/brand";
import Image from "next/image";


const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white text-right">
        <button className="btn btn-sm btn-primary">Issue Credential</button>
      </h4>

      <div className="flex flex-col">
        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Issued" checked />
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
              <tr>
                <th>1</th>
                <td>23432</td>
                <td>Passport</td>
                <td>2024-03-12 11:34 AM</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>4554-B</td>
                <td>Driver's License</td>
                <td>2024-02-09 1:16 PM</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>34522</td>
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
