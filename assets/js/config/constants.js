/**
 * CONSTANTES DO SISTEMA
 * Configurações globais e valores fixos do dashboard
 */

export const APP_CONFIG = {
    name: 'Dashboard Brigada H.S.M.',
    version: '2.0.0',
    environment: 'production',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
};

export const MESES = {
    labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov'],
    fullNames: ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'],
    mapping: {
        'jul': 0,
        'ago': 1,
        'set': 2,
        'out': 3,
        'nov': 4
    }
};

export const REFERENCIAS = {
    extintores: 201,
    hidrantes: 60,
    luminarias: 28,
    aterramento: 1,
    bombas: 7,
    portasCF: 14,
    livroOcorrencia: 12
};

export const METAS = {
    conformidade: {
        excelente: 95,
        bom: 85,
        regular: 75,
        critico: 75
    },
    tempoEvacuacao: {
        meta: 180, // 3 minutos em segundos
        maximo: 420 // 7 minutos (legislação)
    }
};

export const COLORS = {
    primary: '#2563eb',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
    secondary: '#64748b',
    
    chart: {
        conformidade: '#2563eb',
        extintores: '#ef4444',
        hidrantes: '#3b82f6',
        luminarias: '#f59e0b',
        evacuacao: '#10b981'
    }
};

export const CHART_DEFAULTS = {
    font: {
        family: "'Inter', sans-serif",
        size: 12
    },
    animation: {
        duration: 1200,
        easing: 'easeOutQuart'
    }
};
