const db = require('../config/db')

class Tercero 
{
    async getTercero() {
        let results = await db.query(`SELECT * FROM tercero ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getCliente() {
        let results = await db.query(`SELECT * FROM tercero_cliente ORDER BY id_tercero ASC `).catch(console.log); 
        return results.rows;
    }
    async getDireccion() {
        let results = await db.query(`SELECT * FROM tercero_direccion ORDER BY id_tercero ASC `).catch(console.log); 
        return results.rows;
    }
    async getTerceroByNitID(nit) {
        let results = await db.query('SELECT * FROM tercero WHERE nit = $1 ', [nit]).catch(console.log); 
        return results.rows;
    }
    async getTerceroByNit(nit,nombre) {
        let results = await db.query('SELECT * FROM tercero WHERE nit = $1 and nombre = $2', [nit,nombre]).catch(console.log); 
        return results.rows;
    }

    async getTerceroByNitIlike(nit,nombre) { //ikili                
        const sql = `SELECT * FROM tercero WHERE nit = '${nit}' and nombre ILIKE '%${nombre}%' `;      
        const results = await db.query(sql).catch(console.log);  
        return results.rows;
    }
    
    async getTercerocliente(id_tercero) {
        let results = await db.query('SELECT * FROM tercero_cliente WHERE id_tercero = $1', [id_tercero]).catch(console.log); 
        return results.rows;
    }
    async getTercerodireccion(id_tercero) {
        let results = await db.query('SELECT * FROM tercero_direccion WHERE id_tercero = $1', [id_tercero]).catch(console.log); 
        return results.rows;
    }
    async deleteTercero() {
        await db.query(`DELETE FROM tercero`).catch(console.log); 
        await db.query(`DELETE FROM tercero_cliente`).catch(console.log); 
        await db.query(`DELETE FROM tercero_direccion`).catch(console.log);       
  }
    async createTercero(  nit,
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
        e_mail_fe) { 
 
        let response
        try {
        const insert = await db
            .query(`INSERT INTO tercero (  nit,
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
                e_mail_fe)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31)`, [
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
            ]);
            response = insert
        }catch(err){
            response = err
        }
          return response
        
}

    async createTercerocliente(nit,
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
        numero_facturas_vencidas) {
      
        let response
        try {
        const insert =  await db.query(`INSERT INTO tercero_cliente (nit,
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
                numero_facturas_vencidas) 
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)`, [
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
        ]);
        response = insert
    } catch(err)  {
        response = err
    }
    return response 
}
async createTercerodireccion(nit,id_tercero,id_sucursal_tercero,id_direccion,direccion,telefono,id_pais,id_ciudad,id_depto,tipo_direccion) { 
 
    let response
    try {
    const insert = await db
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
        ]);  
        response = insert
    }catch(err){
        response = err
    }
    return response
 
}

//app

async createTerceroApp( nit,
    id_tercero,id_sucursal_tercero,id_tipo_identificacion, dv, nombre, direccion, id_pais, id_depto,
    id_ciudad, id_barrio, telefono,nombre_sucursal,
        primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, e_mail) { 

    let response
    try {  
         const sql = `INSERT INTO public.tercero(
            id_tercero,id_sucursal_tercero,id_tipo_identificacion, dv, nombre, direccion, id_pais, id_depto,
            id_ciudad, id_barrio, telefono,cliente,fecha_creacion,nombre_sucursal,
            primer_apellido, segundo_apellido, primer_nombre, segundo_nombre,
            flag_persona_nat,estado_tercero,e_mail,nit)		
             VALUES ('${id_tercero}','${id_sucursal_tercero}','${id_tipo_identificacion}', '${dv}','${nombre}', '${direccion}','${id_pais}', '${id_depto}',
                    '${id_ciudad}', '${id_barrio}', '${telefono}', 'SI', NOW(), '${nombre_sucursal}',
                    '${primer_apellido}', '${segundo_apellido}', '${primer_nombre}','${segundo_nombre}',
                    'SI', 'ACTIVO','${e_mail}','${nit}') `;               
        const insert = await db.query(sql); 
 
        response = insert
    }catch(err){
        response = err
    }
      return response    
}

async createTerceroclienteApp(id_tercero, id_sucursal_tercero,id_forma_pago,id_precio_item ,id_vendedor,
    id_suc_vendedor,id_medio_contacto, id_zona, nit) { 

    let response
    try {
        const sql = `INSERT INTO public.tercero_cliente(
                    id_tercero, id_sucursal_tercero,id_forma_pago,id_precio_item ,id_vendedor,
                    id_suc_vendedor,id_medio_contacto, id_zona, nit)
                        VALUES ('${id_tercero}',  '${id_sucursal_tercero}' ,'${id_forma_pago}','${id_precio_item}','${id_vendedor}',
                        '${id_suc_vendedor}', '${id_medio_contacto}', '${id_zona}', '${nit}' );`;
         const insert = await db.query(sql); 
        response = insert
    }catch(err){
        response = err
    }
      return response    
}
async createTercerodireccionApp(id_tercero, id_sucursal_tercero, id_direccion, direccion, telefono,
    id_pais, id_ciudad, id_depto, tipo_direccion, nit) { 
 
    let response
    try { 
        const sql = `INSERT INTO public.tercero_direccion(
            id_tercero, id_sucursal_tercero, id_direccion, direccion, telefono,
            id_pais, id_ciudad, id_depto, tipo_direccion, nit)
            VALUES ('${id_tercero}', '${id_sucursal_tercero}', '${id_direccion}', '${direccion}', '${telefono}', 
            '${id_pais}','${id_ciudad}','${id_depto}','${tipo_direccion}' ,'${nit}' ) `;
         const insert2 =   await db.query(sql); 
/*
        const sql1 = `INSERT INTO public.tercero_direccion(
            id_tercero, id_sucursal_tercero, id_direccion, direccion, telefono,
            id_pais, id_ciudad, id_depto, tipo_direccion, nit)
            VALUES ('${id_tercero}', '${id_sucursal_tercero}', '${id_direccion}', '${direccion}', '${telefono}', 
            '${id_pais}','${id_ciudad}','${id_depto}','${tipo_direccion}' ,'${nit}' ) `;
        const insert2 = await db.query(sql1); */
  
        response = insert2
    }catch(err){
        response = err
    }
    return response 
}
    async getTerceroApp(nit) {
     let results = await db.query(` 
                    SELECT tercero.id_tercero, usuario,id_tipo_identificacion,dv,telefono,ciudad.nombre AS ciudad,direccion,
                    CONCAT(primer_nombre,' ',primer_apellido) AS nombre_completo ,
                    nombre_sucursal,e_mail,tercero.nit,limite_credito
                    FROM tercero JOIN ciudad ON tercero.id_ciudad=ciudad.id_ciudad AND tercero.nit=ciudad.nit
                    JOIN tercero_cliente ON tercero_cliente.id_tercero=tercero.id_tercero AND tercero.nit=tercero_cliente.nit
                    WHERE tercero.nit = '${nit}' 
                    ORDER BY nombre_completo ASC                     
                    `).catch(console.log); 
        return results.rows;
}
    async getTerceroAppIlike(nit,nombre) {
        
    let results = await db.query(`SELECT tercero.id_tercero, usuario,id_tipo_identificacion,dv,telefono,ciudad.nombre AS ciudad,direccion,
                    CONCAT(primer_nombre,' ',primer_apellido) AS nombre_completo ,
                    nombre_sucursal,e_mail,tercero.nit,limite_credito
                    FROM tercero JOIN ciudad ON tercero.id_ciudad=ciudad.id_ciudad AND tercero.nit=ciudad.nit
                    JOIN tercero_cliente ON tercero_cliente.id_tercero=tercero.id_tercero AND tercero.nit=tercero_cliente.nit
                    WHERE tercero.nit = '${nit}' AND tercero.nombre ILIKE '%${nombre}%'
                    ORDER BY nombre_completo ASC ` ).catch(console.log); 
       return results.rows;
}

}
module.exports = Tercero;