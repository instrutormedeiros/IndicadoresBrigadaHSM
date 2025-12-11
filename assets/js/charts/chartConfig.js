/**
 * CONFIGURAÇÃO CENTRALIZADA DE GRÁFICOS
 * Chart.js configuration e factory functions
 */

import { COLORS, CHART_DEFAULTS } from '../config/constants.js';

// Aplicar configurações globais do Chart.js
Chart.defaults.font.family = CHART_DEFAULTS.font.family;
Chart.defaults.color = '#64748b';

/**
 * Configuração padrão para gráficos de linha
 */
export const lineChartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    animation: CHART_DEFAULTS.animation,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            padding: 12,
            titleFont: { size: 13, weight: '600' },
            bodyFont: { size: 12 },
            borderColor: '#cbd5e1',
            borderWidth: 1
        }
    },
    scales: {
        y: {
            grid: {
                color: '#f1f5f9',
                borderDash: [3, 3]
            },
            ticks: {
                font: { size: 11 }
            }
        },
        x: {
            grid: { display: false },
            ticks: {
                font: { size: 11, weight: '600' }
            }
        }
    }
};

/**
 * Cria gráfico de conformidade (linha)
 * @param {HTMLCanvasElement} canvas 
 * @param {Array} labels 
 * @param {Array} data 
 * @returns {Chart}
 */
export function createComplianceChart(canvas, labels, data) {
    const ctx = canvas.getContext('2d');
    
    // Gradiente de fundo
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.15)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Conformidade (%)',
                data: data,
                borderColor: COLORS.chart.conformidade,
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0, // Linha reta (técnica)
                pointStyle: 'rect',
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#fff',
                pointBorderColor: COLORS.chart.conformidade,
                pointBorderWidth: 2
            }]
        },
        options: {
            ...lineChartDefaults,
            scales: {
                ...lineChartDefaults.scales,
                y: {
                    ...lineChartDefaults.scales.y,
                    min: 60,
                    max: 105
                }
            }
        }
    });
}

/**
 * Cria gráfico de obstruções (barras)
 * @param {HTMLCanvasElement} canvas 
 * @param {Array} labels 
 * @param {Array} extData 
 * @param {Array} hidData 
 * @returns {Chart}
 */
export function createObstructionsChart(canvas, labels, extData, hidData) {
    return new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Extintores',
                    data: extData,
                    backgroundColor: COLORS.chart.extintores,
                    borderRadius: 0
                },
                {
                    label: 'Hidrantes',
                    data: hidData,
                    backgroundColor: COLORS.chart.hidrantes,
                    borderRadius: 0
                }
            ]
        },
        options: {
            ...lineChartDefaults,
            animation: {
                ...CHART_DEFAULTS.animation,
                delay: (context) => context.dataIndex * 100
            },
            plugins: {
                ...lineChartDefaults.plugins,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'rect',
                        padding: 15,
                        font: { size: 11, weight: '600' }
                    }
                }
            },
            scales: {
                ...lineChartDefaults.scales,
                y: {
                    ...lineChartDefaults.scales.y,
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * Cria gráfico de evacuação (linha com anotação)
 * @param {HTMLCanvasElement} canvas 
 * @param {Array} labels 
 * @param {Array} data 
 * @returns {Chart}
 */
export function createEvacuationChart(canvas, labels, data) {
    return new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tempo (minutos)',
                data: data.map(d => (d / 60).toFixed(2)), // Converter segundos para minutos
                borderColor: '#60a5fa',
                borderWidth: 2,
                tension: 0,
                pointStyle: 'triangle',
                pointRadius: 6,
                pointBackgroundColor: '#0f172a',
                pointBorderColor: '#60a5fa',
                pointBorderWidth: 2,
                pointRotation: 180
            }]
        },
        options: {
            ...lineChartDefaults,
            plugins: {
                ...lineChartDefaults.plugins,
                annotation: {
                    annotations: {
                        metaLine: {
                            type: 'line',
                            yMin: 3.0,
                            yMax: 3.0,
                            borderColor: COLORS.success,
                            borderWidth: 2,
                            borderDash: [6, 4],
                            label: {
                                display: true,
                                content: 'META (3:00)',
                                position: 'end',
                                backgroundColor: COLORS.success,
                                color: 'white',
                                font: {
                                    size: 10,
                                    weight: 'bold'
                                },
                                padding: 4
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });
}
