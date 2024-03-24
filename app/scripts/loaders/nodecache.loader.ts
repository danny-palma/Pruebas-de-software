import NodeCache from "node-cache";

// Configurar NodeCache
export const CacheClient = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
console.log('Library node-cache loaded!');