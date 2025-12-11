/**
 * MAIN APPLICATION
 * Controla inicialização e funcionalidades globais
 */

// Estado global da aplicação
var AppState = {
    currentTab: 'visao-geral',
    currentMonth: 'all'
};

/**
 * Inicializa o dashboard
 */
function initDashboard() {
    console.log('🚀 Inicializando Dashboard Brigada H.S.M...');
    
    // Inicializar ChartManager
    ChartManager.init();
    
    // Renderizar componentes fixos
    Components.renderHeader();
    Components.renderTabs();
    
    // Renderizar view inicial
    Views.renderVisaoGeral();
    
    console.log('✅ Dashboard inicializado com sucesso!');
    showToast('Dashboard carregado com sucesso!', 'success');
}

/**
 * Troca de aba
 */
function switchTab(tabId) {
    AppState.currentTab = tabId;
    
    // Atualizar estado visual das tabs
    var allTabs = ['visao-geral', 'inspecao', 'evacuacao'];
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
    
    // Renderizar view correspondente
    switch(tabId) {
        case 'visao-geral':
            Views.renderVisaoGeral();
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
    }
    
    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Filtra dashboard por mês
 */
function filterDashboard(month) {
    AppState.currentMonth = month;
    
    // Atualizar estado dos slicers
    Components.updateSlicerState(month);
    
    // Atualizar view atual
    switch(AppState.currentTab) {
        case 'visao-geral':
            Views.updateVisaoGeral(month);
            break;
        case 'inspecao':
            Views.updateInspecao(month);
            break;
        // Evacuação não tem filtro por mês
    }
    
    var monthName = month === 'all' ? 'Todo o Período' : MESES.fullNames[MESES.mapping[month]];
    showToast('Filtrado para: ' + monthName, 'info');
}

/**
 * Exporta dashboard para relatório
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
    showToast('Relatório exportado com sucesso!', 'success');
}

/**
 * Gera relatório completo
 */
function generateReport() {
    showToast('Funcionalidade em desenvolvimento', 'info');
}

/**
 * Expor funções globais
 */
window.initDashboard = initDashboard;
window.switchTab = switchTab;
window.filterDashboard = filterDashboard;
window.exportDashboard = exportDashboard;
window.generateReport = generateReport;

/**
 * Inicializar quando o DOM estiver pronto
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

console.log('✅ Main.js carregado - Dashboard pronto para uso!');
