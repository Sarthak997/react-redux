import * as React from "react";
import { connect } from "react-redux";
import { LoginPage } from "@screens/Authentication/Login";
import { userActions } from "@reducers/$root/user/actions";
import { bindActionCreators } from "redux";

function Container(props) {
  return <LoginPage props={props} />;
}
const mapStateToProps = (state) => {
  const { loggingIn } = state.$root.authentication;
  return { loggingIn };
};

// const mapDispatchToProps = (dispatch) => {
//   console.log(dispatch, "dispatch");
//   return bindActionCreators(
//     { register: (user) => userActions.register(user) },
//     dispatch
//   );
// };

const mapDispatchToProps = {
  login: userActions.login,
  logout: userActions.logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
