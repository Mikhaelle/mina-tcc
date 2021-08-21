class User {
  String uid;
  String name;
  String email;
  bool quizAnswered;
  String? groupId;

  User({
    required this.uid,
    required this.name,
    required this.email,
    required this.quizAnswered,
    this.groupId,
  });
}
