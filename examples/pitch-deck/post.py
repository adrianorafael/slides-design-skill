import re, shutil, sys, zipfile
src = sys.argv[1]; tmp = src + ".tmp"
with zipfile.ZipFile(src) as zi, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zo:
    for it in zi.infolist():
        data = zi.read(it.filename)
        if re.match(r"ppt/charts/chart\d+\.xml$", it.filename):
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
