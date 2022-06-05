const express = require("express");
const router = express.Router();
const Kit = require('../controllers/kit');

router.get('/kit_all', async (req, res) => {
    let kit = await new Kit().getKit();
    res.status(200).json(kit)
});
router.get('/kit/:descripcion/:nit', async (req, res) => {
    let {descripcion, nit} = req.params;
    let kit = await new Kit().getKitByNit(descripcion, nit);
    res.status(200).json(kit)
});
router.post('/synchronization_kit', async (req, res) => {

        const response = newResponseJson();
        response.msg = 'Sincronización de Kit';
        let status = 201;
        let bandera = false;
        let bandera_hijo = false;
        const {kits} = req.body
        for (var i = 0; i < kits.length; i++) {
            if (!bandera_hijo) {
                const {
                    nit,
                    id_kit,
                    descripcion,
                    precio_kit,
                    precio_kit_iva,
                    flag_vigencia,
                    fecha_inicial,
                    fecha_final,
                    ultima_actualizacion,
                    kits_det
                } = kits[i];

                 result1 = await new Kit().createKit(nit, id_kit, descripcion, precio_kit, precio_kit_iva, flag_vigencia, fecha_inicial, fecha_final, ultima_actualizacion);
                if (!result1 ?. rowCount || result1 ?. rowCount == 0) { // se valida si existe el valor rowCount
                    console.log('entra al falase'); // se se realizo el insert
                    bandera = true; // se levanta la bandera
                    break;
                } else { // realizo el insert maestro
                    if (kits_det?.length > 0 && result1?.rowCount > 0) {

                        for (var j = 0; j < kits_det.length; j++) {
                            console.log('----- segundo insert------', kits_det[j]);
                            const {
                                nit,
                                id_kit,
                                id_item,
                                id_bodega,
                                cantidad,
                                tasa_dcto,
                                precio,
                                valor_total,
                                tasa_iva,
                                valor_iva,
                                total,
                                ultima_actualizacion
                            } = kits_det[j];
                            result2 = await new Kit().createKitdet(nit, id_kit, id_item, id_bodega, cantidad, tasa_dcto, precio, valor_total, tasa_iva, valor_iva, total, ultima_actualizacion);

                            if (!result2?.rowCount || result2?.rowCount == 0) { //
                                bandera_hijo = true; // se levanta la bandera
                                break;
                            }
                        };
                    }
                }
            }
        }
            if (!bandera && !bandera_hijo) { //no se levanto la bandera (false)
                let kit_all = await new Kit().getKit();
                response.data = kit_all;        
                
            } else { //bandera ( true) 
                response.success = false;
                status = 400;
                response.msg = 'Error en la  sincronización de item';
            }
            res.status(status).json(response);

        }
    );
    function newResponseJson() {
        return {
            success: true,
            msg: "",
            data: [],
        };
    }
    module.exports = router;
