/* const documents = [
  "i love coffee free free",
  "coffee with milk and sugar i i",
  "free tea for everyone i",
];
const queries = [
  "i like black coffee without milk",
  "everyone loves new year",
  "mary likes black coffee without milk",
]; */

const documents = [
  "i like dfs and bfs",
  "i like dfs dfs",
  "i like bfs with bfs and bfs",
];
const queries = ["dfs dfs dfs dfs bfs"];

const generateIndex = (documents) => {
  const wordsIndex = new Map();
  for (let d = 0; d < documents.length; d++) {
    const words = documents[d].split(" ");
    for (const word of words) {
      if (!wordsIndex.has(word)) {
        wordsIndex.set(word, new Map([[d, 1]]));
      } else {
        const docMap = wordsIndex.get(word);
        docMap.set(d, (docMap.get(d) || 0) + 1);
      }
    }
  }
  return wordsIndex;
};

const searchSystem = (documents, queries) => {
  const index = generateIndex(documents);
  const results = [];

  for (const query of queries) {
    const relevance = new Map();
    const uniqueQueryWords = Array.from(new Set(query.split(" "))); // Только уникальные слова

    for (const word of uniqueQueryWords) {
      if (index.has(word)) {
        for (const [docId, count] of index.get(word)) {
          relevance.set(docId, (relevance.get(docId) || 0) + count);
        }
      }
    }

    const sorted = Array.from(relevance.entries())
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1]; // Сначала по релевантности
        return a[0] - b[0]; // При равенстве - по номеру документа
      })
      .slice(0, 5)
      .map(([docId]) => docId + 1); // Нумерация с 1

    results.push(sorted);
  }

  return results;
};

console.log(searchSystem(documents, queries));
