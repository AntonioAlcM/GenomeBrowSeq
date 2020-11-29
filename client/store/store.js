export const state = {
  query: '',
  tabs: ['all', 'array', 'ncbi'],
  information: '',
  connected: false,
  error: '',
  message: '',
  ncbiResults: [],
  finishNcbiSearch: false,
  arrayResults: [],
  finishArraySearch: false,
  totalResultsNcbi: 0,
  totalResultsArrayExpress: 0,
  tabIndex: 0,
  genome: 'Loading..',
}
export const mutations = {
  setQuery(state, search) {
    state.ncbiResults = []
    state.finishNcbiSearch = false
    state.finishArraySearch = false
    state.totalResultsNcbi = 0
    state.totalResultsArrayExpress = 0
    state.tabIndex = 0
    state.arrayResults = []
    state.query = search
  },
  setNcbiExpedients(state, results) {
    let newResults = results
    if (results.length === 0) {
      newResults = []
    } else {
      newResults = state.ncbiResults.concat(results)
    }
    state.ncbiResults = newResults
  },
  setFinishNcbiSearch(state, data) {
    console.log('---------leggagagagaggagag----------- ', data)
    state.finishNcbiSearch = data.status
  },
  setArrayExpedients(state, results) {
    state.arrayResults = results
  },
  setFinishArraySearch(state, data) {
    state.finishArraySearch = data.status
  },
  setTotalResultsNcbi(state, total) {
    state.totalResultsNcbi = total
  },
  setTotalResultsArrayExpress(state, total) {
    state.totalResultsArrayExpress = total
  },
  setTab(state, index) {
    state.tabIndex = index
  },
  setGenome(state, genome) {
    let value = 'Not available'
    if (
      genome &&
      (genome.genome === 'Loading ...' || genome.genome.length > 0)
    ) {
      value = genome.genome
    }
    state.genome = value
  },
}
export const actions = {
  send_expedients_ncbi({ commit }, data) {
    commit('setNcbiExpedients', data)
  },
  finish_ncbi({ commit }, data) {
    console.log('---------iiiiiiiiiiiiiiiiiiiiiiiiii----------- ', data)
    commit('setFinishNcbiSearch', data)
  },
  send_expedients_array_express({ commit }, data) {
    commit('setArrayExpedients', data)
  },
  finish_array_express({ commit }, data) {
    commit('setFinishArraySearch', data)
  },
  total_results_ncbi({ commit }, data) {
    commit('setTotalResultsNcbi', data)
  },
  total_results_array_express({ commit }, data) {
    commit('setTotalResultsArrayExpress', data)
  },
}
export const getters = {
  getResults: (state) => (tab) => {
    if (tab === 'all') {
      return state.ncbiResults.concat(state.arrayResults)
    } else if (tab === 'ncbi') {
      return state.ncbiResults
    } else if (tab === 'array') {
      return state.arrayResults
    }
    return []
  },
  statusLoading: (state) => (tab) => {
    if (state.tabs[state.tabIndex] === 'all') {
      if (state.finishArraySearch && state.finishNcbiSearch) {
        return false
      } else if (
        state.finishArraySearch &&
        (state.arrayResults.length === 0 || state.arrayResults.length > 0) &&
        state.ncbiResults.length > 0
      ) {
        return false
      } else if (
        state.finishNcbiSearch &&
        (state.ncbiResults.length === 0 || state.ncbiResults.length > 0) &&
        state.arrayResults.length > 0
      ) {
        return false
      }
      return true
    } else if (state.tabs[state.tabIndex] === 'ncbi') {
      if (state.finishNcbiSearch) {
        return false
      } else if (state.ncbiResults.length > 0) {
        return false
      }
      return true
    } else if (state.tabs[state.tabIndex] === 'array') {
      if (state.finishArraySearch) {
        return false
      } else if (state.arrayResults.length > 0) {
        return false
      }
      return true
    }
    return false
  },
}
export const modules = {
  name: 'auth',
  stateFactory: true,
  namespaced: true,
}
