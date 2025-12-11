/**
 * UTILITÁRIOS GERAIS
 * Funções auxiliares reutilizáveis
 */

/**
 * Formata tempo de segundos para MM:SS
 */
function formatTime(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

/**
 * Converte MM:SS para segundos
 */
function parseTime(timeString) {
    var parts = timeString.split(':').map(Number);
    return (parts[0] * 60) + parts[1];
}

/**
 * Calcula média de um array
 */
function average(arr) {
    return arr.reduce(function(a, b) { return a + b; }, 0) / arr.length;
}

/**
 * Debounce para otimizar eventos
 */
function debounce(func, wait) {
    wait = wait || 300;
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * Mostra notificação toast
 */
function showToast(message, type) {
    type = type || 'info';
    var colors = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'info': 'bg-blue-500'
    };
    
    var toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ' + 
                      colors[type] + ' text-white font-medium text-sm';
    toast.textContent = message;
    toast.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(function() {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

/**
 * Exporta dados para CSV
 */
function exportToCSV(data, filename) {
    filename = filename || 'relatorio_brigada.csv';
    
    // Criar CSV
    var headers = Object.keys(data[0]);
    var csv = headers.join(',') + '\n';
    
    data.forEach(function(row) {
        var values = headers.map(function(header) {
            var value = row[header];
            return typeof value === 'string' ? '"' + value + '"' : value;
        });
        csv += values.join(',') + '\n';
    });
    
    // Download
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    var url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Anima mudança de valor em elemento
 */
function animateValue(elementId, newValue) {
    var element = document.getElementById(elementId);
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    element.style.transition = 'all 0.3s ease';
    
    setTimeout(function() {
        element.textContent = newValue;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 150);
}

console.log('✅ Helpers carregados com sucesso');
