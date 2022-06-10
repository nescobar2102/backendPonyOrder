const express = require("express");
const router = express.Router();
const ClasificacionItems = require('../controllers/clasificacionItems');

//Listar todos las clasificación items
router.get('/clasificacionItems_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos las clasificación Items';
    let clasificacionItems = await new ClasificacionItems().getclasificacionItems(); 
    if (clasificacionItems.length>0){
        response.data = clasificacionItems;       
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//Listar una clasificación items por descripcion
router.get('/clasificacionItems/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una clasificación Items por descripción';
    let {descripcion} = req.params;    
    let clasificacionItems = await new ClasificacionItems().getclasificacionItemsByDesc(descripcion);
    if (clasificacionItems.length>0){
        response.data = clasificacionItems;       
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//sincronizacion de clasificacion Items
router.post('/synchronization_clasificacionItems', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de  clasificación Items';
    const {clasificacionItems } = req.body
    for (var i=0;i<clasificacionItems.length;i++){ 
       // console.log("------categ" ,  clasificacionItems[i])
        const {id_clasificacion, descripcion, id_padre, nivel,  imagen, nit ,subclasificacionItem} =  clasificacionItems[i]
            await new ClasificacionItems().createclasificacionItems(id_clasificacion, descripcion, id_padre, nivel,   imagen, nit ); 
            if (clasificacionItems.length>0){
                response.data = clasificacionItems;       
            }
            else {
                response.success = false;
            }
            res.status(200).json(response) 
        for (var j=0;j<subclasificacionItem.length;j++){ 	 
        //console.log("------subategorias-------------" ,  subclasificacionItem[j])
        const {id_clasificacion, descripcion, id_padre, nivel,  imagen, nit } =  subclasificacionItem[j]
            await new ClasificacionItems().createclasificacionItems(id_clasificacion, descripcion, id_padre, nivel,   imagen,  nit ); 
                 if (subclasificacionItem.length>0){
                    response.data = subclasificacionItem;       
                    }
                else {
                     response.success = false;
                    }
                     res.status(200).json(response)                    
            };
     };     
     let clasificacionItems_all= await new ClasificacionItems().getclasificacionItems();
     res.status(200).json(clasificacionItems_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;