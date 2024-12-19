import axios from "axios";

const APIKEYS = {
  NEWS_API: import.meta.env.VITE_NEWS_API_KEY,
  GUARDIAN_API: import.meta.env.VITE_GUARDIAN_API_KEY,
  NEWYORK_API: import.meta.env.VITE_NEWYORKTIMES_API_KEY,
};

const APIURL = {
  NEWS_API_URL: "https://newsapi.org/v2/top-headlines",
  GUARDIAN_URL: "https://content.guardianapis.com/search",
  NEWYORK_URL: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
};

export const fetchNewsApiArticles = async (filters) => {
  const response = await axios.get(`${APIURL.NEWS_API_URL}`, {
    params: {
      apiKey: APIKEYS.NEWS_API,
      country: "us",
      ...filters,
    },
  });

  return normalizeAndFilterNewsApiData(response.data.articles);
};

export const fetchGuardianApiArticles = async (filters) => {
  const response = await axios.get(`${APIURL.GUARDIAN_URL}`, {
    params: {
      "api-key": APIKEYS.GUARDIAN_API,
      "show-fields": "all",
      ...filters,
    },
  });

  return normalizeGurdianApiData(response.data.response.results);
};

export const fetchNewYorkApiArticles = async (filters) => {
  const response = await axios.get(`${APIURL.NEWYORK_URL}`, {
    params: {
      "api-key": APIKEYS.NEWYORK_API,
      ...filters,
    },
  });

  return normalizeNewYorkApiData(response.data.response.docs);
};

const normalizeAndFilterNewsApiData = (articles) => {
  return articles
    .filter((article) => {
      return (
        article.title &&
        article.description &&
        article.url &&
        article.urlToImage &&
        article.title !== "[Removed]" &&
        article.description !== "[Removed]" &&
        article.source?.name !== "[Removed]" &&
        article.url !== "https://removed.com" &&
        article.urlToImage !== null
      );
    })
    .map((article) => ({
      id: article?.url,
      title: article?.title,
      description: article?.description,
      url: article?.url,
      source: article?.source?.name || article?.source,
      author: article?.author || "No Author",
      publishedAt: article?.publishedAt,
      category: article?.category,
      urlToImage: article?.urlToImage,
    }));
};

const normalizeGurdianApiData = (articles) => {
  return articles.map((article) => ({
    id: article?.id,
    title: article?.webTitle,
    description: article?.fields?.trailText,
    url: article?.webUrl,
    source: article?.fields?.publication,
    author: article?.author || "No Author",
    publishedAt: article?.webPublicationDate,
    category: article?.sectionName || "No category",
    urlToImage: article?.fields?.thumbnail || "No image found",
  }));
};

const normalizeNewYorkApiData = (articles) => {
  return articles.map((article) => ({
    id: article?._id,
    title: article?.headline?.main,
    description: article?.lead_paragraph,
    url: article?.web_url,
    source: article?.source?.name || article?.source,
    author: article?.byline?.original || "No Author",
    publishedAt: article?.pub_date || article?.webPublicationDate,
    category: article?.sectionName || "No category",
    urlToImage: article?.multimedia?.[0]?.url || "No image found",
  }));
};
