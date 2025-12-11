/**
 * BANCO DE DADOS CENTRAL
 * Dados consolidados por ANO e MÊS
 */

var DATABASE = {
    // Estrutura: ANO -> DADOS
    '2025': {
        // Dados de Conformidade por Mês
        conformidade: {
            labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            values: [95.9, 82.9, 69.7, 80.0, 97.1, 96.3]
        },
        
        // Obstruções Mensais
        obstrucoes: {
            extintores: [10, 7, 6, 1, 12, 5],
            hidrantes: [10, 4, 3, 5, 8, 3]
        },
        
        // Evacuação (dados reais dos simulados)
        evacuacao: {
            labels: ['Fev', 'Abr', 'Mai', 'Jul', 'Set', 'Nov'],
            tempos: [361, 194, 188, 199, 192, 185], // em segundos
            populacao: [22, 30, 11, 10, 15, 18]
        },
        
        // Execução Mensal Detalhada (%)
        execucaoMensal: {
            'Jul': {
                extintores: 100,
                hidrantes: 100,
                luminarias: 75,
                aterramento: 100,
                bombas: 100,
                portasCF: 100,
                livroOcorrencia: 96
            },
            'Ago': {
                extintores: 98,
                hidrantes: 68,
                luminarias: 52,
                aterramento: 100,
                bombas: 100,
                portasCF: 86,
                livroOcorrencia: 76
            },
            'Set': {
                extintores: 73,
                hidrantes: 100,
                luminarias: 39,
                aterramento: 0,
                bombas: 93,
                portasCF: 100,
                livroOcorrencia: 83
            },
            'Out': {
                extintores: 98,
                hidrantes: 65,
                luminarias: 100,
                aterramento: 100,
                bombas: 100,
                portasCF: 0,
                livroOcorrencia: 97
            },
            'Nov': {
                extintores: 98,
                hidrantes: 100,
                luminarias: 96,
                aterramento: 100,
                bombas: 96,
                portasCF: 100,
                livroOcorrencia: 90
            },
            'Dez': {
                extintores: 100,
                hidrantes: 98,
                luminarias: 95,
                aterramento: 100,
                bombas: 100,
                portasCF: 100,
                livroOcorrencia: 94
            }
        },
        
        // Brigada Voluntária
        brigada: {
            totalInscritos: 109,
            totalTreinados: 55,
            turmas: [
                { mes: 'Março', inscritos: 39, treinados: 27, validade: '01/03/26' },
                { mes: 'Junho', inscritos: 21, treinados: 8, validade: '01/07/26' },
                { mes: 'Setembro', inscritos: 49, treinados: 20, validade: '01/09/26' }
            ]
        },
        
        // Insights Dinâmicos por Mês
        insights: {
            'jul': [
                'Início do monitoramento sistemático.',
                'Performance excelente: 100% em Extintores e Hidrantes.',
                '20 obstruções detectadas (10 ext. + 10 hid.).'
            ],
            'ago': [
                'Queda significativa em Luminárias (52%).',
                'Obstruções reduziram 45% (20 → 11).',
                'Portas CF necessitam atenção (86%).'
            ],
            'set': [
                'CRÍTICO: Aterramento em 0% - Falha grave.',
                'Melhor tempo de evacuação: 03:12.',
                'Hidrantes em 100% de conformidade.'
            ],
            'out': [
                'CRÍTICO: Portas Corta-Fogo em 0%.',
                'Recorde histórico: apenas 6 obstruções.',
                'Luminárias recuperadas (100%).'
            ],
            'nov': [
                'Recuperação total: 97.1% de conformidade média.',
                'Aumento súbito em obstruções (+14 itens).',
                'Todos os sistemas operacionais exceto Livro de Ocorrências (90%).'
            ],
            'dez': [
                'Encerramento do ano com 96.3% de conformidade.',
                'Apenas 8 obstruções no mês.',
                'Todos os sistemas acima de 94%.'
            ],
            'all': [
                'Variação significativa: 69.7% (Set) a 97.1% (Nov).',
                'Total de 66 obstruções no período Jul-Dez.',
                'Tendência positiva de recuperação.',
                'Brigada: 55 treinados de 109 inscritos (50.5%).'
            ]
        }
    },
    
    // DADOS 2026 (ESTRUTURA COMPLETA - PREENCHER CONFORME OS MESES ACONTECEM)
    '2026': {
        conformidade: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Preencher conforme avançar o ano
        },
        
        obstrucoes: {
            extintores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            hidrantes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        
        evacuacao: {
            labels: [],
            tempos: [],
            populacao: []
        },
        
        execucaoMensal: {
            'Jan': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Fev': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Mar': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Abr': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Mai': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Jun': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Jul': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Ago': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Set': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Out': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Nov': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 },
            'Dez': { extintores: 0, hidrantes: 0, luminarias: 0, aterramento: 0, bombas: 0, portasCF: 0, livroOcorrencia: 0 }
        },
        
        brigada: {
            totalInscritos: 0,
            totalTreinados: 0,
            turmas: []
        },
        
        insights: {
            'jan': ['Dados serão preenchidos conforme o mês avançar.'],
            'fev': ['Dados serão preenchidos conforme o mês avançar.'],
            'mar': ['Dados serão preenchidos conforme o mês avançar.'],
            'abr': ['Dados serão preenchidos conforme o mês avançar.'],
            'mai': ['Dados serão preenchidos conforme o mês avançar.'],
            'jun': ['Dados serão preenchidos conforme o mês avançar.'],
            'jul': ['Dados serão preenchidos conforme o mês avançar.'],
            'ago': ['Dados serão preenchidos conforme o mês avançar.'],
            'set': ['Dados serão preenchidos conforme o mês avançar.'],
            'out': ['Dados serão preenchidos conforme o mês avançar.'],
            'nov': ['Dados serão preenchidos conforme o mês avançar.'],
            'dez': ['Dados serão preenchidos conforme o mês avançar.'],
            'all': ['Ano de 2026 - Dados em construção.']
        }
    }
};

/**
 * Constantes e Configurações
 */
var APP_CONFIG = {
    name: 'Dashboard Brigada H.S.M.',
    version: '2.1.0',
    environment: 'production',
    availableYears: ['2025', '2026']
};

var MESES = {
    '2025': {
        labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        fullNames: ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        mapping: {
            'jul': 0,
            'ago': 1,
            'set': 2,
            'out': 3,
            'nov': 4,
            'dez': 5
        }
    },
    '2026': {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        fullNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        mapping: {
            'jan': 0, 'fev': 1, 'mar': 2, 'abr': 3, 'mai': 4, 'jun': 5,
            'jul': 6, 'ago': 7, 'set': 8, 'out': 9, 'nov': 10, 'dez': 11
        }
    }
};

var REFERENCIAS = {
    extintores: 201,
    hidrantes: 60,
    luminarias: 28,
    aterramento: 1,
    bombas: 7,
    portasCF: 14,
    livroOcorrencia: 12
};

var METAS = {
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

var COLORS = {
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

/**
 * Função para obter dados filtrados por ano e mês
 */
function getMonthData(year, month) {
    year = year || '2025';
    month = month || 'all';
    
    var yearData = DATABASE[year];
    if (!yearData) return null;
    
    var monthIndex = MESES[year].mapping[month];
    
    if (month === 'all' || monthIndex === undefined) {
        var lastIndex = yearData.conformidade.values.length - 1;
        var lastLabel = yearData.conformidade.labels[lastIndex];
        
        return {
            conformidade: yearData.conformidade.values[lastIndex],
            totalObstrucoes: yearData.obstrucoes.extintores[lastIndex] + yearData.obstrucoes.hidrantes[lastIndex],
            insights: yearData.insights.all,
            execucao: yearData.execucaoMensal[lastLabel]
        };
    }
    
    var mesLabel = yearData.conformidade.labels[monthIndex];
    return {
        conformidade: yearData.conformidade.values[monthIndex],
        totalObstrucoes: yearData.obstrucoes.extintores[monthIndex] + yearData.obstrucoes.hidrantes[monthIndex],
        insights: yearData.insights[month],
        execucao: yearData.execucaoMensal[mesLabel]
    };
}

console.log('✅ Database carregado com sucesso');
