import 'package:appMina/components/home_buttons.dart';
import 'package:appMina/components/home_phase.dart';
import 'package:appMina/models/%20phases.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MinaApp());
}

class MinaApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: HomePage());
  }
}

class HomePage extends StatelessWidget {
  final _phases = [
    Phases(id: 'f1', title: 'Folicular inicial'),
    Phases(id: 'f2', title: 'Folicular tardia'),
    Phases(id: 'f3', title: 'Lútea inicial'),
    Phases(id: 'f4', title: 'Lútea tardia')
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Mina')),
        body: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              HomePhase(_phases),
              Card(
                child: Text('grafico'),
              ),
              HomeButtons(),
            ]));
  }
}
