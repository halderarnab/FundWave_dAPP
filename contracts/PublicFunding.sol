// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract PublicFunding {
    struct Campaign {
        address ownerOfCampaign;
        string title;
        string description;
        uint256 targetOfCampaign;
        uint256 deadlineOfCampaign;
        uint256 amountCollected;
        address[] donatorsOfCampaign;
        uint256[] donationsOfCampaign;
    }

    fallback() external payable {
        console.log("----- fallback:", msg.value);
    }

    receive() external payable {
        console.log("----- receive:", msg.value);
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public noOfCampaings = 0;

    function createCampaign(
        address _ownerOfCampaign,
        string memory _title,
        string memory _description,
        uint256 _targetOfCampaign,
        uint256 _deadlineOfCampaign
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[noOfCampaings];
        require(
            campaign.deadlineOfCampaign <= block.timestamp,
            "Deadline should be in the future and not in the past."
        );

        campaign.ownerOfCampaign = _ownerOfCampaign;
        campaign.title = _title;
        campaign.deadlineOfCampaign = _deadlineOfCampaign;
        campaign.description = _description;
        campaign.targetOfCampaign = _targetOfCampaign;
        campaign.amountCollected = 0;

        noOfCampaings++;
        return noOfCampaings - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];
        campaign.donatorsOfCampaign.push(msg.sender);
        campaign.donationsOfCampaign.push(amount);

        (bool sent, ) = payable(campaign.ownerOfCampaign).call{value: amount}("");
        if (sent) {
            campaign.amountCollected += amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donatorsOfCampaign, campaigns[_id].donationsOfCampaign);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](noOfCampaings);

        for (uint i = 0; i < noOfCampaings; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
