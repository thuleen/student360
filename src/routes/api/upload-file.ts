// src/routes/api/upload-file.ts
import { RequestHandler } from '@solidjs/start';
import { json } from "@solidjs/router";
import { parseCsv } from '~/shared/parsers/csv';
import { parseExcel } from '~/shared/parsers/excel';

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

    if (fileStart === '%PDF') {
      return json({
        message: "PDF not supported yet",
      });

    }

    else if (fileStart.startsWith('PK')) { // Excel spreadsheet
      try {
        const { data, sheetNames } = parseExcel(buffer);

        return json({
          message: "Excel file parsed successfully",
          sheets: sheetNames,
          rows: data,
        });
      } catch (parseExcelError: unknown) {
        return json(
          {
            message: 'Failed to parse Excel file. It may be corrupted or improperly formatted.',
            error: parseExcelError instanceof Error ? parseExcelError.message : String(parseExcelError),
          },
          { status: 400 }
        );
      }

    } else {
      // Assuming CSV file
      try {
        const result = parseCsv(buffer);

        return json({
          message: "CSV file parsed successfully",
          headers: result.headers,
          rowCount: result.rows.length,
          sample: result.rows.slice(0, 5) // send first 5 rows as preview
        });

      } catch (parseCsvError: unknown) {
        return json(
          {
            message: 'Failed to parse CSV file. It may be corrupted or improperly formatted.',
            error: parseCsvError instanceof Error ? parseCsvError.message : String(parseCsvError),
          },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    return json({ message: 'Failed to process file', error: String(error) }, { status: 500 });
  }
};
