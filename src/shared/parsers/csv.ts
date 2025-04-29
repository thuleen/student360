// src/shared/parsers/csv.ts
import Papa from 'papaparse';

export function parseCsv(buffer) {
  const content = buffer.toString('utf-8');

  const { data, errors } = Papa.parse(content, {
    header: true, // important: first line as column headers
    skipEmptyLines: true,
    dynamicTyping: true, // auto-convert numbers
  });

  if (errors.length > 0) {
    console.error('CSV Parsing errors:', errors);
    throw new Error('Failed to parse CSV');
  }

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return { headers, rows: data };
}
