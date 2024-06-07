export default async function fetchVStorageData(
  subPath = '',
  dataMode: boolean | undefined = false,
  node?: any,
  height?: any
) {
  const mode = dataMode ? 'data' : 'children';
  let path = `/custom/vstorage/${mode}/`;

  if (subPath.length) {
    path = `${path}${subPath}`;
  }
  
  console.log('path', path)

  const options = {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'abci_query',
      params: { 
        path,
        height: height && height.toString()
      },
    }),
  };
  
  console.log(`Request Payload: ${JSON.stringify(options)}`);

  try {
    const res = await fetch((node || 'https://main.rpc.agoric.net'), options);
    const json = await res.json();
    const vResponse = json.result.response;

    if (vResponse.value){
      const parsedValue = JSON.parse(atob(vResponse.value));
  
      if (!dataMode) {
        if (parsedValue.children.length) {
          console.log('>>> ' + parsedValue.children.length + ' Children');
          console.log(parsedValue.children)  
          return parsedValue.children;        
        }

        console.warn('>>> No children');
        console.warn('Now trying data...');
        return await fetchVStorageData(subPath, true, node, height);
      }

      // show data          
      const values = JSON.parse(parsedValue.value).values;    

      const newValues = Object.entries(JSON.parse(values)).map((([key, value]: any)=> {
        if (key === 'body') {
          // remove initial #
          return JSON.parse(value.slice(1));
        }
        return value;
      }))

      console.log('newValues', newValues)

      return newValues;
    } else {
      console.log('>>> No value');
      console.log(vResponse.log);
    }
  } catch (error: any) {
    console.error(
      'Error fetching vstorage data:',
      error.response ? error.response.data : error.message
    );
    return null;
  }
}