import * as XLSX from 'xlsx';

export function parseExcel(buffer: Buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetNames = workbook.SheetNames;

  const firstSheet = workbook.Sheets[sheetNames[0]];
  const data = XLSX.utils.sheet_to_json(firstSheet);

  return {
    data,
    sheetNames,
  };
}
