import { updateUsers } from '@seeds/user-seed';

export async function runSeeds(): Promise<void> {
  await updateUsers();
}
