import 'package:flutter/foundation.dart';

class User {
  final String id;
  final String name;
  final String email;
  final DateTime cicleDate;
  final int cicleSize;
  final int periodSize;
  final int pmsSize;

  User(
      {@required this.id,
      this.name,
      this.email,
      this.cicleDate,
      this.cicleSize,
      this.periodSize,
      this.pmsSize});
}
