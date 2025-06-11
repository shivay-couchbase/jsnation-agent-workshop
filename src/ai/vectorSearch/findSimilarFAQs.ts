import { FAQ_WITH_ID } from "../../store/faq.ts";
import FeatureExtraction from "../../utils/vectorSearch/FeatureExtraction.ts";
import cosineSimilarity from "../../utils/vectorSearch/cosineSimilarity.ts";

const extractor = new FeatureExtraction();

const findSimilarFAQs = async (query: string, results: number = 4) => {
  const queryVector = await extractor.extract(query);
  const faqs = FAQ_WITH_ID.map(({ questions }) => questions).flat();

  const similarities = faqs.map((faq) => {
    const vector = faq.vectorRepresentationQuestion.allMiniLmL6v2;
    if (vector.length !== queryVector.length) {
      throw new Error("Vector lengths do not match");
    }
    return { faq, similarity: cosineSimilarity(queryVector, vector) };
  });

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, results)
    .map(({ faq }) => faq);
};

export default findSimilarFAQs;
