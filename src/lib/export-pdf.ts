/**
 * Client-side PDF export of the print-only document (`.print-doc`).
 *
 * Replaces `window.print()`: the browser's print dialog always adds its
 * own header/footer (document title, date, URL) which page code cannot
 * disable, so the document is rendered here and downloaded as a clean
 * file instead.
 *
 * The page is rasterized with `html-to-image`, which renders the clone
 * through the browser's own layout/text engine inside an SVG
 * `foreignObject`. That keeps Arabic letterforms joined and text sitting
 * exactly where the browser puts it (unlike html2canvas, whose font
 * metrics draw every text run ~0.7em too low).
 */

const A4_CONTENT_WIDTH_PX = 718; // 210mm − 2×10mm margins, at 96dpi
const MAX_CANVAS_HEIGHT_PX = 30_000; // browser canvas limit is 32767
const MAX_CANVAS_AREA_PX = 17_000_000; // stay well under Safari's canvas area cap
const PAGE_MARGIN_MM = 10;
const PAGE_WIDTH_MM = 210; // A4 portrait
const PAGE_HEIGHT_MM = 297;

let pending: Promise<void> | null = null;

/** Export the current page's `.print-doc` element as a PDF file. */
export function exportPrintDoc(filename: string): Promise<void> {
  if (pending) return pending;
  pending = exportDoc(filename).finally(() => {
    pending = null;
  });
  return pending;
}

async function exportDoc(filename: string): Promise<void> {
  const source = document.querySelector<HTMLElement>(".print-doc");
  if (!source) return;

  // Stage an off-screen copy so the visible page is untouched. The copy
  // carries the `.print-doc--export` styling (fixed width, white paper).
  const stage = document.createElement("div");
  stage.setAttribute("aria-hidden", "true");
  stage.style.cssText = "position:fixed;top:0;left:-10000px;pointer-events:none;";
  const doc = source.cloneNode(true) as HTMLElement;
  doc.classList.remove("hidden");
  doc.classList.add("print-doc--export");
  stage.appendChild(doc);
  document.body.appendChild(stage);

  try {
    const [{ toCanvas }, { jsPDF }] = await Promise.all([
      import("html-to-image"),
      import("jspdf"),
    ]);
    await document.fonts.ready;

    const width = doc.scrollWidth || A4_CONTENT_WIDTH_PX;
    const height = doc.scrollHeight || 1;

    // Very long documents must rasterize at a lower scale to stay within
    // browser canvas limits.
    const scale = Math.max(
      1,
      Math.floor(
        Math.min(
          2,
          MAX_CANVAS_HEIGHT_PX / height,
          Math.sqrt(MAX_CANVAS_AREA_PX / (width * height)),
        ) * 4,
      ) / 4,
    );

    const canvas = await toCanvas(doc, {
      pixelRatio: scale,
      backgroundColor: "#ffffff",
      width,
      height,
      cacheBust: true,
    });

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    // A4-sized slice of the canvas, in canvas pixels.
    const contentWidthMm = PAGE_WIDTH_MM - 2 * PAGE_MARGIN_MM;
    const contentHeightMm = PAGE_HEIGHT_MM - 2 * PAGE_MARGIN_MM;
    const pxPageHeight = Math.floor((canvas.width * contentHeightMm) / contentWidthMm);
    const pageCount = Math.max(1, Math.ceil(canvas.height / pxPageHeight));
    const mmPerPx = contentWidthMm / canvas.width;

    for (let page = 0; page < pageCount; page++) {
      const sy = page * pxPageHeight;
      const sh = Math.min(pxPageHeight, canvas.height - sy);
      if (sh <= 0) break;

      const slice = document.createElement("canvas");
      slice.width = canvas.width;
      slice.height = sh;
      const ctx = slice.getContext("2d");
      if (!ctx) break;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);

      const data = slice.toDataURL("image/jpeg", 0.95);
      if (page > 0) pdf.addPage();
      pdf.addImage(data, "JPEG", PAGE_MARGIN_MM, PAGE_MARGIN_MM, contentWidthMm, sh * mmPerPx);
    }

    pdf.save(filename);
  } finally {
    stage.remove();
  }
}
