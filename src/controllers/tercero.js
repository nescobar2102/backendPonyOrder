const db = require('../config/db')

class Tercero 
{
    async getTercero() {
        let results = await db.query(`SELECT * FROM tercero ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getTerceroByNit(nombre,nit) {
        let results = await db.query('SELECT * FROM tercero WHERE nombre = $1 and nit = $2', [nombre,nit]).catch(console.log); 
        return results.rows;
    }
    async createTercero(nit,id_tercero,id_sucursal_tercero,id_tipo_identificacion,dv,nombre,direccion,id_pais,id_depto,id_ciudad,id_barrio,telefono,id_actividad,id_tipo_empresa,cliente,fecha_creacion,nombre_sucursal,primer_apellido,segundo_apellido,primer_nombre,segundo_nombre,flag_persona_nat,estado_tercero,vendedor,id_lista_precio,id_forma_pago,usuario,flag_enviado,e_mail,telefono_celular,e_mail_fe) { 
        let results = await db.query('SELECT * FROM tercero WHERE nombre = $1 and nit = $2', [nombre,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO tercero (nit,id_tercero,id_sucursal_tercero,id_tipo_identificacion,dv,nombre,direccion,id_pais,id_depto,id_ciudad,id_barrio,telefono,id_actividad,id_tipo_empresa,cliente,fecha_creacion,nombre_sucursal,primer_apellido,segundo_apellido,primer_nombre,segundo_nombre,flag_persona_nat,estado_tercero,vendedor,id_lista_precio,id_forma_pago,usuario,flag_enviado,e_mail,telefono_celular,e_mail_fe) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30)', [
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
                e_mail_fe
            ])
            .catch(console.log);
          return;
        }
}
    async createTercerocliente(nit,id_tercero,id_sucursal_tercero,id_forma_pago,id_precio_item,id_vendedor,id_suc_vendedor,id_medio_contacto,id_zona,flag_exento_iva,dia_cierre,id_impuesto_reteiva,id_agente_reteiva,id_impuesto_reteica,id_agente_reteica,id_impuesto_retefuente,id_agente_retefuente,id_agente_retecree,id_impuesto_retecree,id_tamanno,limite_credito,dias_gracia,flag_cartera_vencida,dcto_cliente,dcto_adicional,numero_facturas_vencidas) {
        let results = await db.query('SELECT * FROM tercero_cliente WHERE nit = $1 and id_tercero =$2', [nit,id_tercero]).catch(console.log);
        if (results.rowCount == 0) {
        await db.query('INSERT INTO tercero_cliente (nit,id_tercero,id_sucursal_tercero,id_forma_pago,id_precio_item,id_vendedor,id_suc_vendedor,id_medio_contacto,id_zona,flag_exento_iva,dia_cierre,id_impuesto_reteiva,id_agente_reteiva,id_impuesto_reteica,id_agente_reteica,id_impuesto_retefuente,id_agente_retefuente,id_agente_retecree,id_impuesto_retecree,id_tamanno,limite_credito,dias_gracia,flag_cartera_vencida,dcto_cliente,dcto_adicional,numero_facturas_vencidas) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)', [
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
        ]).catch(console.log);
        return;
    }
}
async createTercerodireccion(nit,id_tercero,id_sucursal_tercero,id_direccion,direccion,telefono,id_pais,id_ciudad,id_depto,tipo_direccion) { 
    let results = await db.query('SELECT * FROM tercero_direccion WHERE direccion = $1 and nit = $2', [direccion,nit]).catch(console.log);
    if (results.rowCount == 0) {     
        await db
        .query('INSERT INTO tercero_direccion (nit,id_tercero,id_sucursal_tercero,id_direccion,direccion,telefono,id_pais,id_ciudad,id_depto,tipo_direccion) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [
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
        ])
        .catch(console.log);
      return;
    }
}
}
module.exports = Tercero;