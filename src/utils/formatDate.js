export const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};
export const formatDateStr = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[parseInt(month) - 1]; // Convert month to index (0-based)
  return `${day} ${monthName} ${year}`;
};
export const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};