import requests

url = 'https://datasets.imdbws.com/name.basics.tsv.gz'
r = requests.get(url, allow_redirects=True)

open('name.basics.tsv.gz', 'wb').write(r.content)