import React, {
  createContext,
  useState,
  useContext,
  Context,
  useEffect,
} from 'react';
import {PeriodService} from '../../services/PeriodService/periodService';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../AuthContext/AuthContext';

interface IPeriodContext {
  lastPeriod: Date;
  periods: Date[];
}

const PeriodContext: Context<IPeriodContext> = createContext(undefined as any);
const PeriodConsumer = PeriodContext.Consumer;
const usePeriod = () => useContext(PeriodContext);

const PeriodProvider: React.FC<{periodService: PeriodService}> = props => {
  const period = props;
  const {user} = useAuth();
  const navigation = useNavigation();

  const [lastPeriod, setLastPeriod] = useState(new Date());
  const [periods, setPeriods] = useState([new Date()]);

  useEffect(() => {
    if (user) {
      period.periodService.getUserPeriods(user.uid).then(userPeriods => {
        userPeriods.forEach((period: any) => {
          let newPeriod = period.toDate();
          setPeriods(periods => [...periods, newPeriod]);
        });
        let date = userPeriods.sort().reverse();
        date = date[0].toDate();
        setLastPeriod(date);
      });
    }
  }, [user]);

  return (
    <PeriodContext.Provider value={{lastPeriod, periods}} {...props}>
      {props.children}
    </PeriodContext.Provider>
  );
};

export {PeriodProvider, PeriodConsumer, usePeriod, PeriodContext};
