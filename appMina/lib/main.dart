import 'package:appMina/components/home_buttons.dart';
import 'package:appMina/components/home_graph.dart';
import 'package:appMina/components/home_menu.dart';
import 'package:appMina/components/home_phase.dart';
import 'package:appMina/models/%20phases.dart';
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_core/core.dart';

import 'models/user.dart';

void main() {
  SyncfusionLicense.registerLicense(
      "NT8mJyc2IWhia31hfWN9Z2doYmF8YGJ8ampqanNiYmlmamlmanMDHmg+Ojg7MjEmNj08EzQ+Mjo/fTA8Pg==");
  runApp(MinaApp());
}

class MinaApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomePage(),
      theme: ThemeData(
        primarySwatch: Colors.pink,
        accentColor: Colors.blue,
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  final _phases = [
    Phases(id: 'f1', title: 'Folicular inicial'),
    Phases(id: 'f2', title: 'Folicular tardia'),
    Phases(id: 'f3', title: 'Lútea inicial'),
    Phases(id: 'f4', title: 'Lútea tardia')
  ];

  final _user = User(
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
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Mina', style: TextStyle(color: Colors.grey[900])),
            ],
          ),
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
        bottomNavigationBar: BottomAppBar(child: HomeMenu()));
  }
}
