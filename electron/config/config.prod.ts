import { type AppConfig } from '../../server/adapters/ee-core-adapter';

const config: () => AppConfig = () => {
  return {
    openDevTools: false,
  };
};

export default config;