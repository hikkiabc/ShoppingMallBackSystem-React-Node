export default {
  saveuser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  },
  getuser() {
    return JSON.parse(localStorage.getItem('user'))
  },
  removeuser() {
    localStorage.removeItem('user')
  }
}