import { type AppConfig } from '../../server/adapters/ee-core-adapter';

const config: () => AppConfig = () => {
  return {
    openDevTools: {
      mode: 'bottom'
    },
    jobs: {
      messageLog: false
    }
  };
};

export default config;