import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

export class TaskService {
  private static instance: TaskService | null;
  private _service;

  private constructor(service: any) {
    this._service = service;
  }

  static getInstance(service?: any) {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService(service);
    }
    return TaskService.instance;
  }

  static destroy() {
    TaskService.instance = null;
  }

  async getUserAnswers() {
    const userAnswers = await firestore().collection('Answer').doc('').get();
  }

  async getUserTask(userId: string) {
    return firestore()
      .collection('RecomendTasks')
      .where('userId', '==', userId)
      .get()
      .then(tasks => {
        console.log(tasks.docs[0].data().groupTaskData.folicularInicial);
        return tasks.docs[0].data().groupTaskData.folicularInicial;
      })
      .catch(e => {
        console.log(e);
      });
  }

  async createUserTasks() {
    return functions()
      .httpsCallable('setUserTask')({
        hormonalContraceptivesComponent: false,
        hormonalDisorder: false,
      })
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(e => console.log(e));
  }
}
