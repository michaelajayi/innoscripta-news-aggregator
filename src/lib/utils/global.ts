export const formatDate = (date: Date | string | null | undefined) => {
  const dateObj = date instanceof Date ? date : new Date(date!);
  
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return formatter.format(dateObj);
}
