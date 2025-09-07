const express = require('express');
const router = express.Router();

const { createCampaign,insertCreatorInCampaign,getAllCampaignOfUser,getAllCreatorsInCampaign,deleteCampaign,deleteCreatorFromCampaign } = require('../controllers/shortlistController');
router.post('/createCampaign', createCampaign);
router.post('/insertCreatorInCampaign', insertCreatorInCampaign);
router.get('/getAllCampaignsOfUser', getAllCampaignOfUser);
router.get('/getAllCreatorsInCampaign/:id', getAllCreatorsInCampaign);
router.delete('/deleteCampaign/:id', deleteCampaign);
router.delete('/deleteCreatorFromCampaign/', deleteCreatorFromCampaign);

module.exports = router;
