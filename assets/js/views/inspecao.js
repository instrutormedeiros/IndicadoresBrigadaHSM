/**
 * VIEW: INSPEÇÃO DETALHADA
 * Página com detalhamento das inspeções mensais
 */

import { DATABASE } from '../data/database.js';
import { renderChecklistBars } from '../components/insights.js';
import { createObstructionsChart } from '../charts/chartConfig.js';

let obstructionsChartInstance = null;

/**
 * Renderiza a view de inspeção detalhada
 */
export function renderInspecao() {
    const container = document.getElementById('dashboard-content');
    
    container.innerHTML = `
        <div id="content-inspecao" class="hidden fade-enter space-y-6">
            
            <!-- Grid de Gráficos -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <!-- Histórico de Obstruções -->
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <h3 class="text-slate-800 font-bold text-base">Histórico de Obstruções</h3>
                            <p class="text-xs text-slate-400 mt-0.5">Contagem absoluta de equipamentos bloqueados</p>
                        </div>
                        <div class="flex gap-2">
                            <span class="w-3 h-3 rounded-sm bg-red-500" title="Extintores"></span>
                            <span class="w-3 h-3 rounded-sm bg-blue-500" title="Hidrantes"></span>
                        </div>
                    </div>
                    <div class="h-72 relative">
                        <canvas id="obstructionsChart"></canvas>
                    </div>
                </div>

                <!-- Checklist de Conformidade -->
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-5">
                        <div>
                            <h3 class="text-slate-800 font-bold text-base" id="checklist-title">
                                Checklist de Conformidade - Novembro
                            </h3>
                            <p class="text-xs text-slate-400 mt-0.5">Percentual de conformidade por item</p>
                        </div>
                        <span class="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            Detalhe Mensal
                        </span>
                    </div>
                    <div class="space-y-4 overflow-y-auto max-h-72 pr-2" id="inspection-bars">
                        <!-- Será preenchido via JS -->
                    </div>
                </div>
            </div>

            <!-- Matriz de Execução Mensal -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <div>
                        <h3 class="font-bold text-slate-800 text-sm">Matriz de Execução Mensal</h3>
                        <p class="text-xs text-slate-500 mt-0.5">Desempenho consolidado de todos os itens inspecionados</p>
                    </div>
                    <button 
                        onclick="window.exportMatrixToExcel()" 
                        class="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 hover:gap-2 transition-all">
                        <i class="ph ph-microsoft-excel-logo"></i> Exportar Excel
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th class="text-left">Mês</th>
                                <th class="text-center">Extintores</th>
                                <th class="text-center">Hidrantes</th>
                                <th class="text-center">Luminárias</th>
                                <th class="text-center">Aterramento</th>
                                <th class="text-center">Bombas</th>
                                <th class="text-center">Portas CF</th>
                                <th class="text-center text-blue-600">Livro Ocor.</th>
                            </tr>
                        </thead>
                        <tbody id="execution-table-body">
                            <!-- Será preenchido via JS -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Cards de Alertas Críticos -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div class="flex items-start gap-3">
                        <i class="ph-fill ph-warning-circle text-2xl text-red-600 flex-shrink-0"></i>
                        <div>
                            <h4 class="font-bold text-red-900 text-sm">Alertas Críticos Identificados</h4>
                            <ul class="mt-2 space-y-1 text-xs text-red-800">
                                <li>• Set/2025: Aterramento em 0% (Falha total)</li>
                                <li>• Out/2025: Portas Corta-Fogo em 0% (Bloqueio total)</li>
                            </ul>
                            <p class="mt-2 text-xs font-medium text-red-700">
                                ⚠️ Ambos corrigidos nos meses subsequentes
                            </p>
                        </div>
                    </div>
                </div>

                <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <div class="flex items-start gap-3">
                        <i class="ph-fill ph-check-circle text-2xl text-green-600 flex-shrink-0"></i>
                        <div>
                            <h4 class="font-bold text-green-900 text-sm">Destaques Positivos</h4>
                            <ul class="mt-2 space-y-1 text-xs text-green-800">
                                <li>✓ Jul/2025: 100% em Extintores e Hidrantes</li>
                                <li>✓ Out/2025: Recorde mínimo de obstruções (6)</li>
                                <li>✓ Nov/2025: Recuperação total - 97.1%</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Inicializar componentes
    initializeInspecao();
}

/**
 * Inicializa componentes da inspeção
 */
function initializeInspecao() {
    // Criar gráfico de obstruções
    const canvas = document.getElementById('obstructionsChart');
    if (canvas) {
        obstructionsChartInstance = createObstructionsChart(
            canvas,
            DATABASE.conformidade.labels,
            DATABASE.obstrucoes.extintores,
            DATABASE.obstrucoes.hidrantes
        );
    }
    
    // Renderizar checklist (Novembro por padrão)
    renderChecklistBars(DATABASE.execucaoMensal.Nov);
    
    // Renderizar tabela de execução
    renderExecutionTable();
}

/**
 * Renderiza tabela de execução mensal
 */
function renderExecutionTable() {
    const tbody = document.getElementById('execution-table-body');
    if (!tbody) return;
    
    const meses = ['Jul', 'Ago', 'Set', 'Out', 'Nov'];
    
    tbody.innerHTML = meses.map(mes => {
        const data = DATABASE.execucaoMensal[mes];
        return `
            <tr>
                <td class="font-bold text-slate-800">${mes}/2025</td>
                <td class="text-center">${formatCell(data.extintores)}</td>
                <td class="text-center">${formatCell(data.hidrantes)}</td>
                <td class="text-center">${formatCell(data.luminarias)}</td>
                <td class="text-center">${formatCell(data.aterramento)}</td>
                <td class="text-center">${formatCell(data.bombas)}</td>
                <td class="text-center">${formatCell(data.portasCF)}</td>
                <td class="text-center">${formatCell(data.livroOcorrencia, true)}</td>
            </tr>
        `;
    }).join('');
}

/**
 * Formata célula da tabela com cores
 * @param {number} value - Valor percentual
 * @param {boolean} isBlue - Se deve usar cor azul
 * @returns {string} HTML formatado
 */
function formatCell(value, isBlue = false) {
    if (value === 100) {
        return `<span class="font-bold ${isBlue ? 'text-blue-600' : 'text-green-600'}">${value}%</span>`;
    } else if (value === 0) {
        return `<span class="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">${value}%</span>`;
    } else if (value < 50) {
        return `<span class="font-bold text-red-600">${value}%</span>`;
    } else if (value < 80) {
        return `<span class="font-bold text-orange-600">${value}%</span>`;
    } else {
        return `<span class="font-bold text-slate-600">${value}%</span>`;
    }
}

/**
 * Atualiza inspeção com filtro de mês
 * @param {string} month - Mês selecionado
 */
export function updateInspecao(month = 'all') {
    const monthIndex = {
        'jul': 0, 'ago': 1, 'set': 2, 'out': 3, 'nov': 4
    }[month];
    
    // Atualizar gráfico de obstruções
    if (obstructionsChartInstance) {
        if (month === 'all') {
            obstructionsChartInstance.data.labels = DATABASE.conformidade.labels;
            obstructionsChartInstance.data.datasets[0].data = DATABASE.obstrucoes.extintores;
            obstructionsChartInstance.data.datasets[1].data = DATABASE.obstrucoes.hidrantes;
        } else {
            obstructionsChartInstance.data.labels = DATABASE.conformidade.labels.slice(0, monthIndex + 1);
            obstructionsChartInstance.data.datasets[0].data = DATABASE.obstrucoes.extintores.slice(0, monthIndex + 1);
            obstructionsChartInstance.data.datasets[1].data = DATABASE.obstrucoes.hidrantes.slice(0, monthIndex + 1);
        }
        obstructionsChartInstance.update('active');
    }
    
    // Atualizar checklist
    const mesLabel = month === 'all' ? 'Nov' : DATABASE.conformidade.labels[monthIndex];
    const title = document.getElementById('checklist-title');
    if (title) {
        title.textContent = `Checklist de Conformidade - ${mesLabel}/2025`;
    }
    renderChecklistBars(DATABASE.execucaoMensal[mesLabel]);
}

/**
 * Destroi instâncias de gráficos
 */
export function destroyInspecaoCharts() {
    if (obstructionsChartInstance) {
        obstructionsChartInstance.destroy();
        obstructionsChartInstance = null;
    }
}
