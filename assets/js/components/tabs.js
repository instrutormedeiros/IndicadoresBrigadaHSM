/**
 * COMPONENTE: TABS
 * Navegação entre diferentes visões do dashboard
 */

const TABS = [
    {
        id: 'visao-geral',
        label: 'Visão Geral',
        icon: 'ph-squares-four',
        description: 'Overview dos indicadores principais'
    },
    {
        id: 'inspecao',
        label: 'Inspeção Detalhada',
        icon: 'ph-clipboard-text',
        description: 'Detalhamento das inspeções mensais'
    },
    {
        id: 'evacuacao',
        label: 'Evacuação & Brigada',
        icon: 'ph-users-three',
        description: 'Simulados e capacitação'
    }
];

export function renderTabs() {
    const container = document.getElementById('tab-navigation');
    
    container.innerHTML = TABS.map(tab => `
        <button 
            onclick="window.switchTab('${tab.id}')" 
            id="tab-btn-${tab.id}" 
            class="pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all
                   ${tab.id === 'visao-geral' 
                       ? 'border-blue-600 text-blue-600' 
                       : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}"
            role="tab"
            aria-selected="${tab.id === 'visao-geral'}"
            aria-controls="content-${tab.id}"
            title="${tab.description}">
            <i class="ph ${tab.icon}"></i>
            <span>${tab.label}</span>
        </button>
    `).join('');
}

/**
 * Troca de aba ativa
 * @param {string} tabId - ID da aba a ser ativada
 */
export function switchTab(tabId) {
    // Esconder todos os conteúdos
    TABS.forEach(tab => {
        const content = document.getElementById(`content-${tab.id}`);
        const btn = document.getElementById(`tab-btn-${tab.id}`);
        
        if (content) content.classList.add('hidden');
        if (btn) {
            btn.classList.remove('border-blue-600', 'text-blue-600');
            btn.classList.add('border-transparent', 'text-slate-500');
            btn.setAttribute('aria-selected', 'false');
        }
    });
    
    // Mostrar conteúdo ativo
    const activeContent = document.getElementById(`content-${tabId}`);
    const activeBtn = document.getElementById(`tab-btn-${tabId}`);
    
    if (activeContent) {
        activeContent.classList.remove('hidden');
        activeContent.classList.add('fade-enter');
    }
    
    if (activeBtn) {
        activeBtn.classList.remove('border-transparent', 'text-slate-500');
        activeBtn.classList.add('border-blue-600', 'text-blue-600');
        activeBtn.setAttribute('aria-selected', 'true');
    }
    
    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
