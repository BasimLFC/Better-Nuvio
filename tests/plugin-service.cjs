const assert = require("assert");
const {streams} = require("../plugin-service/src/index.js");

const manifestUrl = "https://example.org/nuvio/manifest.json";
const providerUrl = "https://example.org/nuvio/providers/exemplo.js";
const seriesUrl = "https://example.org/nuvio/providers/series.js";
const fixtures = {
  [manifestUrl]: JSON.stringify({name:"Repo",scrapers:[
    {id:"exemplo",name:"Exemplo",filename:"providers/exemplo.js",supportedTypes:["movie","tv"]},
    {id:"serie",name:"Serie",filename:"providers/antigo.js",codeUrl:"providers/series.js",
      supportedTypes:["series"]},
    {id:"desligado",name:"Desligado",filename:"providers/desligado.js",enabled:false}
  ]}),
  [providerUrl]: "module.exports.getStreams = function(tmdbId,mediaType){ return [{url:'https://example.org/video.m3u8',title:'Filme '+tmdbId,quality:'1080p',headers:{Referer:'https://example.org/','User-Agent':'Player test', 'Sec-CH-UA':'\\\"Browser\\\"'}}] }",
  [seriesUrl]: "module.exports.getStreams = function(tmdbId,mediaType){ return [{url:'https://example.org/series.m3u8',title:'Serie '+tmdbId}] }"
};

(async () => {
  const result = await streams({repositories:[{url:manifestUrl,name:"Repo",enabled:true,repo_type:"NUVIO_JS"}],
    tmdbId:"123",mediaType:"movie",season:1,episode:1}, async url => {
    assert.ok(Object.prototype.hasOwnProperty.call(fixtures,url),url);
    return fixtures[url];
  });
  assert.strictEqual(result.streams.length,1);
  assert.strictEqual(result.streams[0].name,"Filme 123 - 1080p");
  assert.strictEqual(result.streams[0].provider,"Exemplo");
  const series = await streams({repositories:[{url:manifestUrl,name:"Repo",enabled:true,
    repo_type:"NUVIO_JS"}],tmdbId:"456",mediaType:"tv",season:1,episode:2},
    async url => fixtures[url]);
  assert.strictEqual(series.streams.length,2);
  assert.strictEqual(series.streams[1].name,"Serie 456");
  const byImdb = await streams({repositories:[{url:manifestUrl,name:"Repo",enabled:true,
    repo_type:"NUVIO_JS"}],imdb:"tt0137523",mediaType:"movie"}, async url => {
    if (url === "https://v3-cinemeta.strem.io/meta/movie/tt0137523.json")
      return JSON.stringify({meta:{moviedb_id:550}});
    assert.ok(Object.prototype.hasOwnProperty.call(fixtures,url),url);
    return fixtures[url];
  });
  assert.strictEqual(byImdb.streams[0].name,"Filme 550 - 1080p");
  assert.strictEqual(result.streams[0].behaviorHints.proxyHeaders.request.Referer,"https://example.org/");
  assert.strictEqual(result.streams[0].behaviorHints.proxyHeaders.request["User-Agent"],"Player test");
  assert.strictEqual(result.streams[0].behaviorHints.proxyHeaders.request["Sec-CH-UA"],undefined);
  const grouped = await streams({repositories:[{url:manifestUrl,name:"Repo",enabled:true,
    repo_type:"NUVIO_JS"}],tmdbId:"123",mediaType:"movie",groupByRepository:true},
    async url => fixtures[url]);
  assert.strictEqual(grouped.streams[0].provider,"Repo");
  const groupedLocal = await streams({repositories:[{url:manifestUrl,
    name:"Repositório local",enabled:true,repo_type:"NUVIO_JS"}],
    tmdbId:"123",mediaType:"movie",groupByRepository:true},async url => fixtures[url]);
  assert.strictEqual(groupedLocal.streams[0].provider,"Repo");
  const unknown = await streams({repositories:[{url:manifestUrl,name:"Repo",enabled:true,
    repo_type:"UNKNOWN"}],tmdbId:"123",mediaType:"movie"}, async () => {
    throw new Error("Unknown repositories must not be fetched");
  });
  assert.strictEqual(unknown.streams.length,0);
  console.log("plugin-service: ok");
})().then(() => process.exit(0),error => {console.error(error);process.exit(1);});
