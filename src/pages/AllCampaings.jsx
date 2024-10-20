import { Card } from "../components";
import PropTypes from "prop-types";

const AllCampaings = ({ title, allCampaigns, setOpenModal, setDonate }) => {
  return (
    <Card
      title={title}
      allCampaigns={allCampaigns}
      setOpenModal={setOpenModal}
      setDonate={setDonate}
    />
  );
};

AllCampaings.propTypes = {
  title: PropTypes.string.isRequired,
  allCampaigns: PropTypes.array.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setDonate: PropTypes.func.isRequired,
};

export default AllCampaings;
