import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/Users/giovanni/Lavoro/Web/Web/Clienti/DavideVassallo/tina/__generated__/.cache/1774174891962', url: 'http://localhost:4001/graphql', token: 'dummy-token', queries,  });
export default client;
  