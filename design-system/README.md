# Design system Sinal

Padrão interno da Slides Design Skill quando o usuário não traz template nem marca. Os valores estão em [`sinal.tokens.json`](sinal.tokens.json); o contraste é conferido por [`../scripts/contrast.py`](../scripts/contrast.py).

## Regra-mãe: cor é significado

A audiência principal são executivos de tecnologia. Para eles, algumas cores já chegam com significado fixo, aprendido em painéis de TI. O sistema separa duas famílias:

- **Cor de marca** (navegação, identidade, categorias): só tons frios, que não carregam alerta.
- **Cor de status** (o que o dado diz): aparece só quando o dado tem aquele sentido.

## Cores

| Cor | Fill | Texto sobre branco | Tom claro | Sobre fundo tinta | Papel |
|---|---|---|---|---|---|
| Azul | `#1F5EFF` | `#1F5EFF` (5,1:1) | `#E8EEFF` | `#8FB0FF` (7,9:1) | Confiança e ação; é a cor de link e de botão. Destaque padrão, CTA, etiquetas |
| Ciano | `#0BA5D8` | `#0779A6` (4,9:1) | `#E0F6FC` | `#5CD3F5` (9,7:1) | Energia tecnológica. Formas, mosaico, fundo escuro |
| Violeta | `#6E56F8` | `#6E56F8` (4,8:1) | `#EEEBFF` | `#B3A6FF` (7,9:1) | Variedade: categorias, mosaico, cartões |
| Vermelho crítico | `#D92D20` | `#D92D20` (4,8:1) | `#FDECEA` | `#FF7A6E` (6,6:1) | Só quando o dado viola um limite (SLO, prazo, capacidade) |
| Tinta | `#0B1B3F` | 16,9:1 | | | Títulos, texto, fundo dos slides de painéis e fechamento |

Neutros: `body #4A5568`, `mid #8A94A6`, `mute #D3D8E0`, `hair #E6EAF0`, `tint #F4F6F9`, `paper #FFFFFF`; em fundo tinta, `darkCard #1A2B55` e `soft #C3CCE0`.

## Fora do sistema como enfeite

| Cor | Significado que já tem em TI | Consequência |
|---|---|---|
| Amarelo | atenção | Uma chamada para ação em amarelo é lida como placa de alerta |
| Laranja | alerta | Idem |
| Verde | saudável | Só como status de meta cumprida, com a meta escrita no slide |

## Tom do destaque

Cada slide tem um tom: **neutro** (azul) ou **crítico** (vermelho). O tom vale para o trecho destacado do título, o dado destacado, a anotação e o painel do "e daí?". A etiqueta de seção não muda: é navegação, fica sempre azul.

Use crítico só quando o título afirma um problema contra um limite: entrega atrasada contra o prometido, SLO violado, Apdex ruim, causa raiz, saturação.

## Validação de uma cor nova

1. Que significado essa cor já tem para a audiência?
2. O lugar onde ela vai entrar pede esse significado?
3. O contraste passa? Texto pede 4,5:1; formas com informação e texto grande pedem 3:1.

Se uma resposta falhar, a cor não entra.

## Elementos de marca

- **Mosaico**: grade de ladrilhos com quadrados, círculos, quartos e meias-luas em azul, ciano, violeta, tinta e tons claros. Grande na capa (3 × 3, ladrilhos de 1,55"), pequeno na chamada para ação e no fechamento.
- **Etiqueta em pílula** no antetítulo, fundo `#E8EEFF` e texto `#1F5EFF`.
- **Botão em pílula** branco com texto azul na chamada para ação.
- **Cartões categóricos** alternando azul, ciano e violeta (tom claro no fundo, tom forte no número).

## Tipografia

Aptos em títulos e texto, regular e negrito. Título de ação 28pt, capa 42pt, número do "e daí?" 46pt, texto 15–16pt, antetítulo 11pt. Não usar Calibri.
