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
import {useQuiz} from '../QuizContext/QuizContext';

interface IPeriodContext {
  lastPeriod: Date;
  periods: Date[];
  daysOfPeriods: {};
  phase: string;
  isLoading: boolean;
  daysToMark(): Promise<void>;
  phaseToSet(): Promise<void>;
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
  const [daysOfPeriods, setDaysOfPeriods] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState('');

  const {periodDuration, cicleDuration} = useQuiz();

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

  const phaseToSet = async () => {
    setIsLoading(true);
    var daysFolTotal = cicleDuration - 14;
    var daysLutTotal = 14;
    var daysFolPart = Math.round((cicleDuration - 14) / 2);
    var daysLutPart = 7;

    var nowDate = new Date();

    var maxFolIntDate = new Date();
    maxFolIntDate.setDate(lastPeriod.getDate() + daysFolPart);
    var maxFolFinalDate = new Date();
    maxFolFinalDate.setDate(lastPeriod.getDate() + daysFolTotal);
    var maxLutIntDate = new Date();
    maxLutIntDate.setDate(lastPeriod.getDate() + daysFolTotal + daysLutPart);
    var maxLutFinalDate = new Date();
    maxLutFinalDate.setDate(lastPeriod.getDate() + daysFolTotal + daysLutTotal);

    if (nowDate < maxFolIntDate) {
      setPhase('Folicular Inicial');
    } else if (nowDate >= maxFolIntDate && nowDate < maxFolFinalDate) {
      setPhase('Folicular Final');
    } else if (nowDate >= maxFolFinalDate && nowDate < maxLutIntDate) {
      setPhase('Lútea Inicial');
    } else {
      setPhase('Lútea Final');
    }
    setIsLoading(false);
  };

  const daysToMark = async () => {
    var daysFolTotal = cicleDuration - 14;
    var daysLutTotal = 14;

    var daysFolPart = Math.round((cicleDuration - 14) / 2);
    var daysLutPart = 7;

    var calendarDays = {};

    setIsLoading(true);
    for (var i = 0; i < cicleDuration; i++) {
      var date = new Date();
      date.setDate(lastPeriod.getDate() + i);

      const datePeriodString =
        date.getFullYear().toString() +
        '-' +
        ('0' + (date.getMonth() + 1).toString()).slice(-2) +
        '-' +
        ('0' + date.getDate().toString()).slice(-2);
      if (i === 0) {
        calendarDays[datePeriodString] = {
          startingDay: true,
          color: '#F87D6D',
          marked: true,
          dotColor: 'black',
        };
      } else if (i === periodDuration - 1) {
        calendarDays[datePeriodString] = {
          endingDay: true,
          color: '#F87D6D',
          marked: true,
          dotColor: 'black',
        };
      } else if (i < periodDuration) {
        calendarDays[datePeriodString] = {
          color: '#F87D6D',
          marked: true,
          dotColor: 'black',
        };
      } else if (i >= periodDuration && i < daysFolPart) {
        calendarDays[datePeriodString] = {marked: true, dotColor: 'black'};
      } else if (i >= daysFolPart && i < daysFolTotal) {
        calendarDays[datePeriodString] = {marked: true, dotColor: 'red'};
      } else if (i >= daysFolTotal && i < daysFolTotal + daysLutPart) {
        calendarDays[datePeriodString] = {marked: true, dotColor: 'blue'};
      } else {
        calendarDays[datePeriodString] = {marked: true, dotColor: 'yellow'};
      }
    }
    for (var i = 0; i < periodDuration; i++) {
      var newxtDate = new Date();
      console.log(lastPeriod.getDate() + cicleDuration + i - 1);
      newxtDate.setDate(lastPeriod.getDate() + cicleDuration + i - 1);
      console.log(
        newxtDate.getFullYear().toString() +
          '-' +
          ('0' + (newxtDate.getMonth() + 1).toString()).slice(-2) +
          '-' +
          ('0' + newxtDate.getDate().toString()).slice(-2),
      );
      const datePeriodString =
        newxtDate.getFullYear().toString() +
        '-' +
        ('0' + (newxtDate.getMonth() + 1).toString()).slice(-2) +
        '-' +
        ('0' + newxtDate.getDate().toString()).slice(-2);
      if (i === 0) {
        calendarDays[datePeriodString] = {startingDay: true, color: '#F87D6D'};
      } else if (i === periodDuration - 1) {
        calendarDays[datePeriodString] = {endingDay: true, color: '#F87D6D'};
      } else {
        calendarDays[datePeriodString] = {color: '#F87D6D'};
      }
    }
    for (var i = 0; i < cicleDuration; i++) {}

    setIsLoading(false);
    setDaysOfPeriods(calendarDays);
  };

  return (
    <PeriodContext.Provider
      value={{
        lastPeriod,
        periods,
        daysOfPeriods,
        isLoading,
        daysToMark,
        phase,
        phaseToSet,
      }}
      {...props}
    >
      {props.children}
    </PeriodContext.Provider>
  );
};

export {PeriodProvider, PeriodConsumer, usePeriod, PeriodContext};
