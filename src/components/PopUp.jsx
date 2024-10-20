import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "./ButtonLoader";
import PropTypes from "prop-types";

const PopUp = ({
  setOpenModal,
  getDonations,
  donate,
  donateFunction,
  setRefetch,
}) => {
  const [amount, setAmount] = useState(0);
  const [allDonationData, setAllDonationData] = useState();
  const [donateLoading, setDonateLoading] = useState(false);

  const createDonation = async (e) => {
    e.preventDefault();
    try {
      setDonateLoading(true);
      const data = await donateFunction(donate.pid, amount);

      if (data) {
        toast.success(
          "Thank you so much for your generous donation! Your support means the world to us."
        );
        setAmount(0);
        setOpenModal(false);
        window.location.reload();
        setRefetch(true);
      }
      setDonateLoading(false);
    } catch (error) {
      setDonateLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const donationListData = getDonations(donate.pid);
    return async () => {
      const donationData = await donationListData;

      setAllDonationData(donationData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setOpenModal(false)}
      />
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold">{donate?.title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setOpenModal(false)}
            >
              <span className="bg-transparent text-black h-6 w-6 text-2xl opacity-85 block outline-none focus:outline-none">
                x
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-slate-500 text-lg leading-relaxed text-justify">
              {donate?.description}
            </p>

            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount *"
              required
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
              id="amount"
              name="amount"
            />

            <div className="mt-4 mb-2 sm:mb-4">
              <button
                onClick={(e) => createDonation(e)}
                type="submit"
                className="inline-flex items-center justify-center h-12 px-10 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-400 hover:bg-deep-purple-700 focus:shadow-outline focus:outline-none bg-[#121212]"
                disabled={donateLoading}
              >
                {donateLoading ? <ButtonLoader /> : "Donate"}
              </button>
            </div>

            {allDonationData?.map((donation, index) => (
              <p
                key={`${donation}-${index}`}
                className="my-4 text-slate-500 text-lg leading-relaxed"
              >
                {`${index + 1}: ${donation?.donation} from `}
                <span className="text-purple-700">
                  {donation?.donator?.slice(0, 35)}...
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  setOpenModal: PropTypes.func,
  getDonations: PropTypes.func,
  donate: PropTypes.object,
  donateFunction: PropTypes.func,
  setRefetch: PropTypes.func,
};

export default PopUp;
