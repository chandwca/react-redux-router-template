import axios from 'axios';
//To get all Users
export function fetchUsers() {
  return axios.get('http://localhost:3001/users')
    .then(response => response.data)
    .catch(error => { throw error; });
}
//TO add users
export function addUser(newUser: any) {
    return axios.post('http://localhost:3001/users', newUser)
      .then(response => response.data)
      .catch(error => { throw error; });
  }
  //To Edit users
  export function editUser(userId: number, updatedUserData: any) {
    return axios.put(`http://localhost:3001/users/${userId}`, updatedUserData)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error updating user:', error);
        throw error;
      });
  }
  //To delete users
  export function deleteUser(userId: number) {
    return axios.delete(`http://localhost:3001/users/${userId}`)
      .then(response => response.data)
      .catch(error => { throw error; });
  }
