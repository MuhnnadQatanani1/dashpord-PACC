/**
 * Client-side Excel export helper (no external dependencies).
 * Produces an Excel-compatible SpreadsheetML 2003 (.xls) file that opens
 * natively in Microsoft Excel and LibreOffice, with full Arabic support.
 */

function esc(value: unknown): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function downloadExcel(
  filename: string,
  sheetName: string,
  columns: string[],
  rows: (string | number)[][]
): void {
  const sheetNameSafe = esc(sheetName).replace(/[\\/*?:[\]]/g, "_").slice(0, 31);

  const body = [columns, ...rows]
    .map(
      (row) =>
        `<Row>${row
          .map((cell) => {
            const type = typeof cell === "number" && Number.isFinite(cell) ? "Number" : "String";
            return `<Cell><Data ss:Type="${type}">${esc(cell)}</Data></Cell>`;
          })
          .join("")}</Row>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Worksheet ss:Name="${sheetNameSafe}">
  <Table>
   ${body}
  </Table>
 </Worksheet>
</Workbook>`;

  const blob = new Blob(["\ufeff", xml], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".xls") ? filename : `${filename}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
