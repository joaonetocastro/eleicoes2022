function makeEndpointFetcher(props){
  function endpointFetcher(onSuccess, settings = {}, onError) {
    const xhr = new XMLHttpRequest();
    const searchParams = new URLSearchParams(settings.query || {});
    const url = `${props.url}?${searchParams.toString()}`;

    xhr.addEventListener('loadend', function() {
      const responseBody = JSON.parse(this.responseText);
      if(this.status !== 200) {
        onError(responseBody);
        return;
      }
      onSuccess(responseBody);
    })
  
    xhr.open(props.method || 'GET', url, true);
    xhr.send();
  }

  return endpointFetcher;
}

var api = {
  getCandidates: makeEndpointFetcher({ url: '/api/candidates'}),
  getCandidatesByCity: makeEndpointFetcher({url: '/api/cities'}),
  getCandidatesByRole: makeEndpointFetcher({url: '/api/roles'}),
  getRoles: makeEndpointFetcher({url: '/api/list/roles'}),
  getCities: makeEndpointFetcher({url: '/api/list/cities'}),
}

function getSelectedGeneralStatus() {
  return document.querySelector('[name=general-status]').value;
}

function getSelectedCandidate() {
  return document.querySelector('#select-candidate').value;
}

function getSelectedRole() {
  return document.querySelector('#select-role').value;
}

function getSelectedCity() {
  return document.querySelector('#select-city').value;
}

function getResultBy(){
  return document.querySelector('[name=search_result_by]:checked').value;
}

function renderFilterOptions(){
  const groupBy = getResultBy();

  document.querySelector('#select-candidate-container').hidden = true;
  document.querySelector('#select-role-container').hidden = true;
  document.querySelector('#select-city-container').hidden = true;
  document.querySelector('[name=general-status]').hidden = true;

  if (groupBy === 'candidate') {
    document.querySelector('#select-candidate-container').hidden = false;
  }else if (groupBy === 'role') {
    document.querySelector('#select-role-container').hidden = false;
  }else if (groupBy === 'city') {
    document.querySelector('#select-city-container').hidden = false;
  }else if (groupBy === 'general'){
    document.querySelector('[name=general-status]').hidden = false;
    loadAndRenderResult()
  }
}

function renderResult(candidates) {
  const container = document.querySelector('#candidate-container');
  for(const candidate of candidates) {
    const element = document.createElement('div');
    element.classList.add('col-md-3');
    element.innerHTML = `
    <div class="card" style="height: 15rem; margin-bottom: 1rem;">
      <div class="card-body shadow p-3">
        <h5 class="card-title">${candidate.cand_nome}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Cargo: ${candidate.cargo_nome}</h6>
        <p> Votos: ${candidate.cand_votos}</p>
        <p> Status: ${candidate.cand_status}</p>
      </div>
    </div>
    `;

    container.append(element);
  }
}

function renderCandidateOptions(candidates) {
  const container = document.querySelector('#select-candidate');

  for(const candidate of candidates) {
    const element = document.createElement('option');
    element.value = candidate.cand_nome;
    element.innerHTML = `${candidate.cand_nome}`;

    container.append(element);
  }
}

function renderRoleOptions(roles) {
  const container = document.querySelector('#select-role');

  for(const role of roles) {
    const element = document.createElement('option');
    element.value = role.nome;
    element.innerHTML = `${role.nome}`;

    container.append(element);
  }
}

function renderCityOptions(cities) {
  const container = document.querySelector('#select-city');

  for(const city of cities) {
    const element = document.createElement('option');
    element.value = city.nome;
    element.innerHTML = `${city.nome}`;

    container.append(element);
  }
}

function loadAndRenderResult() {
  document.querySelector('#candidate-container').replaceChildren();
  const groupBy = getResultBy();
  
  if(groupBy === 'candidate'){
    const selected = getSelectedCandidate();
    if(!selected) return;
    api.getCandidates(renderResult, {
      query: {
        search: selected,
      }
    })
  } else if (groupBy === 'role') {
    api.getCandidatesByRole(renderResult, {
      query: {
        search: getSelectedRole(),
      }
    })
  } else if (groupBy === 'city') {
    api.getCandidatesByCity(renderResult, {
      query: {
        search: getSelectedCity(),
      }
    })
  } else if (groupBy === 'general') {
    const status = getSelectedGeneralStatus();
    const settings = {};
    if(settings) settings.query = {status};
    api.getCandidates(renderResult, settings);
  }
}

window.addEventListener("load", (event) => {
  api.getCandidates(renderCandidateOptions);
  api.getRoles(renderRoleOptions);
  api.getCities(renderCityOptions);

  loadAndRenderResult();
  renderFilterOptions();

  document.querySelector('#select-candidate').addEventListener('change', loadAndRenderResult);
  document.querySelector('#select-role').addEventListener('change', loadAndRenderResult);
  document.querySelector('#select-city').addEventListener('change', loadAndRenderResult);
  document.querySelector('[name=general-status]').addEventListener('change', loadAndRenderResult);

  Array.from(document.querySelectorAll('[name=search_result_by]')).map(element => element.addEventListener('change', renderFilterOptions));
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
