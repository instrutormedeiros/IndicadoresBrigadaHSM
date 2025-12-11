/**
 * COMPONENTE: KPI CARDS
 * Cards de indicadores-chave de performance
 */

import { METAS } from '../config/constants.js';

/**
 * Renderiza os 4 KPI cards principais
 * @param {Object} data - Dados do período selecionado
 */
export function renderKPICards(data) {
    const container = document.getElementById('kpi-cards-container');
    if (!container) return;
    
    const cards = [
        {
            id: 'conformidade',
            icon: 'ph-shield-check',
            iconColor: 'text-blue-600',
            label: 'Conformidade Média',
            value: `${data.conformidade}%`,
            badge: getBadgeConformidade(data.conformidade),
            description: 'Média ponderada dos itens inspecionados'
        },
        {
            id: 'obstrucoes',
            icon: 'ph-warning-circle',
            iconColor: 'text-orange-500',
            label: 'Obstruções',
            value: data.totalObstrucoes,
            badge: { text: 'Itens Bloqueados', class: 'badge badge-info' },
            description: 'Extintores e Hidrantes'
        },
        {
            id: 'evacuacao',
            icon: 'ph-timer',
            iconColor: 'text-emerald-500',
            label: 'Tempo Evacuação',
            value: data.tempoEvacuacao || '03:12',
            badge: null,
            description: 'Meta: 03:00 | Máx: 07:00',
            progress: calculateEvacuationProgress(data.tempoEvacuacao)
        },
        {
            id: 'brigada',
            icon: 'ph-users-three',
            iconColor: 'text-purple-500',
            label: 'Brigada Ativa',
            value: '55',
            badge: { text: 'Efetivados', class: 'badge-info' },
            description: '109 Inscritos (50.5% Conv.)'
        }
    ];
    
    container.innerHTML = cards.map(card => `
        <div class="kpi-card card-interactive group">
            <div class="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                <i class="ph-fill ${card.icon} text-6xl ${card.iconColor}"></i>
            </div>
            
            <div class="relative z-10">
                <h3 class="kpi-label">${card.label}</h3>
                
                <div class="mt-3 flex items-baseline gap-2">
                    <span class="kpi-value" id="kpi-${card.id}-value">
                        ${card.value}
                    </span>
                    ${card.badge ? `
                        <span class="${card.badge.class}" id="kpi-${card.id}-badge">
                            ${card.badge.text}
                        </span>
                    ` : ''}
                </div>
                
                ${card.progress !== undefined ? `
                    <div class="mt-3 progress-bar-container">
                        <div class="progress-bar-fill bg-emerald-500" 
                             style="width: ${card.progress}%"></div>
                    </div>
                ` : ''}
                
                <p class="text-xs text-slate-500 mt-2">${card.description}</p>
            </div>
        </div>
    `).join('');
}

/**
 * Atualiza valores dos KPIs com animação
 * @param {Object} data - Novos dados
 */
export function updateKPIValues(data) {
    // Conformidade
    animateValue('kpi-conformidade-value', `${data.conformidade}%`);
    updateBadge('kpi-conformidade-badge', getBadgeConformidade(data.conformidade));
    
    // Obstruções
    animateValue('kpi-obstrucoes-value', data.totalObstrucoes);
    
    // Evacuação
    animateValue('kpi-evacuacao-value', data.tempoEvacuacao || '03:12');
}

/**
 * Determina badge de conformidade baseado no valor
 * @param {number} value - Valor de conformidade
 * @returns {Object} Badge config
 */
function getBadgeConformidade(value) {
    if (value >= METAS.conformidade.excelente) {
        return { text: 'Excelente', class: 'badge badge-success' };
    } else if (value >= METAS.conformidade.bom) {
        return { text: 'Bom', class: 'badge badge-info' };
    } else if (value >= METAS.conformidade.regular) {
        return { text: 'Regular', class: 'badge badge-warning' };
    } else {
        return { text: 'Crítico', class: 'badge badge-danger' };
    }
}

/**
 * Calcula progresso de evacuação
 * @param {string} tempo - Tempo no formato MM:SS
 * @returns {number} Porcentagem
 */
function calculateEvacuationProgress(tempo) {
    if (!tempo) return 85;
    const [min, sec] = tempo.split(':').map(Number);
    const totalSeconds = (min * 60) + sec;
    return Math.min(100, (METAS.tempoEvacuacao.meta / totalSeconds) * 100);
}

/**
 * Anima mudança de valor
 * @param {string} elementId 
 * @param {string|number} newValue 
 */
function animateValue(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        element.textContent = newValue;
        element.style.transition = 'all 0.3s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 150);
}

/**
 * Atualiza badge com animação
 * @param {string} elementId 
 * @param {Object} badgeConfig 
 */
function updateBadge(elementId, badgeConfig) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.className = badgeConfig.class;
    element.textContent = badgeConfig.text;
}
