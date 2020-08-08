import 'package:flutter/material.dart';

class HomeMenu extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              IconButton(
                icon: Icon(Icons.home),
                onPressed: () {
                  print("Home pressed");
                },
              ),
              IconButton(
                icon: Icon(Icons.add_circle),
                onPressed: () {
                  print("Home pressed");
                },
              ),
              IconButton(
                icon: Icon(Icons.account_circle),
                onPressed: () {
                  print("Home pressed");
                },
              )
            ]),
        color: Colors.blue[100]);
  }
}
