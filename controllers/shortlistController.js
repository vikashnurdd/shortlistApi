const {createCampaignInDB,
	insertCreatorInCampaignDB,
    getCampaignsFromDB,
	getCampaignsAllCreators,
    deleteCampaignFromDB,
    deleteCreatorFromCampaignDB
}=require('../data/shortlistService');

const createCampaign = async (req, res) => {
    console.log("Request body:", req.body);
    const {userID, campaignName, campaignDescription="No description provided"} = req.body;
    const response = await createCampaignInDB(userID, campaignName, campaignDescription);
    res.status(201).json({ message: "Campaign created successfully", data: response });
};
const insertCreatorInCampaign = async (req, res) => {
    console.log("Request body:", req.body);
    const {creatorID, campaignID} = req.body;
    const response = await insertCreatorInCampaignDB(creatorID, campaignID);
    res.status(201).json({ message: "Creator added to campaign successfully", data: response });
};
const getAllCampaignOfUser = async (req, res) => {
    const { userID } = req.body;
    const response =await getCampaignsFromDB(userID);
    console.log("Fetched campaign:", response);
    res.status(200).json({ message: "Campaign retrieved successfully", data: response });
};
const getAllCreatorsInCampaign = async (req, res) => {
    const { id } = req.params;
    const response = await getCampaignsAllCreators(id);
    res.status(200).json({ message: "Creators retrieved successfully", data: response });
}
const deleteCampaign = async (req, res) => {
    const { id } = req.params;
    const response = await deleteCampaignFromDB(id);
    res.status(200).json({ message: "Campaign deleted successfully", data: response });
};
const deleteCreatorFromCampaign = async (req, res) => {
    const { creatorID, campaignID } = req.body;
    const response= await deleteCreatorFromCampaignDB(creatorID, campaignID);
    res.status(200).json({ message: "Creator removed from campaign successfully", data: response.rows[0] });
};
module.exports = { createCampaign, insertCreatorInCampaign, getAllCampaignOfUser, getAllCreatorsInCampaign, deleteCampaign, deleteCreatorFromCampaign };