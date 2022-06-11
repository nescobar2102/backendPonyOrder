const express = require("express");
const router = express.Router();
const Tercero = require('../controllers/tercero');

router.get('/tercero_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos tercero';
    let status = 200;
    let tercero = await new Tercero().getTercero();
    if (tercero.length > 0) {
        response.data = tercero;
    } else {
        status = 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/tercero/:nit/:nombre', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    response.msg = 'Listar un tercero por Nit';
    let {nit, nombre} = req.params;
    let tercero = await new Tercero().getTerceroByNit(nit, nombre);
    if (tercero.length > 0) {
        response.data = tercero;
    } else {
        status = 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.post('/synchronization_tercero', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de tercero';
    let status = 201;
    const {terceros} = req.body
    let bandera = false;
    let bandera_cliente= false;
    let bandera_direccion = false;
    await new Tercero().deleteTercero();
    for (var i = 0; i < terceros.length; i++) {
        if (!bandera_cliente && !bandera_direccion) {
            const {
                nit,
                id_tercero,
                id_sucursal_tercero,
                id_tipo_identificacion,
                dv,
                nombre,
                direccion,
                id_pais,
                id_depto,
                id_ciudad,
                id_barrio,
                telefono,
                id_actividad,
                id_tipo_empresa,
                cliente,
                fecha_creacion,
                nombre_sucursal,
                primer_apellido,
                segundo_apellido,
                primer_nombre,
                segundo_nombre,
                flag_persona_nat,
                estado_tercero,
                vendedor,
                id_lista_precio,
                id_forma_pago,
                usuario,
                flag_enviado,
                e_mail,
                telefono_celular,
                e_mail_fe,
                terceros_cliente,
                terceros_direccion
            } = terceros[i];
         
         result1 = await new Tercero().createTercero(  nit,
            id_tercero,
            id_sucursal_tercero,
            id_tipo_identificacion,
            dv,
            nombre,
            direccion,
            id_pais,
            id_depto,
            id_ciudad,
            id_barrio,
            telefono,
            id_actividad,
            id_tipo_empresa,
            cliente,
            fecha_creacion,
            nombre_sucursal,
            primer_apellido,
            segundo_apellido,
            primer_nombre,
            segundo_nombre,
            flag_persona_nat,
            estado_tercero,
            vendedor,
            id_lista_precio,
            id_forma_pago,
            usuario,
            flag_enviado,
            e_mail,
            telefono_celular,
            e_mail_fe);
          
            if (!result1 ?. rowCount || result1 ?. rowCount == 0) { 
                console.log('Entra al false tercero primer insert'); 
                bandera = true; 
                break;
            } else {
                if (terceros_cliente ?. length > 0 && result1 ?. rowCount > 0) {
                    console.log('pasa por el dto insert', result1 ?. rowCount);

                    for (var j = 0; j < terceros_cliente.length; j++) {
                        const {
                            nit,
                            id_tercero,
                            id_sucursal_tercero,
                            id_forma_pago,
                            id_precio_item,
                            id_vendedor,
                            id_suc_vendedor,
                            id_medio_contacto,
                            id_zona,
                            flag_exento_iva,
                            dia_cierre,
                            id_impuesto_reteiva,
                            id_agente_reteiva,
                            id_impuesto_reteica,
                            id_agente_reteica,
                            id_impuesto_retefuente,
                            id_agente_retefuente,
                            id_agente_retecree,
                            id_impuesto_retecree,
                            id_tamanno,
                            limite_credito,
                            dias_gracia,
                            flag_cartera_vencida,
                            dcto_cliente,
                            dcto_adicional,
                            numero_facturas_vencidas
                        } = terceros_cliente[j];
                       return result2 = await new Tercero().createTercerocliente(nit,
                            id_tercero,
                            id_sucursal_tercero,
                            id_forma_pago,
                            id_precio_item,
                            id_vendedor,
                            id_suc_vendedor,
                            id_medio_contacto,
                            id_zona,
                            flag_exento_iva,
                            dia_cierre,
                            id_impuesto_reteiva,
                            id_agente_reteiva,
                            id_impuesto_reteica,
                            id_agente_reteica,
                            id_impuesto_retefuente,
                            id_agente_retefuente,
                            id_agente_retecree,
                            id_impuesto_retecree,
                            id_tamanno,
                            limite_credito,
                            dias_gracia,
                            flag_cartera_vencida,
                            dcto_cliente,
                            dcto_adicional,
                            numero_facturas_vencidas);
                        if (!result2 ?. rowCount || result2 ?. rowCount == 0) { //
                            bandera_cliente = true; // se levanta la bandera
                            break;
                        } 
                    }
                    if(!bandera_cliente){ 
                       if (terceros_direccion ?. length > 0 && result2 ?. rowCount > 0) {
                                console.log('pasa por el dto insert', result2 ?. rowCount);

                                for (var k = 0; k < terceros_direccion.length; k++) {
                                    const {
                                        nit,
                                        id_tercero,
                                        id_sucursal_tercero,
                                        id_direccion,
                                        direccion,
                                        telefono,
                                        id_pais,
                                        id_ciudad,
                                        id_depto,
                                        tipo_direccion
                                    } = terceros_direccion[k];
                                    result3 = await new Tercero().createTercerodireccion( nit,
                                        id_tercero,
                                        id_sucursal_tercero,
                                        id_direccion,
                                        direccion,
                                        telefono,
                                        id_pais,
                                        id_ciudad,
                                        id_depto,
                                        tipo_direccion);
                                    if (!result3 ?. rowCount || result3 ?. rowCount == 0) { //
                                        bandera_direccion = true; // se levanta la bandera
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }            
        }
    }
    if (! bandera_cliente && ! bandera_direccion) { // no se levanto la bandera (false)
        let tercero_all = await new Tercero().getTercero();
        response.data = tercero_all;

    } else {
        await new Tercero().deleteTercero();
        response.success = false;
        status = 400;
        response.msg = 'Error en la  sincronización de Tercero';
    }
    res.status(status).json(response);

});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
