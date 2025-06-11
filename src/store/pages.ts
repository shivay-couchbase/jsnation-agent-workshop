type Pages = Record<
  string,
  {
    title: string;
    content: string;
    pages: Record<string, { title: string; content: string }>;
  }
>;

export const PAGES: Pages = {
  company: {
    title: "Company",
    content: "This is the company page",
    pages: {
      sustainability: {
        title: "Sustainability",
        content: "This is the sustainability page",
      },
      press: {
        title: "Sustainability",
        content: "This is the press page",
      },
      careers: {
        title: "Careers",
        content: "This is the careers page",
      },
      terms: {
        title: "Terms & Conditions",
        content: "This is the press page",
      },
      privacy: {
        title: "Privacy",
        content: "This is the Privacy page",
      },
    },
  },
  services: {
    title: "Customer Services",
    content: "This is the services page",
    pages: {
      contact: {
        title: "Contact",
        content: "This is the contact page",
      },
      shipping: {
        title: "Shipping",
        content: "This is the shipping page",
      },
      returns: {
        title: "Returns",
        content: "This is the returns page",
      },
      warranty: {
        title: "Warranty",
        content: "This is the warranty page",
      },
      securePayments: {
        title: "Secure Payments",
        content: "This is the secure payments page",
      },
      faq: {
        title: "FAQ",
        content: "This is the FAQ page",
      },
      findStore: {
        title: "Find a store",
        content: "This is the find a store page",
      },
    },
  },
} as const;

export const PAGES_FLAT = Object.entries(PAGES).reduce(
  (acc, [key, page]) => {
    acc[key] = { title: page.title, content: page.content };
    Object.entries(page.pages).forEach(([subKey, subPage]) => {
      acc[`${key}-${subKey}`] = subPage;
    });
    return acc;
  },
  {} as Record<string, { title: string; content: string }>
);
