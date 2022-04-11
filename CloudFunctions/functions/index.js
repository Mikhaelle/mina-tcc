// The Cloud Functions for Firebase SDK to
// create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const { user } = require("firebase-functions/v1/auth");
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.getUserQuizInfos = functions.https.onCall((snap, context) => {
  console.log("auth :" + context.auth.uid);
  return admin.firestore().collection("Quiz").doc(context.auth.uid)
      .get().then((userQuiz)=>{
          return userQuiz.data();
      });
});

exports.setUserTask = functions.https.onCall(async (data, context) => {
  const hormonalContraceptiveMethod = data.hormonalContraceptiveMethod
  const hormonalDisorder = data.hormonalDisorder

  console.log ('hormonal: ' +hormonalContraceptiveMethod +', disorder: ' +hormonalDisorder)
  let userGroup = ''
  if (hormonalContraceptiveMethod){
    userGroup = 'group1'
  }else if(!hormonalContraceptiveMethod && !hormonalDisorder){
    userGroup = 'group2'
  }else if(!hormonalContraceptiveMethod && hormonalDisorder){
    userGroup = 'group3'
  }else{
    userGroup = 'group4'
  }
  console.log('group: ' + userGroup)
  admin.firestore().collection("InitialUserTasks").doc("InitialTasks")
  .get().then(groupTasks =>{
    console.log('aqui')
    const groupTasksData = groupTasks.data()
    admin.firestore().collection('UserTasks').doc(context.auth.uid)
    .set({groupTasksData, group:userGroup, userId:context.auth.uid, hasFeedback:false})
  })
});


exports.getRecomendedUserTasks = functions.https.onCall(async (data, context) => {
  const phase = data.phase
  const userTask = await admin.firestore().collection('UserTasks').doc(context.auth.uid)
  .get()
  const userRecomendedTask = await admin.firestore().collection('GroupTasks').doc(userTask.data().group)
    .get()
    let result= {}
    if(phase === 'Folicular Inicial'){
      console.log('Folicular Inicial')
      result= userRecomendedTask.data().folicularInicial;
    }else if (phase === 'Folicular Final'){
      console.log('Folicular Final')
      result= userRecomendedTask.data().folicularFinal;
    }else if (phase === 'Lútea Inicial'){
      console.log('Lútea Inicial')
      result= userRecomendedTask.data().luteaInicial;
    }else{
      console.log('Lútea Final')
      result= userRecomendedTask.data().luteaFinal;
    }
    

  return result

});
// 0 mais dificil, 1 neutro, 2 mais facil
//exports.postUserFeedback = functions.https.onCall(async (data, context) => {
exports.postUserFeedback = functions.https.onRequest(async (req, res) => {
  const phase = 'Folicular Inicial'

  const userFeedback = [
    {"taskName": "cleaning", "taskVote": "neutral"},
    {"taskName": "create", "taskVote": "difficult"},
    {"taskName": "draw", "taskVote": "difficult"}, 
    {"taskName": "exercise", "taskVote": "difficult"}, 
    {"taskName": "listen", "taskVote": "difficult"}, 
    {"taskName": "meetings", "taskVote": "difficult"}, 
    {"taskName": "read", "taskVote": "difficult"}, 
    {"taskName": "socialize", "taskVote": "difficult"}, 
    {"taskName": "study", "taskVote": "difficult"}, 
    {"taskName": "watch", "taskVote": "easy"}, 
    {"taskName": "work", "taskVote": "difficult"}, 
    {"taskName": "write", "taskVote": "difficult"}]

  let numberOfInversionGroup1 = [];
  let numberOfInversionGroup2 = [];
  let numberOfInversionGroup3 = [];
  let numberOfInversionGroup4 = [];

  let group1 = await admin.firestore().collection("GroupTasks").doc("group1").get();
  group1 = group1.data()
  let group2 = await admin.firestore().collection("GroupTasks").doc("group2").get();
  group2 = group2.data()
  let group3 = await admin.firestore().collection("GroupTasks").doc("group3").get();
  group3 = group3.data()
  let group4 = await admin.firestore().collection("GroupTasks").doc("group4").get();
  group4 = group4.data()

  const userTasksRef = await admin.firestore().collection('UserTasks').doc('S8lxeXkvr2cEZYkFDZ6XsGhdISw2').get()

  const docUi = userTasksRef.id

  const mostVotedType = (userTask) =>{
    let userMostVoted = 'neutral'
    if(userTask.difficultPoints > userTask.neutralPoints 
      && userTask.difficultPoints > userTask.easyPoints){
        userMostVoted = 'difficult'
    } else if (userTask.easyPoints > userTask.neutralPoints 
      && userTask.easyPoints > userTask.neutralPoints){
        userMostVoted = 'easy'
    }else{
      userMostVoted = 'neutral'
    }
    return userMostVoted
  }

  const countInversions= (userMostVoted, groupMostVoted)=>{
    if (userMostVoted === groupMostVoted){
      return 0
    } else if( groupMostVoted === 'neutral' || userMostVoted === 'neutral'){
      return 1
    } else{
      return 2
    }
  }

  const updateInversionLists = (userTask, group1Task, group2Task, group3Task, group4Task)=>{
    const userMostVotedType = mostVotedType(userTask)
    const group1MostVotedType = groupMostVotedType(group1Task)
    const group2MostVotedType = groupMostVotedType(group2Task)
    const group3MostVotedType = groupMostVotedType(group3Task)
    const group4MostVotedType = groupMostVotedType(group4Task)
    const group1Inversions = countInversions(userMostVotedType, group1MostVotedType)
    const group2Inversions = countInversions(userMostVotedType, group2MostVotedType)
    const group3Inversions = countInversions(userMostVotedType, group3MostVotedType)
    const group4Inversions = countInversions(userMostVotedType, group4MostVotedType)
    numberOfInversionGroup1.push(group1Inversions)
    numberOfInversionGroup2.push(group2Inversions)
    numberOfInversionGroup3.push(group3Inversions)
    numberOfInversionGroup4.push(group4Inversions)
  }

  const updateUserPoints = (userTask, taskVote) =>{
    if(taskVote === 'difficult'){
      userTask.difficultPoints = userTask.difficultPoints + 1;
    }else if(taskVote === 'neutral'){
      userTask.neutralPoints = userTask.neutralPoints + 1;
    }else if (taskVote == 'easy'){
      userTask.easyPoints =  userTask.easyPoints + 1
    }
  }

  const groupMostVotedType = (groupTask) =>{
    let groupMostVoted = 'neutral'
    if(groupTask.difficultPoints > groupTask.neutralPoints 
      && groupTask.difficultPoints > groupTask.easyPoints){
        groupMostVoted = 'difficult'
    } else if (groupTask.easyPoints > groupTask.neutralPoints 
      && groupTask.easyPoints > groupTask.neutralPoints){
        groupMostVoted = 'easy'
    }else{
      groupMostVoted = 'neutral'
    }
    return groupMostVoted
  }

  const calcForPhase = (userFeedback,userTasks, group1Tasks, group2Tasks,group3Tasks,group4Tasks) =>{
    userFeedback.forEach(feedback => {
      switch (feedback.taskName) {
        case 'cleaning':
          updateUserPoints(userTasks.cleaning,feedback.taskVote)
          updateInversionLists(userTasks.cleaning, group1Tasks.cleaning, group2Tasks.cleaning, group3Tasks.cleaning, group4Tasks.cleaning)
          break;
        case 'create':
          updateUserPoints(userTasks.create,feedback.taskVote)
          updateInversionLists(userTasks.create, group1Tasks.create, group2Tasks.create, group3Tasks.create, group4Tasks.create)
          break;
        case 'draw':
          updateUserPoints(userTasks.draw,feedback.taskVote)
          updateInversionLists(userTasks.draw, group1Tasks.draw, group2Tasks.draw, group3Tasks.draw, group4Tasks.draw)
        break;
        case 'exercise':
          updateUserPoints(userTasks.exercise,feedback.taskVote)
          updateInversionLists(userTasks.exercise, group1Tasks.exercise, group2Tasks.exercise, group3Tasks.exercise, group4Tasks.exercise)
        break;
        case 'listen':
          updateUserPoints(userTasks.listen,feedback.taskVote)
          updateInversionLists(userTasks.listen, group1Tasks.listen, group2Tasks.listen, group3Tasks.listen, group4Tasks.listen)
        break;
        case 'meetings':
          updateUserPoints(userTasks.meetings,feedback.taskVote)
          updateInversionLists(userTasks.meetings, group1Tasks.meetings, group2Tasks.meetings, group3Tasks.meetings, group4Tasks.meetings)
        break;
        case 'read':
          updateUserPoints(userTasks.read,feedback.taskVote)
          updateInversionLists(userTasks.read, group1Tasks.read, group2Tasks.read, group3Tasks.read, group4Tasks.read)
        break;
        case 'socialize':
          updateUserPoints(userTasks.socialize,feedback.taskVote)
          updateInversionLists(userTasks.socialize, group1Tasks.socialize, group2Tasks.socialize, group3Tasks.socialize, group4Tasks.socialize)
        break;
        case 'study':
          updateUserPoints(userTasks.study,feedback.taskVote)
          updateInversionLists(userTasks.study, group1Tasks.study, group2Tasks.study, group3Tasks.study, group4Tasks.study)
        break;
        case 'watch':
          updateUserPoints(userTasks.whatch,feedback.taskVote)
          updateInversionLists(userTasks.whatch, group1Tasks.whatch, group2Tasks.whatch, group3Tasks.whatch, group4Tasks.whatch)
        break;
        case 'work':
          updateUserPoints(userTasks.work,feedback.taskVote)
          updateInversionLists(userTasks.work, group1Tasks.work, group2Tasks.work, group3Tasks.work, group4Tasks.work)
        break;
        case 'write':
          updateUserPoints(userTasks.write,feedback.taskVote)
          updateInversionLists(userTasks.write, group1Tasks.write, group2Tasks.write, group3Tasks.write, group4Tasks.write)
        break;
        default:
          break;
      }
    })
  }

  const bestGroup= (userActualGroup)=>{
    let totalInversionGroup1= numberOfInversionGroup1.reduce((a, b) => a + b, 0)
    let totalInversionGroup2= numberOfInversionGroup2.reduce((a, b) => a + b, 0)
    let totalInversionGroup3= numberOfInversionGroup3.reduce((a, b) => a + b, 0)
    let totalInversionGroup4= numberOfInversionGroup4.reduce((a, b) => a + b, 0)

    console.log("Inversion Group 1: " + totalInversionGroup1 + " Inversion Group 2: " + totalInversionGroup2 + " Inversion Group 3: " + totalInversionGroup3 + " Inversion Group 4: " + totalInversionGroup4)
    if(totalInversionGroup1 < totalInversionGroup2 
      && totalInversionGroup1 < totalInversionGroup3 
      && totalInversionGroup1 < totalInversionGroup4 ){
        return 'group1'
    }else if(totalInversionGroup2 < totalInversionGroup1 
      && totalInversionGroup2 < totalInversionGroup3 
      && totalInversionGroup2 < totalInversionGroup4){
        return 'group2'
    }else if(totalInversionGroup3 < totalInversionGroup1 
      && totalInversionGroup3 < totalInversionGroup2 
      && totalInversionGroup3 < totalInversionGroup4){
        return 'group4'
    }else if(totalInversionGroup4 < totalInversionGroup1 
      && totalInversionGroup4 < totalInversionGroup2 
      && totalInversionGroup4 < totalInversionGroup3){
        return 'group4'
    }else{
      return userActualGroup
    }
  }
  const removeTaskPoints = (taskVote,userTasks, group) =>{
    console.log('userTasks: '+ userTasks + ' group: '+ group)
    if(taskVote === 'difficult'){
      group.difficultPoints = group.difficultPoints - userTasks.difficultPoints;
    }else if(taskVote === 'neutral'){
      group.neutralPoints = group.neutralPoints - userTasks.difficultPoints;
    }else if (taskVote == 'easy'){
      group.easyPoints =  group.easyPoints - userTasks.easyPoints
    }

    if(group.difficultPoints > group.easyPoints && group.difficultPoints > group.neutralPoints){
      group.taskPrediction = 'downArrow'
    }else if(group.easyPoints > group.difficultPoints && group.easyPoints > group.neutralPoints){
      group.taskPrediction = 'upArrow'
    }else{
      group.taskPrediction = 'horizontalLine'
    }
  }

  const removeGroupPointsInLastGroup = (userFeedback,userTasks, group)=>{
    userFeedback.forEach(feedback => {
      switch (feedback.taskName) {
        case 'cleaning':
          removeTaskPoints(feedback.taskVote, userTasks, group.cleaning)
        case 'create':
          removeTaskPoints(feedback.taskVote,userTasks,  group.create)
          break;
        case 'draw':
          removeTaskPoints(feedback.taskVote,userTasks, group.draw)
        break;
        case 'exercise':
          removeTaskPoints(feedback.taskVote, userTasks, group.exercise)
          break;
        case 'listen':
          removeTaskPoints(feedback.taskVote, userTasks, group.listen)
        break;
        case 'meetings':
          removeTaskPoints(feedback.taskVote, userTasks, group.meetings)
        break;
        case 'read':
          removeTaskPoints(feedback.taskVote, userTasks, group.read)
        break;
        case 'socialize':
          removeTaskPoints(feedback.taskVote,userTasks, group.socialize)
          break;
        case 'study':
          removeTaskPoints(feedback.taskVote, userTasks,group.study)
        break;
        case 'watch':
          removeTaskPoints(feedback.taskVote,userTasks, group.whatch)
        break;
        case 'work':
          removeTaskPoints(feedback.taskVote,userTasks, group.work)
        break;
        case 'write':
          removeTaskPoints(feedback.taskVote,userTasks, group.write)
        break;
        default:
          break;
      }
    })
  }

  const updateGroupPoints = (taskVote, groupTasks) =>{
    if(taskVote === 'difficult'){
      groupTasks.difficultPoints = groupTasks.difficultPoints + 1;
    }else if(taskVote === 'neutral'){
      groupTasks.neutralPoints = groupTasks.neutralPoints + 1;
    }else if (taskVote === 'easy'){
      groupTasks.easyPoints =  groupTasks.easyPoints + 1
    }

    if(groupTasks.difficultPoints > groupTasks.easyPoints && groupTasks.difficultPoints > groupTasks.neutralPoints){
      groupTasks.taskPrediction = 'downArrow'
    }else if(groupTasks.easyPoints > groupTasks.difficultPoints && groupTasks.easyPoints > groupTasks.neutralPoints){
      groupTasks.taskPrediction = 'upArrow'
    }else{
      groupTasks.taskPrediction = 'horizontalLine'
    }
  }

  const addUserPointsInNewGroup = (userFeedback, groupTasks)=>{
    userFeedback.forEach(feedback => {
      switch (feedback.taskName) {
        case 'cleaning':
          updateGroupPoints(feedback.taskVote, groupTasks.cleaning)
        case 'create':
          updateGroupPoints(feedback.taskVote,  groupTasks.create)
          break;
        case 'draw':
          updateGroupPoints(feedback.taskVote, groupTasks.draw)
        break;
        case 'exercise':
          updateGroupPoints(feedback.taskVote, groupTasks.exercise)
          break;
        case 'listen':
          updateGroupPoints(feedback.taskVote, groupTasks.listen)
        break;
        case 'meetings':
          updateGroupPoints(feedback.taskVote, groupTasks.meetings)
        break;
        case 'read':
          updateGroupPoints(feedback.taskVote, groupTasks.read)
        break;
        case 'socialize':
          updateGroupPoints(feedback.taskVote, groupTasks.socialize)
          break;
        case 'study':
          updateGroupPoints(feedback.taskVote,groupTasks.study)
        break;
        case 'watch':
          updateGroupPoints(feedback.taskVote, groupTasks.whatch)
        break;
        case 'work':
          updateGroupPoints(feedback.taskVote, groupTasks.work)
        break;
        case 'write':
          updateGroupPoints(feedback.taskVote, groupTasks.write)
        break;
        default:
          break;
      }
    })
  }


  if(phase === 'Folicular Inicial'){
    const beginUserTasks = userTasksRef.data().groupTasksData.folicularInicial
    const userTasks = userTasksRef.data().groupTasksData.folicularInicial
    const group1Tasks = group1.folicularInicial
    const group2Tasks = group2.folicularInicial
    const group3Tasks = group3.folicularInicial
    const group4Tasks = group4.folicularInicial

    calcForPhase(userFeedback,userTasks, group1Tasks, group2Tasks,group3Tasks,group4Tasks)

    const beginUserGroup = userTasksRef.data().group
    console.log('beginUserGroup:'+ beginUserGroup)
    const newUserGroup = bestGroup(beginUserGroup);
    console.log('newUserGroup:'+ newUserGroup)
    const userHasFeedback =  userTasksRef.data().hasFeedback
    console.log('userHasFeedback:'+userHasFeedback)

    let updateUserGroup;
    if (beginUserGroup !== newUserGroup && userHasFeedback){
      switch (beginUserGroup) {
        case 'group1':
          removeGroupPointsInLastGroup(userFeedback, beginUserTasks, group1Tasks)
           updateUserGroup = await admin.firestore().collection("GroupTasks").doc(beginUserGroup).update({folicularInicial:group1Tasks});
        case 'group2':
          removeGroupPointsInLastGroup(userFeedback, beginUserTasks, group2Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(beginUserGroup).update({folicularInicial:group2Tasks});
        break;
        case 'group3':
          removeGroupPointsInLastGroup(userFeedback, beginUserTasks, group3Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(beginUserGroup).update({folicularInicial:group3Tasks});
        break;
        case 'group4':
          removeGroupPointsInLastGroup(userFeedback, beginUserTasks, group4Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(beginUserGroup).update({folicularInicial:group4Tasks});
        break;
        default:
          break;
      }
      switch (newUserGroup) {
        case 'group1':
          addUserPointsInNewGroup(userFeedback, group1Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(newUserGroup).update({folicularInicial:group1Tasks});
        case 'group2':
          addUserPointsInNewGroup(userFeedback, group2Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(newUserGroup).update({folicularInicial:group2Tasks});
        break;
        case 'group3':
          addUserPointsInNewGroup(userFeedback, group3Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(newUserGroup).update({folicularInicial:group3Tasks});
        break;
        case 'group4':
          addUserPointsInNewGroup(userFeedback, group4Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(newUserGroup).update({folicularInicial:group4Tasks});
        break;
        default:
          break;
          
      }
      const updateUser = await admin.firestore().collection('UserTasks').doc(docUi).update({group:newUserGroup, groupTasksData:{folicularInicial:userTasks}, hasFeedback:true})
      res.json({result: `Message with ID: ${updateUser} added.`});

    }else{
      switch (newUserGroup) {
        case 'group1':
          addUserPointsInNewGroup(userFeedback, group1Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(newUserGroup).update({folicularInicial:group1Tasks});
        case 'group2':
          console.log(group2Tasks.create)
          addUserPointsInNewGroup(userFeedback, group2Tasks)
          console.log(group2Tasks.create)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(newUserGroup).update({folicularInicial:group2Tasks});
        break;
        case 'group3':
          addUserPointsInNewGroup(userFeedback, group3Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(newUserGroup).update({folicularInicial:group3Tasks});
        break;
        case 'group4':
          addUserPointsInNewGroup(userFeedback, group4Tasks)
          updateUserGroup = await admin.firestore().collection("GroupTasks").doc(newUserGroup).update({folicularInicial:group4Tasks});
        break;
        default:
          break;
      }
      const updateUser = await admin.firestore().collection('UserTasks').doc(docUi).update({group:newUserGroup, groupTasksData:{folicularInicial:userTasks}, hasFeedback:true})
      res.json({result: `Message with ID: ${updateUser} added.`});
    }
  }
})

/*else if (phase === 'Folicular Final'){
  const userTasks = userTasksRef.data().groupTasksData.folicularFinal
  const group1Tasks = group1.folicularFinal
  const group2Tasks = group2.folicularFinal
  const group3Tasks = group3.folicularFinal
  const group4Tasks = group4.folicularFinal

  calcForPhase(userFeedback,userTasks, group1Tasks, group2Tasks,group3Tasks,group4Tasks)

  const userActualGroup = userTasksRef.data().group
  const newUserGroup = bestGroup(userActualGroup);
  const updateUser = await admin.firestore().collection('UserTasks').doc(docUi).update({group:newUserGroup, groupTasksData:{folicularFinal:userTasks}})
}else if (phase === 'Lútea Inicial'){
  const userTasks = userTasksRef.data().groupTasksData.luteaInicial
  const group1Tasks = group1.luteaInicial
  const group2Tasks = group2.luteaInicial
  const group3Tasks = group3.luteaInicial
  const group4Tasks = group4.luteaInicial

  calcForPhase(userFeedback,userTasks, group1Tasks, group2Tasks,group3Tasks,group4Tasks)

  const userActualGroup = userTasksRef.data().group
  const newUserGroup = bestGroup(userActualGroup);
  const updateUser = await admin.firestore().collection('UserTasks').doc(docUi).update({group:newUserGroup, groupTasksData:{luteaInicial:userTasks}})
}else if (phase === 'Lútea Final'){
  const userTasks = userTasksRef.data().groupTasksData.luteaFinal
  const group1Tasks = group1.luteaFinal
  const group2Tasks = group2.luteaFinal
  const group3Tasks = group3.luteaFinal
  const group4Tasks = group4.luteaFinal

  calcForPhase(userFeedback,userTasks, group1Tasks, group2Tasks,group3Tasks,group4Tasks)

  const userActualGroup = userTasksRef.data().group
  const newUserGroup = bestGroup(userActualGroup);
  const updateUser = await admin.firestore().collection('UserTasks').doc(docUi).update({group:newUserGroup, groupTasksData:{luteaFinal:userTasks}})
}*/

























// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.setInitialGroup2Tasks = functions.https.onRequest(async (req, res) => {
  // Push the new message into Firestore using the Firebase Admin SDK.
  await admin.firestore().collection('GroupTasks').doc('group2')
  .set({
      folicularInicial:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:3,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:5,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:1,
          difficultPoints:4,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:3,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:4,
          difficultPoints:0,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:4,
          difficultPoints:1,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:3,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:4,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'upArrow',
          easyPoints:4,
          neutralPoints:1,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'upArrow',
          easyPoints:4,
          neutralPoints:1,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:4,
          difficultPoints:1,
        },
      },
      folicularFinal:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:2,
          difficultPoints:1,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:2,
          difficultPoints:1,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'upArrow',
          easyPoints:3,
          neutralPoints:2,
          difficultPoints:0,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:2,
          difficultPoints:1,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'upArrow',
          easyPoints:3,
          neutralPoints:2,
          difficultPoints:0,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'upArrow',
          easyPoints:3,
          neutralPoints:2,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'upArrow',
          easyPoints:4,
          neutralPoints:1,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'upArrow',
          easyPoints:4,
          neutralPoints:1,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'upArrow',
          easyPoints:3,
          neutralPoints:2,
          difficultPoints:0,
        },
      },
      luteaInicial:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:2,
          difficultPoints:1,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:2,
          difficultPoints:1,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:4,
          difficultPoints:0,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:4,
          difficultPoints:0,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:2,
          difficultPoints:1,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'upArrow',
          easyPoints:3,
          neutralPoints:2,
          difficultPoints:0,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'upArrow',
          easyPoints:4,
          neutralPoints:1,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'upArrow',
          easyPoints:4,
          neutralPoints:1,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:2,
          difficultPoints:1,
        },
      },
      luteaFinal:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:2,
          difficultPoints:1,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:2,
          difficultPoints:1,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:5,
          difficultPoints:0,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:4,
          difficultPoints:1,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:5,
          difficultPoints:0,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:3,
          difficultPoints:2,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:5,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:3,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:4,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:3,
          difficultPoints:1,
        },
      },
  })

  // Send back a message that we've successfully written the message
  res.json({result: `Recomendacao grupo 2 atualizada.`});
});

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.setInitialGroup3Tasks = functions.https.onRequest(async (req, res) => {
  // Push the new message into Firestore using the Firebase Admin SDK.
  await admin.firestore().collection('GroupTasks').doc('group3')
  .set({
      folicularInicial:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:1,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:0,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
      },
      folicularFinal:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:0,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
      },
      luteaInicial:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
      },
      luteaFinal:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:1,
          difficultPoints:1,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:1,
          difficultPoints:1,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:0,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:1,
          difficultPoints:1,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:1,
          difficultPoints:1,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:1,
          difficultPoints:1,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:1,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'horizontalLines',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:1,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:0,
        },
      },
  })

  // Send back a message that we've successfully written the message
  res.json({result: `Recomendacao grupo 3 atualizada.`});
});

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.setInitialGroup1Tasks = functions.https.onRequest(async (req, res) => {
  // Push the new message into Firestore using the Firebase Admin SDK.
  await admin.firestore().collection('GroupTasks').doc('group1')
  .set({
      folicularInicial:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:3,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:1,
          difficultPoints:2,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:3,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:3,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
      },
      folicularFinal:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:1,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:1,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'upArrow',
          easyPoints:3,
          neutralPoints:0,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:1,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:2,
          difficultPoints:0,
        },
      },
      luteaInicial:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:1,
          difficultPoints:0,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:1,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:1,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:2,
          difficultPoints:0,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:1,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:0,
          difficultPoints:1,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'upArrow',
          easyPoints:2,
          neutralPoints:1,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'upArrow',
          easyPoints:3,
          neutralPoints:0,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'upArrow',
          easyPoints:3,
          neutralPoints:0,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:1,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'horizontalLine',
          easyPoints:2,
          neutralPoints:1,
          difficultPoints:0,
        },
      },
      luteaFinal:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'downArrow',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:2,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'downArrow',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:2,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:3,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:3,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:1,
          difficultPoints:2,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'horizontalLine',
          easyPoints:1,
          neutralPoints:1,
          difficultPoints:1,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'horizontalLines',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:2,
          difficultPoints:1,
        },
      },
  })

  // Send back a message that we've successfully written the message
  res.json({result: `Recomendacao grupo 1 atualizada.`});
});