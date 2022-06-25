const db = require('../config/db')

class Kit {
    async getKit() {
        let results = await db.query(`SELECT * FROM kit  ORDER BY nit ASC `).catch(console.log);
        return results.rows;
    }
    async getKitByNit(descripcion, nit) {
        let results = await db.query('SELECT * FROM kit WHERE descripcion = $1 and nit = $2', [descripcion, nit]).catch(console.log);
        return results.rows;
    }
    async getKitById(id_kit, nit) {
        let results = await db.query('SELECT * FROM kit WHERE id_kit = $1 and nit = $2', [id_kit, nit]).catch(console.log);
        return results.rows;
    }
    async deleteKit() {
        let response
        try {
            await db.query(`DELETE FROM kit`);
            await db.query(`DELETE FROM kit_det`);
        } catch (err) {
            response = err
        }
        return response
    }
    async createKit(nit, id_kit, descripcion, precio_kit, precio_kit_iva, flag_vigencia, fecha_inicial, fecha_final, ultima_actualizacion) {
        let response
        try {
            const insert = await db.query('INSERT INTO kit (nit,id_kit,descripcion,precio_kit,precio_kit_iva,flag_vigencia,fecha_inicial,fecha_final,ultima_actualizacion) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9)', [
                nit,
                id_kit,
                descripcion,
                precio_kit,
                precio_kit_iva,
                flag_vigencia,
                fecha_inicial,
                fecha_final,
                ultima_actualizacion
            ]);
            response = insert
        } catch (err) {
            response = err
        }
        return response
    }

    async createKitdet(nit, id_kit, id_item, id_bodega, cantidad, tasa_dcto, precio, valor_total, tasa_iva, valor_iva, total, ultima_actualizacion) {
        let response
        try {
            const insert = await db.query('INSERT INTO kit_det (nit,id_kit,id_item,id_bodega,cantidad,tasa_dcto,precio,valor_total,tasa_iva,valor_iva,total,ultima_actualizacion) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [
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
        ]);
        response = insert
    } catch (err) {
        response = err
    }
    return response
    }
}
module.exports = Kit;
