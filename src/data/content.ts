import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Layers, 
  Zap, 
  BarChart3, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Maximize2,
  Minimize2,
  Repeat,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';

export interface Lesson {
  id: string;
  title: string;
  category: string;
  content: string[];
  tips?: string[];
  warnings?: string[];
  visualType?: 'candle' | 'chart' | 'pattern' | 'figure';
  patternId?: string;
}

export const LESSONS: Lesson[] = [
  {
    id: 'intro',
    title: 'Introdução',
    category: 'Comece Aqui',
    content: [
      'Bem-vindo à Black Diamond Academy. Este app foi criado para transformar você em um trader independente.',
      'Chega de copiar sinais ou depender de indicadores externos. Aqui você aprenderá a ler o mercado de forma pura.',
      'Me chamo Pedro, e vou te guiar do básico ao avançado em padrões gráficos e psicologia de candle.'
    ]
  },
  {
    id: 'sr',
    title: 'Suporte e Resistência',
    category: 'Fundamentos',
    content: [
      'Suporte e Resistência são regiões do gráfico onde há uma força incomum atuando sobre o preço.',
      'Resistência: Região onde a força vendedora é maior que a compradora, influenciando o preço a cair.',
      'Suporte: Região onde a força compradora é maior que a vendedora, influenciando o preço a subir.',
      'Quanto mais toques uma região recebe sem ser rompida, mais forte ela se torna.'
    ],
    tips: ['Identifique as regiões usando linhas horizontais nos pontos onde o preço "bateu" e voltou.'],
    visualType: 'chart',
    patternId: 'sr-visual'
  },
  {
    id: 'lta-ltb',
    title: 'Linhas de Tendência (LTA/LTB)',
    category: 'Fundamentos',
    content: [
      'Funcionam como suportes e resistências móveis que acompanham a tendência.',
      'LTA (Linha de Tendência de Alta): Liga os fundos ascendentes.',
      'LTB (Linha de Tendência de Baixa): Liga os topos descendentes.',
      'Em tendência, o gráfico muitas vezes não respeita suportes e resistências horizontais, mas respeita as LTAs/LTBs.'
    ],
    tips: ['Em baixa, trace no topo dos candles. Em alta, trace no fundo.'],
    visualType: 'chart',
    patternId: 'lta-ltb-visual'
  },
  {
    id: 'ponto-x',
    title: 'Ponto X',
    category: 'Fundamentos',
    content: [
      'O Ponto X é o encontro de uma linha de tendência (LTA ou LTB) com um suporte ou resistência horizontal.',
      'Este cruzamento cria uma confluência poderosa, tornando a entrada muito mais assertiva.',
      'É o ponto onde duas forças diferentes de análise técnica concordam sobre uma reversão ou retração.'
    ],
    visualType: 'chart',
    patternId: 'ponto-x-visual'
  },
  {
    id: 'pullback',
    title: 'Pullback',
    category: 'Fundamentos',
    content: [
      'Pullback é o movimento de correção repentino que contraria a tendência principal após um rompimento.',
      'Quando o preço rompe uma resistência, ele tende a voltar para testar essa zona (que agora virou suporte) antes de continuar subindo.',
      'É um dos momentos mais seguros para realizar uma entrada.'
    ],
    visualType: 'chart',
    patternId: 'pullback-visual'
  },
  {
    id: 'macro-micro',
    title: 'Macro e Micro Tendência',
    category: 'Fundamentos',
    content: [
      'Tendência Primária (Macro): O movimento principal do gráfico em tempos maiores (M15, H1).',
      'Tendência Secundária (Micro): Pequenos movimentos contra a macro que ocorrem em tempos menores (M1).',
      'Sempre priorize entradas a favor da Macro Tendência para aumentar sua assertividade.'
    ],
    visualType: 'chart',
    patternId: 'macro-micro-visual'
  },
  {
    id: 'candle-types',
    title: 'Tipos de Vela (Vela a Vela)',
    category: 'Análise Técnica',
    content: [
      'A análise vela a vela foca na psicologia por trás de cada movimento.',
      'Vela de Impulsão: Deixa pavio a favor do movimento, mas o pavio deve ser menor que o corpo.',
      'Vela de Força: Corpo grande, sem pavios ou pavios mínimos, indicando domínio total.',
      'Vela de Descanso: Vela pequena após uma sequência forte, indicando uma pausa momentânea antes da continuação.',
      'Vela de Fraqueza: Corpo pequeno com pavios, geralmente perto de regiões de S/R.',
      'Vela de Exaustão: O "último suspiro", uma vela exageradamente grande após uma sequência, indicando reversão próxima.'
    ],
    visualType: 'chart',
    patternId: 'candle-types-visual'
  },
  {
    id: 'entrega-futura',
    title: 'Entrega Futura',
    category: 'Análise Técnica',
    content: [
      'Nada mais é do que o espaço entre o fechamento do candle atual e uma zona de simetria ou alvo que o preço ainda não atingiu.',
      'Se uma vela deixa um pavio longo em direção a um alvo sem tocá-lo, o mercado "deve" preencher esse espaço futuramente.',
      'Entrega Futura de Alta: Pavio na parte superior sem pavio na inferior.',
      'Entrega Futura de Baixa: Pavio na parte inferior sem pavio na superior.'
    ],
    visualType: 'candle',
    patternId: 'entrega-futura-visual'
  },
  {
    id: 'engolfo',
    title: 'Engolfo (Alta e Baixa)',
    category: 'Padrões de Reversão',
    content: [
      'Ocorre quando o corpo da vela atual cobre inteiramente o corpo da vela anterior.',
      'Engolfo de Alta: Vela vermelha pequena seguida por uma verde grande que a "engole".',
      'Engolfo de Baixa: Vela verde pequena seguida por uma vermelha grande que a "engole".',
      'Indica que a nova força (compradora ou vendedora) assumiu o controle com vigor.'
    ],
    warnings: ['Travou na simetria? É vapo! (Sinal de entrada forte)'],
    visualType: 'pattern',
    patternId: 'engolfo-visual'
  },
  {
    id: 'harami',
    title: 'Harami (Mulher Grávida)',
    category: 'Padrões de Reversão',
    content: [
      'O oposto do engolfo: uma vela grande seguida por uma pequena que fica "dentro" do corpo da anterior.',
      'Harami de Alta: Vela vermelha grande com uma verde pequena dentro.',
      'Harami de Baixa: Vela verde grande com uma vermelha pequena dentro.',
      'Indica hesitação e possível reversão da tendência atual.'
    ],
    tips: ['A nano-correção geralmente busca 50% da vela de força anterior.'],
    visualType: 'pattern',
    patternId: 'harami-visual'
  },
  {
    id: 'martelo',
    title: 'Martelo e Martelo Invertido',
    category: 'Padrões de Reversão',
    content: [
      'Martelo: Corpo pequeno no topo, pavio longo embaixo (pelo menos 2x o tamanho do corpo). Ocorre em fundos.',
      'Martelo Invertido: Corpo pequeno embaixo, pavio longo em cima. Ocorre em fundos e sinaliza reversão para alta.',
      'Enforcado: Martelo que ocorre no topo de uma tendência de alta, sinalizando queda.',
      'Estrela Cadente: Martelo invertido que ocorre no topo, sinalizando queda.'
    ],
    tips: ['A cor do corpo não é o mais importante, mas a localização (Suporte/Resistência) sim.'],
    visualType: 'candle',
    patternId: 'martelo-visual'
  },
  {
    id: 'doji',
    title: 'Doji',
    category: 'Padrões de Reversão',
    content: [
      'O Doji ocorre quando o preço de abertura e fechamento são praticamente iguais.',
      'Representa um momento de indecisão extrema no mercado.',
      'Doji de Cruz: Indecisão pura.',
      'Doji Lápide: Pressão vendedora forte no topo.',
      'Doji Libélula: Pressão compradora forte no fundo.'
    ],
    tips: ['Um Doji após uma tendência forte é um sinal de alerta máximo para reversão.'],
    visualType: 'candle',
    patternId: 'doji-visual'
  },
  {
    id: 'spinning-top',
    title: 'Spinning Top',
    category: 'Padrões de Reversão',
    content: [
      'Vela com corpo pequeno e pavios longos de tamanhos similares em ambos os lados.',
      'Indica que nem compradores nem vendedores conseguiram dominar o período.',
      'Se travar em uma simetria, a probabilidade de reversão é altíssima.'
    ],
    visualType: 'candle',
    patternId: 'spinning-top-visual'
  },
  {
    id: 'pressure-rejection',
    title: 'Pressão x Rejeição',
    category: 'Análise Técnica',
    content: [
      'Pressão: Pavio deixado a favor do movimento. Indica que o preço tentou ir além e foi empurrado, mas a força dominante continua.',
      'Rejeição: Pavio deixado contra o movimento. Indica que o preço encontrou uma barreira e foi repelido.',
      'Na tendência de baixa: Pressão é pavio em cima, Rejeição é pavio embaixo.',
      'Na tendência de alta: Pressão é pavio embaixo, Rejeição é pavio em cima.'
    ],
    visualType: 'candle',
    patternId: 'pressure-rejection-visual'
  },
  {
    id: 'tres-torres',
    title: 'Padrão 3 Torres',
    category: 'Padrões de Reversão',
    content: [
      'Acontece em finais de tendência ou zonas de correção.',
      'Ao perceber topos mais altos onde o candle bate na simetria e volta fazendo rejeição, você liga os pavios.',
      'Após a correção, a movimentação tende a seguir a nova linha de tendência criada.'
    ],
    visualType: 'chart',
    patternId: 'tres-torres-visual'
  },
  {
    id: 'oco',
    title: 'Ombro Cabeça Ombro (OCO)',
    category: 'Figuras Gráficas',
    content: [
      'OCO: Três topos consecutivos, sendo o do meio (cabeça) o mais alto. Sinaliza reversão para baixa.',
      'OCO Invertido (OCO-I): Três fundos, sendo o do meio o mais baixo. Sinaliza reversão para alta.',
      'Linha de Pescoço: A linha que liga os fundos (no OCO) ou topos (no OCO-I). O rompimento desta linha confirma o padrão.'
    ],
    warnings: ['Entre somente após o rompimento da linha de pescoço.'],
    visualType: 'figure',
    patternId: 'oco-visual'
  },
  {
    id: 'topo-fundo-duplo',
    title: 'Topo e Fundo Duplo',
    category: 'Figuras Gráficas',
    content: [
      'Topo Duplo (M): Dois topos na mesma altura. Sinaliza reversão para baixa.',
      'Fundo Duplo (W): Dois fundos na mesma altura. Sinaliza reversão para alta.',
      'A projeção de queda/alta é dada pela distância entre o topo/fundo e a linha de suporte/resistência central.'
    ],
    visualType: 'figure',
    patternId: 'topo-fundo-duplo-visual'
  },
  {
    id: 'lateralizacao',
    title: 'Acumulação e Distribuição',
    category: 'Figuras Gráficas',
    content: [
      'Acumulação: Ocorre em tendências de baixa. O preço lateraliza antes de romper (geralmente para baixo).',
      'Distribuição: Ocorre em tendências de alta. O preço lateraliza antes de romper (geralmente para cima).',
      'Regra do Bate e Volta: Tocou em cima desce, tocou embaixo sobe.'
    ],
    visualType: 'chart',
    patternId: 'lateralizacao-visual'
  },
  {
    id: 'simetria',
    title: 'Simetria e Pontos de Retorno',
    category: 'Análise Técnica',
    content: [
      'Simetria de Pavio: Quando pavios de candles diferentes terminam no mesmo nível exato. Indica uma barreira de preço invisível.',
      'Simetria de Corpo: Quando o fechamento de um candle e a abertura do próximo ocorrem no mesmo nível.',
      'Ponto de Retorno: Onde o preço tende a reverter após tocar uma simetria forte.'
    ],
    visualType: 'chart',
    patternId: 'simetria-visual'
  },
  {
    id: 'momentum',
    title: 'Momentum e Espelhamento',
    category: 'Análise Técnica',
    content: [
      'Momentum: A força do movimento. Sequência de velas da mesma cor com corpos aumentando indica momentum forte.',
      'Espelhamento: O mercado tende a repetir movimentos passados de forma simétrica (Gráfico em Espelho).',
      'Se o mercado fez uma descida forte, ele pode fazer uma subida espelhada com a mesma força.'
    ],
    visualType: 'chart',
    patternId: 'momentum-visual'
  },
  {
    id: 'strategies',
    title: 'Estratégias de Operação',
    category: 'Prática',
    content: [
      'Retração: Operar o pavio na mesma vela. Exige pico de vela e zona de S/R forte.',
      'Reversão: Operar a mudança de cor na próxima vela. Use padrões como Engolfo ou Martelo em níveis fortes.',
      'Rompimento: Operar a favor da quebra de uma barreira. Use velas de breakout (força).',
      'Fluxo (Continuidade): Seguir o movimento atual se houver espaço até o próximo alvo ("Se tem espaço cabe vela").'
    ],
    tips: ['Nunca opere contra a tendência principal.', 'Vela sem movimentação ou lenta é cilada.'],
    visualType: 'chart',
    patternId: 'strategies-visual'
  },
  {
    id: 'best-practices',
    title: 'Melhores Práticas e Horários',
    category: 'Prática',
    content: [
      'Melhores Horários: A maior assertividade costuma ocorrer entre 07:00 e 11:00 da manhã.',
      'Vela Travada: Quando uma vela de força ou continuação fecha exatamente em cima de uma simetria ou referência, NÃO opere. O risco de reversão imediata é alto.',
      'Pico de Vela: Para retração, aguarde sempre o "pico de vela" (movimento explosivo) tocar na sua marcação.',
      'Confirmação: Sempre que possível, aguarde a confirmação do padrão na vela seguinte antes de entrar pesado.'
    ],
    warnings: ['Vela sem movimentação ou com movimentação lenta é cilada. Evite operar em mercados parados.'],
    visualType: 'chart',
    patternId: 'best-practices-visual'
  }
];
