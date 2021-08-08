import 'package:appMina/scenes/HomeScene.dart';
import 'package:appMina/scenes/LoginScene.dart';
import 'package:flutter/material.dart';
import 'scenes/LoginScene.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MinaApp());
}

class MinaApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Color(0xFFFBE8E8),
        accentColor: Color(0xFFE0E5F8),
      ),
      home: HomeScene(),
      routes: <String, WidgetBuilder>{
        "login": (BuildContext context) => LoginScene(),
      },
    );
  }
}
