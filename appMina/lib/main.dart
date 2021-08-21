import 'package:appMina/scenes/Root.dart';
import 'package:appMina/states/auth.dart';
import 'package:appMina/scenes/home/HomeScene.dart';
import 'package:appMina/scenes/LoginScene.dart';
import 'package:appMina/scenes/QuizScene.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'scenes/LoginScene.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MinaApp());
}

class MinaApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => Auth(),
      child: MaterialApp(
        theme: ThemeData(
          primaryColor: Color(0xFFFBE8E8),
          accentColor: Color(0xFFE0E5F8),
        ),
        home: OurRoot(),
        routes: <String, WidgetBuilder>{
          "quiz": (BuildContext context) => QuizScene(),
          "home": (BuildContext context) => HomeScene(),
          "login": (BuildContext context) => LoginScene(),
        },
      ),
    );
  }
}
