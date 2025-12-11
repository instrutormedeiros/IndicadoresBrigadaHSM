/**
 * CHART MANAGER
 * Gerenciador centralizado de gráficos Chart.js
 */

var ChartManager = {
    instances: {},
    
    /**
     * Inicializa configurações globais do Chart.js
     */
    init: function() {
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = '#64748b';
        Chart.defaults.plugins.legend.display = false;
        console.log('📊 ChartManager inicializado');
    },
    
    /**
     * Cria gráfico de conformidade (linha)
     */
    createConformidade: function(canvasId, labels, data) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        
        var ctx = canvas.getContext('2d');
        
        // Gradiente de fundo
        var gradient = ctx.createLinearGradient(0, 0, 0, 350);
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        
        // Destruir gráfico anterior se existir
        if (this.instances.conformidade) {
            this.instances.conformidade.destroy();
        }
        
        this.instances.conformidade = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Conformidade (%)',
                    data: data,
                    borderColor: COLORS.chart.conformidade,
                    backgroundColor: gradient,
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: COLORS.chart.conformidade,
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        padding: 12,
                        titleFont: { size: 14, weight: '600' },
                        bodyFont: { size: 13 },
                        borderColor: '#cbd5e1',
                        borderWidth: 1,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return 'Conformidade: ' + context.parsed.y.toFixed(1) + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 60,
                        max: 105,
                        grid: {
                            color: '#f1f5f9',
                            borderDash: [3, 3]
                        },
                        ticks: {
                            font: { size: 11 },
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 11, weight: '600' }
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
        
        return this.instances.conformidade;
    },
    
    /**
     * Cria gráfico de obstruções (barras)
     */
    createObstrucoes: function(canvasId, labels, extData, hidData) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        
        // Destruir gráfico anterior se existir
        if (this.instances.obstrucoes) {
            this.instances.obstrucoes.destroy();
        }
        
        this.instances.obstrucoes = new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Extintores',
                        data: extData,
                        backgroundColor: COLORS.chart.extintores,
                        borderRadius: 6,
                        borderSkipped: false
                    },
                    {
                        label: 'Hidrantes',
                        data: hidData,
                        backgroundColor: COLORS.chart.hidrantes,
                        borderRadius: 6,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    delay: function(context) {
                        return context.dataIndex * 100;
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'rect',
                            padding: 15,
                            font: { size: 11, weight: '600' }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        padding: 12,
                        titleFont: { size: 14, weight: '600' },
                        bodyFont: { size: 13 },
                        borderColor: '#cbd5e1',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' itens';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9',
                            borderDash: [3, 3]
                        },
                        ticks: {
                            font: { size: 11 },
                            stepSize: 2
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 11, weight: '600' }
                        }
                    }
                }
            }
        });
        
        return this.instances.obstrucoes;
    },
    
    /**
     * Cria gráfico de evacuação (linha com anotação)
     */
    createEvacuacao: function(canvasId, labels, data) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        
        // Converter segundos para minutos
        var dataInMinutes = data.map(function(d) {
            return parseFloat((d / 60).toFixed(2));
        });
        
        // Destruir gráfico anterior se existir
        if (this.instances.evacuacao) {
            this.instances.evacuacao.destroy();
        }
        
        this.instances.evacuacao = new Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tempo (minutos)',
                    data: dataInMinutes,
                    borderColor: '#60a5fa',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointStyle: 'circle',
                    pointRadius: 7,
                    pointHoverRadius: 9,
                    pointBackgroundColor: '#1e40af',
                    pointBorderColor: '#60a5fa',
                    pointBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        padding: 12,
                        titleFont: { size: 14, weight: '600' },
                        bodyFont: { size: 13 },
                        borderColor: '#cbd5e1',
                        borderWidth: 1,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                var minutes = Math.floor(context.parsed.y);
                                var seconds = Math.round((context.parsed.y - minutes) * 60);
                                return 'Tempo: ' + minutes + ':' + String(seconds).padStart(2, '0');
                            }
                        }
                    },
                    annotation: {
                        annotations: {
                            metaLine: {
                                type: 'line',
                                yMin: 3.0,
                                yMax: 3.0,
                                borderColor: COLORS.success,
                                borderWidth: 3,
                                borderDash: [8, 4],
                                label: {
                                    display: true,
                                    content: 'META (3:00)',
                                    position: 'end',
                                    backgroundColor: COLORS.success,
                                    color: 'white',
                                    font: {
                                        size: 11,
                                        weight: 'bold'
                                    },
                                    padding: 6,
                                    borderRadius: 4
                                }
                            },
                            maxLine: {
                                type: 'line',
                                yMin: 7.0,
                                yMax: 7.0,
                                borderColor: COLORS.danger,
                                borderWidth: 2,
                                borderDash: [8, 4],
                                label: {
                                    display: true,
                                    content: 'MÁX (7:00)',
                                    position: 'start',
                                    backgroundColor: COLORS.danger,
                                    color: 'white',
                                    font: {
                                        size: 10,
                                        weight: 'bold'
                                    },
                                    padding: 4,
                                    borderRadius: 4
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 8,
                        grid: {
                            color: '#f1f5f9',
                            borderDash: [3, 3]
                        },
                        ticks: {
                            font: { size: 11 },
                            callback: function(value) {
                                return value.toFixed(1) + ' min';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 11, weight: '600' }
                        }
                    }
                }
            }
        });
        
        return this.instances.evacuacao;
    },
    
    /**
     * Atualiza dados de um gráfico existente
     */
    update: function(chartName, labels, data) {
        var chart = this.instances[chartName];
        if (!chart) return;
        
        chart.data.labels = labels;
        
        if (chartName === 'obstrucoes') {
            chart.data.datasets[0].data = data.ext;
            chart.data.datasets[1].data = data.hid;
        } else {
            chart.data.datasets[0].data = data;
        }
        
        chart.update('active');
    },
    
    /**
     * Destrói um gráfico específico
     */
    destroy: function(chartName) {
        if (this.instances[chartName]) {
            this.instances[chartName].destroy();
            delete this.instances[chartName];
        }
    }
};

console.log('✅ ChartManager carregado com sucesso');
