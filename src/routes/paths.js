// ----------------------------------------------------------------------
const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: `${ROOTS.DASHBOARD}/english`,
    blog: {
      root: `${ROOTS.DASHBOARD}/blog`,
      details: (id) => `${ROOTS.DASHBOARD}/blog/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/blog/${id}/edit`,
    },
    file: `${ROOTS.DASHBOARD}/joke-manager`,
    code: `${ROOTS.DASHBOARD}/code-manager`,
    mind: {
        root: `${ROOTS.DASHBOARD}/mind`,
        edit: (id) => `${ROOTS.DASHBOARD}/mind/${id}/edit`,
    },
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    word: `${ROOTS.DASHBOARD}/word`,
    diary: `${ROOTS.DASHBOARD}/diary`,
  },
};
