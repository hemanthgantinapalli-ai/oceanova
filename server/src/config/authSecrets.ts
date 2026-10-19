const getSecret = (name: string, developmentFallback: string): string => {
  const secret = process.env[name];
  if (secret) return secret;

  if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
    throw new Error(`${name} must be configured in production.`);
  }

  return developmentFallback;
};

export const getJwtSecret = (): string =>
  getSecret('JWT_SECRET', 'oceanova_blue_economy_jwt_secret_key_2026');

export const getRefreshSecret = (): string =>
  getSecret('REFRESH_SECRET', 'oceanova_refresh_token_secret_2026');
