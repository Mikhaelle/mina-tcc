import 'package:appMina/components/home_buttons.dart';
import 'package:appMina/components/home_graph.dart';
import 'package:appMina/components/home_phase.dart';
import 'package:appMina/models/%20phases.dart';
import 'package:appMina/models/user2.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class HomeScene extends StatefulWidget {
  const HomeScene({Key? key}) : super(key: key);

  @override
  _HomeSceneState createState() => _HomeSceneState();
}

class _HomeSceneState extends State<HomeScene> {
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

  getUser() async {
    User? firebaseUser = _auth.currentUser;
    await firebaseUser?.reload();
    firebaseUser = _auth.currentUser;

    if (!mounted) return;
    if (firebaseUser != null) {
      setState(() {
        this.user = firebaseUser!;
        this.isloggedin = true;
      });
    }
  }

  signOut() async {
    await _auth.signOut();
    final googleSignIn = GoogleSignIn();
    await googleSignIn.signOut();
  }

  @override
  void initState() {
    super.initState();
    this.checkAuthentification();
    this.getUser();
  }

  final _phases = [
    Phases(id: 'f1', title: 'Folicular inicial'),
    Phases(id: 'f2', title: 'Folicular tardia'),
    Phases(id: 'f3', title: 'Lútea inicial'),
    Phases(id: 'f4', title: 'Lútea tardia')
  ];

  final _user = User2(
      id: '1',
      name: 'Teste',
      email: 'gmail',
      periodSize: 4,
      cicleDate: DateTime.now().subtract(Duration(days: 1)),
      cicleSize: 28);

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
            onPressed: signOut,
          )
        ],
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            HomePhase(_phases),
            HomeGraph(_user),
            HomeButtons(),
          ]),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {},
      ),
    );
  }
}
