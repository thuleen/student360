export function parseCsv(buffer: Buffer) {
  const content = buffer.toString('utf-8');
  // You can add real CSV parsing here later if needed
  return {
    rows: content.split('\n').map((line) => line.split(',')),
  };
}
