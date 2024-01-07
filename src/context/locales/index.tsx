import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { REGIONS } from './constants';
import { locales } from '@/constants/locales';

export type LocaleData = typeof locales.english;

interface initialStateType {
  language: string;
  setLanguage: Dispatch<SetStateAction<REGIONS>>;
  localeData: LocaleData;
}

const LocaleContext = createContext<initialStateType | null>(null);

export const useLocaleContext = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
};

const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(REGIONS.EN);
  const localeData =
    language === REGIONS.EN ? locales.english : locales.belarusian;

  return (
    <LocaleContext.Provider value={{ language, setLanguage, localeData }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
