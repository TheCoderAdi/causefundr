// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
        bool completed;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint256) public donorTotalContributions;
    mapping(address => uint256) public donorRewards;

    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(
        uint256 id,
        address owner,
        uint256 target,
        uint256 deadline
    );
    event DonationReceived(uint256 id, address donator, uint256 amount);
    event CampaignCompleted(uint256 id);
    event RewardIssued(
        address donator,
        uint256 totalDonations,
        uint256 rewardLevel
    );

    // Reward levels
    uint256 public constant BRONZE_THRESHOLD = 1 ether;
    uint256 public constant SILVER_THRESHOLD = 5 ether;
    uint256 public constant GOLD_THRESHOLD = 10 ether;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future"
        );

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.completed = false;

        numberOfCampaigns++;

        emit CampaignCreated(numberOfCampaigns - 1, _owner, _target, _deadline);
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];

        require(
            block.timestamp <= campaign.deadline,
            "Campaign deadline has passed"
        );
        require(!campaign.completed, "Campaign is already completed");

        uint256 amount = msg.value;
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        donorTotalContributions[msg.sender] += amount;

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        require(sent, "Transfer to campaign owner failed");

        campaign.amountCollected += amount;

        emit DonationReceived(_id, msg.sender, amount);

        issueReward(msg.sender);

        if (campaign.amountCollected >= campaign.target) {
            campaign.completed = true;
            emit CampaignCompleted(_id);
        }
    }

    function issueReward(address _donator) internal {
        uint256 totalDonations = donorTotalContributions[_donator];

        uint256 rewardLevel;
        if (totalDonations >= GOLD_THRESHOLD) {
            rewardLevel = 3; // Gold
        } else if (totalDonations >= SILVER_THRESHOLD) {
            rewardLevel = 2; // Silver
        } else if (totalDonations >= BRONZE_THRESHOLD) {
            rewardLevel = 1; // Bronze
        }

        if (rewardLevel > donorRewards[_donator]) {
            donorRewards[_donator] = rewardLevel; // Update reward level
            emit RewardIssued(_donator, totalDonations, rewardLevel);
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function refundDonation(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(
            block.timestamp > campaign.deadline,
            "Campaign is still active"
        );
        require(
            campaign.amountCollected < campaign.target,
            "Campaign reached the target"
        );

        for (uint256 i = 0; i < campaign.donators.length; i++) {
            address donator = campaign.donators[i];
            uint256 donation = campaign.donations[i];

            (bool refunded, ) = payable(donator).call{value: donation}("");
            require(refunded, "Refund failed");
        }
    }

    function updateCampaign(
        uint256 _id,
        string memory _newTitle,
        string memory _newDescription
    ) public {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Only owner can update");
        require(
            campaign.donations.length == 0,
            "Cannot update after donations"
        );

        campaign.title = _newTitle;
        campaign.description = _newDescription;
    }
}
