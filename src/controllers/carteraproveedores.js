const db = require('../config/db')

class Carteraproveedores {
    async getCarteraproveedores() {
        let results = await db.query(`select * from cartera_proveedores ORDER BY id_empresa ASC `).catch(console.log);
        return results.rows;
    }
    async getCarteraproveedoresByEmp(id_empresa, id_tercero, nit) {
        let results = await db.query('SELECT * FROM cartera_proveedores WHERE id_empresa = $1 and id_tercero = $2 and nit =$3', [id_empresa, id_tercero, nit]).catch(console.log);
        return results.rows;
    }
    async getCarteraproveedoresByid(id_empresa, id_sucursal, id_tipo_doc, numero) {
        let results = await db.query('SELECT * FROM cartera_proveedores WHERE id_empresa = $1 and id_sucursal = $2 and id_tipo_doc  =$3 and numero  =$4', [id_empresa, id_sucursal, id_tipo_doc, numero]).catch(console.log);
        return results.rows;
    }

    async deleteCarteraproveedores() {
        let response
        try {
            await db.query(`DELETE FROM cartera_proveedores_det`);
            await db.query(`DELETE FROM cartera_proveedores`);
        } catch (err) {
            response = err
        }
        return response
    }
    async createCarteraproveedores(nit, id_empresa, id_sucursal, id_tipo_doc, numero, fecha, total, vencimiento, letras, id_moneda, id_tercero, id_sucursal_tercero, id_recaudador, fecha_trm, trm, observaciones, usuario, flag_enviado) {
        let response
        try {
            const insert = await db.query('INSERT INTO cartera_proveedores (nit,id_empresa,id_sucursal,id_tipo_doc,numero,fecha,total,vencimiento,letras,id_moneda,id_tercero,id_sucursal_tercero,id_recaudador,fecha_trm,trm,observaciones,usuario,flag_enviado) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)', [
                nit,
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
                flag_enviado
            ]);
            response = insert
        } catch (err) {
            response = err
        }
        return response
    }

    async createCarteraproveedoresdet(id_empresa, id_sucursal, id_tipo_doc, numero, nit, consecutivo, cuota, id_tercero, id_sucursal_tercero, id_empresa_cruce, id_sucursal_cruce, id_tipo_doc_cruce, numero_cruce, fecha, vencimiento, debito, credito, descripcion, id_vendedor, id_forma_pago, documento_forma_pago, distribucion, trm, id_recaudador, id_suc_recaudador, fecha_trm, total_factura, id_concepto, id_moneda, id_destino, id_proyecto, cuota_cruce, id_banco) {
     let response
        try {
            const insert = await db.query(`INSERT INTO cartera_proveedores_det (id_empresa,id_sucursal,id_tipo_doc,numero,nit,consecutivo,cuota,id_tercero,id_sucursal_tercero,id_empresa_cruce,
            id_sucursal_cruce,id_tipo_doc_cruce,numero_cruce,fecha,vencimiento,debito,credito,descripcion,id_vendedor,id_forma_pago,
            documento_forma_pago,distribucion,trm,id_recaudador,id_suc_recaudador,fecha_trm,total_factura,id_concepto,id_moneda,id_destino,
            id_proyecto,cuota_cruce,id_banco)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33)`, [
                id_empresa,
                id_sucursal,
                id_tipo_doc,
                numero,
                nit,
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
            ]);
            response = insert
        } catch (err) {
            response = err
        }
        return response
    }
}
module.exports = Carteraproveedores;
