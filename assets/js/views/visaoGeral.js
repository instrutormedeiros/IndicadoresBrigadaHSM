/**
 * VIEW: VISÃO GERAL
 * Página principal com overview dos indicadores
 */

import { DATABASE } from '../data/database.js';
import { renderKPICards, updateKPIValues } from '../components/kpiCards.js';
import { renderInsights } from '../components/insights.js';
import { createComplianceChart, createObstructionsChart } from '../charts/chartConfig.js';

let complianceChartInstance = null;

/**
 * Renderiza a view de visão geral
 */
export function renderVisaoGeral() {
    const container = document.getElementById('dashboard-content');
    
    container.innerHTML = `
        <div id="content-visao-geral" class="fade-enter space-y-6">
            
            <!-- KPI Cards -->
            <div id="kpi-cards-container" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- Será preenchido via JS -->
            </div>

            <!-- Gráficos e Insights -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <!-- Gráfico de Conformidade -->
                <div class="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-slate-800 font-bold text-base flex items-center gap-2">
                            <span class="w-1 h-6 bg-blue-600 rounded-full"></span>
                            Tendência de Conformidade (%)
                        </h3>
                        <div class="flex gap-2">
                            <span class="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full font-medium">
                                Jul - Nov 2025
                            </span>
                        </div>
                    </div>
                    <div class="h-[320px] w-full relative">
                        <canvas id="complianceChart"></canvas>
                    </div>
                </div>

                <!-- Insights Dinâmicos -->
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-slate-800 font-bold text-base mb-4 flex items-center gap-2">
                        <i class="ph-fill ph-lightbulb text-yellow-500 text-xl"></i>
                        Insights do Período
                    </h3>
                    <div id="dynamic-insights" class="space-y-3 flex-grow overflow-y-auto pr-2">
                        <!-- Será preenchido via JS -->
                    </div>
                    <div class="mt-4 pt-4 border-t border-slate-100">
                        <button 
                            onclick="window.generateReport()" 
                            class="w-full py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all hover:shadow-sm">
                            <i class="ph ph-file-text"></i> Ver Relatório Completo →
                        </button>
                    </div>
                </div>
            </div>

            <!-- Grid de Métricas Secundárias -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <!-- Card de Variação -->
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="text-xs font-bold text-blue-700 uppercase tracking-wide">Variação do Período</h4>
                        <i class="ph-fill ph-trend-up text-2xl text-blue-600"></i>
                    </div>
                    <div class="text-3xl font-bold text-blue-900" id="variacao-valor">+27.4%</div>
                    <p class="text-xs text-blue-700 mt-1">Set (69.7%) → Nov (97.1%)</p>
                </div>

                <!-- Card de Projeção -->
                <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border border-emerald-200">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="text-xs font-bold text-emerald-700 uppercase tracking-wide">Tendência Dez/2025</h4>
                        <i class="ph-fill ph-chart-line text-2xl text-emerald-600"></i>
                    </div>
                    <div class="text-3xl font-bold text-emerald-900">95.5%</div>
                    <p class="text-xs text-emerald-700 mt-1">Projeção baseada em média móvel</p>
                </div>

                <!-- Card de Ranking -->
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="text-xs font-bold text-purple-700 uppercase tracking-wide">Melhor Mês</h4>
                        <i class="ph-fill ph-trophy text-2xl text-purple-600"></i>
                    </div>
                    <div class="text-3xl font-bold text-purple-900">Nov/2025</div>
                    <p class="text-xs text-purple-700 mt-1">97.1% de conformidade média</p>
                </div>
            </div>
        </div>
    `;
    
    // Inicializar componentes
    initializeVisaoGeral();
}

/**
 * Inicializa componentes da visão geral
 */
function initializeVisaoGeral() {
    // Renderizar KPIs
    renderKPICards({
        conformidade: 97.1,
        totalObstrucoes: 20,
        tempoEvacuacao: '03:12'
    });
    
    // Renderizar insights
    renderInsights('all');
    
    // Criar gráfico de conformidade
    const canvas = document.getElementById('complianceChart');
    if (canvas) {
        complianceChartInstance = createComplianceChart(
            canvas,
            DATABASE.conformidade.labels,
            DATABASE.conformidade.values
        );
    }
}

/**
 * Atualiza visão geral com filtro de mês
 * @param {string} month - Mês selecionado
 */
export function updateVisaoGeral(month = 'all') {
    const monthIndex = {
        'jul': 0, 'ago': 1, 'set': 2, 'out': 3, 'nov': 4
    }[month];
    
    // Determinar dados baseado no filtro
    let labels, values;
    if (month === 'all') {
        labels = DATABASE.conformidade.labels;
        values = DATABASE.conformidade.values;
    } else {
        labels = DATABASE.conformidade.labels.slice(0, monthIndex + 1);
        values = DATABASE.conformidade.values.slice(0, monthIndex + 1);
    }
    
    // Atualizar gráfico
    if (complianceChartInstance) {
        complianceChartInstance.data.labels = labels;
        complianceChartInstance.data.datasets[0].data = values;
        complianceChartInstance.update('active');
    }
    
    // Atualizar KPIs
    const currentValue = values[values.length - 1];
    const totalObs = month === 'all' ? 20 : 
        DATABASE.obstrucoes.extintores[monthIndex] + DATABASE.obstrucoes.hidrantes[monthIndex];
    
    updateKPIValues({
        conformidade: currentValue,
        totalObstrucoes: totalObs,
        tempoEvacuacao: '03:12'
    });
    
    // Atualizar insights
    renderInsights(month);
}

/**
 * Destroi instâncias de gráficos para limpeza
 */
export function destroyVisaoGeralCharts() {
    if (complianceChartInstance) {
        complianceChartInstance.destroy();
        complianceChartInstance = null;
    }
}
