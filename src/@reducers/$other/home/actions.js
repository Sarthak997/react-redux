export const PLAYER_ADDED = "PLAYER_ADDED";
export const PLAYER_DELETED = "PLAYER_DELETED";

export const addNewPlayer = (player) => ({
  type: PLAYER_ADDED,
  payload: {
    name: player.name,
    company: player.company,
    status: player.status,
    last_updated: player.last_updated,
    notes: player.notes,
  },
});
export const deletePlayer = (uuid) => (
  console.log(uuid, "uuid"),
  {
    type: PLAYER_DELETED,
    payload: {
      uuid: uuid,
    },
  }
);

const actions = {
  addNewPlayer,
  deletePlayer,
};
export default actions;
