import 'package:flutter/material.dart';
import '../models/ phases.dart';

class HomePhase extends StatelessWidget {
  final List<Phases> phases;

  HomePhase(this.phases);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.blue[100],
        borderRadius: BorderRadius.only(
            topRight: Radius.circular(50), bottomRight: Radius.circular(50)),
      ),
      padding: EdgeInsets.all(5),
      margin: EdgeInsets.fromLTRB(0, 10, 220, 0),
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              
              child: Text(
                'Fase: ${phases[0].title}',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
            ),
          ]),
    );
  }
}
