import queryString from 'query-string';

export default function getCollectionLink({ collection, mode, hash, search }) {
  if(!collection?.id) {
    return null;
  }
  const collectionId = collection.id;

  return ({
    pathame: ``
  })

}