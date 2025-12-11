/**
 * MAIN APPLICATION
 * Controla inicialização e funcionalidades globais
 */

// Estado global da aplicação
var AppState = {
    currentTab: 'overview',
    currentMonth: 'all'
};

/**
 * Inicializa o dashboard
 */
function initDashboard() {
    console.log('🚀 Inicializando Dashboard Brigada H.S.M...');
    
    ChartManager.init();
    Components.renderHeader();
    Components.renderTabs();
    Views.renderOverview();
    
    console.log('✅ Dashboard inicializado com sucesso!');
    showToast('Dashboard carregado!', 'success');
}

/**
 * Troca de aba
 */
function switchTab(tabId) {
    AppState.currentTab = tabId;
    
    var allTabs = ['overview', 'conformidade', 'inspecao', 'evacuacao', 'brigada'];
    allTabs.forEach(function(id) {
        var btn = document.getElementById('tab-btn-' + id);
        if (btn) {
            if (id === tabId) {
                btn.classList.remove('border-transparent', 'text-slate-500');
                btn.classList.add('border-blue-600', 'text-blue-600');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('border-blue-600', 'text-blue-600');
                btn.classList.add('border-transparent', 'text-slate-500');
                btn.setAttribute('aria-selected', 'false');
            }
        }
    });
    
    switch(tabId) {
        case 'overview':
            Views.renderOverview();
            if (AppState.currentMonth !== 'all') {
                Views.updateOverview(AppState.currentMonth);
            }
            break;
        case 'conformidade':
            Views.renderConformidade();
            break;
        case 'inspecao':
            Views.renderInspecao();
            if (AppState.currentMonth !== 'all') {
                Views.updateInspecao(AppState.currentMonth);
            }
            break;
        case 'evacuacao':
            Views.renderEvacuacao();
            break;
        case 'brigada':
            Views.renderBrigada();
            break;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Filtra dashboard por mês
 */
function filterDashboard(month) {
    AppState.currentMonth = month;
    Components.updateSlicerState(month);
    
    switch(AppState.currentTab) {
        case 'overview':
            Views.updateOverview(month);
            break;
        case 'inspecao':
            Views.updateInspecao(month);
            break;
    }
    
    var monthName = month === 'all' ? 'Todo o Período' : MESES.fullNames[MESES.mapping[month]];
    showToast('Filtrado: ' + monthName, 'info');
}

/**
 * Exporta dashboard
 */
function exportDashboard() {
    var data = [
        { mes: 'Julho', conformidade: 95.9, obstrucoes: 20 },
        { mes: 'Agosto', conformidade: 82.9, obstrucoes: 11 },
        { mes: 'Setembro', conformidade: 69.7, obstrucoes: 9 },
        { mes: 'Outubro', conformidade: 80.0, obstrucoes: 6 },
        { mes: 'Novembro', conformidade: 97.1, obstrucoes: 20 }
    ];
    
    exportToCSV(data, 'relatorio_brigada_hsm_2025.csv');
    showToast('Relatório exportado!', 'success');
}

// Expor funções globais
window.initDashboard = initDashboard;
window.switchTab = switchTab;
window.filterDashboard = filterDashboard;
window.exportDashboard = exportDashboard;

// Inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

console.log('✅ Main.js carregado!');
