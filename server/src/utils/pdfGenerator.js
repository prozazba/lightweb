const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const generateReceiptPDF = async (data) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const drawText = (text, x, y, size = 12, fontType = font) => {
        page.drawText(text, { x, y, size, font: fontType, color: rgb(0, 0, 0) });
    };

    // Border
    page.drawRectangle({
        x: 20,
        y: 20,
        width: width - 40,
        height: height - 40,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
    });

    // Header
    drawText('LIGHTWEB ORGANIZATION', 100, 550, 20, boldFont);
    drawText('MEMBERSHIP PAYMENT RECEIPT', 80, 525, 14, boldFont);

    page.drawLine({
        start: { x: 40, y: 510 },
        end: { x: 360, y: 510 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
    });

    // Body
    const startY = 480;
    const lineGap = 25;

    drawText(`Invoice No`, 50, startY, 12, boldFont);
    drawText(`: ${data.invoice_number}`, 160, startY);

    drawText(`Member Name`, 50, startY - lineGap, 12, boldFont);
    drawText(`: ${data.full_name}`, 160, startY - lineGap);

    drawText(`Billing Period`, 50, startY - (lineGap * 2), 12, boldFont);
    drawText(`: ${data.period}`, 160, startY - (lineGap * 2));

    drawText(`Payment Date`, 50, startY - (lineGap * 3), 12, boldFont);
    drawText(`: ${data.payment_date}`, 160, startY - (lineGap * 3));

    drawText(`Payment Method`, 50, startY - (lineGap * 4), 12, boldFont);
    drawText(`: ${data.method}`, 160, startY - (lineGap * 4));

    drawText(`Amount`, 50, startY - (lineGap * 5), 12, boldFont);
    drawText(`: Rp ${new Intl.NumberFormat('id-ID').format(data.amount)}`, 160, startY - (lineGap * 5));

    // Status
    page.drawRectangle({
        x: 150,
        y: 180,
        width: 100,
        height: 40,
        color: rgb(0.9, 1, 0.9),
        borderColor: rgb(0, 0.5, 0),
        borderWidth: 2,
    });
    drawText('PAID', 178, 194, 18, boldFont);

    // Footer
    drawText('Thank you for your payment.', 120, 100, 12, font);
    drawText('Generated automatically by Lightweb Finance System', 80, 50, 10, font);

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};

module.exports = { generateReceiptPDF };
