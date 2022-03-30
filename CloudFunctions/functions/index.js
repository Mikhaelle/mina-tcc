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
  console.log(data)
  const hormonalContraceptiveMethod = data.hormonalContraceptiveMethod
  const hormonalDisorder = data.hormonalContraceptiveMethod

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
  admin.firestore().collection("InitialUserTasks").doc("InitialTasks")
  .get().then (groupTasks =>{
    console.log('aqui')
    const groupTasksData = groupTasks.data()
    admin.firestore().collection('UserTasks')
    .add({groupTasksData, group:userGroup, userId:context.auth.uid, hasFeedback:false})
  })
});

exports.postUserFeedback = functions.https.onCall(async (data, context) => {
  

})


exports.getRecomendedUserTasks = functions.https.onCall(async (data, context) => {
  const phase = data.phase
  console.log(phase)
  const userTask = await admin.firestore().collection('UserTasks').where("userId", "==", context.auth.uid)
  .get()
  console.log(userTask)
    
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

