# Especificação do projeto: Slides Design Skill

Documento vivo para quem for continuar o desenvolvimento, inclusive um agente. Descreve o propósito, o escopo, a arquitetura, as decisões já tomadas e o que fica para depois. Atualize junto com cada mudança relevante no `SKILL.md`.

**Versão atual:** 1.0.0 · **Arquivo principal:** `skill/slides-design-skill/SKILL.md`

## 1. Propósito

Fazer o Claude produzir apresentações executivas e de vendas que um executivo entende em segundos: a conclusão no título, a prova no gráfico e nada mais. A skill é a camada de **narrativa, escolha de gráfico e design**. A mecânica do arquivo PowerPoint vem da skill `pptx`.

**Critério de sucesso:** cada slide passa no teste dos três segundos (a mensagem é o título), o título promete exatamente o que o gráfico mostra, nenhuma cor contradiz o significado que a audiência lhe atribui, e o arquivo abre sem reparo.

## 2. Público

- **Quem usa a skill:** profissionais de pré-vendas, vendas e consultoria (Solution Engineers, Account Executives, consultores) que montam decks de POC, business case, QBR, RFP e pós-incidente.
- **Quem lê os slides:** executivos e comitês de decisão, em especial de tecnologia (TI, SRE, arquitetura, CIO/CTO).

## 3. Escopo

**Dentro**

- Criar decks novos em `.pptx` a partir de dados e de uma decisão esperada.
- Revisar decks existentes: reescrever títulos, trocar gráficos, limpar ruído, aplicar o design system.
- Escolher a forma do gráfico entre as 46 do catálogo, com justificativa.
- Aplicar o design system Sinal quando não há template; respeitar o template da marca quando há.
- Criticar o resultado renderizado e corrigir antes de entregar.

**Fora**

- Gerar os dados ou inventar números para preencher slides.
- Formatos que não sejam PowerPoint (Google Slides, Keynote) além do que a skill `pptx` permite.
- Animações e transições.
- Ilustrações figurativas e fotos de pessoas.

## 4. Arquitetura

O projeto é uma skill de arquivo único. O `SKILL.md` é lido pelo Claude e orienta o trabalho; o código vive como receitas dentro dele.

| Seção do `SKILL.md` | Função | Quando mexer |
|---|---|---|
| 1. O que está em jogo | Ordem de prioridade: verdade, clareza, marca, beleza | Raramente |
| 2. Fluxo de trabalho | Decisão → roteiro → ficha → sistema visual → construção → crítica | Ao mudar o processo |
| 3. Títulos de ação | Fórmula, exemplos, trava de honestidade | Ao refinar a escrita |
| 4. Como escolher o gráfico | Verbo do título, formato dos dados, contexto, teste | Ao adicionar famílias |
| 5. Catálogo | 46 formas com Use, Evite, Título-modelo, Destaque, Construir | Ao adicionar ou corrigir formas |
| 6. Percepção | Gestalt, destaque único, rótulos diretos, semântica de cor | Ao mudar regras de percepção |
| 7. Composição | Zonas fixas, etiqueta, painel do "e daí?", ritmo, mosaico | Ao mudar o layout |
| 8. Sistema visual | Modo template e design system Sinal (tokens, tom, validação, tipografia) | Ao mudar cores ou fontes |
| 9. Receitas em pptxgenjs | Base limpa, geometria, componentes, formas livres, treemap, pós-processamento | Ao adicionar formas desenhadas |
| 10. Limites conhecidos | Armadilhas do pptxgenjs e do LibreOffice | Ao descobrir um bug |
| 11. Contextos de vendas | Arquétipos e sequências por contexto | Ao adicionar um contexto |
| 12. Crítica de designer | 13 checagens obrigatórias | Ao adicionar uma regra que precisa ser verificada |
| 13. Base conceitual | Referências teóricas | Ao adotar uma nova referência |

**Dependências em tempo de execução:** skill `pptx` (pptxgenjs, `apply_theme.js`, `validate.py`, conversão para PDF), Node.js, Python 3, LibreOffice e Poppler para a conferência visual.

**Artefatos de apoio neste repositório:** `design-system/sinal.tokens.json` (fonte única dos valores de cor), `scripts/contrast.py` (validação WCAG), `examples/pitch-deck/` (referência visual e de código).

## 5. Design system Sinal (resumo normativo)

Detalhes em `design-system/README.md`. Regras que não podem ser quebradas sem uma nova decisão registrada na seção 8:

1. Cor é significado. Marca usa só azul, ciano e violeta.
2. Vermelho só como status crítico, com o limite escrito no slide.
3. Amarelo, laranja e verde nunca como enfeite, chamada para ação ou fato neutro.
4. Dentro de cada gráfico: cinza mais uma cor (o tom do slide).
5. A etiqueta de seção é navegação e fica sempre azul.
6. Todo par de texto passa em 4,5:1; formas com informação em 3:1. O fill do ciano é decorativo.
7. Aptos é a fonte padrão; Calibri não é usada.
8. Chamada para ação em azul de marca, com botão em pílula.

## 6. Qualidade e testes

**Conferência de cada entrega** (já descrita no `SKILL.md`): `validate.py` sem erros, renderização em imagem, crítica com as 13 checagens e uma rodada de correção.

**Validação do design system:**

```bash
python3 scripts/contrast.py --tokens   # sai com código 1 se algum par falhar
```

**Conjunto de prompts de avaliação** (rode a cada mudança no `SKILL.md` e compare com a versão anterior):

| # | Prompt | O que conferir |
|---|---|---|
| 1 | Deck de resultado de POC com dados de antes e depois | Halteres ou números com mini barras; títulos com número; próximos passos com dono e data |
| 2 | Revisar um deck com títulos de tópico e pizzas de 6 fatias | Antes e depois dos títulos; pizza trocada por barras ordenadas |
| 3 | Business case com payback | Cascata e área acumulada com meta; estimativas marcadas como estimativa |
| 4 | Pós-incidente para executivos | Tom crítico só nos slides de problema; etiqueta continua azul |
| 5 | Deck com template de marca vermelha | Marca respeitada; vermelho da marca não vira destaque de fato neutro |
| 6 | Pitch curto com chamada para ação | CTA em azul com botão; nenhuma cor de alerta |

**Exemplo de referência:** `examples/pitch-deck/` precisa continuar gerando sem avisos de cor e passando no `validate.py`.

## 7. Limites conhecidos

- A conferência roda no LibreOffice, que troca a Aptos por uma fonte mais larga; o PDF fiel sai do PowerPoint.
- Elementos desenhados com formas (anotações, mosaico, formas marcadas "formas" no catálogo) não acompanham mudanças nos dados.
- Rótulos nativos usam o separador decimal do Office de quem abre o arquivo.
- Demais armadilhas técnicas estão na seção 10 do `SKILL.md`.

## 8. Registro de decisões

| Data | Decisão | Motivo | Alternativas descartadas |
|---|---|---|---|
| 2026-11-11 | Renomear a skill para **Slides Design Skill** (`slides-design-skill`) | Nome curto e direto para publicação | Presentation Slides Design Specialist |
| 2026-11-11 | Adotar o design system **Sinal** como padrão interno | Validado no deck de pitch publicado para executivos de tecnologia | Tokens de teste com roxo (monocromático); paleta navy e dourado (pesada); paletas com amarelo e coral (lidas como alerta) |
| 2026-11-11 | Cor é significado: marca fria, vermelho só como status | Executivos de TI leem amarelo, laranja, vermelho e verde como estados de sistema | Uma cor por seção do deck, incluindo cores quentes |
| 2026-11-11 | CTA em azul com botão em pílula | Azul é a cor universal de link e botão: lê-se como convite | CTA em amarelo (lido como "atenção") |
| 2026-11-11 | Aptos como fonte padrão | Preferência do autor; fonte atual do Office | Calibri |
| 2026-11-11 | Painel tingido no "e daí?" e mosaico geométrico como assinatura | Trazer variedade de cor sem tocar no dado | Bolhas decorativas; faixas coloridas |

Registre aqui toda decisão que mude uma regra da seção 5.

## 9. Roadmap

**Próximas versões**

- [ ] Template `.potx` do Sinal com layouts (capa, conteúdo, chamada, escuro) para uso fora do pptxgenjs.
- [ ] Mover os tokens para um arquivo lido pelas receitas, em vez de copiados no código.
- [ ] Variante de status "sucesso" (verde com meta) com exemplo no catálogo.
- [ ] Exemplos adicionais: deck de POC de observabilidade, business case e QBR.
- [ ] Automatizar o conjunto de avaliação da seção 6 (gerar, renderizar e comparar).
- [ ] Checagem automática de semântica de cor no código gerado (detectar amarelo, laranja e verde fora de status).
- [ ] Versão em inglês do `SKILL.md`.

**Ideias em aberto**

- Modo "post de LinkedIn": carrossel em formato quadrado ou retrato a partir do mesmo roteiro.
- Biblioteca de ícones simples alinhada ao mosaico.

## 10. Como continuar o desenvolvimento

1. Abra uma issue descrevendo o problema ou a regra nova, com um slide de exemplo.
2. Edite o `SKILL.md` na seção certa (tabela da seção 4 acima). Mantenha o estilo: frases curtas, regras com motivo, exemplos testados.
3. Se mexer em cor, atualize `design-system/sinal.tokens.json`, rode `scripts/contrast.py --tokens` e registre a decisão na seção 8.
4. Regere o exemplo de referência e confira as imagens.
5. Rode o conjunto de avaliação da seção 6.
6. Atualize `CHANGELOG.md` e a versão no topo deste arquivo.
7. Gere o pacote com `scripts/package.sh` e reinstale a skill.

## 11. Glossário

- **Título de ação:** frase com sujeito, verbo forte e resultado quantificado que afirma a conclusão do slide.
- **"E daí?":** a implicação do dado para a decisão, num painel à direita ou numa linha abaixo do gráfico.
- **Destaque:** o único elemento colorido do gráfico, o dado que prova o título.
- **Tom:** neutro (azul) ou crítico (vermelho), aplicado ao destaque de um slide.
- **Nativo:** gráfico editável do PowerPoint. **Formas:** desenhado com formas, geometria exata, sem planilha de dados.
- **Tinta:** o azul-marinho `#0B1B3F` usado em texto e fundos escuros.
