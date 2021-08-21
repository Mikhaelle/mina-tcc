import 'package:appMina/scenes/LoginScene.dart';
import 'package:appMina/scenes/home/HomeScene.dart';
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
    print(_returnString);
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
    print("aqui");
    switch (_authStatus) {
      case AuthStatus.notLoggedIn:
        print("aqui2");

        retVal = LoginScene();
        break;
      case AuthStatus.loggedIn:
        print("aqui3");

        retVal = HomeScene();
        break;
      default:
    }
    return retVal;
  }
}
