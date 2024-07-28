import React from "react";

const CampaignCard = ({ allCampaign, setOpenModel, setDonate, title }) => {
  console.log("All Campaigns: ", allCampaign);
  const daysLeft = (deadlineOfCampaign) => {
    const diff = new Date(deadlineOfCampaign).getTime() - Date.now();
    const remainingDays = diff / (1000 * 3600 * 24)
    return remainingDays.toFixed(0);
  };

  return (
    <div className="px-4 oy-16 mx-auto text-green-600 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <p className="py-16 text-2xl font-bold leading-5">{title}</p>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {allCampaign?.map((campaign, i) => (
          <div
            onClick={() => (setDonate(campaign), setOpenModel(true))}
            key={i + 1}
            className="cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded"
          >
            <img
              src="https://assets1.cbsnewsstatic.com/hub/i/r/2023/12/05/cb880792-19b9-4486-a896-8a961097834f/thumbnail/1200x630/137fbf86fdfa6f258304f82ad7e152e2/gettyimages-1418600713.jpg?v=170b469460f9b5b4a2670b02bb591e2d"
              className="object-cover w-full h-64 rounded"
              alt=""
            />
            <div className="py-5 pl-2">
              <p className="mb-2 text-xs font-semibold text-red-600 uppercase">
                Days Left: {daysLeft(campaign.deadlineOfCampaign)}
              </p>
              <a
                href="/"
                aria-label="Article"
                className="inline-block mb-3 text-black transition duration-200 hover:text-deep-purple-accent-700"
              >
                <p className="text-2xl font-bold text-green-600 leading-5">{campaign.title}</p>
              </a>
              <div className="flex space-x-4">
                <p className="font-semibold"> Target: {campaign.targetOfCampaign} ETH</p>
                <p className="font-semibold">
                  Raised: {campaign.amountCollected} ETH
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignCard;