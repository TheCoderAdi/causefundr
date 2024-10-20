import { useContext, useEffect, useState } from "react";
import { CrowdFundingContext } from "../context/CrowdFunding.context";

const TopDonors = () => {
  const { allCampaigns, getDonations, getCampaigns } =
    useContext(CrowdFundingContext);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donators, setDonators] = useState([]);
  const [action, setAction] = useState(false);

  useEffect(() => {
    getCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCampaignChange = async (e) => {
    if (e.target.value === "") {
      setSelectedCampaign(null);
      setDonators([]);
      return;
    }
    const campaignId = e.target.value;
    setSelectedCampaign(campaignId);

    if (campaignId) {
      const donations = await getDonations(campaignId);
      setDonators(donations);
    }
  };

  useEffect(() => {
    if (donators.length > 0) {
      const sortedDonations = [...donators].sort((a, b) =>
        action ? b.donation - a.donation : a.donation - b.donation
      );
      setDonators(sortedDonations);
    }
  }, [action, donators]);
  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Top Donators</h2>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Campaign
        </label>
        <select
          onChange={handleCampaignChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a campaign</option>
          {allCampaigns.map((campaign, index) => (
            <option key={index} value={index}>
              {campaign.title}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-[#1b1b1b] text-left text-sm font-semibold text-white">
                Donator Address
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-[#1b1b1b] text-left text-sm font-semibold text-white">
                Donation Amount (ETH){" "}
                <span
                  className="cursor-pointer"
                  onClick={() => setAction(!action)}
                >
                  {action ? "▲" : "▼"}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {donators.length > 0 ? (
              donators.map((donator, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {donator.donator}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {donator.donation}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No donations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDonors;
