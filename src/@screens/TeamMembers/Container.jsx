import React from "react";
import { connect } from "react-redux";
import TeamMembers from "./TeamMembers";
import actions from "@reducers/$other/home/actions";
import { bindActionCreators } from "redux";
// import { registerUser } from "@services/user";

function Container(props) {
  console.log(props, "here");
  return (
    <TeamMembers
      data={props.data}
      addNewPlayer={props.addNewPlayer}
      deletePlayer={props.deletePlayer}
    />
  );
}
console.log(actions, "from home reducer");
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
  addNewPlayer: actions.addNewPlayer,
  deletePlayer: actions.deletePlayer,
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    data: state.$other.home,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
