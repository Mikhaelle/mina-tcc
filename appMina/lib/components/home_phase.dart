import 'package:flutter/material.dart';
import '../models/ phases.dart';

class HomePhase extends StatelessWidget {
  final List<Phases> phases;

  HomePhase(this.phases);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(children: <Widget>[
        Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.only(
                topRight: Radius.circular(50),
                bottomRight: Radius.circular(50)),
          ),
          elevation: 5,
          child: Text(
            'Fase: ${phases[0].title}',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
          ),
        ),
      ]),
    );
  }
}
