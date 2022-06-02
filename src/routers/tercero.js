const express = require("express");
const router = express.Router();
const Tercero = require('../controllers/tercero');

router.get('/tercero_all', async (req,res) => { 
    let tercero = await new Tercero().getTercero(); 
    res.status(200).json(tercero)
});
router.get('/tercero/:nombre/:nit', async (req,res) => {
    let {nombre,nit} = req.params;    
    let tercero = await new Tercero().getTerceroByNit(nombre,nit);
    res.status(200).json(tercero)
});
router.post('/synchronization_tercero', async (req,res) => {
    const {terceros} = req.body
    for (var i=0;i<terceros.length;i++){        
        const {nit,id_tercero,id_sucursal_tercero,id_tipo_identificacion,dv,nombre,direccion,id_pais,id_depto,id_ciudad,id_barrio,telefono,id_actividad,id_tipo_empresa,cliente,fecha_creacion,nombre_sucursal,primer_apellido,segundo_apellido,primer_nombre,segundo_nombre,flag_persona_nat,estado_tercero,vendedor,id_lista_precio,id_forma_pago,usuario,flag_enviado,e_mail,telefono_celular,e_mail_fe,terceros_cliente,terceros_direccion} =  terceros[i];
            await new Tercero().createTercero(nit,id_tercero,id_sucursal_tercero,id_tipo_identificacion,dv,nombre,direccion,id_pais,id_depto,id_ciudad,id_barrio,telefono,id_actividad,id_tipo_empresa,cliente,fecha_creacion,nombre_sucursal,primer_apellido,segundo_apellido,primer_nombre,segundo_nombre,flag_persona_nat,estado_tercero,vendedor,id_lista_precio,id_forma_pago,usuario,flag_enviado,e_mail,telefono_celular,e_mail_fe); 
            if (terceros_cliente?.length>0){ 
            for (var j=0;j<terceros_cliente.length;j++){ 	            
                const {nit,id_tercero,id_sucursal_tercero,id_forma_pago,id_precio_item,id_vendedor,id_suc_vendedor,id_medio_contacto,id_zona,flag_exento_iva,dia_cierre,id_impuesto_reteiva,id_agente_reteiva,id_impuesto_reteica,id_agente_reteica,id_impuesto_retefuente,id_agente_retefuente,id_agente_retecree,id_impuesto_retecree,id_tamanno,limite_credito,dias_gracia,flag_cartera_vencida,dcto_cliente,dcto_adicional,numero_facturas_vencidas} =  terceros_cliente[j];
                await new Tercero().createTercerocliente(nit,id_tercero,id_sucursal_tercero,id_forma_pago,id_precio_item,id_vendedor,id_suc_vendedor,id_medio_contacto,id_zona,flag_exento_iva,dia_cierre,id_impuesto_reteiva,id_agente_reteiva,id_impuesto_reteica,id_agente_reteica,id_impuesto_retefuente,id_agente_retefuente,id_agente_retecree,id_impuesto_retecree,id_tamanno,limite_credito,dias_gracia,flag_cartera_vencida,dcto_cliente,dcto_adicional,numero_facturas_vencidas); 
            };
        }
        /* if (terceros_direccion?.length>0){
           for (var k=0;k<terceros_direccion.length;k++){ 	            
            const {nit,id_tercero,id_sucursal_tercero,id_direccion,direccion,telefono,id_pais,id_ciudad,id_depto,tipo_direccion} =  terceros_direccion[k];
            await new Tercero().createTercerodireccion(nit,id_tercero,id_sucursal_tercero,id_direccion,direccion,telefono,id_pais,id_ciudad,id_depto,tipo_direccion); 
          };
        }*/
     };     
    let tercero_all= await new Tercero().getTercero();
     res.status(200).json(tercero_all)  
});
module.exports = router;