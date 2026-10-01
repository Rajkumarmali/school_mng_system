import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.universityMng',
  appName: 'UniversityMng',
  webDir: 'build',
  
   server: {
        androidScheme: 'http'
    }
};



export default config;
