#!/usr/bin/env python3
"""Mede o contraste WCAG 2.x entre pares de cores.

Uso:
  python3 scripts/contrast.py 1F5EFF FFFFFF        # um par
  python3 scripts/contrast.py --tokens             # confere os pares do design system Sinal

Regra da skill: texto pede 4,5:1; formas e texto grande (>= 18pt, ou >= 14pt em negrito) pedem 3:1.
"""
import json
import sys
from pathlib import Path


def luminance(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    channels = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]


def ratio(a: str, b: str) -> float:
    la, lb = luminance(a), luminance(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def check_tokens() -> int:
    tokens = json.loads((Path(__file__).resolve().parent.parent / "design-system" / "sinal.tokens.json").read_text())
    ink, paper = tokens["neutral"]["ink"]["$value"], tokens["neutral"]["paper"]["$value"]
    pairs = []
    for group in ("brand", "status"):
        for name, t in tokens[group].items():
            pairs.append((f"{name}.text sobre paper", t["text"]["$value"], paper, 4.5))
            pairs.append((f"{name}.light sobre ink", t["light"]["$value"], ink, 4.5))
            if name == "ciano":  # o fill do ciano é decorativo (mosaico, fundo escuro): não carrega informação sobre branco
                print(f"INFO  {ratio(t['fill']['$value'], paper):5.1f}:1  ciano.fill sobre paper: uso só decorativo, sem mínimo")
                continue
            pairs.append((f"{name}.fill (forma) sobre paper", t["fill"]["$value"], paper, 3.0))
    pairs += [("body sobre paper", tokens["neutral"]["body"]["$value"], paper, 4.5),
              ("ink sobre paper", ink, paper, 4.5),
              ("branco sobre azul (CTA)", "#FFFFFF", tokens["brand"]["azul"]["fill"]["$value"], 4.5)]
    failures = 0
    for label, fg, bg, minimum in pairs:
        r = ratio(fg, bg)
        ok = r >= minimum
        failures += not ok
        print(f"{'OK  ' if ok else 'FALHA'} {r:5.1f}:1  (mín. {minimum}:1)  {label}  {fg} / {bg}")
    return 1 if failures else 0


if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == "--tokens":
        sys.exit(check_tokens())
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(2)
    print(f"{ratio(sys.argv[1], sys.argv[2]):.2f}:1")
