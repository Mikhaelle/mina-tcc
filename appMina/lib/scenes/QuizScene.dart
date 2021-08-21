import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class QuizScene extends StatefulWidget {
  const QuizScene({Key? key}) : super(key: key);

  @override
  _QuizSceneState createState() => _QuizSceneState();
}

class _QuizSceneState extends State<QuizScene> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  late User user;
  bool isloggedin = false;

  checkAuthentification() async {
    _auth.authStateChanges().listen((user) {
      if (user == null) {
        Navigator.of(context).pushReplacementNamed("login");
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
