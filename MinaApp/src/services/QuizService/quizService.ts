import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

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

  async getUserAnswers() {
    const userAnswers = await firestore().collection('Answer').doc('').get();
  }

  async getUserQuizInfos(userId: string) {
    const userQuiz = await firestore()
      .collection('Quiz')
      .where('userId', '==', userId)
      .get();
    return userQuiz.docs[0].data();
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
