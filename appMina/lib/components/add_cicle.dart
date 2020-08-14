import 'package:flutter/material.dart';

class AddCicle extends StatelessWidget {
  /*_showDatePicker() {
    showDatePicker(
        context: context,
        initialDate: DateTime.now(),
        firstDate: DateTime(2019),
        lastDate: DateTime.now());
  }*/

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}
