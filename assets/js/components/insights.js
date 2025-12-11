/**
 * COMPONENTE: INSIGHTS
 * Cards de insights dinâmicos baseados no período
 */

import { DATABASE } from '../data/database.js';

/**
 * Renderiza insights do período selecionado
 * @param {string} month - Mês selecionado
 */
export function renderInsights(month = 'all') {
    const container = document.getElementById('dynamic-insights');
    if (!container) return;
    
    const insights = DATABASE.insights[month] || DATABASE.insights.all;
    
    container.innerHTML = insights.map((text, index) => `
        <div class="insight-card" style="animation-delay: ${index * 100}ms">
            <i class="ph-fill ph-lightbulb-filament insight-icon"></i>
            <span class="text-xs text-slate-700 leading-relaxed">${text}</span>
        </div>
    `).join('');
}

/**
 * Renderiza checklist de conformidade detalhada
 * @param {Object} execucaoData - Dados de execução mensal
 */
export function renderChecklistBars(execucaoData) {
    const container = document.getElementById('inspection-bars');
    if (!container) return;
    
    const items = [
        { label: 'Extintores', value: execucaoData.extintores },
        { label: 'Hidrantes', value: execucaoData.hidrantes },
        { label: 'Luminárias', value: execucaoData.luminarias },
        { label: 'Aterramento', value: execucaoData.aterramento },
        { label: 'Bombas Incêndio', value: execucaoData.bombas },
        { label: 'Portas Corta-Fogo', value: execucaoData.portasCF },
        { label: 'Livro Ocorrências', value: execucaoData.livroOcorrencia }
    ];
    
    container.innerHTML = items.map((item, index) => {
        const colorClass = getBarColor(item.value);
        return `
            <div class="group" style="animation-delay: ${index * 50}ms">
                <div class="flex justify-between items-center text-xs mb-1.5">
                    <span class="font-medium text-slate-600">${item.label}</span>
                    <span class="font-bold text-slate-800 tabular-nums">${item.value}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill ${colorClass}" 
                         style="width: 0%; transition-delay: ${index * 50}ms"
                         data-width="${item.value}%"></div>
                </div>
            </div>
        `;
    }).join('');
    
    // Animar barras após renderização
    setTimeout(() => {
        container.querySelectorAll('.progress-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    }, 100);
}

/**
 * Determina cor da barra baseado no valor
 * @param {number} value 
 * @returns {string} Classe CSS
 */
function getBarColor(value) {
    if (value >= 90) return 'bg-green-500';
    if (value >= 70) return 'bg-yellow-500';
    if (value >= 50) return 'bg-orange-500';
    return 'bg-red-500';
}
