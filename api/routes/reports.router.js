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
    console.log(rpta);

    // 🔹 2. Crear Excel
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Inventario");

    // ========== TITULO ==========
    sheet.mergeCells("A1:G1");
    sheet.getCell("A1").value = "INVENTARIO QUE TAL RAZA";
    sheet.getCell("A1").font = { bold: true, size: 16 };
    sheet.getCell("A1").alignment = { horizontal: "center" };

    // ========== FECHA ==========
    const fecha = new Date().toLocaleString("es-PE");
    sheet.mergeCells("A2:G2");
    sheet.getCell("A2").value = `FECHA Y HORA GENERACIÓN: ${fecha}`;
    sheet.getCell("A2").alignment = { horizontal: "center" };

    // ========== CABECERA ==========
    sheet.addRow([
      "CÓDIGO",
      "PRODUCTO",
      "DESCRIPCIÓN",
      "CATEGORÍA",
      "FECHA FABRICACIÓN",
      "FECHA VENCIMIENTO",
      "STOCK"
    ]);

    const headerRow = sheet.getRow(3);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // ========== FILAS DE LA BD ==========

    rpta.forEach(item => {
      sheet.addRow([
      item.iddrug ?? "",
      item.namedrug ?? "",
      item.descriptiondrug ?? "",
      item.categorydrug ?? "",
      item.manufacturedate ?? "",
      item.expirationdate ?? "",
      item.quantity ?? 0
      ]);
    });

    // Auto-ajustar columnas
    sheet.columns.forEach((column) => {
      let maxLength = 0;

      column.eachCell({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString().length : 10;
        if (value > maxLength) maxLength = value;
      });

      column.width = maxLength < 15 ? 15 : maxLength + 2;
    });

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
