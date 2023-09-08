import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0bJ3M7VOvWqN2FvMtPws2do1jhonrYgE",
  authDomain: "cube-dev-4622e.firebaseapp.com",
  databaseURL: "https://cube-dev-4622e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cube-dev-4622e",
  storageBucket: "cube-dev-4622e.appspot.com",
  messagingSenderId: "427577704256",
  appId: "1:427577704256:web:fd3fd9effa978f0d5004a5",
  measurementId: "G-80YWW37TR5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [users, setUsers] = useState([]);
  const [userAction, setUserAction] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach(async (doc) => {
          const userData = doc.data();
          setUsers((prev) => [...prev, userData]);
          

          const userActionsRef = collection(db, "users", doc.id, "userAction");
          const userActionsSnapshot = await getDocs(userActionsRef);

          console.log({ID: doc.id, totalAction:userActionsSnapshot.size})

          userActionsSnapshot.forEach((userActionDoc) => {
            const userActionData = userActionDoc.data();
            setUserAction((prev) => [...prev, userActionData]);
          });


        });
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };
    console.log(users)
    fetchData();
  }, []);
  

  return (
    <View style={styles.container}>
      <Text>Data users:</Text>
      <Text>Jumlah Users: {users.length}</Text>
      <Text>Jumlah User Action: {userAction.length}</Text>
      <Text>avarage User Action / user: {userAction.length/users.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;