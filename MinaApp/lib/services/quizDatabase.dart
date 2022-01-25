import 'package:appMina/models/quiz.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class QuizDatabse {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  CollectionReference _quiz = FirebaseFirestore.instance.collection("quiz");

  Future<String> createQuiz(Quiz quiz) async {
    String retVal = "error";

    try {
      _quiz.add({
        'uid': quiz.uid,
        'isAnswered': quiz.isAnswered,
        'answeredData': quiz.answeredData,
        'lastMenses': quiz.lastMenses,
        'mensesDuration': quiz.mensesDuration,
        'isRegularCicle': quiz.isRegularCicle,
        'cicloTime': quiz.cicloTime,
        'isHormonalMethod': quiz.isHormonalMethod,
      }).then((value) => print("Quiz Added"));
      retVal = "success";
    } catch (e) {
      print(e);
    }

    return retVal;
  }

  Future<Quiz> getLastQuizInfo(String uid) async {
    Quiz retQuiz = Quiz();

    try {
      QuerySnapshot _querySnapshot = await _quiz
          .where('uid', isEqualTo: uid)
          .orderBy('answeredData')
          .get();
      DocumentSnapshot _docSnapshot = _querySnapshot.docs.last;
      if (_docSnapshot.exists) {
        retQuiz.uid = _docSnapshot.get('uid');
        retQuiz.isAnswered = _docSnapshot.get('isAnswered');
        retQuiz.mensesDuration = _docSnapshot.get('mensesDuration');
        retQuiz.lastMenses = _docSnapshot.get('lastMenses');
        retQuiz.isRegularCicle = _docSnapshot.get('isRegularCicle');
        retQuiz.isHormonalMethod = _docSnapshot.get('isRegularCicle');
        retQuiz.cicloTime = _docSnapshot.get('cicloTime');
        retQuiz.answeredData = _docSnapshot.get('answeredData');
      }
    } catch (e) {
      print(e);
    }
    return retQuiz;
  }

  Future<void> updateLastMenses(String uid, DateTime lastMenses) async {
    try {
      QuerySnapshot _querySnapshot = await _quiz
          .where('uid', isEqualTo: uid)
          .orderBy('answeredData')
          .get();
      DocumentSnapshot _docSnapshot = _querySnapshot.docs.last;
      if (_docSnapshot.exists) {
        _quiz.doc(_docSnapshot.id).update({'lastMenses': lastMenses});
      }
    } catch (e) {
      print(e);
    }
  }
}
