/**
 * COMPONENTES UI
 * Todos os componentes visuais do dashboard
 */

var Components = {
    
    /**
     * Renderiza o Header com filtros de ANO e PERÍODO
     */
    renderHeader: function() {
        var header = document.getElementById('app-header');
        
        header.innerHTML = '\
            <div class="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">\
                <!-- Logo e Título -->\
                <div class="flex items-center gap-4">\
                    <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/30">\
                        <i class="ph-fill ph-fire text-2xl"></i>\
                    </div>\
                    <div>\
                        <h1 class="text-lg font-bold text-slate-800 leading-tight">\
                            Dashboard Brigada H.S.M.\
                        </h1>\
                        <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">\
                            <span class="pulse-dot"></span>\
                            <span>Indicadores de Segurança</span>\
                        </div>\
                    </div>\
                </div>\
                \
                <!-- Filtros de ANO e PERÍODO -->\
                <div class="hidden md:flex items-center gap-4">\
                    <!-- Seletor de Ano -->\
                    <div class="flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-sm">\
                        <span class="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider">\
                            Ano:\
                        </span>\
                        <div class="flex gap-1" id="year-slicer">\
                            <button onclick="filterByYear(\'2025\')" id="btn-year-2025" class="slicer-btn slicer-active text-xs py-2 px-4" aria-pressed="true">\
                                2025\
                            </button>\
                            <button onclick="filterByYear(\'2026\')" id="btn-year-2026" class="slicer-btn text-xs py-2 px-4" aria-pressed="false">\
                                2026\
                            </button>\
                        </div>\
                    </div>\
                    \
                    <!-- Seletor de Mês -->\
                    <div class="flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-sm">\
                        <span class="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider">\
                            Período:\
                        </span>\
                        <div class="flex gap-1" id="month-slicer">\
                            <!-- Será preenchido dinamicamente pelo JS -->\
                        </div>\
                    </div>\
                </div>\
                \
                <!-- Ações -->\
                <div class="flex items-center gap-3">\
                    <button onclick="exportDashboard()" class="text-slate-400 hover:text-slate-700 transition-colors p-2 hover:bg-slate-100 rounded-lg no-print" title="Exportar relatório">\
                        <i class="ph ph-download-simple text-xl"></i>\
                    </button>\
                    <button onclick="window.print()" class="text-slate-400 hover:text-slate-700 transition-colors p-2 hover:bg-slate-100 rounded-lg no-print" title="Imprimir dashboard">\
                        <i class="ph ph-printer text-xl"></i>\
                    </button>\
                </div>\
            </div>\
        ';
        
        // Renderizar meses do ano padrão (2025)
        this.renderMonthSlicers('2025');
    },
    
    /**
     * Renderiza os slicers de mês baseado no ano
     */
    renderMonthSlicers: function(year) {
        var container = document.getElementById('month-slicer');
        if (!container) return;
        
        var mesesConfig = MESES[year];
        if (!mesesConfig) return;
        
        var slicerButtons = '<button onclick="filterDashboard(\'all\')" id="btn-all" class="slicer-btn slicer-active text-xs py-2 px-3" aria-pressed="true" title="Visualizar dados consolidados do ano">\
            Todos\
        </button>';
        
        slicerButtons += mesesConfig.labels.map(function(mes, idx) {
            return '<button onclick="filterDashboard(\'' + mes.toLowerCase() + '\')" ' +
                   'id="btn-' + mes.toLowerCase() + '" ' +
                   'class="slicer-btn text-xs py-2 px-3" ' +
                   'aria-pressed="false" ' +
                   'title="Filtrar dados de ' + mesesConfig.fullNames[idx] + '">' +
                   mes +
                   '</button>';
        }).join('');
        
        container.innerHTML = slicerButtons;
    },
    
    /**
     * Atualiza estado visual dos botões de ANO
     */
    updateYearSlicerState: function(activeYear) {
        var allYearButtons = document.querySelectorAll('[id^="btn-year-"]');
        allYearButtons.forEach(function(btn) {
            btn.classList.remove('slicer-active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        var activeBtn = document.getElementById('btn-year-' + activeYear);
        if (activeBtn) {
            activeBtn.classList.add('slicer-active');
            activeBtn.setAttribute('aria-pressed', 'true');
        }
    },
    
    /**
     * Atualiza estado visual dos botões de filtro de mês
     */
    updateSlicerState: function(activeMonth) {
        // Remove estado ativo de todos
        var allButtons = document.querySelectorAll('#month-slicer .slicer-btn');
        allButtons.forEach(function(btn) {
            btn.classList.remove('slicer-active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Adiciona estado ativo ao selecionado
        var activeBtn = document.getElementById('btn-' + activeMonth);
        if (activeBtn) {
            activeBtn.classList.add('slicer-active');
            activeBtn.setAttribute('aria-pressed', 'true');
        }
    },
    
    /**
     * Renderiza as Tabs de navegação
     */
    renderTabs: function() {
        var tabs = [
            { id: 'overview', label: 'Visão Executiva', icon: 'ph-chart-line-up', description: 'KPIs principais e tendências' },
            { id: 'conformidade', label: 'Conformidade', icon: 'ph-shield-check', description: 'Análise de conformidade e obstruções' },
            { id: 'inspecao', label: 'Inspeções', icon: 'ph-clipboard-text', description: 'Checklist detalhado por sistema' },
            { id: 'evacuacao', label: 'Evacuação', icon: 'ph-users-three', description: 'Simulados e tempos de resposta' },
            { id: 'brigada', label: 'Brigada', icon: 'ph-identification-badge', description: 'Capacitação e efetivo' }
        ];
        
        var container = document.getElementById('tab-navigation');
        
        var tabsHTML = tabs.map(function(tab) {
            var isActive = tab.id === 'overview';
            var activeClasses = isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300';
            
            return '<button onclick="switchTab(\'' + tab.id + '\')" ' +
                   'id="tab-btn-' + tab.id + '" ' +
                   'class="pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ' + activeClasses + '" ' +
                   'role="tab" ' +
                   'aria-selected="' + isActive + '" ' +
                   'aria-controls="content-' + tab.id + '" ' +
                   'title="' + tab.description + '">' +
                   '<i class="ph ' + tab.icon + '"></i>' +
                   '<span>' + tab.label + '</span>' +
                   '</button>';
        }).join('');
        
        container.innerHTML = tabsHTML;
    },
    
    /**
     * Renderiza os KPI Cards principais
     */
    renderKPICards: function(data) {
        var container = document.getElementById('kpi-cards-container');
        if (!container) return;
        
        var conformidadeBadge = this.getBadgeConformidade(data.conformidade);
        
        var cards = [
            {
                id: 'conformidade',
                icon: 'ph-shield-check',
                iconColor: 'text-blue-600',
                label: 'Conformidade Geral',
                value: data.conformidade.toFixed(1) + '%',
                badge: conformidadeBadge,
                description: 'Média ponderada dos sistemas'
            },
            {
                id: 'obstrucoes',
                icon: 'ph-warning-circle',
                iconColor: 'text-orange-500',
                label: 'Obstruções Totais',
                value: data.totalObstrucoes,
                badge: { text: 'Detectadas', class: 'badge badge-warning' },
                description: 'Extintores + Hidrantes'
            },
            {
                id: 'evacuacao',
                icon: 'ph-timer',
                iconColor: 'text-emerald-500',
                label: 'Último Simulado',
                value: '03:12',
                badge: { text: 'Dentro da Meta', class: 'badge badge-success' },
                description: 'Meta: 03:00 | Máx: 07:00',
                progress: 94
            },
            {
                id: 'brigada',
                icon: 'ph-users-three',
                iconColor: 'text-purple-500',
                label: 'Brigada Efetiva',
                value: '55',
                badge: { text: '50.5% Conv.', class: 'badge badge-info' },
                description: '109 Inscritos no total'
            }
        ];
        
        var cardsHTML = cards.map(function(card) {
            var badgeHTML = card.badge ? 
                '<span class="' + card.badge.class + '" id="kpi-' + card.id + '-badge">' + card.badge.text + '</span>' : '';
            
            var progressHTML = card.progress !== undefined ?
                '<div class="mt-3 progress-bar-container">' +
                '<div class="progress-bar-fill bg-emerald-500" style="width: ' + card.progress + '%"></div>' +
                '</div>' : '';
            
            return '<div class="kpi-card card-interactive group">' +
                   '<div class="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">' +
                   '<i class="ph-fill ' + card.icon + ' text-6xl ' + card.iconColor + '"></i>' +
                   '</div>' +
                   '<div class="relative z-10">' +
                   '<h3 class="kpi-label">' + card.label + '</h3>' +
                   '<div class="mt-3 flex items-baseline gap-2">' +
                   '<span class="kpi-value" id="kpi-' + card.id + '-value">' + card.value + '</span>' +
                   badgeHTML +
                   '</div>' +
                   progressHTML +
                   '<p class="text-xs text-slate-500 mt-2">' + card.description + '</p>' +
                   '</div>' +
                   '</div>';
        }).join('');
        
        container.innerHTML = cardsHTML;
    },
    
    /**
     * Atualiza valores dos KPIs com animação
     */
    updateKPIValues: function(data) {
        animateValue('kpi-conformidade-value', data.conformidade.toFixed(1) + '%');
        animateValue('kpi-obstrucoes-value', data.totalObstrucoes);
        
        var badge = this.getBadgeConformidade(data.conformidade);
        var badgeElement = document.getElementById('kpi-conformidade-badge');
        if (badgeElement) {
            badgeElement.className = badge.class;
            badgeElement.textContent = badge.text;
        }
    },
    
    /**
     * Determina badge de conformidade baseado no valor
     */
    getBadgeConformidade: function(value) {
        if (value >= METAS.conformidade.excelente) {
            return { text: 'Excelente', class: 'badge badge-success' };
        } else if (value >= METAS.conformidade.bom) {
            return { text: 'Bom', class: 'badge badge-info' };
        } else if (value >= METAS.conformidade.regular) {
            return { text: 'Regular', class: 'badge badge-warning' };
        } else {
            return { text: 'Crítico', class: 'badge badge-danger' };
        }
    },
    
    /**
     * Renderiza insights do período selecionado
     */
    renderInsights: function(year, month) {
        year = year || '2025';
        month = month || 'all';
        var container = document.getElementById('dynamic-insights');
        if (!container) return;
        
        var yearData = DATABASE[year];
        if (!yearData) return;
        
        var insights = yearData.insights[month] || yearData.insights.all;
        
        var insightsHTML = insights.map(function(text, index) {
            return '<div class="insight-card fade-enter" style="animation-delay: ' + (index * 100) + 'ms">' +
                   '<i class="ph-fill ph-lightbulb-filament insight-icon"></i>' +
                   '<span class="text-xs text-slate-700 leading-relaxed">' + text + '</span>' +
                   '</div>';
        }).join('');
        
        container.innerHTML = insightsHTML;
    },
    
    /**
     * Renderiza checklist de conformidade com barras
     */
    renderChecklistBars: function(execucaoData) {
        var container = document.getElementById('inspection-bars');
        if (!container) return;
        
        var items = [
            { label: 'Extintores de Incêndio', value: execucaoData.extintores, ref: REFERENCIAS.extintores },
            { label: 'Hidrantes e Mangueiras', value: execucaoData.hidrantes, ref: REFERENCIAS.hidrantes },
            { label: 'Luminárias de Emergência', value: execucaoData.luminarias, ref: REFERENCIAS.luminarias },
            { label: 'Sistema de Aterramento', value: execucaoData.aterramento, ref: REFERENCIAS.aterramento },
            { label: 'Bombas de Incêndio', value: execucaoData.bombas, ref: REFERENCIAS.bombas },
            { label: 'Portas Corta-Fogo', value: execucaoData.portasCF, ref: REFERENCIAS.portasCF },
            { label: 'Livro de Ocorrências', value: execucaoData.livroOcorrencia, ref: REFERENCIAS.livroOcorrencia }
        ];
        
        var itemsHTML = items.map(function(item, index) {
            var colorClass = Components.getBarColor(item.value);
            var inspected = Math.round((item.value / 100) * item.ref);
            
            return '<div class="group fade-enter" style="animation-delay: ' + (index * 50) + 'ms">' +
                   '<div class="flex justify-between items-center text-xs mb-1.5">' +
                   '<span class="font-medium text-slate-600">' + item.label + '</span>' +
                   '<div class="flex items-center gap-2">' +
                   '<span class="text-slate-400 text-[10px] font-mono">' + inspected + '/' + item.ref + '</span>' +
                   '<span class="font-bold text-slate-800 tabular-nums">' + item.value + '%</span>' +
                   '</div>' +
                   '</div>' +
                   '<div class="progress-bar-container">' +
                   '<div class="progress-bar-fill ' + colorClass + '" style="width: 0%; transition-delay: ' + (index * 50) + 'ms" data-width="' + item.value + '%"></div>' +
                   '</div>' +
                   '</div>';
        }).join('');
        
        container.innerHTML = itemsHTML;
        
        // Animar barras após renderização
        setTimeout(function() {
            var bars = container.querySelectorAll('.progress-bar-fill');
            bars.forEach(function(bar) {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 100);
    },
    
    /**
     * Determina cor da barra baseado no valor
     */
    getBarColor: function(value) {
        if (value >= 90) return 'bg-green-500';
        if (value >= 70) return 'bg-yellow-500';
        if (value >= 50) return 'bg-orange-500';
        return 'bg-red-500';
    }
};

console.log('✅ Components carregados com sucesso');
