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

const api = {
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
  document.querySelector('#candidate-container').innerHTML = '';

  const selects = document.querySelectorAll('.form-select');
  selects.forEach(select => select.selectedIndex = 0);

  const groupBy = getResultBy();

  document.querySelector('#select-candidate-container').hidden = true;
  document.querySelector('#select-role-container').hidden = true;
  document.querySelector('#select-city-container').hidden = true;
  document.querySelector('[name=general-status]').hidden = true;
  document.querySelector('#votes-container').hidden = true;

  if (groupBy === 'candidate') {
    document.querySelector('#select-candidate-container').hidden = false;
  } else if (groupBy === 'role') {
    document.querySelector('#select-role-container').hidden = false;
  } else if (groupBy === 'city') {
    document.querySelector('#select-city-container').hidden = false;
    document.querySelector('#votes-container').hidden = false;
  } else if (groupBy === 'general'){
    document.querySelector('[name=general-status]').hidden = false;
    loadAndRenderResult();
  }
}

function renderResult(result) {
  const { data, totalVotes } = result;
  const container = document.querySelector('#candidate-container');

  for (const candidate of data) {
    const element = document.createElement('div');
    element.classList.add('col-md-3');
    element.innerHTML = `
    <div class="card" style="height: 15rem; margin-bottom: 1rem;">
      <div class="card-body shadow p-3">
        <h5 class="card-title">${candidate.cand_nome}</h5>
        <p class="card-subtitle mb-2 text-muted">Cargo: ${candidate.cargo_nome}</p>
        <p class="mb-2"> Votos: ${candidate.cand_votos}</p>
        <p class="mb-2"> Status: ${candidate.cand_status}</p>
      </div>
    </div>
    `;

    if (!!totalVotes) {
      document.querySelector("#votes-text").innerHTML = totalVotes;
    }

    container.append(element);
  }
}

function renderCandidateOptions(result) {
  const { data } = result;
  const container = document.querySelector('#select-candidate');

  for(const candidate of data) {
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
  
  if (groupBy === 'candidate'){
    const selected = getSelectedCandidate();
    if(!selected) return;
    api.getCandidates(renderResult, {
      query: {
        search: selected,
      }
    });
  } else if (groupBy === 'role') {
    api.getCandidatesByRole(renderResult, {
      query: {
        search: getSelectedRole(),
      }
    });
  } else if (groupBy === 'city') {
    api.getCandidatesByCity(renderResult, {
      query: {
        search: getSelectedCity(),
      }
    });
  } else if (groupBy === 'general') {
    const status = getSelectedGeneralStatus();
    const settings = {};
    if (settings) settings.query = {
      status
    };
    api.getCandidates(renderResult, settings);
  }
}

window.addEventListener("load", () => {
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