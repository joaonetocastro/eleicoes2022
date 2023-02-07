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
  getCandidates: makeEndpointFetcher({ url: '/api/candidates'})
}


window.addEventListener("load", (event) => {
  console.log("Carregou!");
});

api.getCandidates(console.log, console.error)