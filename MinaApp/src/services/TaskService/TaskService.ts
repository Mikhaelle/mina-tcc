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

  async getUserTask(phase: string) {
    return functions()
      .httpsCallable('getRecomendedUserTasks')({
        phase: phase,
      })
      .then(response => {
        if (response.data) {
          return response.data;
        }
      })
      .catch(e => console.log(e));
  }

  async sendUserFeedback(phase: string, feedbacks: any) {
    return functions()
      .httpsCallable('postUserFeedback')({
        phase: phase,
        payload: feedbacks,
      })
      .then(response => {
        console.log(response);
      })
      .catch(e => console.log(e));
  }

  async createUserTasks(
    contraceptiveMethods: boolean,
    hormonalDisorder: boolean,
  ) {
    return functions()
      .httpsCallable('setUserTask')({
        hormonalContraceptiveMethod: contraceptiveMethods,
        hormonalDisorder: hormonalDisorder,
      })
      .catch(e => console.log(e));
  }
}
