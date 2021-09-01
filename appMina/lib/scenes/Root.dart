import 'package:appMina/scenes/LoginScene.dart';
import 'package:appMina/scenes/quiz/QuizRoot.dart';
import 'package:appMina/states/auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

enum AuthStatus { notLoggedIn, loggedIn }

class OurRoot extends StatefulWidget {
  const OurRoot({Key? key}) : super(key: key);

  @override
  _OurRootState createState() => _OurRootState();
}

class _OurRootState extends State<OurRoot> {
  AuthStatus _authStatus = AuthStatus.notLoggedIn;

  @override
  void didChangeDependencies() async {
    super.didChangeDependencies();

    Auth _currentUser = Provider.of<Auth>(context, listen: false);
    String _returnString = await _currentUser.onStartUp();
    if (_returnString == "success") {
      setState(() {
        _authStatus = AuthStatus.loggedIn;
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
    switch (_authStatus) {
      case AuthStatus.notLoggedIn:
        retVal = LoginScene();
        break;
      case AuthStatus.loggedIn:
        retVal = QuizRoot();
        break;
      default:
    }
    return retVal;
  }
}
