import 'package:flutter/material.dart';

class HomeButtons extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Container(
        decoration: BoxDecoration(
          color: Colors.pink[100],
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
        padding: EdgeInsets.all(5),
        margin: EdgeInsets.fromLTRB(60, 0, 60, 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            FlatButton(
              child: Text("PREVISÃO DO DIA"),
              onPressed: () {},
            ),
            Icon(Icons.arrow_forward),
          ],
        ),
      ),
      Container(
        decoration: BoxDecoration(
          color: Colors.pink[100],
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
        padding: EdgeInsets.all(5),
        margin: EdgeInsets.fromLTRB(60, 0, 60, 0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            FlatButton(
              child: Text("SOBRE A FASE"),
              onPressed: () {},
            ),
            Icon(Icons.arrow_forward),
          ],
        ),
      )
    ]);
  }
}
