const {
  data: { baseX }
} = ateos;

const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const base58 = baseX(ALPHABET);

export default ateos.asNamespace(base58);
