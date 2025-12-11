/**
 * VIEWS
 * Todas as views (páginas) do dashboard
 */

var Views = {
    
    /**
     * VIEW: VISÃO GERAL
     */
    renderVisaoGeral: function() {
        var container = document.getElementById('dashboard-content');
        
        container.innerHTML = '\
            <div id="content-visao-geral" class="fade-enter space-y-6">\
                <!-- KPI Cards -->\
                <div id="kpi-cards-container" class="grid grid-cols-1 md:grid-cols-4 gap-4"></div>\
                \
                <!-- Gráficos e Insights -->\
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">\
                    <!-- Gráfico de Conformidade -->\
                    <div class="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                        <div class="flex justify-between items-center mb-6">\
                            <h3 class="text-slate-800 font-bold text-base flex items-center gap-2">\
                                <span class="w-1 h-6 bg-blue-600 rounded-full"></span>\
                                Tendência de Conformidade (%)\
                            </h3>\
                            <span class="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full font-medium">\
                                Jul - Nov 2025\
                            </span>\
                        </div>\
                        <div class="h-[320px] w-full relative">\
                            <canvas id="complianceChart"></canvas>\
                        </div>\
                    </div>\
                    \
                    <!-- Insights Dinâmicos -->\
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">\
                        <h3 class="text-slate-800 font-bold text-base mb-4 flex items-center gap-2">\
                            <i class="ph-fill ph-lightbulb text-yellow-500 text-xl"></i>\
                            Insights do Período\
                        </h3>\
                        <div id="dynamic-insights" class="space-y-3 flex-grow overflow-y-auto pr-2"></div>\
                        <div class="mt-4 pt-4 border-t border-slate-100">\
                            <button onclick="generateReport()" class="w-full py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all hover:shadow-sm">\
                                <i class="ph ph-file-text"></i> Ver Relatório Completo →\
                            </button>\
                        </div>\
                    </div>\
                </div>\
                \
                <!-- Gráfico de Obstruções -->\
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                    <div class="flex justify-between items-center mb-6">\
                        <h3 class="text-slate-800 font-bold text-base flex items-center gap-2">\
                            <span class="w-1 h-6 bg-orange-500 rounded-full"></span>\
                            Obstruções Detectadas por Mês\
                        </h3>\
                        <div class="flex items-center gap-2">\
                            <span class="flex items-center gap-1 text-xs">\
                                <span class="w-3 h-3 bg-red-500 rounded"></span>\
                                <span class="text-slate-600">Extintores</span>\
                            </span>\
                            <span class="flex items-center gap-1 text-xs">\
                                <span class="w-3 h-3 bg-blue-500 rounded"></span>\
                                <span class="text-slate-600">Hidrantes</span>\
                            </span>\
                        </div>\
                    </div>\
                    <div class="h-[320px] w-full relative">\
                        <canvas id="obstructionsChart"></canvas>\
                    </div>\
                </div>\
                \
                <!-- Grid de Métricas Secundárias -->\
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">\
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">\
                        <div class="flex items-center justify-between mb-3">\
                            <h4 class="text-xs font-bold text-blue-700 uppercase tracking-wide">Variação do Período</h4>\
                            <i class="ph-fill ph-trend-up text-2xl text-blue-600"></i>\
                        </div>\
                        <div class="text-3xl font-bold text-blue-900">+27.4%</div>\
                        <p class="text-xs text-blue-700 mt-1">Set (69.7%) → Nov (97.1%)</p>\
                    </div>\
                    \
                    <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border border-emerald-200">\
                        <div class="flex items-center justify-between mb-3">\
                            <h4 class="text-xs font-bold text-emerald-700 uppercase tracking-wide">Tendência Dez/2025</h4>\
                            <i class="ph-fill ph-chart-line text-2xl text-emerald-600"></i>\
                        </div>\
                        <div class="text-3xl font-bold text-emerald-900">95.5%</div>\
                        <p class="text-xs text-emerald-700 mt-1">Projeção baseada em média móvel</p>\
                    </div>\
                    \
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">\
                        <div class="flex items-center justify-between mb-3">\
                            <h4 class="text-xs font-bold text-purple-700 uppercase tracking-wide">Melhor Mês</h4>\
                            <i class="ph-fill ph-trophy text-2xl text-purple-600"></i>\
                        </div>\
                        <div class="text-3xl font-bold text-purple-900">Nov/2025</div>\
                        <p class="text-xs text-purple-700 mt-1">97.1% de conformidade média</p>\
                    </div>\
                </div>\
            </div>\
        ';
        
        // Inicializar componentes
        this.initializeVisaoGeral();
    },
    
    /**
     * Inicializa componentes da visão geral
     */
    initializeVisaoGeral: function() {
        var data = getMonthData('all');
        
        // Renderizar KPIs
        Components.renderKPICards({
            conformidade: data.conformidade,
            totalObstrucoes: data.totalObstrucoes,
            tempoEvacuacao: '03:12'
        });
        
        // Renderizar insights
        Components.renderInsights('all');
        
        // Criar gráficos
        ChartManager.createConformidade(
            'complianceChart',
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
     * Atualiza visão geral com filtro de mês
     */
    updateVisaoGeral: function(month) {
        month = month || 'all';
        var data = getMonthData(month);
        
        // Atualizar KPIs
        Components.updateKPIValues(data);
        
        // Atualizar insights
        Components.renderInsights(month);
        
        // Atualizar gráficos
        if (month === 'all') {
            ChartManager.update('conformidade', DATABASE.conformidade.labels, DATABASE.conformidade.values);
            ChartManager.update('obstrucoes', DATABASE.conformidade.labels, {
                ext: DATABASE.obstrucoes.extintores,
                hid: DATABASE.obstrucoes.hidrantes
            });
        } else {
            var monthIndex = MESES.mapping[month];
            ChartManager.update('conformidade', [MESES.labels[monthIndex]], [DATABASE.conformidade.values[monthIndex]]);
            ChartManager.update('obstrucoes', [MESES.labels[monthIndex]], {
                ext: [DATABASE.obstrucoes.extintores[monthIndex]],
                hid: [DATABASE.obstrucoes.hidrantes[monthIndex]]
            });
        }
    },
    
    /**
     * VIEW: INSPEÇÃO DETALHADA
     */
    renderInspecao: function() {
        var container = document.getElementById('dashboard-content');
        
        container.innerHTML = '\
            <div id="content-inspecao" class="fade-enter space-y-6">\
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                    <h3 class="text-slate-800 font-bold text-lg mb-2 flex items-center gap-2">\
                        <i class="ph-fill ph-clipboard-text text-blue-600 text-2xl"></i>\
                        Checklist de Conformidade Detalhado\
                    </h3>\
                    <p class="text-sm text-slate-500 mb-6">Status de execução dos itens de inspeção mensal</p>\
                    \
                    <div id="inspection-bars" class="space-y-4"></div>\
                </div>\
                \
                <!-- Tabela de Referências -->\
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                    <h3 class="text-slate-800 font-bold text-base mb-4 flex items-center gap-2">\
                        <i class="ph-fill ph-list-checks text-emerald-600 text-xl"></i>\
                        Referências de Inspeção\
                    </h3>\
                    <div class="overflow-x-auto">\
                        <table class="data-table">\
                            <thead>\
                                <tr>\
                                    <th>Item</th>\
                                    <th class="text-center">Quantidade Total</th>\
                                    <th class="text-center">Periodicidade</th>\
                                    <th class="text-center">Responsável</th>\
                                </tr>\
                            </thead>\
                            <tbody>\
                                <tr>\
                                    <td class="font-semibold">Extintores de Incêndio</td>\
                                    <td class="text-center tabular-nums">201 unidades</td>\
                                    <td class="text-center">Mensal</td>\
                                    <td class="text-center">Brigada</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Hidrantes e Mangueiras</td>\
                                    <td class="text-center tabular-nums">60 pontos</td>\
                                    <td class="text-center">Mensal</td>\
                                    <td class="text-center">Brigada</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Luminárias de Emergência</td>\
                                    <td class="text-center tabular-nums">28 unidades</td>\
                                    <td class="text-center">Mensal</td>\
                                    <td class="text-center">Manutenção</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Sistema de Aterramento</td>\
                                    <td class="text-center tabular-nums">1 sistema</td>\
                                    <td class="text-center">Mensal</td>\
                                    <td class="text-center">Elétrica</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Bombas de Incêndio</td>\
                                    <td class="text-center tabular-nums">7 unidades</td>\
                                    <td class="text-center">Mensal</td>\
                                    <td class="text-center">Manutenção</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Portas Corta-Fogo</td>\
                                    <td class="text-center tabular-nums">14 unidades</td>\
                                    <td class="text-center">Mensal</td>\
                                    <td class="text-center">Brigada</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Livro de Ocorrências</td>\
                                    <td class="text-center tabular-nums">12 registros/mês</td>\
                                    <td class="text-center">Diário</td>\
                                    <td class="text-center">Brigada</td>\
                                </tr>\
                            </tbody>\
                        </table>\
                    </div>\
                </div>\
            </div>\
        ';
        
        // Inicializar dados
        var data = getMonthData('all');
        Components.renderChecklistBars(data.execucao);
    },
    
    /**
     * Atualiza inspeção com filtro de mês
     */
    updateInspecao: function(month) {
        month = month || 'all';
        var data = getMonthData(month);
        Components.renderChecklistBars(data.execucao);
    },
    
    /**
     * VIEW: EVACUAÇÃO & BRIGADA
     */
    renderEvacuacao: function() {
        var container = document.getElementById('dashboard-content');
        
        container.innerHTML = '\
            <div id="content-evacuacao" class="fade-enter space-y-6">\
                <!-- Gráfico de Evacuação -->\
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                    <div class="flex justify-between items-center mb-6">\
                        <h3 class="text-slate-800 font-bold text-base flex items-center gap-2">\
                            <span class="w-1 h-6 bg-emerald-600 rounded-full"></span>\
                            Histórico de Simulados de Evacuação\
                        </h3>\
                        <div class="flex gap-2">\
                            <span class="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[10px] font-bold text-emerald-700">\
                                META: 3:00 min\
                            </span>\
                            <span class="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-[10px] font-bold text-red-700">\
                                MÁX: 7:00 min\
                            </span>\
                        </div>\
                    </div>\
                    <div class="h-[320px] w-full relative">\
                        <canvas id="evacuationChart"></canvas>\
                    </div>\
                </div>\
                \
                <!-- Cards de Brigada -->\
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">\
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-purple-700">Total de Inscritos</h4>\
                            <i class="ph-fill ph-user-plus text-3xl text-purple-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-purple-900 mb-2">109</div>\
                        <p class="text-xs text-purple-700">Colaboradores interessados</p>\
                    </div>\
                    \
                    <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-emerald-700">Brigadistas Ativos</h4>\
                            <i class="ph-fill ph-shield-check text-3xl text-emerald-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-emerald-900 mb-2">55</div>\
                        <p class="text-xs text-emerald-700">Treinados e certificados</p>\
                    </div>\
                    \
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-blue-700">Taxa de Conversão</h4>\
                            <i class="ph-fill ph-chart-pie text-3xl text-blue-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-blue-900 mb-2">50.5%</div>\
                        <p class="text-xs text-blue-700">Inscritos que concluíram</p>\
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
                                    <th class="text-center">Taxa Conclusão</th>\
                                    <th class="text-center">Validade</th>\
                                </tr>\
                            </thead>\
                            <tbody>\
                                <tr>\
                                    <td class="font-semibold">Março/2025</td>\
                                    <td class="text-center tabular-nums">39</td>\
                                    <td class="text-center tabular-nums font-bold text-emerald-600">27</td>\
                                    <td class="text-center"><span class="badge badge-success">69.2%</span></td>\
                                    <td class="text-center text-slate-600">01/03/2026</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Junho/2025</td>\
                                    <td class="text-center tabular-nums">21</td>\
                                    <td class="text-center tabular-nums font-bold text-orange-600">8</td>\
                                    <td class="text-center"><span class="badge badge-warning">38.1%</span></td>\
                                    <td class="text-center text-slate-600">01/07/2026</td>\
                                </tr>\
                                <tr>\
                                    <td class="font-semibold">Setembro/2025</td>\
                                    <td class="text-center tabular-nums">49</td>\
                                    <td class="text-center tabular-nums font-bold text-blue-600">20</td>\
                                    <td class="text-center"><span class="badge badge-warning">40.8%</span></td>\
                                    <td class="text-center text-slate-600">01/09/2026</td>\
                                </tr>\
                            </tbody>\
                        </table>\
                    </div>\
                </div>\
            </div>\
        ';
        
        // Criar gráfico de evacuação
        ChartManager.createEvacuacao(
            'evacuationChart',
            DATABASE.evacuacao.labels,
            DATABASE.evacuacao.tempos
        );
    }
};

console.log('✅ Views carregadas com sucesso');
