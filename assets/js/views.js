/**
 * VIEWS
 * Todas as views (páginas) do dashboard - OTIMIZADAS PARA ABOVE THE FOLD
 */

var Views = {
    
    /**
     * VIEW: OVERVIEW (Visão Executiva)
     */
    renderOverview: function() {
        var container = document.getElementById('dashboard-content');
        
        container.innerHTML = '\
            <div id="content-overview" class="fade-enter space-y-6">\
                <!-- KPI Cards -->\
                <div id="kpi-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>\
                \
                <!-- Grid Principal 2x2 -->\
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">\
                    <!-- Tendência de Conformidade -->\
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                        <div class="flex justify-between items-center mb-4">\
                            <h3 class="text-slate-800 font-bold text-base flex items-center gap-2">\
                                <span class="w-1 h-5 bg-blue-600 rounded-full"></span>\
                                Evolução Mensal (%)\
                            </h3>\
                            <span class="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-full font-semibold">\
                                Jul-Nov 2025\
                            </span>\
                        </div>\
                        <div class="h-[280px] w-full relative">\
                            <canvas id="complianceChart"></canvas>\
                        </div>\
                    </div>\
                    \
                    <!-- Insights Dinâmicos -->\
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">\
                        <h3 class="text-slate-800 font-bold text-base mb-4 flex items-center gap-2">\
                            <i class="ph-fill ph-lightbulb text-yellow-500 text-lg"></i>\
                            Destaques do Período\
                        </h3>\
                        <div id="dynamic-insights" class="space-y-3 flex-grow"></div>\
                    </div>\
                    \
                    <!-- Métricas de Performance -->\
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-blue-700 uppercase tracking-wide">Variação Total</h4>\
                            <i class="ph-fill ph-trend-up text-3xl text-blue-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-blue-900 mb-2">+27.4%</div>\
                        <p class="text-sm text-blue-700">Set (69.7%) → Nov (97.1%)</p>\
                        <div class="mt-4 pt-4 border-t border-blue-200">\
                            <div class="text-xs text-blue-600 font-semibold">Melhor Mês: <span class="text-blue-900">Novembro</span></div>\
                        </div>\
                    </div>\
                    \
                    <!-- Status Geral -->\
                    <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-emerald-700 uppercase tracking-wide">Status Atual</h4>\
                            <i class="ph-fill ph-check-circle text-3xl text-emerald-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-emerald-900 mb-2">97.1%</div>\
                        <p class="text-sm text-emerald-700">Conformidade Novembro/2025</p>\
                        <div class="mt-4 pt-4 border-t border-emerald-200">\
                            <div class="text-xs text-emerald-600 font-semibold">Meta Anual: <span class="text-emerald-900">> 95%</span></div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';
        
        this.initializeOverview();
    },
    
    initializeOverview: function() {
        var data = getMonthData('all');
        
        Components.renderKPICards({
            conformidade: data.conformidade,
            totalObstrucoes: data.totalObstrucoes,
            tempoEvacuacao: '03:12'
        });
        
        Components.renderInsights('all');
        
        ChartManager.createConformidade(
            'complianceChart',
            DATABASE.conformidade.labels,
            DATABASE.conformidade.values
        );
    },
    
    updateOverview: function(month) {
        month = month || 'all';
        var data = getMonthData(month);
        
        Components.updateKPIValues(data);
        Components.renderInsights(month);
        
        if (month === 'all') {
            ChartManager.update('conformidade', DATABASE.conformidade.labels, DATABASE.conformidade.values);
        } else {
            var monthIndex = MESES.mapping[month];
            ChartManager.update('conformidade', [MESES.labels[monthIndex]], [DATABASE.conformidade.values[monthIndex]]);
        }
    },
    
    /**
     * VIEW: CONFORMIDADE
     */
    renderConformidade: function() {
        var container = document.getElementById('dashboard-content');
        
        container.innerHTML = '\
            <div id="content-conformidade" class="fade-enter space-y-6">\
                <!-- Grid Principal -->\
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">\
                    <!-- Gráfico de Conformidade -->\
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                        <div class="flex justify-between items-center mb-4">\
                            <h3 class="text-slate-800 font-bold text-base flex items-center gap-2">\
                                <span class="w-1 h-5 bg-blue-600 rounded-full"></span>\
                                Linha do Tempo\
                            </h3>\
                        </div>\
                        <div class="h-[320px] w-full relative">\
                            <canvas id="complianceChartDetail"></canvas>\
                        </div>\
                    </div>\
                    \
                    <!-- Obstruções -->\
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                        <div class="flex justify-between items-center mb-4">\
                            <h3 class="text-slate-800 font-bold text-base flex items-center gap-2">\
                                <span class="w-1 h-5 bg-orange-500 rounded-full"></span>\
                                Obstruções Mensais\
                            </h3>\
                        </div>\
                        <div class="h-[320px] w-full relative">\
                            <canvas id="obstructionsChart"></canvas>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';
        
        ChartManager.createConformidade(
            'complianceChartDetail',
            DATABASE.conformidade.labels,
            DATABASE.conformidade.values
        );
        
        ChartManager.createObstrucoes(
            'obstructionsChart',
            DATABASE.conformidade.labels,
            DATABASE.obstrucoes.extintores,
            DATABASE.obstrucoes.hidrantes
        );
    },
    
    /**
     * VIEW: INSPEÇÃO DETALHADA
     */
    renderInspecao: function() {
        var container = document.getElementById('dashboard-content');
        
        container.innerHTML = '\
            <div id="content-inspecao" class="fade-enter space-y-6">\
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                    <div class="flex justify-between items-center mb-6">\
                        <h3 class="text-slate-800 font-bold text-lg flex items-center gap-2">\
                            <i class="ph-fill ph-clipboard-text text-blue-600 text-2xl"></i>\
                            Checklist de Conformidade por Sistema\
                        </h3>\
                        <span class="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full font-semibold">\
                            Última Inspeção: Nov/2025\
                        </span>\
                    </div>\
                    \
                    <div id="inspection-bars" class="space-y-4 max-w-4xl"></div>\
                </div>\
            </div>\
        ';
        
        var data = getMonthData('all');
        Components.renderChecklistBars(data.execucao);
    },
    
    updateInspecao: function(month) {
        month = month || 'all';
        var data = getMonthData(month);
        Components.renderChecklistBars(data.execucao);
    },
    
    /**
     * VIEW: EVACUAÇÃO
     */
    renderEvacuacao: function() {
        var container = document.getElementById('dashboard-content');
        
        container.innerHTML = '\
            <div id="content-evacuacao" class="fade-enter space-y-6">\
                <!-- Gráfico + Cards -->\
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">\
                    <!-- Gráfico -->\
                    <div class="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                        <div class="flex justify-between items-center mb-4">\
                            <h3 class="text-slate-800 font-bold text-base flex items-center gap-2">\
                                <span class="w-1 h-5 bg-emerald-600 rounded-full"></span>\
                                Histórico de Simulados\
                            </h3>\
                            <div class="flex gap-2">\
                                <span class="px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[10px] font-bold text-emerald-700">\
                                    META: 3min\
                                </span>\
                                <span class="px-2 py-1 bg-red-50 border border-red-200 rounded-full text-[10px] font-bold text-red-700">\
                                    MÁX: 7min\
                                </span>\
                            </div>\
                        </div>\
                        <div class="h-[280px] w-full relative">\
                            <canvas id="evacuationChart"></canvas>\
                        </div>\
                    </div>\
                    \
                    <!-- Estatísticas -->\
                    <div class="space-y-4">\
                        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border border-emerald-200">\
                            <div class="flex items-center justify-between mb-3">\
                                <h4 class="text-xs font-bold text-emerald-700 uppercase">Melhor Tempo</h4>\
                                <i class="ph-fill ph-trophy text-2xl text-emerald-600"></i>\
                            </div>\
                            <div class="text-3xl font-bold text-emerald-900">03:08</div>\
                            <p class="text-xs text-emerald-700 mt-1">Simulado de Maio/2025</p>\
                        </div>\
                        \
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">\
                            <div class="flex items-center justify-between mb-3">\
                                <h4 class="text-xs font-bold text-blue-700 uppercase">Último Simulado</h4>\
                                <i class="ph-fill ph-timer text-2xl text-blue-600"></i>\
                            </div>\
                            <div class="text-3xl font-bold text-blue-900">03:12</div>\
                            <p class="text-xs text-blue-700 mt-1">Setembro/2025 • 15 pessoas</p>\
                        </div>\
                        \
                        <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">\
                            <div class="flex items-center justify-between mb-3">\
                                <h4 class="text-xs font-bold text-purple-700 uppercase">Taxa de Sucesso</h4>\
                                <i class="ph-fill ph-check-circle text-2xl text-purple-600"></i>\
                            </div>\
                            <div class="text-3xl font-bold text-purple-900">100%</div>\
                            <p class="text-xs text-purple-700 mt-1">Todos dentro do limite</p>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';
        
        ChartManager.createEvacuacao(
            'evacuationChart',
            DATABASE.evacuacao.labels,
            DATABASE.evacuacao.tempos
        );
    },
    
    /**
     * VIEW: BRIGADA
     */
    renderBrigada: function() {
        var container = document.getElementById('dashboard-content');
        
        container.innerHTML = '\
            <div id="content-brigada" class="fade-enter space-y-6">\
                <!-- KPIs Brigada -->\
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">\
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-purple-700 uppercase">Total Inscritos</h4>\
                            <i class="ph-fill ph-user-plus text-3xl text-purple-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-purple-900 mb-2">109</div>\
                        <p class="text-xs text-purple-700">Colaboradores registrados</p>\
                    </div>\
                    \
                    <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-emerald-700 uppercase">Brigadistas Ativos</h4>\
                            <i class="ph-fill ph-shield-check text-3xl text-emerald-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-emerald-900 mb-2">55</div>\
                        <p class="text-xs text-emerald-700">Certificados e operacionais</p>\
                    </div>\
                    \
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-blue-700 uppercase">Taxa de Conversão</h4>\
                            <i class="ph-fill ph-chart-pie text-3xl text-blue-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-blue-900 mb-2">50.5%</div>\
                        <p class="text-xs text-blue-700">Conclusão dos treinamentos</p>\
                    </div>\
                </div>\
                \
                <!-- Tabela de Turmas -->\
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                    <h3 class="text-slate-800 font-bold text-base mb-4 flex items-center gap-2">\
                        <i class="ph-fill ph-graduation-cap text-purple-600 text-xl"></i>\
                        Turmas de Capacitação 2025\
                    </h3>\
                    <div class="overflow-x-auto">\
                        <table class="data-table">\
                            <thead>\
                                <tr>\
                                    <th>Turma</th>\
                                    <th class="text-center">Inscritos</th>\
                                    <th class="text-center">Treinados</th>\
                                    <th class="text-center">Aproveitamento</th>\
                                    <th class="text-center">Validade</th>\
                                </tr>\
                            </thead>\
                            <tbody>\
                                <tr>\
                                    <td class="font-semibold">Março/2025</td>\
                                    <td class="text-center tabular-nums">39</td>\
                                    <td class="text-center tabular-nums font-bold text-emerald-600">27</td>\
                                    <td class="text-center"><span class="badge badge-success">69.2%</span></td>\
                                    <td class="text-center text-slate-600 font-mono text-xs">01/03/2026</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Junho/2025</td>\
                                    <td class="text-center tabular-nums">21</td>\
                                    <td class="text-center tabular-nums font-bold text-orange-600">8</td>\
                                    <td class="text-center"><span class="badge badge-warning">38.1%</span></td>\
                                    <td class="text-center text-slate-600 font-mono text-xs">01/07/2026</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Setembro/2025</td>\
                                    <td class="text-center tabular-nums">49</td>\
                                    <td class="text-center tabular-nums font-bold text-blue-600">20</td>\
                                    <td class="text-center"><span class="badge badge-warning">40.8%</span></td>\
                                    <td class="text-center text-slate-600 font-mono text-xs">01/09/2026</td>\
                                </tr>\
                            </tbody>\
                        </table>\
                    </div>\
                </div>\
            </div>\
        ';
    }
};

console.log('✅ Views carregadas com sucesso');
