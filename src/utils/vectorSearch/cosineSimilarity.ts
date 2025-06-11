const calculateMagnitude = (embedding: Array<number>): number => {
  let sumOfSquares = 0;
  for (const val of embedding) {
    sumOfSquares += val * val;
  }
  return Math.sqrt(sumOfSquares);
};

const getCosineSimilarityScore = (
  dotProduct: number,
  magnitudeA: number,
  magnitudeB: number
): number => dotProduct / (magnitudeA * magnitudeB);

const normalizeScore = (score: number): number => (score + 1) / 2;

const cosineSimilarity = (input1: Array<number>, input2: Array<number>) => {
  let dotProduct = 0;
  for (let i = 0; i < input1.length; i++) {
    dotProduct += input1[i] * input2[i];
  }

  return normalizeScore(
    getCosineSimilarityScore(
      dotProduct,
      calculateMagnitude(input1),
      calculateMagnitude(input2)
    )
  );
};

export default cosineSimilarity;
