/**
 * Format date to Chinese locale string with custom format
 * @param {string|Date} dateValue - The date value to format
 * @returns {string} Formatted date string (YYYY-MM-DD HH:mm:ss)
 */
export const formatDateTime = (dateValue) => {
  if (!dateValue) return ''
  
  try {
    return new Date(dateValue).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-')
  } catch (error) {
    console.error('Invalid date value:', dateValue)
    return ''
  }
}