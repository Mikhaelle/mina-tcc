import 'package:appMina/models/user.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class OurDatabase {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  CollectionReference _users = FirebaseFirestore.instance.collection("users");

  Future<String> createUser(OurUser user) async {
    String retVal = "error";

    try {
      _users.doc(user.uid).set({
        'name': user.name,
        'email': user.email,
        'photoUrl': user.photoUrl,
        'quizAnswered': user.quizAnswered,
        'groupId': user.groupId
      }).then((value) => print("User Added"));
      retVal = "success";
    } catch (e) {
      print(e);
    }

    return retVal;
  }

  Future<OurUser> getUserInfo(String uid) async {
    OurUser retVal = OurUser();

    try {
      DocumentSnapshot _docSnapshot = await _users.doc(uid).get();
      if (_docSnapshot.exists) {
        retVal.uid = uid;
        retVal.name = _docSnapshot.get("name");
        retVal.email = _docSnapshot.get("email");
        retVal.groupId = _docSnapshot.get("groupId");
        retVal.quizAnswered = _docSnapshot.get("quizAnswered");
      }
    } catch (e) {
      print(e);
    }
    return retVal;
  }
}
