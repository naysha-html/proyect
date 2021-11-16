const firebaseConfig = {
    apiKey: "AIzaSyCRbAjYb2Y_H9NOy_DOlTmJrkzfCRSGZ3Q",
    authDomain: "proyect---1.firebaseapp.com",
    projectId: "proyect---1",
    storageBucket: "proyect---1.appspot.com",
    messagingSenderId: "164308686843",
    appId: "1:164308686843:web:c53b473c91615274a11d5e"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  let nombre = document.getElementById("name");
  let celphone = document.getElementById("celphone");
  let correo = document.getElementById("correo");
  let day = document.getElementById("day");
  let save_btn = document.getElementById("save-btn");
  let lista = document.getElementById("lista");
  save_btn.addEventListener("click", () => {
    let data = {
      nombre: nombre.value,
      cumpleaños: day.value,
      celular: celphone.value,
      correo: correo.value,
    };
    save_data_firebase(data);
  });
  
  const save_data_firebase = (d) => {
    db.collection("contactos")
      .add(d)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        get_data_firebase();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  
  let contactos_arr = [];
  
  const get_data_firebase = () => {
    contactos_arr = [];
    db.collection("contactos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          contactos_arr.push(doc.data());
        });
        buildList();
      });
  };
  
  const buildList = () => {
    lista.innerHTML = "";
    contactos_arr.forEach((e) => {
      lista.insertAdjacentHTML(
        "beforeend",
        `
       <li>${e.nombre} - ${e.cumpleaños} - ${e.celular} - ${e.correo}</li>
      `
      );
    });
  };
  
  get_data_firebase();