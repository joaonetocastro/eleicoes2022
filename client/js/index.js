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

var api = {
  getCandidates: makeEndpointFetcher({ url: '/api/candidates'}),
  getCandidatesByCity: makeEndpointFetcher({url: '/api/cities'}),
  getCandidatesByRole: makeEndpointFetcher({url: '/api/roles'}),
  getRoles: makeEndpointFetcher({url: '/api/list/roles'}),
  getCities: makeEndpointFetcher({url: '/api/list/cities'}),
}

function getSelectedCandidates(){
  const checked = document.querySelectorAll('[name=selected_candidates]:checked')
  const candidates = []
  for(const element of checked) {
    candidates.push(({id: element.value, name: element.dataset.name}))
  }
  return candidates
}

var applicationState = {
  getSelectedCandidates
}

function renderResult(candidates) {
  const selectedCandidate = document.querySelector('#select-candidate').value

  const container = document.querySelector('#candidate-container')
  container.replaceChildren()
  for(const candidate of candidates) {
    if(selectedCandidate && candidate.cand_id != selectedCandidate) continue
    const element = document.createElement('div')
    element.classList.add('col-md-3')
    element.innerHTML = `
    <div class="result-card">
      <h1>${candidate.cand_nome}</h1>
      <span>Cargo: ${candidate.cargo_nome}</span>
      <span>Votos: ${candidate.cand_votos}</span>
      <span>Status: ${candidate.cand_status}</span>
    </div>
    `

    container.append(element)
  }
}

function renderCandidateOptions(candidates) {
  const container = document.querySelector('#select-candidate')

  for(const candidate of candidates) {
    const element = document.createElement('option')
    element.value = candidate.cand_id
    element.innerHTML = `${candidate.cand_nome}`

    container.append(element)
  }
}

function loadAndRenderResult() {
  api.getCandidates(renderResult)
}

window.addEventListener("load", (event) => {
  api.getCandidates(renderCandidateOptions)
  loadAndRenderResult()

  document.querySelector('#select-candidate').addEventListener('change', loadAndRenderResult)
});




// TODO:
// 1. O sistema deverá permitir que sejam consultados os resultados das seguintes formas:

// 1.1. Por candidato
// OK ∘Deve ser possível selecionar o candidato por seu nome a partir de uma caixa de edição e/ou uma lista.
// OK ∘No resultado apresentado deve constar nome, cargo, votação e status (eleito ou não eleito).

// 1.2. Por cargo
// ∘Ao se selecionar o cargo desejado a partir de uma lista, deve-se apresentar uma relação de todos os
// candidatos contendo (i) nome, (ii) quantidade de votos recebidos e (iii) status (eleito ou não eleito).
// ∘No resultado apresentado deve constar nome, cargo, votação e status (eleito ou não eleito).

// 1.3. Por município
// ∘Ao se selecionar o município, deve ser exibida a votação de todos os candidatos que receberam votação
// naquele município.
// ∘No resultado apresentado deve constar nome, cargo, votação e status (eleito ou não eleito).
// ∘Ao final do resultado deve ser exibida a totalização dos votos.

// 1.4. Resultado Geral
// ∘Exibir o resultado geral da votação no Estado para todos os cargos eletivos.
// ∘Deve ser possível apresentar a votação global de todos os candidatos ou apenas dos candidatos eleitos.
// ∘A alternância entre “eleitos” e “não eleitos” deve ser implementada utilizando-se a técnica AJAX.
