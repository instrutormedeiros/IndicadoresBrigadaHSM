/**
 * VIEWS
 * Todas as views (páginas) do dashboard - COM SUPORTE A MULTI-ANO
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
                            <span id="chart-period-label" class="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-full font-semibold">\
                                2025\
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
                        <div id="variacao-valor" class="text-4xl font-bold text-blue-900 mb-2">+27.4%</div>\
                        <p id="variacao-texto" class="text-sm text-blue-700">Set (69.7%) → Nov (97.1%)</p>\
                        <div class="mt-4 pt-4 border-t border-blue-200">\
                            <div class="text-xs text-blue-600 font-semibold">Melhor Mês: <span id="melhor-mes" class="text-blue-900">Novembro</span></div>\
                        </div>\
                    </div>\
                    \
                    <!-- Status Geral -->\
                    <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-emerald-700 uppercase tracking-wide">Status Atual</h4>\
                            <i class="ph-fill ph-check-circle text-3xl text-emerald-600"></i>\
                        </div>\
                        <div id="status-atual-valor" class="text-4xl font-bold text-emerald-900 mb-2">97.1%</div>\
                        <p id="status-atual-texto" class="text-sm text-emerald-700">Conformidade Nov/2025</p>\
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
        var currentYear = AppState.currentYear;
        var yearData = DATABASE[currentYear];
        var data = getMonthData(currentYear, 'all');
        
        Components.renderKPICards({
            conformidade: data.conformidade,
            totalObstrucoes: data.totalObstrucoes,
            tempoEvacuacao: '03:12'
        });
        
        Components.renderInsights(currentYear, 'all');
        
        ChartManager.createConformidade(
            'complianceChart',
            yearData.conformidade.labels,
            yearData.conformidade.values
        );
        
        // Atualizar label do período
        document.getElementById('chart-period-label').textContent = currentYear;
        
        // Calcular e exibir variação
        this.updateVariacaoCard(currentYear);
    },
    
    updateOverview: function(year, month) {
        year = year || AppState.currentYear;
        month = month || 'all';
        
        var yearData = DATABASE[year];
        var data = getMonthData(year, month);
        
        Components.updateKPIValues(data);
        Components.renderInsights(year, month);
        
        if (month === 'all') {
            ChartManager.update('conformidade', yearData.conformidade.labels, yearData.conformidade.values);
        } else {
            var monthIndex = MESES[year].mapping[month];
            if (monthIndex !== undefined) {
                ChartManager.update('conformidade', [yearData.conformidade.labels[monthIndex]], [yearData.conformidade.values[monthIndex]]);
            }
        }
        
        // Atualizar cards de métricas
        this.updateVariacaoCard(year);
    },
    
    updateVariacaoCard: function(year) {
        var yearData = DATABASE[year];
        var values = yearData.conformidade.values.filter(function(v) { return v > 0; }); // Filtrar zeros
        
        if (values.length === 0) return;
        
        var minValue = Math.min.apply(null, values);
        var maxValue = Math.max.apply(null, values);
        var variacao = ((maxValue - minValue) / minValue * 100).toFixed(1);
        
        var minIndex = yearData.conformidade.values.indexOf(minValue);
        var maxIndex = yearData.conformidade.values.indexOf(maxValue);
        
        var minMes = yearData.conformidade.labels[minIndex];
        var maxMes = yearData.conformidade.labels[maxIndex];
        
        // Atualizar variação
        document.getElementById('variacao-valor').textContent = '+' + variacao + '%';
        document.getElementById('variacao-texto').textContent = minMes + ' (' + minValue + '%) → ' + maxMes + ' (' + maxValue + '%)';
        
        // Atualizar melhor mês
        document.getElementById('melhor-mes').textContent = MESES[year].fullNames[maxIndex];
        
        // Atualizar status atual (último mês com dados)
        var lastIndex = values.length - 1;
        var lastRealIndex = yearData.conformidade.values.lastIndexOf(values[lastIndex]);
        document.getElementById('status-atual-valor').textContent = values[lastIndex].toFixed(1) + '%';
        document.getElementById('status-atual-texto').textContent = 'Conformidade ' + yearData.conformidade.labels[lastRealIndex] + '/' + year;
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
        
        var currentYear = AppState.currentYear;
        var yearData = DATABASE[currentYear];
        
        ChartManager.createConformidade(
            'complianceChartDetail',
            yearData.conformidade.labels,
            yearData.conformidade.values
        );
        
        ChartManager.createObstrucoes(
            'obstructionsChart',
            yearData.conformidade.labels,
            yearData.obstrucoes.extintores,
            yearData.obstrucoes.hidrantes
        );
    },
    
    updateConformidade: function(year) {
        year = year || AppState.currentYear;
        var yearData = DATABASE[year];
        
        ChartManager.update('complianceChartDetail', yearData.conformidade.labels, yearData.conformidade.values);
        ChartManager.update('obstrucoes', yearData.conformidade.labels, {
            ext: yearData.obstrucoes.extintores,
            hid: yearData.obstrucoes.hidrantes
        });
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
                        <span id="inspecao-periodo-label" class="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full font-semibold">\
                            Última Inspeção: Nov/2025\
                        </span>\
                    </div>\
                    \
                    <div id="inspection-bars" class="space-y-4 max-w-4xl"></div>\
                </div>\
            </div>\
        ';
        
        var data = getMonthData(AppState.currentYear, 'all');
        Components.renderChecklistBars(data.execucao);
        
        // Atualizar label
        var yearData = DATABASE[AppState.currentYear];
        var lastIndex = yearData.conformidade.values.filter(function(v) { return v > 0; }).length - 1;
        var lastLabel = yearData.conformidade.labels[lastIndex];
        document.getElementById('inspecao-periodo-label').textContent = 'Última Inspeção: ' + lastLabel + '/' + AppState.currentYear;
    },
    
    updateInspecao: function(year, month) {
        year = year || AppState.currentYear;
        month = month || 'all';
        
        var data = getMonthData(year, month);
        Components.renderChecklistBars(data.execucao);
        
        // Atualizar label
        if (month === 'all') {
            var yearData = DATABASE[year];
            var lastIndex = yearData.conformidade.values.filter(function(v) { return v > 0; }).length - 1;
            var lastLabel = yearData.conformidade.labels[lastIndex];
            document.getElementById('inspecao-periodo-label').textContent = 'Última Inspeção: ' + lastLabel + '/' + year;
        } else {
            var mesLabel = DATABASE[year].conformidade.labels[MESES[year].mapping[month]];
            document.getElementById('inspecao-periodo-label').textContent = 'Inspeção: ' + mesLabel + '/' + year;
        }
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
                                Histórico de Simulados <span id="evacuacao-ano-label" class="text-xs text-slate-500 font-normal">(2025)</span>\
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
                            <div id="melhor-tempo-valor" class="text-3xl font-bold text-emerald-900">03:08</div>\
                            <p id="melhor-tempo-texto" class="text-xs text-emerald-700 mt-1">Simulado de Maio/2025</p>\
                        </div>\
                        \
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">\
                            <div class="flex items-center justify-between mb-3">\
                                <h4 class="text-xs font-bold text-blue-700 uppercase">Último Simulado</h4>\
                                <i class="ph-fill ph-timer text-2xl text-blue-600"></i>\
                            </div>\
                            <div id="ultimo-tempo-valor" class="text-3xl font-bold text-blue-900">03:12</div>\
                            <p id="ultimo-tempo-texto" class="text-xs text-blue-700 mt-1">Setembro/2025 • 15 pessoas</p>\
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
        
        var currentYear = AppState.currentYear;
        var yearData = DATABASE[currentYear];
        
        if (yearData.evacuacao.labels.length > 0) {
            ChartManager.createEvacuacao(
                'evacuationChart',
                yearData.evacuacao.labels,
                yearData.evacuacao.tempos
            );
            
            // Atualizar cards
            this.updateEvacuacaoCards(currentYear);
        }
        
        document.getElementById('evacuacao-ano-label').textContent = '(' + currentYear + ')';
    },
    
    updateEvacuacaoCards: function(year) {
        var yearData = DATABASE[year];
        var tempos = yearData.evacuacao.tempos;
        
        if (tempos.length === 0) return;
        
        // Melhor tempo
        var melhorTempo = Math.min.apply(null, tempos);
        var melhorIndex = tempos.indexOf(melhorTempo);
        var melhorMes = yearData.evacuacao.labels[melhorIndex];
        
        document.getElementById('melhor-tempo-valor').textContent = formatTime(melhorTempo);
        document.getElementById('melhor-tempo-texto').textContent = 'Simulado de ' + melhorMes + '/' + year;
        
        // Último simulado
        var ultimoTempo = tempos[tempos.length - 1];
        var ultimoMes = yearData.evacuacao.labels[tempos.length - 1];
        var ultimaPop = yearData.evacuacao.populacao[tempos.length - 1];
        
        document.getElementById('ultimo-tempo-valor').textContent = formatTime(ultimoTempo);
        document.getElementById('ultimo-tempo-texto').textContent = ultimoMes + '/' + year + ' • ' + ultimaPop + ' pessoas';
    },
    
    /**
     * VIEW: BRIGADA
     */
    renderBrigada: function() {
        var container = document.getElementById('dashboard-content');
        
        var currentYear = AppState.currentYear;
        var brigadaData = DATABASE[currentYear].brigada;
        
        var taxaConversao = brigadaData.totalInscritos > 0 
            ? ((brigadaData.totalTreinados / brigadaData.totalInscritos) * 100).toFixed(1)
            : '0.0';
        
        var turmasHTML = brigadaData.turmas.map(function(turma) {
            var taxa = turma.inscritos > 0 ? ((turma.treinados / turma.inscritos) * 100).toFixed(1) : '0.0';
            var badgeClass = taxa >= 60 ? 'badge-success' : 'badge-warning';
            
            return '<tr>\
                        <td class="font-semibold">' + turma.mes + '/' + currentYear + '</td>\
                        <td class="text-center tabular-nums">' + turma.inscritos + '</td>\
                        <td class="text-center tabular-nums font-bold ' + (taxa >= 60 ? 'text-emerald-600' : 'text-orange-600') + '">' + turma.treinados + '</td>\
                        <td class="text-center"><span class="badge ' + badgeClass + '">' + taxa + '%</span></td>\
                        <td class="text-center text-slate-600 font-mono text-xs">' + turma.validade + '</td>\
                    </tr>';
        }).join('');
        
        container.innerHTML = '\
            <div id="content-brigada" class="fade-enter space-y-6">\
                <!-- KPIs Brigada -->\
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">\
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-purple-700 uppercase">Total Inscritos</h4>\
                            <i class="ph-fill ph-user-plus text-3xl text-purple-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-purple-900 mb-2">' + brigadaData.totalInscritos + '</div>\
                        <p class="text-xs text-purple-700">Colaboradores registrados</p>\
                    </div>\
                    \
                    <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-emerald-700 uppercase">Brigadistas Ativos</h4>\
                            <i class="ph-fill ph-shield-check text-3xl text-emerald-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-emerald-900 mb-2">' + brigadaData.totalTreinados + '</div>\
                        <p class="text-xs text-emerald-700">Certificados e operacionais</p>\
                    </div>\
                    \
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">\
                        <div class="flex items-center justify-between mb-4">\
                            <h4 class="text-sm font-bold text-blue-700 uppercase">Taxa de Conversão</h4>\
                            <i class="ph-fill ph-chart-pie text-3xl text-blue-600"></i>\
                        </div>\
                        <div class="text-4xl font-bold text-blue-900 mb-2">' + taxaConversao + '%</div>\
                        <p class="text-xs text-blue-700">Conclusão dos treinamentos</p>\
                    </div>\
                </div>\
                \
                <!-- Tabela de Turmas -->\
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
                    <h3 class="text-slate-800 font-bold text-base mb-4 flex items-center gap-2">\
                        <i class="ph-fill ph-graduation-cap text-purple-600 text-xl"></i>\
                        Turmas de Capacitação ' + currentYear + '\
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
                                ' + (turmasHTML || '<tr><td colspan="5" class="text-center text-slate-400 py-8">Nenhuma turma cadastrada para ' + currentYear + '</td></tr>') + '\
                            </tbody>\
                        </table>\
                    </div>\
                </div>\
            </div>\
        ';
    }
};

console.log('✅ Views carregadas com sucesso');
