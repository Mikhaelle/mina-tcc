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

  async createUserTasks() {
    return functions()
      .httpsCallable('setUserTask')({
        hormonalContraceptivesComponent: false,
        hormonalDisorder: false,
      })
      .catch(e => console.log(e));
  }
}
