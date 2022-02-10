import * as React from "react";
import { connect } from "react-redux";
import { SignUp } from "@screens/Authentication/SignUp";
import { registerUser } from "@services/user";
import { userActions } from "@reducers/$root/user/actions";
import { bindActionCreators } from "redux";

function Container(props) {
  return <SignUp props={props} />;
}
const mapStateToProps = (state) => {
  const { registering } = state.$root.registration;
  return { registering };
};

// const mapDispatchToProps = (dispatch) => {
//   console.log(dispatch, "dispatch");
//   return bindActionCreators(
//     { register: (user) => userActions.register(user) },
//     dispatch
//   );
// };

const mapDispatchToProps = {
  logout: userActions.logout,
  register: userActions.register,
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
