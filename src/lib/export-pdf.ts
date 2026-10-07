/**
 * Client-side PDF export of the print-only document (`.print-doc`).
 *
 * Replaces `window.print()`: the browser's print dialog always adds its
 * own header/footer (document title, date, URL) which page code cannot
 * disable, so the document is rendered here and downloaded as a clean
 * file instead.
 */

const A4_CONTENT_WIDTH_PX = 718; // 210mm − 2×10mm margins, at 96dpi
const MAX_CANVAS_HEIGHT_PX = 30_000; // browser canvas limit is 32767
const MAX_CANVAS_AREA_PX = 17_000_000; // stay well under Safari's canvas area cap

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

  // Stage an off-screen copy: the visible page must not change. The copy
  // itself carries no positioning (html2pdf deep-clones its source, so
  // positioning on it would shift the rendered clone too).
  const stage = document.createElement("div");
  stage.setAttribute("aria-hidden", "true");
  stage.style.cssText = "position:fixed;top:0;left:-10000px;pointer-events:none;";
  const doc = source.cloneNode(true) as HTMLElement;
  doc.classList.remove("hidden");
  doc.classList.add("print-doc--export");
  stage.appendChild(doc);
  document.body.appendChild(stage);

  try {
    const { default: html2pdf } = await import("html2pdf.js");

    // html2pdf rasterizes the whole document into a single canvas before
    // slicing it into A4 pages, so very long documents must render at a
    // lower scale to stay within browser canvas limits.
    const height = doc.scrollHeight || 1;
    const scale = Math.max(
      1,
      Math.floor(
        Math.min(
          2,
          MAX_CANVAS_HEIGHT_PX / height,
          Math.sqrt(MAX_CANVAS_AREA_PX / (A4_CONTENT_WIDTH_PX * height)),
        ) * 4,
      ) / 4,
    );

    await html2pdf()
      .set({
        margin: 10, // mm per side; content width = 210 − 2×10 = 190mm ≈ 718px
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale,
          backgroundColor: "#ffffff",
          logging: false,
          useCORS: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(doc)
      .save(filename);
  } finally {
    stage.remove();
  }
}
