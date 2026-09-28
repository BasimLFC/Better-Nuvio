"""Cobertura da tela de Ajustes. Ver tests/ajustes_secoes.sh."""
import re
import sys

fonte = open(sys.argv[1], encoding="utf-8").read()

corpo = re.search(r"typedef enum \{(.*?)\n\} OpcaoId;", fonte, re.S).group(1)
corpo = re.sub(r"//[^\n]*", "", corpo)
opcoes = [n.strip() for n in corpo.split(",") if n.strip() and n.strip() != "AJ_N"]

tabela = re.search(r"static const Item TELA\[\] = \{(.*?)\n\};", fonte, re.S).group(1)
tabela = re.sub(r"//[^\n]*", "", tabela)
# Os itens na ordem em que aparecem: SEC(...), GRP(...), ROT(...), OPC(AJ_X).
itens = re.findall(r'\b(SEC|GRP|ROT|OPC)\(\s*("(?:[^"\\]|\\.)*"|AJ_[A-Z_0-9]+)', tabela)

falhas = []
if not itens:
    falhas.append("nenhum item encontrado em TELA[]")
elif itens[0][0] != "SEC":
    falhas.append("TELA[] nao comeca por uma categoria (SEC)")

na_tela = [v for t, v in itens if t == "OPC"]
ocultas_legadas = {
    "AJ_RAIL", "AJ_RAIL_MODERNA", "AJ_RAIL_BLUR",
    "AJ_COR_LOGO",  # automatico no tema dinamico
    "AJ_DESCOBRIR",  # a barra lateral deixou de existir
    "AJ_FIL_LIMITE", "AJ_FIL_ORDEM",  # controles reunidos em Addons > Reordenar Home
    "AJ_STALKER_PORTAL", "AJ_STALKER_MAC", "AJ_STALKER_LIMPAR",
    "AJ_XTREAM_SERVIDOR", "AJ_XTREAM_USUARIO", "AJ_XTREAM_SENHA",
    "AJ_XTREAM_LIMPAR",  # portais ocultos da tela de Conteudo
}
for op in opcoes:
    n = na_tela.count(op)
    if op in ocultas_legadas and n:
        falhas.append("%s e legado e nao deve aparecer em TELA[]" % op)
    elif n == 0 and op not in ocultas_legadas:
        falhas.append("%s nao aparece em TELA[]: a opcao some da TV" % op)
    elif n > 1:
        falhas.append("%s aparece %d vezes em TELA[]" % (op, n))
for op in na_tela:
    if op not in opcoes:
        falhas.append("TELA[] cita %s, que nao existe no enum" % op)

# Categoria ou grupo sem nenhuma opcao seria um alvo de foco que nao leva a nada.
abertos = {}   # "SEC" / "GRP" -> [nome, opcoes]
for t, v in itens + [("SEC", "<fim>")]:
    fecha = ("SEC", "GRP") if t == "SEC" else ("GRP",) if t in ("GRP", "ROT") else ()
    for tipo in fecha:
        if tipo in abertos:
            nome, n = abertos.pop(tipo)
            if n == 0:
                falhas.append("%s %s vazio(a) em TELA[]" % (tipo, nome))
    if t in ("SEC", "GRP"):
        abertos[t] = [v, 0]
    elif t == "OPC":
        for tipo in abertos:
            abertos[tipo][1] += 1

# Uma frase de ajuda por categoria, na mesma ordem.
ajuda = re.search(r"static const char \*SECAO_AJUDA\[\] = \{(.*?)\n\};", fonte, re.S).group(1)
n_ajuda = len(re.findall(r'^\s*"', ajuda, re.M))
n_sec = sum(1 for t, _ in itens if t == "SEC")
if n_ajuda != n_sec:
    falhas.append("%d categorias e %d frases em SECAO_AJUDA" % (n_sec, n_ajuda))

if falhas:
    for f in falhas:
        print("FALHA: " + f)
    sys.exit(1)

print("PASS: %d opcoes de Ajustes em %d categorias, cada uma exatamente uma vez."
      % (len(opcoes) - len(ocultas_legadas), n_sec))
