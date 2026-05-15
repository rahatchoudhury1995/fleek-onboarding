const KEY = 'fleek_onboarding';

export const getState = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
};

export const setState = (data) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable — app functions without persistence
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // no-op
  }
};
