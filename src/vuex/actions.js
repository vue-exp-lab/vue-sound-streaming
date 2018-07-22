import request from 'axios'

// request.defaults.baseURL = 'http://jsonplaceholder.typicode.com/'

export const getTopics = ({ commit, state }) => {
  return request
    .get('posts')
    .then(response => {
      if (response.statusText === 'OK') {
        commit('TOPICS_LIST', response.data)
      }
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.log(error)
    })
}

export const increment = ({ commit }) => commit('INCREMENT')
export const decrement = ({ commit }) => commit('DECREMENT')
