import React, { useState, useEffect, useContext } from 'react';
import { PublicFundingContext } from '@/Context/PublicFunding';
import { Main, CampaignCard, DonatePopUp } from '@/Components';


const index = function () {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(PublicFundingContext);

  const [allCampaign, setAllCampaign] = useState([]);
  const [userCampaign, setUserCampaign] = useState([]);

  useEffect(() => {
    return async () => {
      const getCampaignsData = getCampaigns();
      const userCampaignData = getUserCampaigns();
      const allData = await getCampaignsData;
      const userData = await userCampaignData;
      console.log(allData)
      setAllCampaign(allData);
      setUserCampaign(userData);
    }
  }, [])

  //Donate pop-up model
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log("DonateCampaign: ", donateCampaign);
  return (
    <>
      <Main titleData={titleData} createCampaign={createCampaign} />
      <CampaignCard
        title="All listed Campaign"
        allCampaign={allCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      /> 
      <CampaignCard  
        title="Your created Campaign"
        allCampaign={userCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      {openModel && (
        <DonatePopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
}

export default index;