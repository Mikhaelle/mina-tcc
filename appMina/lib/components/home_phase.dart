import 'package:flutter/material.dart';
import '../models/ phases.dart';

class HomePhase extends StatelessWidget {
  final List<Phases> phases;

  HomePhase(this.phases);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Color(0xFFC9D3F8),
        borderRadius: BorderRadius.only(
            topRight: Radius.circular(50), bottomRight: Radius.circular(50)),
      ),
      padding: EdgeInsets.all(5),
      margin: EdgeInsets.fromLTRB(0, 30, 220, 10),
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              'Fase:',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.grey,
                  fontSize: 16),
            ),
            Container(
              padding: EdgeInsets.fromLTRB(20, 0, 0, 5),
              child: Text(
                phases[0].title,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
            )
          ]),
    );
  }
}
