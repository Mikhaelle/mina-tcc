import 'package:appMina/scenes/quiz/QuizScene2.dart';
import 'package:appMina/services/quizDatabase.dart';
import 'package:appMina/states/auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class QuizScene extends StatefulWidget {
  const QuizScene({Key? key}) : super(key: key);

  @override
  _QuizSceneState createState() => _QuizSceneState();
}

class _QuizSceneState extends State<QuizScene> {
  void navigateToNextQuizQuestion(DateTime lastMenses) async {
    Auth _auth = Provider.of<Auth>(context, listen: false);
    QuizDatabse().updateLastMenses(_auth.getCurrentUser!.uid!, lastMenses);
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => QuizScene2(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Text('Configurações iniciais',
                style: TextStyle(color: Colors.grey[900])),
          ],
        ),
        backgroundColor: Theme.of(context).accentColor,
      ),
      body: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                Container(
                  width: MediaQuery.of(context).size.width,
                  padding: EdgeInsets.fromLTRB(20, 25, 20, 20),
                  child: FittedBox(
                    child: Text(
                      'Qual a data da sua ultima menstruação ?',
                      style: TextStyle(fontSize: 24, color: Colors.black),
                    ),
                  ),
                )
              ],
            ),
            Container(
              padding: EdgeInsets.fromLTRB(20, 2, 20, 50),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Theme.of(context).primaryColor,
                ),
                onPressed: () {
                  showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2019),
                    lastDate: DateTime(2024),
                  ).then((date) => navigateToNextQuizQuestion(date!));
                },
                child: Text(
                  'Escolha uma data',
                  style: TextStyle(color: Colors.black),
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                Image(
                  image: AssetImage("images/mina1.png"),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
