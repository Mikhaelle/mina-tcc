import firestore from '@react-native-firebase/firestore';

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
      .collection('UserTasks')
      .where('userId', '==', userId)
      .where('phase', '==', 'folicular inicial')
      .get()
      .then(tasks => {
        return tasks.docs[0].data();
      })
      .catch(e => {
        console.log(e);
      });
  }

  async createUserTasks(uid: any) {
    firestore()
      .collection('UserTasks')
      .add({
        userId: uid,
        phase: 'folicular inicial',
        tasks: {
          study: {
            taskName: 'Estudar',
            taskPrediction: 'downArrow',
          },
          work: {
            taskName: 'Trabalhar',
            taskPrediction: 'downArrow',
          },
          exercise: {
            taskName: 'Exercitar',
            taskPrediction: 'upArrow',
          },
          cleaning: {
            taskName: 'Faxinar',
            taskPrediction: 'horizontalLine',
          },
          read: {
            taskName: 'Ler',
            taskPrediction: 'horizontalLine',
          },
          meetings: {
            taskName: 'Fazer reuniões',
            taskPrediction: 'upArrow',
          },
          socialize: {
            taskName: 'Socializar',
            taskPrediction: 'upArrow',
          },
          write: {
            taskName: 'Escrever',
            taskPrediction: 'upArrow',
          },
          listen: {
            taskName: 'Ouvir música',
            taskPrediction: 'upArrow',
          },
          whatch: {
            taskName: 'Assisti séries/tv',
            taskPrediction: 'upArrow',
          },
          draw: {
            taskName: 'Desenhar',
            taskPrediction: 'horizontalLine',
          },
          create: {
            taskName: 'Criar',
            taskPrediction: 'horizontalLine',
          },
        },
      });
  }
}
