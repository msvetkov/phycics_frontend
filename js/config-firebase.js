  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCqTIUhKAmjhB9Rc18Oo1cWE-6JRNuh9q4",
    authDomain: "physics-4ad65.firebaseapp.com",
    databaseURL: "https://physics-4ad65.firebaseio.com",
    projectId: "physics-4ad65",
    storageBucket: "physics-4ad65.appspot.com",
    messagingSenderId: "606044975649",
    appId: "1:606044975649:web:9cf629a647173ccd"
  };

  firebase.initializeApp(firebaseConfig);

  function sendFile(id, type) {
    var file = document.querySelector(`#file-upload${id}`).files[0];
    if (typeof file == 'undefined') {
        return;
    }
    var storageRef = firebase.storage().ref(type + '/' + file.name);
    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          if (type == 'protocol'){
            alert('Протокол успешно отправлен, откройте вкладку "Мои работы" для просмотра');
            sendProtocol({
                id: id,
                protocol: downloadURL
            }, function(response) {
                if (xmlHttp.status == 200)
                    console.log('kaif')
                else
                    console.log('govna pozhral'); 
            })
          } else if (type == 'answer') {
            alert('Отчет успешно отправлен');
            sendAnswer({
                id: id,
                answer: downloadURL
            }, function(response) {
                if (xmlHttp.status == 200)
                    console.log('kaif')
                else
                    console.log('govna pozhral'); 
            })
        }
      });
    });
    }
