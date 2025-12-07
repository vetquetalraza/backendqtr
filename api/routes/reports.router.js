const express = require("express");
const ExcelJS = require("exceljs");
const router = express.Router();
const pool = require('../../libs/postgres.pool');

router.get("/reporte-inventario", async (req, res) => {
  try {
    // 🔹 1. Obtener inventario desde la BD
    const query = `
    SELECT d.iddrug,d.namedrug,d.descriptiondrug, d.categorydrug, b.manufacturedate, b.expirationdate, b.quantity
    FROM drugs as d
    INNER JOIN batchesdrugs as b ON d.iddrug = b.iddrug;`;

    const result = await pool.query(query);
    const rpta = result.rows;
    //console.log(rpta);
 // Crear libro
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Inventario", {
      properties: { defaultRowHeight: 20 },
    });

    // ======= Diseño general =======
    const borderAll = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    // ====== Fila 1 – Título ======
    sheet.mergeCells("A1:G1");
    const title = sheet.getCell("A1");
    title.value = "INVENTARIO GENERAL";
    title.font = { size: 18, bold: true, color: { argb: "1F4E78" } };
    title.alignment = { horizontal: "center" };

    // ====== Fila 2 – Fecha ======
    sheet.mergeCells("A2:G2");
    const fecha = new Date().toLocaleString("es-PE");
    const dateCell = sheet.getCell("A2");
    dateCell.value = `Generado: ${fecha}`;
    dateCell.font = { italic: true, color: { argb: "555555" } };
    dateCell.alignment = { horizontal: "center" };

    // ====== Fila 3 – Cabeceras ======
    const headerRow = sheet.addRow([
      "CÓDIGO",
      "PRODUCTO",
      "DESCRIPCIÓN",
      "CATEGORÍA",
      "F. FABRICACIÓN",
      "F. VENCIMIENTO",
      "STOCK",
    ]);

    headerRow.height = 22;

    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "1F4E78" }, // azul elegante
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = borderAll;
    });

    // ========== FILAS DE LA BD ==========

   rows.forEach((item) => {
      const row = sheet.addRow([
      item.iddrug ?? "",
      item.namedrug ?? "",
      item.descriptiondrug ?? "",
      item.categorydrug ?? "",
      item.manufacturedate ?? "",
      item.expirationdate ?? "",
      item.quantity ?? 0
      ]);

      row.eachCell((cell) => {
        cell.border = borderAll;
        cell.alignment = { vertical: "middle", wrapText: true };
      });
    });

    // ====== Anchos fijos elegantes ======
    sheet.getColumn(1).width = 5; // CÓDIGO
    sheet.getColumn(2).width = 28; // PRODUCTO
    sheet.getColumn(3).width = 40; // DESCRIPCIÓN
    sheet.getColumn(4).width = 18; // CATEGORÍA
    sheet.getColumn(5).width = 18; // F. FABRICACIÓN
    sheet.getColumn(6).width = 18; // F. VENCIMIENTO
    sheet.getColumn(7).width = 12; // STOCK

    // 🔹 3. Enviar archivo Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=inventario.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("Error generando Excel:", error);
    res.status(500).json({ message: "Error generando Excel" });
  }
});

module.exports = router;
