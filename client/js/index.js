function makeEndpointFetcher(props){
  function endpointFetcher(onSuccess, onError) {
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('loadend', function() {
      const responseBody = JSON.parse(this.responseText);
      if(this.status !== 200) {
        onError(responseBody)
        return
      }
      onSuccess(responseBody)
    })
  
    xhr.open(props.method || 'GET', props.url, true);
    xhr.send();
  }

  return endpointFetcher
}

const api = {
  getCandidates: makeEndpointFetcher({ url: '/api/candidates'}),
  getRoles: makeEndpointFetcher({url: '/api/list/roles'}),
  getCities: makeEndpointFetcher({url: '/api/list/cities'}),
}


window.addEventListener("load", (event) => {
  console.log("Carregou!");
});

api.getCities(console.log, console.error)