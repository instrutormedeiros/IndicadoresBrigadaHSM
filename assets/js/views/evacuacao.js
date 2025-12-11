/**
 * VIEW: EVACUAÇÃO & BRIGADA
 * Página com dados de simulados e capacitação
 */

import { DATABASE } from '../data/database.js';
import { createEvacuationChart } from '../charts/chartConfig.js';
import { formatTime } from '../utils/helpers.js';

let evacuationChartInstance = null;

/**
 * Renderiza a view de evacuação e brigada
 */
export function renderEvacuacao() {
    const container = document.getElementById('dashboard-content');
    
    container.innerHTML = `
        <div id="content-evacuacao" class="hidden fade-enter space-y-6">
            
            <!-- Hero Card: Simulados de Evacuação -->
            <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
                
                <!-- Efeito de fundo -->
                <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
                
                <div class="relative z-10 flex flex-col md:flex-row gap-8">
                    
                    <!-- Informações -->
                    <div class="flex-1">
                        <span class="text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Performance 2025
                        </span>
                        <h2 class="text-3xl md:text-4xl font-bold mt-3 mb-2">Simulados de Evacuação</h2>
                        <p class="text-slate-300 text-sm mb-6">
                            Monitoramento de eficiência e tempo de resposta em emergências
                        </p>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                                <p class="text-[10px] text-slate-400 uppercase tracking-wide mb-1">Melhor Tempo</p>
                                <p class="text-3xl font-mono font-bold text-emerald-400">03:12</p>
                                <p class="text-xs text-slate-400 mt-1">Setembro/2025</p>
                            </div>
                            <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                                <p class="text-[10px] text-slate-400 uppercase tracking-wide mb-1">Última População</p>
                                <p class="text-3xl font-mono font-bold text-blue-400">15</p>
                                <p class="text-xs text-slate-400 mt-1">Pessoas evacuadas</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Gráfico -->
                    <div class="flex-[2] h-80 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-4">
                        <canvas id="evacuationChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Grid de Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <!-- Funil de Capacitação -->
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <i class="ph-fill ph-funnel text-purple-600"></i>
                        Funil de Capacitação da Brigada
                    </h3>
                    
                    <div class="flex items-center justify-between gap-6">
                        <!-- Inscritos -->
                        <div class="text-center flex-1">
                            <div class="relative">
                                <div class="w-32 h-32 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center border-2 border-slate-300">
                                    <div class="text-center">
                                        <div class="text-4xl font-bold text-slate-400">109</div>
                                        <div class="text-[9px] font-bold text-slate-500 uppercase mt-1">Inscritos</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Seta -->
                        <i class="ph-fill ph-arrow-right text-3xl text-slate-300"></i>
                        
                        <!-- Treinados -->
                        <div class="text-center flex-1">
                            <div class="relative">
                                <div class="w-36 h-36 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 border-2 border-purple-400">
                                    <div class="text-center">
                                        <div class="text-5xl font-bold text-white">55</div>
                                        <div class="text-[9px] font-bold text-purple-100 uppercase mt-1">Efetivados</div>
                                    </div>
                                </div>
                                <div class="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                    50.5%
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
                        <div>
                            <div class="text-2xl font-bold text-slate-800">27</div>
                            <div class="text-[10px] text-slate-500 uppercase">Turma Mar</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-slate-800">8</div>
                            <div class="text-[10px] text-slate-500 uppercase">Turma Jun</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-slate-800">20</div>
                            <div class="text-[10px] text-slate-500 uppercase">Turma Set</div>
                        </div>
                    </div>
                </div>

                <!-- Validade das Turmas -->
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <i class="ph-fill ph-calendar-check text-green-600"></i>
                        Validade dos Certificados
                    </h3>
                    
                    <div class="space-y-3">
                        ${DATABASE.brigada.turmas.map(turma => `
                            <div class="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition cursor-pointer group">
                                <div class="flex items-center gap-3">
                                    <div class="w-2.5 h-2.5 rounded-full bg-green-500 group-hover:scale-125 transition-transform"></div>
                                    <div>
                                        <span class="text-sm font-semibold text-slate-700 block">Turma ${turma.mes}</span>
                                        <span class="text-xs text-slate-500">${turma.treinados} brigadistas</span>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <span class="text-xs font-bold text-slate-600 block">Vence: ${turma.validade}</span>
                                    <span class="text-[10px] text-green-600 font-medium">✓ Ativo</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="mt-5 pt-4 border-t border-slate-100">
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-slate-500 font-medium">Próxima reciclagem:</span>
                            <span class="text-slate-800 font-bold">Março/2026</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabela de Histórico de Simulados -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="p-4 border-b border-slate-100 bg-slate-50">
                    <h3 class="font-bold text-slate-800 text-sm">Histórico Completo de Simulados</h3>
                    <p class="text-xs text-slate-500 mt-0.5">Registro de todos os exercícios de evacuação realizados</p>
                </div>
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th class="text-center">Tempo Real</th>
                                <th class="text-center">Meta</th>
                                <th class="text-center">População</th>
                                <th class="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${renderEvacuationHistory()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Inicializar componentes
    initializeEvacuacao();
}

/**
 * Renderiza histórico de evacuações
 * @returns {string} HTML da tabela
 */
function renderEvacuationHistory() {
    const history = [
        { mes: 'Fevereiro', tempo: 361, pop: 22, meta: 180 },
        { mes: 'Abril', tempo: 194, pop: 30, meta: 180 },
        { mes: 'Maio', tempo: 188, pop: 11, meta: 180 },
        { mes: 'Julho', tempo: 199, pop: 10, meta: 180 },
        { mes: 'Setembro', tempo: 192, pop: 15, meta: 180 }
    ];
    
    return history.map(item => {
        const status = item.tempo <= item.meta ? 
            '<span class="badge badge-success">✓ Aprovado</span>' : 
            '<span class="badge badge-warning">⚠ Acima</span>';
        const timeClass = item.tempo <= item.meta ? 'text-green-600' : 'text-orange-600';
        
        return `
            <tr>
                <td class="font-semibold">${item.mes}/2025</td>
                <td class="text-center font-mono font-bold ${timeClass}">${formatTime(item.tempo)}</td>
                <td class="text-center font-mono text-slate-600">${formatTime(item.meta)}</td>
                <td class="text-center font-bold text-slate-700">${item.pop}</td>
                <td class="text-center">${status}</td>
            </tr>
        `;
    }).join('');
}

/**
 * Inicializa componentes de evacuação
 */
function initializeEvacuacao() {
    const canvas = document.getElementById('evacuationChart');
    if (canvas) {
        evacuationChartInstance = createEvacuationChart(
            canvas,
            DATABASE.evacuacao.labels,
            DATABASE.evacuacao.tempos
        );
    }
}

/**
 * Destroi instâncias de gráficos
 */
export function destroyEvacuacaoCharts() {
    if (evacuationChartInstance) {
        evacuationChartInstance.destroy();
        evacuationChartInstance = null;
    }
}
