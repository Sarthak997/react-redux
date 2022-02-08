import { PLAYER_ADDED, PLAYER_DELETED } from "./actions";

let id = 1;

export const initialState = [
  {
    uuid: id++,
    name: "Wayne Rooney",
    company: "DC United",
    status: "Active",
    last_updated: "7/12/2017",
    notes: "ManUtd Highest scorer",
  },
  {
    uuid: id++,
    name: "Ryan Giggs",
    company: "Manchester United",
    status: "Closed",
    last_updated: "5/08/2011",
    notes: "Most matches Played",
  },
  {
    uuid: id++,
    name: "Wayne Rooney",
    company: "DC United",
    status: "Active",
    last_updated: "7/12/2017",
    notes: "ManUtd Highest scorer",
  },
];

const reducer = (state = initialState, action) => {
  if (action.type === PLAYER_ADDED) {
    const player = { uuid: id++, ...action.payload };
    return [...state, player];
  }

  if (action.type === PLAYER_DELETED) {
    console.log(action.payload.uuid, "payload delete");
    return state.filter((player) => {
      return player.uuid !== action.payload.uuid;
    });
  }

  return state;
};
export default reducer;
