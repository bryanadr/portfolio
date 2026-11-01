# Portfólio — Bryan Adrian

Site estático (HTML, CSS e JavaScript puros). Sem build, sem backend e sem dependências externas.

## Estrutura
```
index.html                 página inicial (somente marcação)
assets/css/style.css       base compartilhada dos 4 apps em projects/
assets/css/home.css        visual da página inicial (autônomo)
assets/js/data.js          textos e dados (terminal, números do Trello, e-mail)
assets/js/ui.js            relógio, toast, copiar e-mail, gráfico
assets/js/terminal.js      terminal interativo
assets/js/chart.js         utilitários de gráfico SVG e escape de HTML (usado também pelos apps)
projects/<app>/            index.html + app.js de cada ferramenta, independentes entre si
```

## Executar
Abra `index.html` no navegador, ou rode `python3 -m http.server` nesta pasta e acesse http://localhost:8000.

## Observações
- `smart-agriculture` usa dados simulados. Não há integração com sensores.
- `bug-report-manager` e `personal-finance` guardam dados no `localStorage` do navegador.
