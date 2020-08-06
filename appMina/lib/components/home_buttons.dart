import 'package:flutter/material.dart';

class HomeButtons extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Container(
        decoration: BoxDecoration(
          color: Color(0xFFFBE0C8),
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
        padding: EdgeInsets.all(5),
        margin: EdgeInsets.all(50),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FlatButton(
              child: Text("Previsão do dia"),
              onPressed: () {},
            )
          ],
        ),
      ),
      Container(
        decoration: BoxDecoration(
          color: Color(0xFFFBE0C8),
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
        padding: EdgeInsets.all(5),
        margin: EdgeInsets.all(50),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FlatButton(
              child: Text("Sobre a fase"),
              onPressed: () {},
            )
          ],
        ),
      )
    ]);
  }
}
