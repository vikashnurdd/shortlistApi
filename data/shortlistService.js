const { query } = require("../utils/database");

const createCampaignInDB=async (userID, campaignName, campaignDescription)=>{
    const result = await query(`INSERT INTO campaigns (user_id, title, description) VALUES ($1, $2, $3) RETURNING *`, [userID, campaignName, campaignDescription]);
    return result.rows[0];
}
const insertCreatorInCampaignDB=async (creatorID, campaignID)=>{
    const result = await query(`INSERT INTO user_campaigns (user_id, campaign_id) VALUES ($1, $2) RETURNING *`, [creatorID, campaignID]);
    return result.rows[0];
}
const getCampaignsFromDB=async (clientID)=>{
    let result = await query(`SELECT * FROM campaigns WHERE user_id = $1`, [clientID]);
    return result.rows;
}
const getCampaignsAllCreators=async (campaignID)=>{
    let result = await query(`SELECT u.id, u.username, u.email FROM users u JOIN user_campaigns uc ON u.id = uc.user_id WHERE uc.campaign_id = $1`, [campaignID]);
    return result.rows;
}
const deleteCampaignFromDB=async (campaignID)=>{
    let result = await query(`DELETE FROM campaigns WHERE id = $1 RETURNING *`, [campaignID]);
    return result.rows[0];
}
const deleteCreatorFromCampaignDB=async (creatorID, campaignID)=>{
    let result = await query(`DELETE FROM user_campaigns WHERE user_id = $1 AND campaign_id = $2 RETURNING *`, [creatorID, campaignID]);
    return result;
}
module.exports = {
	createCampaignInDB,
	insertCreatorInCampaignDB,
    getCampaignsFromDB,
	getCampaignsAllCreators,
    deleteCampaignFromDB,
    deleteCreatorFromCampaignDB
};


