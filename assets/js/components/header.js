/**
 * COMPONENTE: HEADER
 * Cabeçalho com filtros de período (slicers)
 */

import { MESES } from '../config/constants.js';

export function renderHeader() {
    const header = document.getElementById('app-header');
    
    header.innerHTML = `
        <div class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
            <!-- Logo e Título -->
            <div class="flex items-center gap-4">
                <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
                    <i class="ph-fill ph-fire text-2xl"></i>
                </div>
                <div>
                    <h1 class="text-lg font-bold text-slate-800 leading-tight">
                        Indicadores Brigada H.S.M.
                    </h1>
                    <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span class="pulse-dot"></span>
                        <span>Dados Consolidados 2025</span>
                    </div>
                </div>
            </div>

            <!-- Filtros de Período -->
            <div class="hidden md:flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider">
                    Período:
                </span>
                <div class="flex gap-1" id="month-slicer">
                    <button 
                        onclick="window.filterDashboard('all')" 
                        id="btn-all" 
                        class="slicer-btn slicer-active text-xs py-2 px-3"
                        aria-pressed="true"
                        title="Visualizar dados consolidados de todo o período">
                        Visão Anual
                    </button>
                    ${MESES.labels.map((mes, idx) => `
                        <button 
                            onclick="window.filterDashboard('${mes.toLowerCase()}')" 
                            id="btn-${mes.toLowerCase()}" 
                            class="slicer-btn text-xs py-2 px-3"
                            aria-pressed="false"
                            title="Filtrar dados de ${MESES.fullNames[idx]}">
                            ${mes}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Ações -->
            <div class="flex items-center gap-3">
                <button 
                    onclick="window.exportDashboard()" 
                    class="text-slate-400 hover:text-slate-700 transition-colors p-2 hover:bg-slate-100 rounded-lg no-print" 
                    title="Exportar relatório">
                    <i class="ph ph-download-simple text-xl"></i>
                </button>
                <button 
                    onclick="window.print()" 
                    class="text-slate-400 hover:text-slate-700 transition-colors p-2 hover:bg-slate-100 rounded-lg no-print" 
                    title="Imprimir dashboard">
                    <i class="ph ph-printer text-xl"></i>
                </button>
            </div>
        </div>
    `;
}

/**
 * Atualiza estado visual dos botões de filtro
 * @param {string} activeMonth - Mês ativo ('all', 'jul', 'ago', etc.)
 */
export function updateSlicerState(activeMonth) {
    // Remove estado ativo de todos
    document.querySelectorAll('.slicer-btn').forEach(btn => {
        btn.classList.remove('slicer-active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Adiciona estado ativo ao selecionado
    const activeBtn = document.getElementById(`btn-${activeMonth}`);
    if (activeBtn) {
        activeBtn.classList.add('slicer-active');
        activeBtn.setAttribute('aria-pressed', 'true');
    }
}
