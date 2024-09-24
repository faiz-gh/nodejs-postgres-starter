import PocketBase from 'pocketbase';

const pb = new PocketBase("https://pocketbase.faizghanchi.com")

await pb.admins.authWithPassword(process.env.PB_EMAIL, process.env.PB_PASSWORD);

export default pb;