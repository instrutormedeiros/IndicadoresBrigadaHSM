/**
 * MAIN APPLICATION
 * Controla inicialização e funcionalidades globais COM MULTI-ANO
 */

// Estado global da aplicação
var AppState = {
    currentTab: 'overview',
    currentYear: '2025',
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
 * Filtra dashboard por ANO
 */
function filterByYear(year) {
    AppState.currentYear = year;
    AppState.currentMonth = 'all'; // Reset mês ao trocar ano
    
    // Atualizar estado visual do slicer de ano
    Components.updateYearSlicerState(year);
    
    // Recarregar slicers de mês para o ano selecionado
    Components.renderMonthSlicers(year);
    
    // Atualizar view atual
    switch(AppState.currentTab) {
        case 'overview':
            Views.updateOverview(year, 'all');
            break;
        case 'conformidade':
            Views.updateConformidade(year);
            break;
        case 'inspecao':
            Views.updateInspecao(year, 'all');
            break;
        case 'evacuacao':
            Views.renderEvacuacao(); // Recriar gráfico
            break;
        case 'brigada':
            Views.renderBrigada(); // Recarregar tabela
            break;
    }
    
    showToast('Ano: ' + year, 'info');
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
                Views.updateOverview(AppState.currentYear, AppState.currentMonth);
            }
            break;
        case 'conformidade':
            Views.renderConformidade();
            break;
        case 'inspecao':
            Views.renderInspecao();
            if (AppState.currentMonth !== 'all') {
                Views.updateInspecao(AppState.currentYear, AppState.currentMonth);
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
    
    // Atualizar estado dos slicers
    Components.updateSlicerState(month);
    
    // Atualizar view atual
    switch(AppState.currentTab) {
        case 'overview':
            Views.updateOverview(AppState.currentYear, month);
            break;
        case 'inspecao':
            Views.updateInspecao(AppState.currentYear, month);
            break;
        // Conformidade, Evacuação e Brigada não filtram por mês individual
    }
    
    var mesesConfig = MESES[AppState.currentYear];
    var monthName = month === 'all' ? 'Todo o Ano' : mesesConfig.fullNames[mesesConfig.mapping[month]];
    showToast('Filtrado: ' + monthName, 'info');
}

/**
 * Exporta dashboard
 */
function exportDashboard() {
    var currentYear = AppState.currentYear;
    var yearData = DATABASE[currentYear];
    
    var data = yearData.conformidade.labels.map(function(label, index) {
        return {
            ano: currentYear,
            mes: label,
            conformidade: yearData.conformidade.values[index],
            obstrucoesExtintores: yearData.obstrucoes.extintores[index],
            obstrucoesHidrantes: yearData.obstrucoes.hidrantes[index]
        };
    });
    
    exportToCSV(data, 'relatorio_brigada_hsm_' + currentYear + '.csv');
    showToast('Relatório exportado!', 'success');
}

// Expor funções globais
window.initDashboard = initDashboard;
window.switchTab = switchTab;
window.filterDashboard = filterDashboard;
window.filterByYear = filterByYear;
window.exportDashboard = exportDashboard;

// Inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

console.log('✅ Main.js carregado!');
