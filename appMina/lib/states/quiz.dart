import 'package:appMina/models/quiz.dart';
import 'package:appMina/services/quizDatabase.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class QuizState with ChangeNotifier {
  late Quiz _currentQuiz;

  Quiz? get getCurrentQuiz => _currentQuiz;

  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<bool> onStartUp() async {
    bool answered = false;

    try {
      User? _firebaseUser = _auth.currentUser!;
      _currentQuiz = await QuizDatabse().getLastQuizInfo(_firebaseUser.uid);
      answered = _currentQuiz.isAnswered!;
    } catch (e) {
      print(e);
    }
    return answered;
  }
}
