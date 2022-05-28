const db = require('../config/db')

class Carteraproveedores 
{
    async getCarteraproveedores() {
        let results = await db.query(`select * from cartera_proveedores ORDER BY id_tercero ASC `).catch(console.log); 
        return results.rows;
    }
    async getCarteraproveedoresByTer(id_empresa,id_tercero) {
        let results = await db.query('SELECT * FROM cartera_proveedores WHERE id_empresa = $1 and id_tercero = $2', [id_empresa,id_tercero]).catch(console.log); 
        return results.rows;
    }
    async createCarteraproveedores(id_empresa,id_sucursal,id_tipo_doc,numero,fecha,total,vencimiento,letras,id_moneda,id_tercero,id_sucursal_tercero,id_recaudador,fecha_trm,trm,observaciones,usuario,flag_enviado,cartera_proveedores_det ) { 
        let results = await db.query('SELECT * FROM cartera_proveedores WHERE id_empresa = $1 and id_tercero = $2', [id_empresa,id_tercero]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO cartera_proveedores (id_empresa,id_sucursal,id_tipo_doc,numero,fecha,total,vencimiento,letras,id_moneda,id_tercero,id_sucursal_tercero,id_recaudador,fecha_trm,trm,observaciones,usuario,flag_enviado,cartera_proveedores_det) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18 )', [
                id_empresa,
                id_sucursal,
                id_tipo_doc,
                numero,
                fecha,
                total,
                vencimiento,
                letras,
                id_moneda,
                id_tercero,
                id_sucursal_tercero,
                id_recaudador,
                fecha_trm,
                trm,
                observaciones,
                usuario,
                flag_enviado,
                cartera_proveedores_det
            ])
            .catch(console.log);
          return;
        }
}
    async createCarteraproveedoresdet(consecutivo,cuota,id_tercero,id_sucursal_tercero,id_empresa_cruce,id_sucursal_cruce,id_tipo_doc_cruce,numero_cruce,fecha,vencimiento,debito,credito,descripcion,id_vendedor,id_forma_pago,documento_forma_pago,distribucion,trm,id_recaudador,id_suc_recaudador,fecha_trm,total_factura,id_concepto,id_moneda,id_destino,id_proyecto,cuota_cruce,id_banco) {
        let results = await db.query('SELECT * FROM cartera_proveedores_det WHERE id_tercero =$1', [id_tercero]).catch(console.log);
        if (results.rowCount == 0) {
        await db.query('INSERT INTO cartera_proveedores_det (consecutivo,cuota,id_tercero,id_sucursal_tercero,id_empresa_cruce,id_sucursal_cruce,id_tipo_doc_cruce,numero_cruce,fecha,vencimiento,debito,credito,descripcion,id_vendedor,id_forma_pago,documento_forma_pago,distribucion,trm,id_recaudador,id_suc_recaudador,fecha_trm,total_factura,id_concepto,id_moneda,id_destino,id_proyecto,cuota_cruce,id_banco) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28)', [
            consecutivo,
            cuota,
            id_tercero,
            id_sucursal_tercero,
            id_empresa_cruce,
            id_sucursal_cruce,
            id_tipo_doc_cruce,
            numero_cruce,
            fecha,
            vencimiento,
            debito,
            credito,
            descripcion,
            id_vendedor,
            id_forma_pago,
            documento_forma_pago,
            distribucion,
            trm,
            id_recaudador,
            id_suc_recaudador,
            fecha_trm,
            total_factura,
            id_concepto,
            id_moneda,
            id_destino,
            id_proyecto,
            cuota_cruce,
            id_banco     
        ]).catch(console.log);
        return;
    }
}
}
module.exports = Carteraproveedores;