import 'dart:js';

import 'package:flutter/material.dart';

import 'add_cicle.dart';

class HomeMenu extends StatefulWidget {
  @override
  _HomeMenuState createState() => _HomeMenuState();
}

class _HomeMenuState extends State<HomeMenu> {
  _openAddNewCicle(BuildContext context) {
    showModalBottomSheet(
        context: context,
        builder: (_) {
          return AddCicle();
        });
  }

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
                onPressed: () => _openAddNewCicle(context),
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
