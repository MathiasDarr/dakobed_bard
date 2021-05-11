import queryString from 'query-string';

export default function getCollectionLink({ collection, mode, hash, search }) {
  if(!collection?.collection_id) {
    return null;
  }

  const collection_id = collection.collection_id;

  console.log("I AM IN THE CGET CLOOLECTION LINK ", collection_id)

  return ({
    pathame: `trip_reports/${collection_id}`
  })

}