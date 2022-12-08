const router = require('express').Router();
const { 
    urlQuery, 
    bodyRequest, 
    headerRequest, 
    fileUpload,
    fileDownload 
} = require('../controllers/assignment.controller')

// URL Query POST Route
router.post('/',urlQuery);

// Body Raw Request POST Route
router.post('/body',bodyRequest);

// Header Request POST Route
router.post('/header',headerRequest);

// File Upload Route
router.post('/upload',fileUpload);

// File Download Route
router.get('/download',fileDownload);


module.exports = router;