import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

export class QuizService {
  private static instance: QuizService | null;
  private _service;

  private constructor(service: any) {
    this._service = service;
  }

  static getInstance(service?: any) {
    if (!QuizService.instance) {
      QuizService.instance = new QuizService(service);
    }
    return QuizService.instance;
  }

  static destroy() {
    QuizService.instance = null;
  }

  async getBankBillsAmountDays() {
    return;
  }

  async getUserQuizInfos() {
    return functions()
      .httpsCallable('getUserQuizInfos')()
      .then(response => {
        return response;
      })
      .catch(e => console.log(e));
  }

  async setUserQuizInfo(
    uid: any,
    answeredQuiz: boolean,
    lastPeriodDate: any,
    periodDuration: number,
    cicleDuration: number,
    regularCicle: boolean,
    contraceptiveMethods: boolean,
    tpmSymptoms: boolean,
    humorChange: boolean,
    behaviorChange: boolean,
  ) {
    const date = new Date(lastPeriodDate.date);
    firestore()
      .collection('Quiz')
      .add({
        userId: uid,
        isAnswered: answeredQuiz,
        lastPeriod: date,
        periodDuration: periodDuration,
        cicleDuration: cicleDuration,
        regularCicle: regularCicle,
        contraceptiveMethods: contraceptiveMethods,
        tpmSymptoms: tpmSymptoms,
        humorChange: humorChange,
        behaviorChange: behaviorChange,
      })
      .then(() => {
        firestore()
          .collection('Period')
          .add({
            userId: uid,
            periods: [date],
          });
      });
  }
}
