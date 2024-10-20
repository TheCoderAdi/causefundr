import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import campaignImages, { NotFoundVideo } from "../assets/images";

const Card = ({ title, allCampaigns, setOpenModal, setDonate }) => {
  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - new Date().getTime();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0) + " day(s) left";
  };

  if (allCampaigns.length === 0) {
    return (
      <div className="px-4 py-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
        <p className="py-16 text-2xl font-bold leading-5">{title}</p>
        <div className="flex items-center justify-center sm:max-w-sm sm:mx-auto lg:max-w-full">
          <div className="transition-shadow duration-300">
            <video
              autoPlay
              loop
              muted
              className="object-cover w-full h-64 rounded"
            >
              <source src={NotFoundVideo} type="video/mp4" />
            </video>
            <div className="py-5 px-4">
              <p className="mb-2 text-center text-md font-semibold text-gray-600 uppercase">
                No campaigns available
              </p>
              <Link
                to={"/"}
                className="inline-block mb-3 transition-colors duration-200 hover:text-deep-purple-700 bg-[#644df6] rounded p-3"
              >
                <p className="text-2xl font-bold text-center text-white">
                  Create a Campaign
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
      <p className="pt-8 pb-12 text-2xl font-bold leading-5">{title}</p>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {allCampaigns?.map((campaign, index) => (
          <div
            onClick={() => {
              setDonate(campaign);
              setOpenModal(true);
            }}
            key={index}
            className="cursor-pointer border border-black overflow-hidden transition-shadow duration-300 bg-white rounded"
          >
            <img
              src={campaignImages[index % 5]}
              alt="Campaign Banner"
              className="object-cover w-full h-64 rounded"
            />

            <div className="py-5 px-4">
              <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                {daysLeft(campaign.deadline)}
              </p>

              <Link
                to="/"
                className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-700"
              >
                <p className="text-2xl font-bold leading-7">
                  {campaign?.title}
                </p>
              </Link>
              <p className="mb-4 text-gray-700 text-justify">
                {campaign?.description?.length > 303
                  ? `${campaign?.description?.substring(0, 300)}...`
                  : campaign?.description}
              </p>
              <div className="flex space-x-4">
                <p className="font-semibold">Target: {campaign?.target} ETH</p>
                <p className="font-semibold">
                  Raised: {campaign?.amountCollected} ETH
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  allCampaigns: PropTypes.array.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setDonate: PropTypes.func.isRequired,
};

export default Card;
