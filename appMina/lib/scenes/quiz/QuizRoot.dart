import 'package:appMina/scenes/LoginScene.dart';
import 'package:appMina/scenes/quiz/QuizScene.dart';
import 'package:appMina/scenes/home/HomeScene.dart';
import 'package:appMina/states/quiz.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

enum QuizStatus { notAnswered, Answered }

class QuizRoot extends StatefulWidget {
  const QuizRoot({Key? key}) : super(key: key);

  @override
  _QuizRootState createState() => _QuizRootState();
}

class _QuizRootState extends State<QuizRoot> {
  QuizStatus _quizStatus = QuizStatus.notAnswered;

  @override
  void didChangeDependencies() async {
    super.didChangeDependencies();

    QuizState _currentQuiz = Provider.of<QuizState>(context, listen: false);
    bool _answered = await _currentQuiz.onStartUp();
    if (_answered) {
      setState(() {
        _quizStatus = QuizStatus.Answered;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    this.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    Widget retVal = LoginScene();
    switch (_quizStatus) {
      case QuizStatus.notAnswered:
        retVal = QuizScene();
        break;
      case QuizStatus.Answered:
        retVal = HomeScene();
        break;
      default:
    }
    return retVal;
  }
}
