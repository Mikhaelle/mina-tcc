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
}
