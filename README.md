# Trucker Cap Tone Lab — revisão 2 · 14/10/2026

## Alterações

- Corrigido o corte das imagens na escolha de pedaleira: arte inteira, proporção quadrada, sem esticar. Layout conferido em desktop e celular.
- Somente os 47 guitarristas presentes no PDF fornecido. Busca limitada ao catálogo; não há inclusão de nomes livres.
- Somente cinco estilos: Rock, Blues, Country, Jazz e Fusion. Um artista pode aparecer em mais de um estilo. A classificação é curadoria do Tone Lab; Rock reúne também as referências de pop, funk e metal do documento.
- Catálogos de AMP consultados para as oito pedaleiras. O app prioriza o modelo nativo correspondente. Quando ele não consta, sugere uma alternativa interna com nome real; versões diferentes e pacotes opcionais ficam identificados.
- Não se presume que o usuário tenha capturas importadas. Na M-VAVE, os nomes e números são da lista oficial NEW PRESET; o conteúdo dos slots pode ter sido substituído.
- Kiko: Bassman para clean de Dona, Marshall para crunch, AC30 para drive e solo. Cabinet permanece não identificado, conforme a transcrição.

## Instalação

Extraia o ZIP e abra index.html no navegador. Para publicar, envie todo o conteúdo para a raiz do repositório GitHub e importe na Vercel como Other, sem comando de build. Preserve assets e os arquivos JS. Nenhuma chave de API é necessária. Esta entrega não altera automaticamente o site publicado.

## Fontes e critérios

As fichas dos guitarristas e suas ressalvas vêm de referencias.pdf. A pesquisa nova trata dos modelos das pedaleiras, sem transformar as escolhas de simulação do PDF em equipamento pessoal confirmado.

Cada recomendação mostra sua fonte clicável. Catálogos usados:

| Pedaleira | Fonte |
| --- | --- |
| BOSS GT-10 | Manual BOSS, lista PREAMP, páginas 98–99: https://static.roland.com/assets/media/pdf/GT-10_OM.pdf |
| BOSS GT-100 | Catálogo COSM oficial e versão 2: https://www.boss.info/br/products/gt-100/ |
| POD HD500 | Catálogo oficial e indicação de Model Packs: https://kb.line6.com/all-hd-amp-models-in-order-including-hd-model-packs |
| Matribox II Pro | Manual oficial Sonicake v1.0.1, lista AMP: https://sonicake.oss-cn-shenzhen.aliyuncs.com/res/QME-200/Matribox%20II%20PRO_Online%C2%A0Manual_EN_Firmware%20V1.0.1.pdf |
| GP-200 | Manual oficial Valeton v1.8.0, lista AMP: https://res.valeton.net/Uploads/wp/download/1768360642746.GP-200_Online%C2%A0Manual_EN_Firmware%20V1.8.0.pdf |
| MK300 | Lista oficial NEW PRESET: https://community.m-vave.com/bbs/api/software?file=MK300_en.pdf |
| Black Box | Lista oficial NEW PRESET: https://community.m-vave.com/bbs/api/software?file=ANNBLACKBOX_en.pdf |
| Tank G | Lista oficial NEW PRESET: https://community.m-vave.com/bbs/api/software?file=TANK-G_en.pdf |

Exemplos de correção: Matribox II Pro oferece Calif Star (Lone Star), Bog XT (Ecstasy) e Halen 51 (Peavey 5150). MK300 lista 41MES_CH1, 25JOHNS_CH1/35HIGIAN, 69XC_CL–72XC_HV e 73J2000_CL_FG–76J2000_DS_FG. GP-200 tem L-Star, Bog Blue/Red e EV 51. Na HD500, PV Panama e Jazz Rivet dependem de Model Packs; os modelos Solo-100 dependem do firmware que os adicionou. Não tratar Uberschall como Ecstasy, Rectifier como Mark, Powerball II como primeira versão, nem 5150III como Peavey original.

As alternativas são inferências sonoras do Tone Lab apoiadas em modelos cuja existência foi consultada. A ausência refere-se ao catálogo consultado, não a todos os conteúdos importados ou firmwares possíveis. A classificação “correspondente” identifica o amp modelado, sem prometer timbre idêntico ao artista. Confirme a versão instalada. Os números de regulagem são pontos de partida normalizados; não são regulagens oficiais ou arquivos de preset.

Não foi fornecida imagem do Two-Rock de John Mayer. A ausência é indicada na ficha. Frusciante: imagem de um dos amps; Kiko: imagem do Kemper que hospeda os profiles.

## Validação

- Verificadas 1.504 combinações de guitarrista, pedaleira e tipo de som.
- Navegação real no Chromium: pedaleira → estilo → guitarrista → som.
- Conferidos Ecstasy/MK300 e Lone Star/Matribox, o catálogo de 47 artistas e a lista exata de cinco estilos.
- Imagens sem arquivos quebrados; cartões em proporção 1:1 e object-fit: contain.
- Inspeção visual em 1365 px e 390 px; sem rolagem horizontal nesses tamanhos.

## Estrutura

index.html: apresentação e estilos. app.js: navegação, filtro e seleção de modelos. models.js: modelos internos, fontes e condições. rigs.js: fichas e classificação. assets: imagens WebP. referencias.pdf: fonte fornecida pelo usuário.
