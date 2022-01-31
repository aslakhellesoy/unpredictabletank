type NewSquad = {
  name: string;
};

export async function createSquad(squad: NewSquad) {
  console.log('Create squad', squad)
}