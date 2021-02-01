import fs from 'fs';
import rank from '../../../public/rank.json';

export default function rankAPI(request, response) {
  if (request.method === 'GET') {
    const sortedRank = rank.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 1;
      return 0;
    });
    const limit = request.query.limit ? request.query.limit : sortedRank.length;
    response.json(sortedRank.slice(0, limit));
  }
  if (request.method === 'POST') {
    const newRank = [...rank, JSON.parse(request.body)];
    fs.writeFileSync('public/rank.json', JSON.stringify(newRank, null, 2), (error) => console.log(error));
    response.send('ok');
  }
}
