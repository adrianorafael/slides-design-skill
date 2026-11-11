# Como contribuir

Obrigado por querer melhorar a Slides Design Skill. Antes de mexer, leia o [SPEC.md](SPEC.md): ele explica a arquitetura, as regras que não podem ser quebradas e as decisões já tomadas.

## Fluxo

1. Abra uma issue com o problema ou a proposta e, se possível, um slide de exemplo (antes e depois).
2. Crie um branch a partir de `main`.
3. Edite `skill/slides-design-skill/SKILL.md` na seção correspondente (tabela na seção 4 do SPEC).
4. Se mexer em cores, atualize `design-system/sinal.tokens.json` e rode:
   ```bash
   python3 scripts/contrast.py --tokens
   ```
5. Regere o exemplo em `examples/pitch-deck/` e confira as imagens.
6. Rode os prompts de avaliação da seção 6 do SPEC e descreva o resultado no pull request.
7. Atualize `CHANGELOG.md`.

## Estilo do SKILL.md

- Frases curtas e diretas, em português.
- Toda regra vem com o motivo ou com o que usar no lugar.
- Exemplos e títulos-modelo precisam ter sido testados num deck real.
- Nada de valor de cor solto: só tokens.
- Divergências da skill `pptx` ficam marcadas com "(difere da pptx)".

## Regras do design system

Mudanças que contrariem uma regra da seção 5 do SPEC só entram com uma linha nova no registro de decisões (seção 8), explicando o motivo e as alternativas.
