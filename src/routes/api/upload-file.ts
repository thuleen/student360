// src/routes/api/upload-file.ts
import { RequestHandler } from '@solidjs/start';
import { json } from "@solidjs/router";
import pdf from 'pdf-parse';
import * as XLSX from 'xlsx';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { file: fileBase64 } = await request.json();

    if (!fileBase64) {
      return json({ message: 'No file uploaded' }, { status: 400 });
    }

    let base64Data = fileBase64;

    // If base64 has a header like 'data:application/pdf;base64,', remove it
    if (fileBase64.startsWith('data:')) {
      base64Data = fileBase64.split(',')[1];
    }

    const buffer = Buffer.from(base64Data, 'base64');

    // Check if it is a PDF by looking at magic numbers
    const fileStart = buffer.slice(0, 4).toString('utf-8');
    console.log('File starts with:', fileStart);

    if (fileStart === '%PDF') {
      console.log('Detected PDF file');

      return json({
        message: "PDF not supported yet",
      });

    }

    else if (fileStart.startsWith('PK')) {
      // PK is the start of ZIP files — XLSX files are ZIP archives internally
      console.log('Detected Excel file (.xlsx)');

      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetNames = workbook.SheetNames;

      // Let's just parse the first sheet
      const firstSheet = workbook.Sheets[sheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet);

      return json({
        message: "Excel file parsed successfully",
      });

    } else {
      console.log('Assuming CSV file');

      const csvContent = buffer.toString('utf-8');

      return json({
        message: "CSV file received"
      });
    }

  } catch (error) {
    console.error('Error processing file:', error);
    return json({ message: 'Failed to process file', error: String(error) }, { status: 500 });
  }
};
