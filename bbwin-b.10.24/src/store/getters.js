const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  hospitalId: state => state.user.hospitalId,
  hospitalName: state => state.user.hospitalName,
  hospitalData: state => state.user.hospitalData,
  roles: state => state.user.roles,
  isPrint: state => state.app.isPrint
}
export default getters
