const express = require("express");
const   { 
        signinFunc, 
        updateAdminFunc,
        getAdminFunc, 
        getAllAdminsFunc, 
        deleteAdminFunc 
        } 
        = require("./adminController");
const router = express.Router()

router.post('/sign-in',signinFunc);
router.put('/:id',updateAdminFunc);
router.get('/me',getAllAdminsFunc);
router.get('/get-all-admins',getAllAdminsFunc);
router.get('/:id',getAdminFunc);
router.delete('/:id',deleteAdminFunc);

module.exports = router