import 'package:appMina/scenes/Root.dart';
import 'package:appMina/scenes/home/home_widgets/home_buttons.dart';
import 'package:appMina/scenes/home/home_widgets/home_graph.dart';
import 'package:appMina/scenes/home/home_widgets/home_phase.dart';
import 'package:appMina/models/%20phases.dart';
import 'package:appMina/models/user.dart';
import 'package:appMina/states/auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeScene extends StatefulWidget {
  const HomeScene({Key? key}) : super(key: key);

  @override
  _HomeSceneState createState() => _HomeSceneState();
}

class _HomeSceneState extends State<HomeScene> {
  void _signOut() async {
    Auth _auth = Provider.of<Auth>(context, listen: false);
    try {
      String _returnString = await _auth.signOut();
      if (_returnString == "success") {
        Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => OurRoot()),
            (route) => false);
      }
    } catch (e) {
      print(e);
    }
  }

  final _phases = [
    Phases(id: 'f1', title: 'Folicular inicial'),
    Phases(id: 'f2', title: 'Folicular tardia'),
    Phases(id: 'f3', title: 'Lútea inicial'),
    Phases(id: 'f4', title: 'Lútea tardia')
  ];

  final _user =
      OurUser(uid: '1', name: 'Teste', email: 'gmail', quizAnswered: false);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Text('Mina', style: TextStyle(color: Colors.grey[900])),
          ],
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.more_vert),
            onPressed: _signOut,
          )
        ],
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            HomePhase(_phases),
            HomeGraph(),
            HomeButtons(),
          ]),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {},
      ),
    );
  }
}
