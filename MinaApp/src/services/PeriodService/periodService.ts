import firestore from '@react-native-firebase/firestore';

export class PeriodService {
  private static instance: PeriodService | null;
  private _service;

  private constructor(service: any) {
    this._service = service;
  }

  static getInstance(service?: any) {
    if (!PeriodService.instance) {
      PeriodService.instance = new PeriodService(service);
    }
    return PeriodService.instance;
  }

  static destroy() {
    PeriodService.instance = null;
  }

  async getUserPeriods(userId: string) {
    return firestore()
      .collection('Period')
      .doc(userId)
      .get()
      .then(userPeriods => {
        return userPeriods;
      })
      .catch(error => console.log(error));
  }

  async setUserPeriods(docUid: string, newPeriodDate: any) {
    const date = firestore.Timestamp.fromDate(newPeriodDate);
    return firestore()
      .collection('Period')
      .doc(docUid)
      .update({
        periods: firestore.FieldValue.arrayUnion(date),
      })
      .catch(error => console.log(error));
  }
}
