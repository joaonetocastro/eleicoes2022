function makeEndpointFetcher(props){
  function endpointFetcher(onSuccess, onError, settings = {}) {
    const xhr = new XMLHttpRequest();
    const searchParams = new URLSearchParams(settings.query || {})
    const url = `${props.url}?${searchParams.toString()}`

    xhr.addEventListener('loadend', function() {
      const responseBody = JSON.parse(this.responseText);
      if(this.status !== 200) {
        onError(responseBody)
        return
      }
      onSuccess(responseBody)
    })
  
    xhr.open(props.method || 'GET', url, true);
    xhr.send();
  }

  return endpointFetcher
}

const api = {
  getCandidates: makeEndpointFetcher({ url: '/api/candidates'}),
  getCandidatesByCity: makeEndpointFetcher({url: '/api/cities'}),
  getCandidatesByRole: makeEndpointFetcher({url: '/api/roles'}),
  getRoles: makeEndpointFetcher({url: '/api/list/roles'}),
  getCities: makeEndpointFetcher({url: '/api/list/cities'}),
}


window.addEventListener("load", (event) => {
  console.log("Carregou!");
});

api.getCandidatesByRole(console.log, console.error, {query: {search: 'presidente'}})