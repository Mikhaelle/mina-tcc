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
  return admin.firestore().collection("Quiz")
      .where("userId", "==", context.auth.uid)
      .get().then((userQuiz)=>{
        if (userQuiz.docs.length !== 0) {
          return userQuiz.docs[0].data();
        }
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
    admin.firestore().collection('UserTasks')
    .add({groupTasksData, group:userGroup, userId:context.auth.uid, hasFeedback:false})
  })
});

// 0 mais dificil, 1 neutro, 2 mais facil
//exports.postUserFeedback = functions.https.onCall(async (data, context) => {
exports.postUserFeedback = functions.https.onRequest(async (req, res) => {
  const phase = 'Folicular Inicial'

  const userFeedback = [
  {taskName: 'Cleanning', taskVote: 'neutral'}, 
  {taskName: 'Create', taskVote: 'difficult'}, 
  {taskName: 'Draw', taskVote: 'difficult'},
  {taskName: 'Exercitar', taskVote: 'difficult'},
  {taskName: 'Ouvir música', taskVote: 'difficult'},
  {taskName: 'Fazer reuniões', taskVote: 'difficult'},
  {taskName: 'Ler', taskVote: 'difficult'},
  {taskName: 'Socializar', taskVote: 'difficult'},
  {taskName: 'Estudar', taskVote: 'difficult'},
  {taskName: 'Assisti séries/tv', taskVote: 'easy'},
  {taskName: 'Trabalhar', taskVote: 'difficult'},
  {taskName: 'Escrever', taskVote: 'difficult'}
]

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

const userTasksRef = await admin.firestore().collection('UserTasks').where("userId", "==", 'S8lxeXkvr2cEZYkFDZ6XsGhdISw2').get()

const docUi = userTasksRef.docs[0].id

const updateUserPoints = (userTask, taskVote) =>{
  if(taskVote === 'difficult'){
    userTask.difficultPoints = userTask.difficultPoints + 1;
  }else if(taskVote === 'neutral'){
    userTask.neutralPoints = userTask.neutralPoints + 1;
  }else if (taskVote == 'easy'){
    userTask.easyPoints =  userTask.easyPoints + 1
  }
}

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

  console.log('userMostVoted: ' + userMostVotedType)

  const group1MostVotedType = groupMostVotedType(group1Task)
  console.log('group1MostVotedType: ' + group1MostVotedType)

  const group2MostVotedType = groupMostVotedType(group2Task)
  console.log('group2MostVotedType: ' + group2MostVotedType)

  const group3MostVotedType = groupMostVotedType(group3Task)
  console.log('group3MostVotedType: ' + group3MostVotedType)

  const group4MostVotedType = groupMostVotedType(group4Task)
  console.log('group4MostVotedType: ' + group4MostVotedType)

  const group1Inversions = countInversions(userMostVotedType, group1MostVotedType)
  console.log('group1Inversions: ' + group1Inversions)

  const group2Inversions = countInversions(userMostVotedType, group2MostVotedType)
  console.log('group2Inversions: ' + group2Inversions)

  const group3Inversions = countInversions(userMostVotedType, group3MostVotedType)
  console.log('group3Inversions: ' + group3Inversions)

  const group4Inversions = countInversions(userMostVotedType, group4MostVotedType)
  console.log('group4Inversions: ' + group4Inversions)


  numberOfInversionGroup1.push(group1Inversions)
  numberOfInversionGroup2.push(group2Inversions)
  numberOfInversionGroup3.push(group3Inversions)
  numberOfInversionGroup4.push(group4Inversions)
}

if(phase === 'Folicular Inicial'){
  const userTasks = userTasksRef.docs[0].data().groupTasksData.folicularInicial
  const group1Tasks = group1.folicularInicial
  const group2Tasks = group2.folicularInicial
  const group3Tasks = group3.folicularInicial
  const group4Tasks = group4.folicularInicial

  userFeedback.forEach(feedback => {
    switch (feedback.taskName) {
      case 'Cleanning':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.cleaning,feedback.taskVote)
        updateInversionLists(userTasks.cleaning, group1Tasks.cleaning, group2Tasks.cleaning, group3Tasks.cleaning, group4Tasks.cleaning)
        break;
      case 'Create':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.create,feedback.taskVote)
        updateInversionLists(userTasks.create, group1Tasks.create, group2Tasks.create, group3Tasks.create, group4Tasks.create)
        break;
      case 'Draw':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.draw,feedback.taskVote)
        updateInversionLists(userTasks.draw, group1Tasks.draw, group2Tasks.draw, group3Tasks.draw, group4Tasks.draw)
      break;
      case 'Exercitar':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.exercise,feedback.taskVote)
        updateInversionLists(userTasks.exercise, group1Tasks.exercise, group2Tasks.exercise, group3Tasks.exercise, group4Tasks.exercise)
      break;
      case 'Ouvir música':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.listen,feedback.taskVote)
        updateInversionLists(userTasks.listen, group1Tasks.listen, group2Tasks.listen, group3Tasks.listen, group4Tasks.listen)
      break;
      case 'Fazer reuniões':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.meetings,feedback.taskVote)
        updateInversionLists(userTasks.meetings, group1Tasks.meetings, group2Tasks.meetings, group3Tasks.meetings, group4Tasks.meetings)
      break;
      case 'Ler':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.read,feedback.taskVote)
        updateInversionLists(userTasks.read, group1Tasks.read, group2Tasks.read, group3Tasks.read, group4Tasks.read)
      break;
      case 'Socializar':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.socialize,feedback.taskVote)
        updateInversionLists(userTasks.socialize, group1Tasks.socialize, group2Tasks.socialize, group3Tasks.socialize, group4Tasks.socialize)
      break;
      case 'Estudar':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.study,feedback.taskVote)
        updateInversionLists(userTasks.study, group1Tasks.study, group2Tasks.study, group3Tasks.study, group4Tasks.study)
      break;
      case 'Assisti séries/tv':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.whatch,feedback.taskVote)
        updateInversionLists(userTasks.whatch, group1Tasks.whatch, group2Tasks.whatch, group3Tasks.whatch, group4Tasks.whatch)
      break;
      case 'Trabalhar':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.work,feedback.taskVote)
        updateInversionLists(userTasks.work, group1Tasks.work, group2Tasks.work, group3Tasks.work, group4Tasks.work)
      break;
      case 'Escrever':
        console.log('TASK: '+ feedback.taskName)
        updateUserPoints(userTasks.write,feedback.taskVote)
        updateInversionLists(userTasks.write, group1Tasks.write, group2Tasks.write, group3Tasks.write, group4Tasks.write)
      break;
      default:
        break;
    }
  })
  const update = await admin.firestore().collection('UserTasks').doc(docUi).update({groupTasksData:{folicularInicial:userTasks}})

  res.json({result: `Message with ID: ${update} added.`});
}


})


exports.getRecomendedUserTasks = functions.https.onCall(async (data, context) => {
  const phase = data.phase
  const userTask = await admin.firestore().collection('UserTasks').where("userId", "==", context.auth.uid)
  .get()
  const userRecomendedTask = await admin.firestore().collection('GroupTasks').doc(userTask.docs[0].data().group)
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


// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
/*exports.setInitialGroupTasks = functions.https.onRequest(async (req, res) => {
  // Push the new message into Firestore using the Firebase Admin SDK.
  await admin.firestore().collection('InitialUserTasks').doc('InitialTasks')
  .set({
      folicularInicial:{
        study: {
          taskName: 'Estudar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:1,
        },
        work: {
          taskName: 'Trabalhar',
          taskPrediction: 'downArrow',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:1,
        },
        exercise: {
          taskName: 'Exercitar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:0,
        },
        cleaning: {
          taskName: 'Faxinar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:0,
        },
        read: {
          taskName: 'Ler',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:0,
        },
        meetings: {
          taskName: 'Fazer reuniões',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:0,
        },
        socialize: {
          taskName: 'Socializar',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:0,
        },
        write: {
          taskName: 'Escrever',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:0,
        },
        listen: {
          taskName: 'Ouvir música',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:0,
        },
        whatch: {
          taskName: 'Assisti séries/tv',
          taskPrediction: 'upArrow',
          easyPoints:1,
          neutralPoints:0,
          difficultPoints:0,
        },
        draw: {
          taskName: 'Desenhar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:0,
        },
        create: {
          taskName: 'Criar',
          taskPrediction: 'horizontalLine',
          easyPoints:0,
          neutralPoints:0,
          difficultPoints:0,
        },
      },
  })

  await admin.firestore().collection('GroupTasks').doc('group2')
  .set({
    folicularInicial:{
      study: {
        taskName: 'Estudar',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:1,
        difficultPoints:0,
      },
      work: {
        taskName: 'Trabalhar',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      exercise: {
        taskName: 'Exercitar',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      cleaning: {
        taskName: 'Faxinar',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
      read: {
        taskName: 'Ler',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
      meetings: {
        taskName: 'Fazer reuniões',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      socialize: {
        taskName: 'Socializar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      write: {
        taskName: 'Escrever',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      listen: {
        taskName: 'Ouvir música',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      whatch: {
        taskName: 'Assisti séries/tv',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      draw: {
        taskName: 'Desenhar',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
      create: {
        taskName: 'Criar',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
    },
    
    
  })

  const writeResult = await admin.firestore().collection('GroupTasks').doc('group3')
  .set({
    folicularInicial:{
      study: {
        taskName: 'Estudar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      work: {
        taskName: 'Trabalhar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      exercise: {
        taskName: 'Exercitar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      cleaning: {
        taskName: 'Faxinar',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
      read: {
        taskName: 'Ler',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
      meetings: {
        taskName: 'Fazer reuniões',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      socialize: {
        taskName: 'Socializar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      write: {
        taskName: 'Escrever',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      listen: {
        taskName: 'Ouvir música',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      whatch: {
        taskName: 'Assisti séries/tv',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      draw: {
        taskName: 'Desenhar',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
      create: {
        taskName: 'Criar',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
    },
  })

 await admin.firestore().collection('GroupTasks').doc('group4')
  .set({
    folicularInicial:{
      study: {
        taskName: 'Estudar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      work: {
        taskName: 'Trabalhar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      exercise: {
        taskName: 'Exercitar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      cleaning: {
        taskName: 'Faxinar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      read: {
        taskName: 'Ler',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      meetings: {
        taskName: 'Fazer reuniões',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
      socialize: {
        taskName: 'Socializar',
        taskPrediction: 'downArrow',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:1,
      },
      write: {
        taskName: 'Escrever',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
      listen: {
        taskName: 'Ouvir música',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
      whatch: {
        taskName: 'Assisti séries/tv',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      draw: {
        taskName: 'Desenhar',
        taskPrediction: 'upArrow',
        easyPoints:1,
        neutralPoints:0,
        difficultPoints:0,
      },
      create: {
        taskName: 'Criar',
        taskPrediction: 'horizontalLine',
        easyPoints:0,
        neutralPoints:0,
        difficultPoints:0,
      },
    },
   })
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});*/

