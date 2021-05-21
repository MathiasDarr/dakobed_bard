import Papa from 'papaparse';
export default function fetchDsvData(url, callback){
  Papa.RemoteChunkSize = 1024 * 100;
  Papa.parse(url, {
    download: true,
    delimter: ',',
    newline: '\n',
    encoding: 'utf-8',
    chunk: callback  
  });
}