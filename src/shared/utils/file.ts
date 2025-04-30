export const truncateFileName = (name: string, maxLength = 30): string => {
  return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};
