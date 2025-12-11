/**
 * BANCO DE DADOS CENTRAL
 * Dados consolidados extraídos das planilhas Excel
 */

export const DATABASE = {
    // Dados de Conformidade por Mês (calculados com precisão)
    conformidade: {
        labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov'],
        values: [95.9, 82.9, 69.7, 80.0, 97.1]
    },
    
    // Obstruções Mensais
    obstrucoes: {
        extintores: [10, 7, 6, 1, 12],
        hidrantes: [10, 4, 3, 5, 8]
    },
    
    // Evacuação (dados reais dos simulados)
    evacuacao: {
        labels: ['Fev', 'Abr', 'Mai', 'Jul', 'Set'],
        tempos: [361, 194, 188, 199, 192], // em segundos
        populacao: [22, 30, 11, 10, 15]
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
        'all': [
            'Variação significativa: 69.7% (Set) a 97.1% (Nov).',
            'Total de 66 obstruções no período analisado.',
            'Tendência positiva de recuperação no último mês.',
            'Brigada: 55 treinados de 109 inscritos (50.5%).'
        ]
    }
};

/**
 * Função para obter dados filtrados por mês
 * @param {string} month - Mês ('jul', 'ago', 'set', 'out', 'nov', 'all')
 * @returns {Object} Dados filtrados
 */
export function getMonthData(month = 'all') {
    const monthIndex = {
        'jul': 0, 'ago': 1, 'set': 2, 'out': 3, 'nov': 4
    }[month];
    
    if (month === 'all' || monthIndex === undefined) {
        return {
            conformidade: DATABASE.conformidade.values[4], // Último mês
            totalObstrucoes: DATABASE.obstrucoes.extintores[4] + DATABASE.obstrucoes.hidrantes[4],
            insights: DATABASE.insights.all,
            execucao: DATABASE.execucaoMensal.Nov
        };
    }
    
    const mesLabel = DATABASE.conformidade.labels[monthIndex];
    return {
        conformidade: DATABASE.conformidade.values[monthIndex],
        totalObstrucoes: DATABASE.obstrucoes.extintores[monthIndex] + DATABASE.obstrucoes.hidrantes[monthIndex],
        insights: DATABASE.insights[month],
        execucao: DATABASE.execucaoMensal[mesLabel]
    };
}
