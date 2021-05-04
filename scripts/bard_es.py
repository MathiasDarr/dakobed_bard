from elasticsearch import Elasticsearch

es = Elasticsearch(
    [
        'http://localhost:19200/'
    ]
)

index = 'bard-collection-v1'
res = es.search(index=index, body={"query": {"match_all": {}}})
print(res)