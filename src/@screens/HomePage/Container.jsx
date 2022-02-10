import React from "react";
import { connect } from "react-redux";
import HomePage from "./HomePage";
import actions from "@reducers/$other/home/actions";
import { bindActionCreators } from "redux";
// import { registerUser } from "@services/user";
import { userActions } from "@reducers/$root/user/actions";

function Container(props) {
  return <HomePage props={props} />;
}
// console.log(actions, "from home reducer");
// const mapDispatchToProps = (dispatch, ownProps) => {
//   console.log(ownProps, "dispatch props own props");
//   return bindActionCreators(
//     {
//       addNewPlayer: actions.addNewPlayer,
//       deletePlayer: () => dispatch(actions.deletePlayer(ownProps.uuid)),
//     },
//     dispatch
//   );
// };
const mapDispatchToProps = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};
const mapStateToProps = (state) => {
  const { users, authentication } = state.$root;
  const { user } = authentication;
  return { user, users };
  return {
    data: state.$other.home,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
