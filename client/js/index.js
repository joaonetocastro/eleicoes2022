function getCandidates(onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  const url = "/api/candidates";

  xhr.addEventListener('loadend', function() {
    const responseBody = JSON.parse(this.responseText);
    if(this.status !== 200) {
      onError(responseBody)
      return
    }
    onSuccess(responseBody)
  })

  xhr.open("GET", url, true);
  xhr.send();
}

const api = {
  getCandidates
}


window.addEventListener("load", (event) => {
  console.log("Carregou!");
});

api.getCandidates(console.log, console.error)