/**
 * MAIN APPLICATION
 * Ponto de entrada e orquestração do dashboard
 */

import { renderHeader, updateSlicerState } from './components/header.js';
import { renderTabs, switchTab } from './components/tabs.js';
import { renderVisaoGeral, updateVisaoGeral, destroyVisaoGeralCharts } from './views/visaoGeral.js';
import { renderInspecao, updateInspecao, destroyInspecaoCharts } from './views/inspecao.js';
import { renderEvacuacao, destroyEvacuacaoCharts } from './views/evacuacao.js';
import { DATABASE, getMonthData } from './data/database.js';
import { exportToCSV, showToast } from './utils/helpers.js';

// Estado global da aplicação
const AppState = {
    currentTab: 'visao-geral',
    currentMonth: 'all',
    initialized: false
};

/**
 * Inicializa a aplicação
 */
function initializeApp() {
    console.log('🚀 Iniciando Dashboard Brigada H.S.M...');
    
    try {
        // Renderizar estrutura base
        renderHeader();
        renderTabs();
        
        // Renderizar todas as views
        renderVisaoGeral();
        renderInspecao();
        renderEvacuacao();
        
        // Expor funções globais
        window.filterDashboard = filterDashboard;
        window.switchTab = switchTab;
        window.exportDashboard = exportDashboard;
        window.exportMatrixToExcel = exportMatrixToExcel;
        window.generateReport = generateReport;
        
        AppState.initialized = true;
        console.log('✅ Dashboard inicializado com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao inicializar dashboard:', error);
        showToast('Erro ao carregar o dashboard', 'error');
    }
}

/**
 * Filtra o dashboard por mês
 * @param {string} month - Mês selecionado
 */
function filterDashboard(month) {
    if (!AppState.initialized) return;
    
    console.log(`🔄 Filtrando para: ${month}`);
    AppState.currentMonth = month;
    
    // Atualizar UI dos slicers
    updateSlicerState(month);
    
    // Atualizar view atual
    switch (AppState.currentTab) {
        case 'visao-geral':
            updateVisaoGeral(month);
            break;
        case 'inspecao':
            updateInspecao(month);
            break;
        // Evacuação não precisa de filtro mensal
    }
    
    showToast(`Filtro aplicado: ${month === 'all' ? 'Visão Anual' : month.toUpperCase()}`, 'success');
}

/**
 * Exporta dados do dashboard
 */
function exportDashboard() {
    try {
        const exportData = prepareExportData();
        exportToCSV(exportData, `brigada_hsm_relatorio_${new Date().getTime()}.csv`);
        showToast('Relatório exportado com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao exportar:', error);
        showToast('Erro ao exportar relatório', 'error');
    }
}

/**
 * Prepara dados para exportação
 * @returns {Array} Dados formatados
 */
function prepareExportData() {
    const data = [];
    
    DATABASE.conformidade.labels.forEach((mes, idx) => {
        data.push({
            Mês: mes,
            'Conformidade (%)': DATABASE.conformidade.values[idx],
            'Obstruções Extintores': DATABASE.obstrucoes.extintores[idx],
            'Obstruções Hidrantes': DATABASE.obstrucoes.hidrantes[idx],
            'Total Obstruções': DATABASE.obstrucoes.extintores[idx] + DATABASE.obstrucoes.hidrantes[idx]
        });
    });
    
    return data;
}

/**
 * Exporta matriz de execução para Excel
 */
function exportMatrixToExcel() {
    try {
        const matrixData = [];
        
        Object.entries(DATABASE.execucaoMensal).forEach(([mes, valores]) => {
            matrixData.push({
                Mês: mes,
                Extintores: valores.extintores,
                Hidrantes: valores.hidrantes,
                Luminárias: valores.luminarias,
                Aterramento: valores.aterramento,
                Bombas: valores.bombas,
                'Portas CF': valores.portasCF,
                'Livro Ocorrências': valores.livroOcorrencia
            });
        });
        
        exportToCSV(matrixData, `matriz_execucao_${new Date().getTime()}.csv`);
        showToast('Matriz exportada com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao exportar matriz:', error);
        showToast('Erro ao exportar matriz', 'error');
    }
}

/**
 * Gera relatório completo (simulação)
 */
function generateReport() {
    showToast('Gerando relatório completo...', 'info');
    
    setTimeout(() => {
        window.print();
    }, 500);
}

/**
 * Cleanup ao descarregar
 */
window.addEventListener('beforeunload', () => {
    destroyVisaoGeralCharts();
    destroyInspecaoCharts();
    destroyEvacuacaoCharts();
});

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
