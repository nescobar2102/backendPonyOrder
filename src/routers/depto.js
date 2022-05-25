const express = require("express");
const router = express.Router();
const Depto = require('../controllers/depto');

router.get('/depto_all', async (req,res) => { 
    let depto = await new Depto().getDepto(); 
    res.status(200).json(depto)
});
router.get('/depto/:nit', async (req,res) => {
    let {nit} = req.params;    
    let depto = await new Depto().getDeptoByNit(nit);
    res.status(200).json(depto)
});
router.post('/synchronization_depto', async (req,res) => {
    const {deptos } = req.body
    for (var i=0;i<deptos.length;i++){ 
        const {nit,id_pais,id_depto,nombre} =  deptos[i]
        await new Depto().createDepto(nit,id_pais,id_depto,nombre); 
     };
     
     let depto_all= await new Depto().getDepto();
     res.status(200).json(depto_all)
  
});
module.exports = router;