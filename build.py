from pathlib import Path
import re
root=Path(__file__).parent
js='\n'.join(re.sub(r'^import .*?;\n','', (root/p).read_text(),flags=re.M).replace('export ','') for p in ['combat-fx.js','data.js','equipment-sets.js','rare-monsters.js','advancement.js','combat-skills.js','progression.js','tower.js','engine.js','save.js','ui.js'])
# one browser module scope: avoid helper name collisions
js=js.replace('exportSave', 'exportSave')
html=(root/'source.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+ (root/'style.css').read_text()+'</style>').replace('<script type="module" src="ui.js"></script>','<script type="module">'+js+'</script>')
(root/'index.html').write_text(html)
