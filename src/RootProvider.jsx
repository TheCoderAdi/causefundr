import { useState, useEffect, useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Home from "./pages/Home";
import AllCampaigns from "./pages/AllCampaings";

import { CrowdFundingContext } from "./context/CrowdFunding.context";
import { Footer, Navbar, PopUp } from "./components";
import { handleNetworkSwitch } from "./context/constant";
import TopDonors from "./pages/TopDonor";

export const RootProvider = () => {
  const {
    createCampaign,
    getCampaigns,
    getUserCampaigns,
    donateToCampaign,
    getDonations,
    allCampaigns,
    userCampaigns,
    reload,
  } = useContext(CrowdFundingContext);

  const [refetch, setRefetch] = useState(false);

  // Donate PopUp Modal
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  useEffect(() => {
    handleNetworkSwitch();
  }, []);

  useEffect(() => {
    getCampaigns();
    getUserCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, reload]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);
  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: (
              <RenderWithHeaderAndFooter>
                <Home createCampaign={createCampaign} />
              </RenderWithHeaderAndFooter>
            ),
          },
          {
            path: "/all-campaigns",
            element: (
              <RenderWithHeader>
                <AllCampaigns
                  title="All Listed Campaigns"
                  allCampaigns={allCampaigns}
                  setOpenModal={setOpenModal}
                  setDonate={setDonateCampaign}
                />
              </RenderWithHeader>
            ),
          },
          {
            path: "/my-campaigns",
            element: (
              <RenderWithHeader>
                <AllCampaigns
                  title="Your Campaigns"
                  allCampaigns={userCampaigns}
                  setOpenModal={setOpenModal}
                  setDonate={setDonateCampaign}
                />
              </RenderWithHeader>
            ),
          },
          {
            path: "/top-donors",
            element: (
              <>
                <RenderWithHeader>
                  <TopDonors />
                </RenderWithHeader>
              </>
            ),
          },
        ])}
      />
      {openModal && (
        <PopUp
          setOpenModal={setOpenModal}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donateToCampaign}
          setRefetch={setRefetch}
        />
      )}
    </>
  );
};

const RenderWithHeaderAndFooter = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

const RenderWithHeader = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

RenderWithHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

RenderWithHeaderAndFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

RenderWithHeaderAndFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
