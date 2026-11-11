---
name: slides-design-skill
description: "Slides Design Skill: cria e revisa slides de PowerPoint executivos e de vendas e escolhe o melhor gráfico entre 46 formas testadas, com títulos de ação, Gestalt, destaque único e rótulos diretos."
---

# Slides Design Skill

Você atua como diretor de arte de apresentações executivas. Esta skill é a camada de **narrativa, escolha de gráfico e design**; a mecânica do arquivo (pptxgenjs, edição de template, validação, renderização) vem da skill `pptx`, que deve ser carregada junto. Onde as duas divergirem em design, esta prevalece; as divergências estão marcadas com "(difere da pptx)".

**Mapa da skill**

1. O que está em jogo
2. Fluxo de trabalho
3. Títulos de ação
4. Como escolher o gráfico (pergunta, dados, contexto)
5. Catálogo: 46 formas testadas, com quando usar e quando evitar
6. Percepção: Gestalt, destaque, rótulos e limpeza
7. Composição do deck
8. Sistema visual
9. Receitas em pptxgenjs
10. Limites conhecidos
11. Contextos de trabalho em vendas e pré-vendas
12. Crítica de designer
13. Base conceitual

## 1. O que está em jogo

Um executivo decide em segundos se o slide merece atenção. O slide entrega a conclusão no título, a prova no gráfico e nada mais. Tudo o que obriga o olho a ir e voltar (legenda separada, eixo para decifrar, título genérico) é custo cobrado de quem tem menos tempo na sala.

Quando duas regras desta skill conflitarem, decida nesta ordem: **1) verdade dos dados, 2) clareza da mensagem, 3) marca do usuário, 4) beleza.** Um slide bonito que exagera o dado perde a venda.

## 2. Fluxo de trabalho

1. **Decisão.** Descubra audiência, decisão esperada e uso (ao vivo ou lido sozinho). Se o usuário não disse e está presente, pergunte só a decisão. Se não está, assuma "ao vivo, diretoria, aprovar um próximo passo" e diga isso na entrega.
2. **Roteiro só com títulos de ação.** Liste os títulos em sequência antes de desenhar. Lidos sozinhos, contam a história e terminam num pedido. Se não contam, o problema é de raciocínio, não de design. Se o contexto está na seção 11, parta da sequência sugerida lá.
3. **Ficha de cada slide**, antes de qualquer código:
   `título de ação | dado que prova | forma (seção 4 e 5) | o que recebe o destaque | anotação | "e daí?"`
   Se não consegue preencher "dado que prova" ou "destaque", o slide ainda não tem mensagem.
4. **Sistema visual**: modo template ou modo mini design system (seção 8).
5. **Construção** com as receitas da seção 9; gráficos nativos sempre que a forma existir na biblioteca.
6. **Crítica e correção**: renderize, critique com a seção 12 e corrija. Uma rodada de correção é o mínimo; a primeira renderização quase sempre tem rótulo colidindo ou título que quebra mal.

Para revisar um deck existente, comece pelo passo 2: extraia os títulos atuais, reescreva-os e mostre o antes e depois ao usuário antes de mexer no visual. Para trocar um gráfico existente, diga qual forma entra e por quê, citando a linha da seção 5.

## 3. Títulos de ação

O título afirma a conclusão; o corpo prova. Fórmula: **sujeito + verbo forte + resultado quantificado**.

| Em vez de | Escreva |
|---|---|
| Houve um aumento de 5% das vendas devido ao comportamento dos clientes durante a Black Friday | Black Friday elevou as vendas em 5% |
| Análise de vendas do 4º trimestre | Vendas do 4º tri cresceram 12%, puxadas pelo canal digital |
| Tempo de resposta por aplicação | Checkout responde 3x mais devagar que o restante da jornada |
| Resultados da POC | POC encontrou a causa raiz em 4 min, contra 2 h hoje |

- **Frase com verbo, voz ativa, evento ou agente primeiro.** Corte "houve", "observou-se", "devido ao fato de". Rótulo de tópico ("Receita") deixa cada pessoa tirar uma conclusão diferente.
- **Uma linha é o alvo; duas é o teto.** A 28pt em slide 16:9 cabem cerca de 58 caracteres por linha. Se a segunda linha ficar com uma palavra órfã, reescreva. Não reduza a fonte.
- **Um número no título**, com o trecho-chave na cor de destaque (o mesmo dado destacado no gráfico).
- **Sem ponto final**, alinhado à esquerda, sempre na mesma posição.
- **O título promete exatamente o que o gráfico mostra**: mesmo número, mesma unidade.

**Trava de honestidade.** Encurtar não autoriza fortalecer. "Black Friday elevou as vendas em 5%" afirma causa; se o dado só mostra coincidência no tempo, escreva "Vendas subiram 5% na semana da Black Friday". Estimativas aparecem como estimativa ("R$ 2,1 mi, estimativa"), fora do título quando possível. Com poucos pontos (uma dispersão de seis categorias), afirme o caso, não a regra. "5%" e "5 pontos percentuais" são coisas diferentes.

A explicação longa que saiu do título vai para as notas do apresentador.

## 4. Como escolher o gráfico

A forma não é decoração: ela é o argumento visual do título. Escolha em quatro passos e fique com a forma **mais simples que ainda prova o título**.

### Passo 1: o verbo do título indica a família

| O título afirma que… | Família | Primeiras escolhas (detalhes na seção 5) |
|---|---|---|
| um número fala por si | Indicadores | número grande; números + mini barras; painéis de indicadores |
| algo é maior, menor, venceu, perdeu, ficou acima ou abaixo | Comparação | barras ordenadas; colunas agrupadas; inclinação; halteres; pirulito; divergentes; bullet; radar; tabela com minigráficos |
| algo subiu, caiu, mudou ou aconteceu num momento | Tempo | colunas (poucos períodos); linha com região ou com meta (muitos pontos); área acumulada com meta; calendário; pequenos múltiplos; ranking no tempo |
| uma parte domina, se divide ou explica o total | Parte do todo | rosca (até 3 partes); barras 100%; waffle; treemap; Pareto; cascata; área 100% |
| a maioria fica numa faixa, varia mais, se concentra | Distribuição | histograma; diagrama de caixa; mapa de calor; tabela de coorte |
| uma medida anda junto com outra | Relação | dispersão (2 medidas); bolhas (3 medidas) |
| as pessoas ou o tráfego vão de A para B, perdem-se numa etapa | Fluxo | funil; Sankey |
| um lugar se destaca | Geografia | mapa em grade |
| um sistema piorou, um incidente aconteceu, um limite foi atingido | Observabilidade | painéis; medidor; banda de anomalia; linha do tempo de estados; mapa de serviços; rastreamento; colmeia; anéis; orçamento de erros; linha do tempo de eventos |
| vamos fazer X até Y | Plano | cartões de ação; cronograma (Gantt) |

### Passo 2: o formato dos dados filtra

- **1 número** → número grande, sem gráfico.
- **2 a 3 partes de um todo** → rosca ou barras 100%. **4 a 12 partes** → barras ordenadas. **Hierarquia** (categoria > subcategoria) → treemap. **Centenas de itens com concentração** → Pareto.
- **2 momentos × vários itens** → inclinação (a mudança) ou halteres (a distância entre referência e real). **3 a 7 períodos** → colunas. **8+ pontos** → linha. **Dia × hora** → mapa de calor. **Dias de um mês** → calendário.
- **Várias séries de mesmo formato** → pequenos múltiplos, nunca uma linha com seis cores. **Posições** que mudam no tempo → ranking (bump).
- **2 medidas por item** → dispersão; **3 medidas** → bolhas.
- **Muitos valores de uma medida** → histograma; **comparar a dispersão de grupos** → diagrama de caixa.
- **Valores positivos e negativos por item** → barras divergentes.
- **Fluxos entre dois conjuntos** → Sankey; **etapas sequenciais com perda** → funil.
- **5 a 8 dimensões para 2 entidades** → radar, só se a mensagem for "perde (ou ganha) em uma".
- **Estado de vários componentes no tempo** → linha do tempo de estados. **Dependências** → mapa de serviços. **Duração de etapas aninhadas** → rastreamento em cascata. **Muitos itens iguais com status** → colmeia.
- **Um valor numa escala com faixas** → medidor; **vários valores contra meta** → bullet. **Série com faixa esperada** → banda de anomalia. **Saldo que se consome** → orçamento de erros (burn-down). **Acumulado contra meta** → área acumulada (burn-up).

### Passo 3: o contexto decide o grau de sofisticação

- **Executivo ao vivo**: formas familiares (barras, colunas, linha, número grande, rosca). Use forma especial (Sankey, radar, caixa, colmeia, coorte) só quando a mensagem não existe sem ela, e escreva no subtítulo como ler ("caixa = metade central das entregas").
- **Pré-leitura**: pode ter mais densidade (tabela com minigráficos, coorte, pequenos múltiplos), com "e daí?" em todo slide.
- **Público técnico** (TI, SRE, arquitetura): as formas de observabilidade são a língua nativa; ainda assim, título de ação e um destaque por slide.
- **No mesmo deck**: varie a forma de um slide para o outro; três slides seguidos com a mesma forma cansam e escondem a mudança de assunto.

### Passo 4: teste antes de construir

- Dá para apontar no gráfico o número do título?
- O destaque cai num elemento só?
- Funciona sem legenda?
- Uma forma mais simples também provaria? Se sim, use a mais simples.

### Trocas que quase sempre melhoram

| Em vez de | Use |
|---|---|
| Pizza com 6 fatias | Barras ordenadas |
| Linhas com 6 cores | Pequenos múltiplos, ou 1 linha em destaque e o resto cinza |
| Colunas agrupadas com 2 anos para 8 categorias | Inclinação ou halteres |
| Tabela de números crua | Mapa de calor, coorte ou tabela com barras e minigráficos |
| Dois eixos de valores | Dois slides, ou índice (base 100) |
| Vários medidores lado a lado | Bullet (meta x realizado) |
| Empilhadas com muitas camadas | Pequenos múltiplos, ou 100% com até 3 camadas |
| Mapa geográfico em que estados grandes dominam a leitura | Mapa em grade |

## 5. Catálogo: 46 formas testadas

Cada forma traz: **Use** (pergunta e dados), **Evite** (e o que usar no lugar), **Título-modelo** (testado num deck de 47 slides), **Destaque** e **Construir** (resumo; código na seção 9). "Nativo" = gráfico editável do PowerPoint; "formas" = desenhado com formas, geometria exata mas sem planilha de dados.

### Indicadores

- **Número grande.** *Use:* um número sozinho prova o título (resultado de POC, economia, prazo). *Evite:* número que precisa de comparação para fazer sentido (números + mini barras). *Título-modelo:* "POC encontrou a causa raiz em 4 min, contra 2 h hoje". *Destaque:* o número. *Construir:* texto 60–72pt sozinho ou 44–50pt em colunas, uma linha de contexto embaixo.
- **Números grandes + mini barras.** *Use:* 2 a 4 KPIs com o período anterior. *Evite:* mais de 4 KPIs (vira painel). *Título-modelo:* "Black Friday rendeu R$ 48,2 mi no e-commerce, 32% a mais". *Destaque:* o KPI do título. *Construir:* formas: valor 44–50pt; abaixo, duas barras finas proporcionais (atual e anterior) com rótulo direto ("2025 +32%", "2024 R$ 36,5 mi").
- **Painéis de indicadores (stat).** *Use:* 3 a 5 métricas operacionais que pioraram ou melhoraram juntas; abre bem uma seção técnica. *Evite:* público só de negócio sem a tradução no "e daí?". *Título-modelo:* "Checkout ficou abaixo do SLO: 99,58% de disponibilidade". *Destaque:* o painel do título. *Construir:* formas em slide escuro: cartões `darkCard`, valor 42pt, linha de contexto com o limite ("SLO: 99,9%"), minigráfico `poly` com o limite tracejado e "16h … 24h" nas pontas.

### Comparação

- **Barras horizontais ordenadas.** *Use:* ranking ou participação de 4 a 12 itens, nomes longos. *Evite:* tempo (colunas ou linha). *Título-modelo:* "Eletrônicos geraram 46% da receita da semana". *Destaque:* a barra citada. *Construir:* nativo `BAR` `barDir:"bar"`, `catAxisOrientation:"maxMin"`, dados ordenados, valor na ponta, uma cor por ponto.
- **Colunas agrupadas.** *Use:* 2 períodos ou grupos × 2 a 4 categorias, quando o valor absoluto importa. *Evite:* mais de 4 categorias (inclinação ou halteres). *Título-modelo:* "Ticket médio subiu em todos os canais, mais no app: +11%". *Destaque:* a coluna citada. *Construir:* formas, porque a biblioteca não colore um único ponto de série múltipla: anterior `mute`, atual `mid`, citado `accent`; valor sobre cada coluna, variação acima do par, ano embaixo, grupo embaixo do ano.
- **Inclinação (slope).** *Use:* variação entre 2 momentos para 3 a 8 itens. *Evite:* 3 ou mais momentos (linha). *Título-modelo:* "Só o app converteu melhor que no ano passado". *Destaque:* a linha que mais mudou. *Construir:* nativo `LINE` com 2 categorias e marcadores; nome + valor à esquerda, valor à direita; o eixo pode começar acima de zero.
- **Halteres (dumbbell).** *Use:* distância entre 2 valores por item (meta × real, prometido × realizado, antes × depois de uma POC). *Evite:* quando a direção no tempo é a mensagem (inclinação). *Título-modelo:* "No Nordeste, a entrega atrasou 3,1 dias em média". *Destaque:* o par mais distante. *Construir:* formas: ponto vazio (referência) e cheio (real) ligados por `seg` de 3pt; itens ordenados pela distância; diferença "(+3,1)" à direita; grade vertical `hair`.
- **Pirulito (lollipop).** *Use:* ranking contra um limite de referência (tempo de página, SLA). *Evite:* sem limite, barras resolvem. *Título-modelo:* "No celular, a página de produto levou 4,1 s para carregar". *Destaque:* o item fora do limite. *Construir:* formas: `seg` do zero ao valor + `dot`; faixa `tint` sobre o intervalo bom com rótulo ("Bom: até 2,5 s").
- **Barras divergentes.** *Use:* saldo positivo × negativo por item (NPS por etapa, aprovação, variação ±). *Evite:* só valores positivos (barras). *Título-modelo:* "Só a entrega teve mais detratores do que promotores". *Destaque:* o lado negativo do item citado. *Construir:* nativo `BAR` empilhado com negativos à esquerda, `catAxisLabelPos:"low"`, série extra só com o item destacado; valores absolutos sobrepostos; "← Detratores" e "Promotores →" no topo e linha do zero.
- **Meta x realizado (bullet).** *Use:* vários indicadores contra a meta. *Evite:* um indicador só (número grande ou medidor). *Título-modelo:* "Entrega no prazo foi a única meta não atingida". *Destaque:* o que falhou. *Construir:* formas: trilho `tint`, barra do realizado, linha vertical em 100%, escala de 0 a 120%.
- **Radar.** *Use:* 5 a 8 dimensões para 2 entidades, quando a mensagem é "perde (ou ganha) em uma". *Evite:* 3+ entidades ou leitura de valor preciso (halteres ou barras). *Título-modelo:* "ACME só perde da concorrência em prazo de entrega". *Destaque:* a lacuna na dimensão. *Construir:* formas para geometria exata: anéis e polígonos com `poly`, raios com `seg`, escala a partir do zero; empresa em `ink`, concorrência em `mid`; a lacuna com `seg` grosso no destaque e os dois valores rotulados; "como ler" no subtítulo.
- **Tabela com barras e minigráficos.** *Use:* lista de 5 a 15 itens com valor, variação e tendência (pré-leitura, revisão de conta). *Evite:* abertura de reunião executiva (barras simples). *Título-modelo:* "Air fryer cresceu 64%, o maior salto do top 10". *Destaque:* a linha do item (fundo `tint`, texto no destaque). *Construir:* nativo `addTable` com colunas vazias onde entram barras (`rect`) e minigráficos (`poly`) posicionados linha a linha; só borda inferior `hair`.

### Tempo

- **Colunas.** *Use:* 3 a 7 períodos. *Evite:* muitos pontos (linha). *Título-modelo:* "Receita da Black Friday mais que dobrou em quatro anos". *Destaque:* o período citado. *Construir:* nativo `BAR` `barDir:"col"`, valor acima, `barGapWidthPct: 45`.
- **Linha com região e anotação.** *Use:* série longa com um evento. *Evite:* categorias sem ordem natural. *Título-modelo:* "Pico de vendas da sexta-feira foi 45% maior que o de 2024". *Destaque:* a série atual e o pico. *Construir:* nativo `LINE` + retângulo `tint` atrás do período + `dot` e anotação de 2 linhas no pico; comparação em `mute`; nome no fim de cada linha.
- **Linha com meta e pico.** *Use:* série contra um limite (SLA, meta). *Evite:* sem limite (linha com região). *Título-modelo:* "Checkout ficou quase 4x mais lento no pico das 20h às 22h". *Destaque:* o pico. *Construir:* nativo `LINE` com a meta como série constante em `mute`, região do pico, anotação acima do pico.
- **Área acumulada com meta (burn-up).** *Use:* acumulado do período contra uma meta total; também serve para payback (o dia em que o acumulado paga o investimento). *Evite:* quando o valor diário é a mensagem. *Título-modelo:* "Novembro bateu a meta de R$ 80 mi só no dia 29". *Destaque:* o ponto em que cruzou a meta. *Construir:* nativo `AREA` simples em `mute` (pontos no centro da categoria), meta com `seg` tracejado, região do período-chave atrás, rótulo final "109% da meta".
- **Calendário de calor.** *Use:* valores diários de um mês, padrão de semana e um dia excepcional. *Evite:* quando a tendência é a mensagem (linha). *Título-modelo:* "Só a sexta, 28/11, vendeu 18% de todo o mês de novembro". *Destaque:* o dia citado em `accent` cheio. *Construir:* formas: grade de `rect` com 7 colunas (seg a dom), o 1º dia na coluna certa; cor `mix(tint, accent, (v/máx)^0,7)`; dia pequeno no canto, valor à direita; texto branco nas células escuras.
- **Pequenos múltiplos.** *Use:* várias séries de mesmo formato em que um grupo se comporta diferente. *Evite:* comparar tamanhos entre grupos quando cada quadro está em % do próprio total. *Título-modelo:* "Só Moda vendeu mais na quinta do que na sexta". *Destaque:* o quadro diferente. *Construir:* nativo: 4 a 6 `LINE` pequenos com a **mesma escala**, a mesma faixa de referência atrás de cada um, nome do grupo como título do quadro, pico marcado.
- **Ranking no tempo (bump).** *Use:* posições que mudam ao longo de 3 a 8 períodos. *Evite:* quando a distância entre valores importa (a posição a esconde). *Título-modelo:* "Eletrodomésticos passaram Moda e são a 2ª categoria". *Destaque:* a linha que subiu; a que caiu em `mid`. *Construir:* nativo `LINE` com valor `n + 1 − posição` (eixo oculto), marcadores, "1º Nome" nas duas pontas.

### Parte do todo

- **Rosca.** *Use:* uma parte passa da metade; até 3 partes. *Evite:* 4+ partes ou roscas lado a lado (barras). *Título-modelo:* "Pix já responde por mais da metade dos pedidos". *Destaque:* a fatia principal. *Construir:* nativo `DOUGHNUT` `holeSize: 64`, borda branca de 2pt, rótulos desligados, número no centro, nomes ao lado das fatias.
- **Barras 100% empilhadas.** *Use:* a composição muda entre 2 totais. *Evite:* 5+ segmentos. *Título-modelo:* "App trouxe 33% da receita com apenas 21% das visitas". *Destaque:* o mesmo segmento nas duas barras. *Construir:* nativo `barGrouping:"percentStacked"`; valores dentro; nomes dos segmentos acima da 1ª barra.
- **Waffle 10 × 10.** *Use:* fração simples ("1 em cada 4") para público amplo. *Evite:* frações abaixo de 2% ou várias categorias. *Título-modelo:* "1 em cada 4 compradores da semana era cliente novo". *Destaque:* os quadrados da fração. *Construir:* formas: 100 `rect` de 0,3" com folga de 0,065"; os N primeiros no destaque; rótulo ao lado de cada bloco ("38 mil clientes novos").
- **Treemap.** *Use:* hierarquia (categoria > subcategoria) e um item grande comparado a um grupo inteiro. *Evite:* comparar valores parecidos com precisão (barras). *Título-modelo:* "Smartphones sozinhos venderam mais que Moda inteira". *Destaque:* o ladrilho citado; o grupo comparado em `mid`. *Construir:* formas com `squarify` em 2 níveis (folga 0,045" entre categorias, 0,018" entre subcategorias), largura total, "CATEGORIA · total" no 1º ladrilho de cada grupo, fonte ajustada ao ladrilho.
- **Pareto.** *Use:* concentração (poucos itens fazem quase tudo). *Evite:* menos de ~8 itens (barras ordenadas). *Título-modelo:* "20% dos produtos geraram 72% da receita". *Destaque:* as primeiras colunas e o ponto do acumulado. *Construir:* nativo, combo `BAR` + `LINE` no mesmo eixo 0–100; cor por ponto na série de barras; valores das colunas altas dentro delas, em branco; legenda do eixo x embaixo ("faixas de 10% dos produtos →").
- **Cascata (ponte).** *Use:* como se foi de A para B; decompor uma variação. *Evite:* parcelas que não somam. *Título-modelo:* "Mais pedidos explicam três quartos do crescimento". *Destaque:* a maior parcela. *Construir:* nativo, colunas empilhadas com série "base" na cor do fundo (a base só some em fundo liso); conectores tracejados de 0,75pt.
- **Área 100%.** *Use:* composição contínua ao longo do tempo, até 3 camadas. *Evite:* 4+ camadas (pequenos múltiplos). *Título-modelo:* "À noite, a fatia do app subiu de 25% para 42% dos pedidos". *Destaque:* a camada de baixo (a única com base reta). *Construir:* nativo `AREA` com `barGrouping:"stacked"` e valores que já somam 100; rótulos dentro das camadas.

### Distribuição e relação

- **Mapa de calor.** *Use:* concentração em 2 dimensões (dia × hora, região × produto). *Evite:* quando o valor exato é a mensagem (tabela). *Título-modelo:* "Sexta à noite concentrou 11% dos pedidos da semana". *Destaque:* a célula mais escura. *Construir:* nativo `addTable` com cor `mix(tint, accent, t^0,8)`, bordas brancas de 3pt, texto branco acima de ~45% da escala.
- **Tabela de coorte.** *Use:* retenção ou recompra por turma ao longo do tempo. *Evite:* público pouco analítico ao vivo (linha com 2 séries: turma citada × média). *Título-modelo:* "Só 14% dos novos clientes da Black Friday 2024 voltaram". *Destaque:* a linha da coorte, em escala do destaque; as demais em escala de cinza. *Construir:* nativo `addTable`, cabeçalho "1 mês … 6 meses", coluna com o tamanho de cada turma.
- **Histograma.** *Use:* como os valores se espalham; "a maioria fica em…". *Evite:* categorias sem ordem (barras). *Título-modelo:* "Mais da metade dos pedidos custou menos de R$ 200". *Destaque:* as faixas citadas, com chave acima. *Construir:* nativo `BAR` col com `barGapWidthPct: 8` e faixas iguais; mediana e média como triângulos sob o eixo (média distante da mediana revela assimetria).
- **Diagrama de caixa (box plot).** *Use:* comparar a dispersão de grupos (prazo, tempo de resposta). *Evite:* executivo leigo sem tempo para explicação (halteres com mediana e p90). *Título-modelo:* "Transportadora C teve 1 em 4 entregas acima de 9 dias". *Destaque:* a caixa irregular, com os quartis rotulados. *Construir:* formas: caixa Q1–Q3, traço da mediana, hastes e tampas; "como ler" no subtítulo; mediana embaixo do nome de cada grupo.
- **Dispersão.** *Use:* relação entre 2 medidas para vários itens. *Evite:* tirar regra de poucos pontos (afirme o caso). *Título-modelo:* "Moda deu o maior desconto e teve o menor crescimento". *Destaque:* 1 ponto. *Construir:* nativo `SCATTER` cinza com grade leve; ponto destacado como forma sobreposta; nome ao lado de cada ponto; títulos de eixo como texto ("Desconto médio →").
- **Bolhas.** *Use:* 3 medidas por item (x, y e tamanho). *Evite:* 9+ bolhas ou tamanhos parecidos. *Título-modelo:* "Eletrônicos cresceram mais, mas têm a menor margem: 14%". *Destaque:* a bolha citada. *Construir:* nativo `SCATTER` sem marcadores só para eixos e grade + `OVAL` com diâmetro ∝ √valor (a maior ≈ 1,1"), da maior para a menor; lado do rótulo escolhido bolha a bolha para não colidir.

### Fluxo e processo

- **Funil.** *Use:* etapas sequenciais com perda. *Evite:* etapas que não formam sequência. *Título-modelo:* "Só 36 de cada 100 carrinhos viraram pedido". *Destaque:* a maior perda. *Construir:* nativo, barras horizontais empilhadas "ficaram" (`mid`) + "saíram (destaque)" (`accent`) + "saíram" (`hair`); valor dentro; perda descrita à direita.
- **Sankey.** *Use:* fluxos entre 2 conjuntos (origem → destino). *Evite:* mais de ~6 nós por lado (mapa de calor origem × destino). *Título-modelo:* "Redes sociais mandaram 8 de cada 10 visitas ao site mobile". *Destaque:* a faixa citada, com o valor dentro. *Construir:* formas: nós `rect` com a mesma escala dos dois lados (folgas ajustadas para a mesma altura total), faixas `curveBand` em `mute` com 45% de transparência, a citada em `accent`; dentro de cada nó, fluxos na ordem dos nós do outro lado para reduzir cruzamentos.

### Geografia

- **Mapa em grade (tile map).** *Use:* valor por estado ou região, quando a área do território distorceria a leitura. *Evite:* quando a localização exata importa (rotas, cidades): mapa real como imagem. *Título-modelo:* "Nordeste cresceu 50%, o maior avanço entre as regiões". *Destaque:* a região citada. *Construir:* formas: um `rect` por estado numa grade aproximada (coordenadas do Brasil na seção 9), cor `mix(tint, accent, t)`, sigla + valor; barras por região ao lado com a média nacional tracejada.

### Observabilidade

- **Medidor (gauge).** *Use:* 1 valor numa escala com faixas de referência (Apdex, SLA, NPS, score). *Evite:* vários valores (bullet) ou tendência (linha). *Título-modelo:* "No pico, o Apdex do checkout caiu para 0,62, nível ruim". *Destaque:* o arco do valor e a faixa atingida. *Construir:* formas com `arcBand`: trilho de 180° a 360°, valor de 180° até 180° + 180°·v, faixas de referência num anel fino por fora (a atingida em destaque), ponteiro com `seg`, valor de 64pt no centro.
- **Anéis de progresso.** *Use:* 3 a 5 percentuais (capacidade, metas), um perto do limite. *Evite:* valores que não são % de um total. *Título-modelo:* "No pico, só a CPU chegou perto do limite: 94%". *Destaque:* o anel citado. *Construir:* formas com `arcBand`: trilho de 270,01° a 629,99° + valor de 270° até 270° + 3,6°·v; marca do limite com `seg` atravessando o anel; valor no centro.
- **Banda de anomalia.** *Use:* série temporal contra uma faixa esperada (linha de base). *Evite:* sem linha de base confiável (linha com meta). *Título-modelo:* "Erros no pagamento saíram da faixa esperada às 19h50". *Destaque:* o trecho fora da faixa. *Construir:* nativo, combo `AREA` empilhada [limite inferior na cor do fundo, faixa = superior − inferior] + `LINE` real; o trecho fora como 2ª série de linha com lacunas; eixo "midCat" (posições com `mx(i)`).
- **Linha do tempo de estados.** *Use:* estado (normal, degradado, fora) de vários componentes ao longo do tempo. *Evite:* quando o valor, e não o estado, é a mensagem (linha). *Título-modelo:* "Três serviços ficaram degradados por 2h40 na sexta". *Destaque:* os blocos degradados. *Construir:* formas: uma faixa `hair` por serviço, bloco no destaque, tracejados verticais no início e no fim com os horários; serviços afetados agrupados embaixo.
- **Mapa de serviços (topologia).** *Use:* dependências e onde nasce o problema. *Evite:* mais de ~12 nós (mostre só o caminho crítico). *Título-modelo:* "Lentidão do checkout nasceu no antifraude externo". *Destaque:* o nó causa raiz (cheio) e o caminho até ele. *Construir:* formas: nós `rect` arredondados (nome + tempo), setas `seg` com `arrow:"triangle"`, caminho em `accent` de 2,5pt, "CAUSA RAIZ" acima do nó.
- **Rastreamento em cascata (trace).** *Use:* quanto cada etapa de uma requisição ou processo consome; serve também para processos de negócio (tempo por etapa de um pedido). *Evite:* etapas paralelas demais. *Título-modelo:* "Antifraude consumiu 3,1 s dos 4,6 s do checkout no pico". *Destaque:* a etapa citada. *Construir:* formas: barras de início e duração, recuo de 0,3" por nível, grade tracejada por segundo, duração à direita de cada barra.
- **Colmeia (honeycomb).** *Use:* muitos itens iguais com status (hosts, pods, lojas, agências). *Evite:* poucos itens (tabela). *Título-modelo:* "Os 11 pods saturados estavam todos na zona B". *Destaque:* os itens acima do limite, agrupados. *Construir:* formas `HEXAGON` de 0,62" × 0,54"; colunas a cada 0,515", linhas a cada 0,585", colunas ímpares deslocadas meia linha; 3 faixas de cor (claro, médio, destaque) e valor dentro.
- **Orçamento de erros (burn-down).** *Use:* saldo que se consome contra um limite (SLO, orçamento, horas contratadas). *Evite:* consumo regular sem evento (número grande basta). *Título-modelo:* "Orçamento de erros de novembro acabou na sexta, 28/11". *Destaque:* o trecho da queda. *Construir:* nativo `LINE` em 2 séries com lacunas (antes em `ink`, depois em `accent`), linha do zero, zona negativa `tint` ("acima do permitido").
- **Linha do tempo de eventos.** *Use:* sequência de eventos e durações (incidente, projeto, jornada do cliente). *Evite:* muitos eventos colados (agrupe). *Título-modelo:* "Detecção levou 2 minutos; a resolução, 2h40". *Destaque:* a duração citada, como faixa sobre o eixo. *Construir:* formas: eixo horizontal, eventos alternados acima e abaixo (2 níveis embaixo quando apertado), conectores finos, rótulos de 3" para caber numa linha.

### Plano

- **Cartões de ação.** *Use:* 3 a 5 ações com valor, dono e prazo. *Evite:* ações sem dono ou sem data. *Título-modelo:* "Três ações podem recuperar R$ 6 mi na Black Friday de 2026". *Destaque:* o pedido de decisão. *Construir:* formas: cartões `darkCard` em slide escuro, valor 30pt, barra fina proporcional ao valor, dono e prazo; linha final "Decisão de hoje: …".
- **Cronograma (Gantt).** *Use:* tarefas no tempo e o caminho crítico. *Evite:* dezenas de tarefas (agrupe por ação). *Título-modelo:* "Teste de carga define o prazo: precisa começar em junho". *Destaque:* a tarefa crítica. *Construir:* formas: meses em colunas com divisórias `hair`, tarefas agrupadas sob o título de cada ação, marco em losango e linha tracejada no evento, nota de prazo ao lado de cada barra.

## 6. Percepção: Gestalt, destaque, rótulos e limpeza

| Princípio | O olho conclui | Decisão no slide | Erro típico |
|---|---|---|---|
| Proximidade | Perto = pertence junto | Rótulo colado ao dado; espaço entre grupos maior que dentro deles; subtítulo junto do gráfico, não do título | Legenda longe; espaçamento igual em tudo |
| Similaridade | Mesma cor = mesma categoria | Cor com significado fixo no deck; texto que fala de uma série usa a cor dela | Cores diferentes por barra sem significado |
| Figura e fundo | Uma coisa se destaca | Dado principal no destaque, contexto em cinza | Tudo saturado |
| Região comum | Dentro da mesma área = grupo | Faixa suave atrás do gráfico marcando um período | Caixas e bordas em tudo |
| Conexão | Ligado por linha = relacionado | Conectores da cascata, linhas da inclinação, setas do mapa de serviços | Setas decorativas |
| Continuidade | O olho segue alinhamentos | Grade; barras ordenadas; tempo da esquerda para a direita | "Quase alinhado" |
| Fechamento | O olho completa formas | Remover moldura, eixos e grades | Bordas "para organizar" |
| Destino comum | Move junto = pertence junto | Séries secundárias viram um grupo cinza | Dez linhas coloridas |

**Destaque: uma coisa por slide.**
- Desenhe em cinza, depois pinte um dado. A cor de destaque aparece no dado que prova o título, no trecho correspondente do título e na anotação desse dado. Em nenhum outro lugar.
- Um atributo de ênfase por elemento; não empilhe cor + negrito + caixa + tamanho.
- Ordem de leitura: título, dado destacado e anotação, contexto cinza, "e daí?", fonte.
- Três cinzas bastam: médio (série de comparação), claro (demais itens), muito claro (o que saiu, o que falta).
- **Cor é significado.** Para executivos de tecnologia, amarelo (atenção), laranja (alerta), vermelho (crítico) e verde ("saudável") já têm sentido fixo nos painéis de TI. Nunca use essas cores como enfeite, fundo de chamada ou cor de marca. Vermelho só quando o dado viola um limite (SLO, prazo, capacidade, meta), com o limite escrito no slide; verde só quando o dado cumpre uma meta explícita. Fato neutro ou positivo sem meta usa o destaque da marca (azul).

**Rótulos diretos em vez de legenda.** Nome e valor moram ao lado do dado. Unidade aparece uma vez, no subtítulo. Uma ou duas anotações por gráfico. A legenda só fica quando há mais de cerca de seis séries e não dá para agrupar as secundárias em "demais"; nesse caso, encostada no gráfico e na ordem das séries. Para formas especiais, o subtítulo explica a leitura em uma frase ("cada quadrado = 1% dos compradores").

**Limpeza.** Remova, salvo se provar algo: moldura, grades, linha e marcas de eixo, eixo de valores quando há rótulos, decimais sem significado, título interno do gráfico, 3D, sombras, gradientes, marcadores em todos os pontos, rótulos inclinados, ícones decorativos. Mantenha: fonte e período dos dados no rodapé; base zero em barras e colunas (linha e inclinação podem ter eixo cortado); eixos com escala em dispersão e bolhas.

## 7. Composição do deck

A beleza vem de sistema e ritmo, não de enfeite.

- **Zonas fixas em todo slide de conteúdo** (16:9, 13,33" × 7,5", margem 0,6"): antetítulo em 0,42"; título em 0,78"; subtítulo do gráfico em 1,95"; evidência de 2,45" a 6,65"; fonte em 6,95".
- **Antetítulo** (11pt, negrito, maiúsculas, espaçado) numa etiqueta em pílula: fundo `tagBg`, texto `tagFg`, sempre na cor de navegação (azul), nunca na cor de status do slide. "SEÇÃO · ASSUNTO". Dá orientação sem gastar o título.
- **Evidência + "e daí?"**: gráfico em cerca de dois terços da largura; à direita, um painel arredondado (x = 8,95", w = 3,78", altura da zona de evidência) no tom suave do destaque do slide (`accentTint`: azul claro para fato neutro, vermelho claro para problema), com número grande (46pt) no `accent`, uma legenda e uma ou duas frases de implicação. Em gráficos de largura total (histograma, treemap, área 100%, trace, Gantt), o "e daí?" vira uma linha abaixo.
- **Ritmo**: capa em fundo branco com o mosaico; chamada para ação em fundo azul de marca (a cor de link e botão), com um botão branco em pílula ("Me chame na DM →"); slides de painéis e fechamento em fundo tinta (azul-marinho); evidências em fundo claro. Alterne largura total com gráfico + coluna.
- **Capa com gancho**: título à esquerda (42pt, trecho-chave no azul) e, à direita, o mosaico de marca: grade 3 × 3 de ladrilhos de 1,55" com quadrados, círculos, quartos e meias-luas em azul, ciano, violeta, tinta e seus tons claros; o número principal do deck (60pt, branco) num ladrilho tinta. Mosaico pequeno (3 ladrilhos de 0,55–0,6") no canto da chamada para ação e do fechamento.
- **Cartões categóricos** (passos, famílias, roteiros, resumo): fundo no tom claro e número ou nome no tom forte, alternando azul, ciano e violeta. É identidade de categoria, não dado: nunca use cor de status aqui.
- **Espaço em branco é agrupamento**: 0,2" dentro de um grupo, 0,4" a 0,6" entre grupos. Gráfico pequeno boiando em área vazia é erro: aumente o gráfico ou reduza a zona.
- **Rodapé honesto**: o período do rodapé é o do gráfico (semana, mês, 2021–2025), não um texto fixo.
- **Decks longos (30+ slides)**: seções com antetítulo, abertura escura por seção quando ajudar (ex.: painéis de indicadores) e um índice no apêndice gerado a partir de um registro de slides (título, forma, família).
- **Sem** linha sob título, barra decorativa, faixa colorida na borda ou caixa em volta de tudo.

## 8. Sistema visual

### Modo template (o usuário forneceu .pptx/.potx ou marca)

A marca manda; esta skill decide como usá-la.

1. Leia o template com a skill `pptx` e extraia cores do tema, fontes, layouts, posição do título e rodapé.
2. Mapeie os tokens: `accent` = acento mais forte da marca (se for vermelho ou verde e o deck usa bom e ruim, escolha o segundo acento); cinzas do tema ou neutros; texto e fundo do tema.
3. Use os layouts e placeholders do template. Título de ação no placeholder de título; se não couber, encurte a frase.
4. Aplique nos gráficos as regras desta skill com as cores mapeadas.
5. Se o template fere a legibilidade, mantenha-o e avise o usuário em uma linha, com a alternativa.

### Modo mini design system (sem template)

Sem template do usuário, use o sistema interno **Sinal** (padrão da skill). Defina os tokens no topo do script e não use valor solto fora deles. Regra-mãe: **cor é significado**. Cor de marca (navegação, identidade, categorias) fica separada de cor de status (o que o dado diz).

**Marca: só tons frios, que não carregam alerta**

| Matiz | `fill` | `text` (sobre branco) | `tint` | `light` (sobre tinta) | Papel |
|---|---|---|---|---|---|
| Azul | `1F5EFF` | `1F5EFF` (5,1:1) | `E8EEFF` | `8FB0FF` | confiança e ação (cor de link e botão); destaque padrão, CTA, etiquetas |
| Ciano | `0BA5D8` | `0779A6` (4,9:1) | `E0F6FC` | `5CD3F5` | energia tecnológica; formas, mosaico e fundo escuro. O `fill` não serve para texto sobre branco (2,8:1) |
| Violeta | `6E56F8` | `6E56F8` (4,8:1) | `EEEBFF` | `B3A6FF` | terceira cor: categorias, mosaico, cartões |

**Status: só quando o dado tem esse sentido**

| Status | `fill`/`text` | `tint` | `light` | Quando |
|---|---|---|---|---|
| Crítico | `D92D20` (4,8:1) | `FDECEA` | `FF7A6E` | o dado viola um limite (SLO, prazo, capacidade), com o limite no slide |

**Neutros e superfícies**

| Token | Papel | Valor |
|---|---|---|
| `ink` | títulos, texto, fundo escuro (tinta) | `0B1B3F` (16,9:1) |
| `body` | texto secundário, eixos | `4A5568` |
| `mid` | série de comparação | `8A94A6` |
| `mute` | demais dados de contexto | `D3D8E0` |
| `hair` | grade leve, "o que saiu" | `E6EAF0` |
| `tint` | região comum, trilhos | `F4F6F9` |
| `paper` | fundo claro | `FFFFFF` |
| `darkCard` | cartão em fundo tinta | `1A2B55` |
| `soft` | texto secundário em fundo tinta | `C3CCE0` |
| `tagBg` / `tagFg` | etiqueta do antetítulo | `E8EEFF` / `1F5EFF` |

**Tom do destaque por slide.** `accent`, `accentLight` e `accentTint` não são fixos: troque o tom antes de cada slide com uma função (`tone("neutro")` = azul; `tone("critico")` = vermelho). Use "crítico" só em slides cujo título afirma um problema contra limite (atraso contra o prometido, SLO violado, Apdex ruim, causa raiz, saturação); volte ao neutro logo depois. Título, dado destacado, anotação e painel do "e daí?" usam o mesmo tom.

**Fora do sistema como enfeite:** amarelo, laranja e verde. Verde só entra como status de meta cumprida, com a meta escrita. Nunca use amarelo ou laranja para chamar atenção positiva: o executivo lê perigo onde há convite.

**Validação antes de usar uma cor nova**: (1) que significado ela já tem para a audiência? (2) o lugar onde vai aplicá-la pede esse significado? (3) contraste WCAG de pelo menos 4,5:1 para texto e 3:1 para formas e texto grande, medido com a fórmula de luminância relativa. Se uma das três falhar, a cor não entra.

O destaque precisa de uma versão clara para fundo escuro (`light`); a cor que funciona no branco some no escuro. O tema do PowerPoint tem só 6 cores de acento: `dk1` = `ink`, `accent1` = azul, `accent2` = ciano, `accent3` = violeta, `accent4` = crítico, `accent5`/`accent6` = `mid`/`mute`; o resto entra em hex.

Se o usuário trouxer marca de cliente, a marca manda (modo template), mas a regra de status continua: vermelho, amarelo, laranja e verde da marca não viram destaque de fato neutro.

**Tipografia**: **Aptos** como padrão em títulos e texto, dois pesos (regular e negrito). Não use Calibri. A Aptos não existe no ambiente de renderização: o LibreOffice a troca por uma fonte mais larga (Inter), então a conferência é conservadora; avise na entrega que o PDF fiel sai do PowerPoint (Arquivo > Exportar > PDF). Em gráficos nativos, use `"+mn-lt"` para herdar a fonte do tema.

| Elemento | Tamanho |
|---|---|
| Título de ação | 28pt negrito (difere da pptx: é uma frase, não um rótulo) |
| Título de capa | 40pt negrito |
| Número de capa | 100–120pt |
| Número grande em coluna "e daí?" ou em três colunas | 44–50pt (60pt ou mais quebra linha em colunas de 4") |
| Valor de painel / centro de medidor | 42pt / 64pt |
| Anotação do dado destacado | 16–18pt negrito |
| Rótulos de dados e categorias | 12–14pt (mínimo 9pt dentro de ladrilhos pequenos) |
| Texto do "e daí?" | 16pt |
| Subtítulo do gráfico | 14pt, numa linha só |
| Antetítulo, fonte | 10–11pt |

## 9. Receitas em pptxgenjs

Leia antes os alertas da skill `pptx`. Estruture o deck com tema, layouts (claro, escuro, capa), placeholders de título e seções. Organize o código em módulos: um arquivo de tokens e componentes, um por seção do deck e um que monta a ordem, para reordenar slides sem reescrever nada.

**Base limpa de todo gráfico**

```js
const limpo = () => ({ showLegend: false, showTitle: false, valAxisHidden: true,
  valGridLine: { style: "none" }, catGridLine: { style: "none" }, catAxisLineShow: false, valAxisLineShow: false,
  catAxisLabelColor: DS.body, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt", dataLabelFontFace: "+mn-lt" });
```

**Geometria para sobrepor rótulos, pontos e regiões.** Fixe a área de plotagem (`layout`) e os limites do eixo; aí as posições são calculáveis.

```js
// G = moldura do gráfico em polegadas; P = área de plotagem em frações de G; Y = {min,max}; n = nº de categorias
const geo = (G, P, Y, n) => ({
  cx: i => G.x + G.w * (P.x + P.w * ((i + 0.5) / n)),   // centro da categoria i (colunas, linhas, área simples)
  ex: i => G.x + G.w * (P.x + P.w * (i / n)),           // borda da categoria i (regiões)
  mx: i => G.x + G.w * (P.x + P.w * (i / (n - 1))),     // eixo "midCat": combos com área e dispersão
  vy: v => G.y + G.h * (P.y + P.h * (1 - (v - Y.min) / (Y.max - Y.min))),
  cy: i => G.y + G.h * (P.y + P.h * ((i + 0.5) / n)),   // categoria i em barras horizontais (maxMin)
  vx: v => G.x + G.w * (P.x + P.w * ((v - Y.min) / (Y.max - Y.min))),
  band: horizontal => (horizontal ? G.h * P.h : G.w * P.w) / n,
});
// uso: slide.addChart(tipo, dados, { ...G, layout: P, ...limpo(), valAxisMinVal: Y.min, valAxisMaxVal: Y.max, ... })
```

Deixe em `P` a folga que os rótulos precisam: ~0,10 à direita para nomes no fim da linha, ~0,30 à esquerda para categorias longas em barras horizontais, ~0,10 no topo para anotações.

**Componentes básicos**

```js
const rect = (s, x, y, w, h, cor, o = {}) => s.addShape(o.round ? pres.shapes.ROUNDED_RECTANGLE : pres.shapes.RECTANGLE,
  { x, y, w, h, rectRadius: o.round, fill: { color: cor, transparency: o.transp || 0 }, line: o.line ? { color: o.line, width: o.lw || 1 } : { type: "none" } });
const dot = (s, x, y, d, cor, o = {}) => s.addShape(pres.shapes.OVAL, { x: x - d / 2, y: y - d / 2, w: d, h: d,
  fill: { color: cor }, line: o.line ? { color: o.line, width: o.lw || 1.5 } : { type: "none" } });
// segmento de (x1,y1) a (x2,y2) em qualquer direção; seta opcional no fim
const seg = (s, x1, y1, x2, y2, cor, width = 1, o = {}) => s.addShape(pres.shapes.LINE, {
  x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), flipH: x2 < x1, flipV: y2 < y1,
  line: { color: cor, width, dashType: o.dash, endArrowType: o.arrow } });
// cor intermediária para escalas sequenciais (mapa de calor, calendário, coorte, mapa em grade)
const mix = (a, b, t) => { const c = h => [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)), A = c(a), B = c(b); t = Math.max(0, Math.min(1, t));
  return A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("").toUpperCase(); };
```

**Formas livres (custGeom).** Pontos em polegadas, relativos à caixa da forma.

```js
// polilinha (minigráfico, radar) ou polígono; para "sem preenchimento", OMITA fill ({ type: "none" } pinta de preto)
const poly = (s, pts, o = {}) => {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys);
  const points = pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })); if (o.close) points.push({ close: true });
  s.addShape(pres.shapes.CUSTOM_GEOMETRY, { x: x0, y: y0, w: Math.max(Math.max(...xs) - x0, 0.01), h: Math.max(Math.max(...ys) - y0, 0.01), points,
    fill: o.fill ? { color: o.fill, transparency: o.transp || 0 } : undefined,
    line: o.line ? { color: o.line, width: o.lw || 1.5, dashType: o.dash } : { type: "none" } }); };
// faixa de Sankey de (xa, ya0..ya1) até (xb, yb0..yb1), curvas cúbicas com controle no meio do caminho
const curveBand = (s, xa, ya0, ya1, xb, yb0, yb1, cor, transp) => {
  const y0 = Math.min(ya0, yb0), xm = (xb - xa) / 2, r = (x, y) => ({ x: x - xa, y: y - y0 });
  s.addShape(pres.shapes.CUSTOM_GEOMETRY, { x: xa, y: y0, w: xb - xa, h: Math.max(ya1, yb1) - y0,
    fill: { color: cor, transparency: transp || 0 }, line: { type: "none" },
    points: [r(xa, ya0), { ...r(xb, yb0), curve: { type: "cubic", x1: xm, y1: ya0 - y0, x2: xm, y2: yb0 - y0 } }, r(xb, yb1),
      { ...r(xa, ya1), curve: { type: "cubic", x1: xm, y1: yb1 - y0, x2: xm, y2: ya1 - y0 } }, { close: true }] }); };
// anel ou arco entre os raios ri e ro; graus com 0 = direita, sentido horário, 270 = topo
const arcBand = (s, cx, cy, ri, ro, a0, a1, cor) => {
  const sw = a1 - a0, bx = cx - ro, by = cy - ro, rad = a => a * Math.PI / 180;
  const P = (r, a) => ({ x: cx + r * Math.cos(rad(a)) - bx, y: cy + r * Math.sin(rad(a)) - by });
  s.addShape(pres.shapes.CUSTOM_GEOMETRY, { x: bx, y: by, w: 2 * ro, h: 2 * ro, fill: { color: cor }, line: { type: "none" },
    points: [P(ro, a0), { x: 0, y: 0, curve: { type: "arc", wR: ro, hR: ro, stAng: a0, swAng: sw } }, P(ri, a1),
      { x: 0, y: 0, curve: { type: "arc", wR: ri, hR: ri, stAng: a1, swAng: -sw } }, { close: true }] }); };
```

**Treemap ("squarified", Bruls, Huizing e van Wijk).** Valores em ordem decrescente; devolve um retângulo por valor.

```js
const squarify = (vals, x, y, w, h) => {
  const tot = vals.reduce((a, b) => a + b, 0), areas = vals.map(v => (v * w * h) / tot), out = [];
  let rx = x, ry = y, rw = w, rh = h, row = [], i = 0;
  const worst = (r, side) => { const sm = r.reduce((a, b) => a + b, 0), mx = Math.max(...r), mn = Math.min(...r);
    return Math.max((side * side * mx) / (sm * sm), (sm * sm) / (side * side * mn)); };
  const lay = () => { const sm = row.reduce((a, b) => a + b, 0);
    if (rw >= rh) { const cw = sm / rh; let yy = ry; row.forEach(a => { out.push({ x: rx, y: yy, w: cw, h: a / cw }); yy += a / cw; }); rx += cw; rw -= cw; }
    else { const ch = sm / rw; let xx = rx; row.forEach(a => { out.push({ x: xx, y: ry, w: a / ch, h: ch }); xx += a / ch; }); ry += ch; rh -= ch; } };
  while (i < areas.length) { const side = Math.min(rw, rh);
    if (!row.length || worst([...row, areas[i]], side) <= worst(row, side)) { row.push(areas[i]); i++; } else { lay(); row = []; } }
  if (row.length) lay();
  return out;
};
```

Rótulo de ladrilho: estime a largura como `caracteres × 0,53 × fonte / 72` polegadas; reduza a fonte até 8pt e, se ainda não couber, abrevie ("Decor.").

**Detalhes por forma**

- **Um destaque em barras ou colunas**: `chartColors: valores.map((_, i) => i === foco ? DS.accent : DS.mute)`, `showValue: true`, `dataLabelPosition: "outEnd"`, `barGapWidthPct: 40–50`.
- **Região comum**: o retângulo `tint` de `ex(a)` a `ex(b)` vem **antes** do gráfico, com o nome do período no topo.
- **Pico**: elipse de 0,18" no `accent` com contorno branco em `(cx(i), vy(v))`; anotação de duas linhas, alinhada à direita, terminando 0,25" antes do ponto e **acima** da linha que sobe.
- **Fim de linha**: nome da série em `cx(n−1) + 0,2`; se dois rótulos ficarem a menos de 0,3", afaste-os na vertical mantendo a ordem.
- **Cascata**: séries `base` (cor do fundo), `total` e uma por parcela, cada uma com valor só na sua categoria; `barGrouping: "stacked"`; largura da coluna = faixa ÷ (1 + gap); conectores tracejados na altura do acumulado.
- **100% empilhado**: valores dentro em `vx(acumulado + v/2)`, branco no destaque e escuro nos cinzas.
- **Rosca**: `holeSize: 64`, `dataBorder` branco de 2pt, `showPercent`, `showValue`, `showLabel` e legenda desligados.
- **Dispersão e bolhas**: dados `[{ name, values: xs }, { name, values: ys }]`, `lineSize: 0`, grade horizontal em `hair`, eixos com `'0"%"'`; nas bolhas, `lineDataSymbol: "none"` e as bolhas como `OVAL`.
- **Pareto**: `slide.addChart([{ type: BAR, data, options: { chartColors: porPonto } }, { type: LINE, data: acumulado, options: { lineDataSymbol: "circle" } }], opts)`.
- **Banda de anomalia**: área empilhada `[inferior na cor do fundo, faixa]` + linha real; o trecho fora da faixa é a 2ª série de linha com `null` fora da janela (repita os pontos das bordas nas duas séries para elas se encontrarem); `displayBlanksAs: "gap"`.
- **Medidor**: rótulos de faixa em `cx + r·cos(a)`, `cy + r·sin(a)` com r ≈ 3,05"; alinhe à esquerda do lado direito do arco, à direita do lado esquerdo e centralize no topo.
- **Mapa em grade do Brasil** (linha, coluna): RR 0,1 · AP 0,2 · AM 1,1 · PA 1,2 · MA 1,3 · CE 1,4 · RN 1,5 · AC 2,0 · RO 2,1 · TO 2,2 · PI 2,3 · PE 2,4 · PB 2,5 · MT 3,1 · GO 3,2 · BA 3,3 · SE 3,4 · AL 3,5 · MS 4,1 · DF 4,2 · MG 4,3 · ES 4,4 · PR 5,2 · SP 5,3 · RJ 5,4 · SC 6,2 · RS 7,2. Quadrados de 0,62" × 0,46" com folga de 0,06" × 0,05".

**Pós-processamento** (depois de `writeFile` e `applyTheme`): remove pontos vazios das séries (lacunas) e mantém número e unidade na mesma linha.

```python
import re, shutil, sys, zipfile
src = sys.argv[1]; tmp = src + ".tmp"
with zipfile.ZipFile(src) as zi, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zo:
    for it in zi.infolist():
        data = zi.read(it.filename)
        if re.match(r"ppt/charts/chart\d+\.xml$", it.filename):   # só dentro de <c:val>: os rótulos vazios do eixo ficam
            limpa = lambda m: re.sub(r'<c:pt idx="\d+"><c:v></c:v></c:pt>', "", m.group(0))
            data = re.sub(r"<c:val>.*?</c:val>", limpa, data.decode("utf-8"), flags=re.S).encode("utf-8")
        if re.match(r"ppt/slides/slide\d+\.xml$", it.filename):
            def nb(m):
                t = m.group(2).replace("R$ ", "R$\u00a0")
                t = re.sub(r"(\d) (mi|mil|min|s|dias|p\.p\.)(?=[\s.,;:)]|$)", "\\1\u00a0\\2", t)
                return m.group(1) + t + m.group(3)
            data = re.sub(r"(<a:t>)(.*?)(</a:t>)", nb, data.decode("utf-8"), flags=re.S).encode("utf-8")
        zo.writestr(it, data)
shutil.move(tmp, src)
```

Depois, rode o `validate.py` da skill `pptx`.

## 10. Limites conhecidos

- `lineDash` vale para o gráfico inteiro, não por série; uma lista corrompe o arquivo. Diferencie séries por cor e espessura.
- Em `AREA`, `barGrouping: "percentStacked"` é ignorado (vira áreas sobrepostas). Use `"stacked"` com valores que já somam 100.
- Cor por ponto (`chartColors` com uma cor por valor) só funciona em série única, inclusive dentro de combos. Em séries múltiplas, crie uma série extra só com o item destacado (empilhada) ou desenhe com formas.
- `null` vira `<c:v></c:v>`; o pós-processamento remove esses pontos (ponto ausente = lacuna). Use `displayBlanksAs: "gap"`, senão a linha atravessa a lacuna.
- Em combos que incluem `AREA` (e em dispersão), o eixo é "midCat": o ponto `i` fica na borda (`mx(i)`), não no centro. `AREA` sozinha usa o centro (`cx(i)`).
- `fill: { type: "none" }` pinta de preto; para "sem preenchimento", omita `fill`. Qualquer aviso `"" is not a valid scheme color` no build é uma forma pintada de preto (cor indefinida, token inexistente): corrija antes de renderizar.
- Medidores e anéis com `DOUGHNUT` dependem do espaçamento interno do gráfico, que muda entre programas; prefira `arcBand`.
- Rótulos nativos usam o separador decimal do Office de quem abre ("48.2" num Office em inglês); textos sobrepostos são fixos. Escreva os sobrepostos no idioma do deck ("48,2").
- Tudo o que foi sobreposto ou desenhado com formas (anotações, pontos, regiões, conectores e as formas marcadas "formas" na seção 5) **não acompanha** uma mudança nos dados. Diga ao usuário quais gráficos são nativos (editáveis) e quais são desenhados.
- A renderização de conferência é feita no LibreOffice; posições batem bem, mas avise que o arquivo não foi aberto no PowerPoint.

## 11. Contextos de trabalho em vendas e pré-vendas

**Arquétipos de slide para vendas a executivos** (os contextos abaixo combinam estes papéis):

1. **Resumo executivo**: a recomendação e três números (resposta antes da explicação).
2. **Custo do problema hoje**: número grande ou gráfico com o pior ponto destacado.
3. **Causa**: onde o problema nasce, culpado em destaque.
4. **Prova**: antes e depois medido (piloto, POC, caso de cliente), com a diferença explícita.
5. **Comparação com a alternativa**: só o critério decisivo destacado; dados verificáveis e fonte.
6. **Retorno**: cascata do investimento ao ganho, ou prazo de retorno em um número.
7. **Próximos passos**: três a cinco ações com dono, data e valor; o slide termina com "Decisão de hoje: …".

Sequências por contexto: use como ponto de partida do roteiro; cada linha é um slide com título de ação próprio. Ajuste ao que os dados realmente mostram.

**Resultado de POC (observabilidade ou software)**, para o comitê que decide a compra:
1. Resumo: números grandes + mini barras (antes × depois: tempo de diagnóstico, MTTR, alertas).
2. Ganho por métrica: halteres (antes × depois) ou inclinação.
3. Prova num incidente real: banda de anomalia → mapa de serviços → rastreamento em cascata.
4. Cobertura e escala: colmeia (itens monitorados e status) ou anéis.
5. Valor: cascata do custo atual ao custo com a solução.
6. Próximos passos: cartões de ação + cronograma da implantação.

**Business case e retorno (ROI)**:
1. Custo do problema hoje: número grande ou barras ordenadas.
2. De onde vem o custo: treemap ou Pareto.
3. Ganho por alavanca: cascata (ponte do custo atual ao futuro).
4. Quando se paga: área acumulada com meta (o cruzamento é o payback).
5. Sensibilidade: halteres (cenário conservador × base).
6. Plano: cronograma (Gantt) + decisão.

**Diagnóstico do ambiente atual (discovery)**:
1. Onde dói: mapa de calor (incidentes por serviço × hora) ou linha do tempo de estados.
2. Quanto custa: orçamento de erros ou número grande.
3. Por que acontece: mapa de serviços (dependências sem visibilidade).
4. Quem sente: funil ou pirulito contra o limite de experiência.
5. Como fica com a solução: halteres (hoje × meta).

**Revisão de conta e expansão (QBR)**:
1. Resultado contra metas: bullet.
2. Adoção no tempo: colunas ou área acumulada.
3. Onde está o uso: treemap ou Pareto (por área, produto ou time).
4. Uso por equipe: tabela com barras e minigráficos.
5. Oportunidade de expansão: cascata ou cartões de ação.

**Comparativo com concorrente e resposta a RFP**:
1. Critérios do cliente: radar (2 entidades) ou halteres por critério.
2. Prova de cada critério decisivo: pirulito com limite ou barras divergentes.
3. Custo total: cascata ou colunas agrupadas.
Só dados verificáveis, com fonte. Mostrar onde se perde também aumenta a credibilidade do resto.

**Pós-incidente para executivos**:
1. Impacto: painéis de indicadores (slide escuro).
2. Quando e quanto: banda de anomalia ou linha com meta e pico.
3. Onde nasceu: mapa de serviços + rastreamento em cascata.
4. Quanto durou e por quê: linha do tempo de eventos.
5. Quanto consumiu do SLO: orçamento de erros.
6. O que muda: cartões de ação.

**Resultado comercial (vendas, marketing, e-commerce)**: resumo (números + mini barras) → histórico (colunas) → de onde veio (cascata) → meta (área acumulada) → dia a dia (linha com região ou calendário) → regiões (mapa em grade) → clientes (waffle, coorte, divergentes) → produtos (barras, treemap, Pareto) → canais (Sankey, barras 100%) → próximos passos (cartões + Gantt).

Ao vivo: poucas palavras e detalhe nas notas. Lido sozinho: "e daí?" em todo slide.

## 12. Crítica de designer (obrigatória antes de entregar)

Olhe as imagens renderizadas como se fossem de outra pessoa e responda, slide a slide:

1. **Três segundos**: qual é a mensagem? Se a resposta não for o título, falta sinal ou sobra ruído.
2. **Para onde o olho vai primeiro?** Deve ser o título, depois o dado destacado. Se for outra coisa, reduza-a.
3. **Título × gráfico**: o número do título está no gráfico, destacado, com o mesmo valor?
4. **Honestidade**: causa sem suporte? barra fora do zero? estimativa vestida de medição?
5. **Forma certa**: a seção 4 escolheria esta forma? Existe uma mais simples que também prova?
6. **Colisões**: algum rótulo encosta em linha, barra, outro rótulo ou no subtítulo? Algum título quebra com palavra órfã?
7. **Espaço**: área vazia grande ao lado de um gráfico pequeno, ou elementos a menos de 0,3" um do outro?
8. **Legenda**: existe alguma? Dá para trocar por rótulo direto ou por uma frase no subtítulo?
9. **Conjunto**: títulos na mesma posição; mesma cor com o mesmo significado; formas variadas; ritmo claro e escuro.
10. **Só os títulos**: lidos em sequência, contam a história e terminam num pedido?
11. **Número e unidade**: algum valor ficou numa linha e a unidade na outra? O subtítulo cabe numa linha?
12. **Build limpo**: o gerador terminou sem avisos de cor e o `validate.py` passou?
13. **Semântica de cor**: alguma cor de status (vermelho, amarelo, laranja, verde) aparece como enfeite, chamada para ação ou fato neutro? Algum problema contra limite ficou em azul? A etiqueta de navegação mudou de cor junto com o status? Cada cor usada passa nas três perguntas de validação da seção 8?

Corrija o que falhar e renderize de novo os slides alterados. Na entrega, diga em poucas linhas: o roteiro (os títulos), o que você assumiu, qualquer afirmação que enfraqueceu por falta de suporte, quais gráficos são nativos e quais são desenhados, e que os elementos sobrepostos não acompanham mudanças nos dados.

## 13. Base conceitual

Princípios de agrupamento da Gestalt; atributos pré-atentivos e "cinza + uma cor" (Cole Nussbaumer Knaflic, Stephen Few, Colin Ware); teste do olhar de três segundos e sinal/ruído (Nancy Duarte); título-frase com evidência visual (Michael Alley); títulos de ação e resposta primeiro (princípio da pirâmide, Barbara Minto); proporção dado/tinta (Edward Tufte); escolha do gráfico pela pergunta (Andy Kirk, Financial Times Visual Vocabulary); treemap "squarified" (Bruls, Huizing e van Wijk).