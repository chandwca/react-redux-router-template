import axios from 'axios';

export function fetchUsers() {
  return axios.get('http://localhost:3001/users')
    .then(response => response.data)
    .catch(error => { throw error; });
}

export function addUser(newUser: any) {
    return axios.post('http://localhost:3001/users', newUser)
      .then(response => response.data)
      .catch(error => { throw error; });
  }
  export function editUser(userId: number, updatedUserData: any) {
    return axios.put(`http://localhost:3001/users/${userId}`, updatedUserData)
      .then(response => response.data)
      .catch(error => { throw error; });
  }
  export function deleteUser(userId: number) {
    return axios.delete(`http://localhost:3001/users/${userId}`)
      .then(response => response.data)
      .catch(error => { throw error; });
  }
