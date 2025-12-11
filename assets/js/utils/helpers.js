/**
 * UTILITÁRIOS GERAIS
 * Funções auxiliares reutilizáveis
 */

/**
 * Formata tempo de segundos para MM:SS
 * @param {number} seconds 
 * @returns {string}
 */
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Converte MM:SS para segundos
 * @param {string} timeString 
 * @returns {number}
 */
export function parseTime(timeString) {
    const [mins, secs] = timeString.split(':').map(Number);
    return (mins * 60) + secs;
}

/**
 * Calcula média de um array
 * @param {number[]} arr 
 * @returns {number}
 */
export function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/**
 * Debounce para otimizar eventos
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Exporta dados para CSV
 * @param {Array} data 
 * @param {string} filename 
 */
export function exportToCSV(data, filename = 'relatorio_brigada.csv') {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

/**
 * Converte array para formato CSV
 * @param {Array} arr 
 * @returns {string}
 */
function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr);
    return array.map(row => {
        return Object.values(row).map(value => {
            return typeof value === 'string' ? `"${value}"` : value;
        }).join(',');
    }).join('\n');
}

/**
 * Mostra notificação toast
 * @param {string} message 
 * @param {string} type - 'success' | 'error' | 'info'
 */
export function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 
                       ${type === 'success' ? 'bg-green-500' : 
                         type === 'error' ? 'bg-red-500' : 'bg-blue-500'} 
                       text-white font-medium text-sm`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
