import { StatusBar } from "expo-status-bar";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
  Button,
} from "react-native";
import { addUser, deleteUser, updateUsername } from "./reducer";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Main() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);
  const [newID, setNewID] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (text, index) => {
    setNewUsername(text);
    setNewID(index);
  };
  //list data
  const Item = (item) => (
    <View style={[styles.card, styles.elevation]}>
      <View style={{ flexDirection: "column", width: "50%" }}>
        <Text style={styles.text1}>{item.title1}</Text>
        <Text>{item.title2}</Text>
        {modalVisible && newID === item.title3 ? (
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Newusername"
              style={styles.textinput3}
              onChangeText={(text) => handleChange(text, newID)}
              value={newUsername}
            />

            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                dispatch(updateUsername({ id: newID, username: newUsername }));
                setModalVisible(false);
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  paddingTop: 6,
                  paddingLeft: 5,
                  fontSize: 13,
                }}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingLeft: 90,
        }}
      >
        <Icon
          name="edit"
          size={30}
          color="#0A5585"
          style={{ margin: 5 }}
          onPress={() => {
            setNewID(item.title3);
            setModalVisible(true);
          }}
        />
        <Icon
          name="remove"
          size={30}
          color="#0A5585"
          style={{ margin: 5 }}
          onPress={() => {
            console.log("delete clicked", item.title3);
            dispatch(deleteUser({ id: item.title3 }));
          }}
        />
      </View>
    </View>
  );
  console.log(userList);
  console.log(newUsername);
  console.log(newID);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>User List</Text>
        <TextInput
          ref={ref}
          placeholder="name"
          style={styles.textinput1}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          ref={ref}
          placeholder="Username"
          style={styles.textinput2}
          onChangeText={(text) => setUsername(text)}
        />

        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            dispatch(
              addUser({
                id: userList[userList.length - 1].id + 1,
                name,
                username,
              })
            );
            ref.current.value = "";
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 18,
              paddingTop: 2,
              letterSpacing: 2,
            }}
          >
            Add User
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={userList}
        renderItem={({ item }) => (
          <Item title1={item.name} title2={item.username} title3={item.id} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 28,
    textAlign: "center",
    // marginBottom: 320,
  },
  textinput1: {
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    height: 50,
    borderRadius: 10,
    marginLeft: 20,
    padding: 10,
    marginBottom: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
    // elevation: 5,
  },
  textinput2: {
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    marginLeft: 20,
    borderRadius: 10,
    height: 50,
    padding: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  textinput3: {
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    borderRadius: 10,
    height: 30,
    // padding: 10,
    paddingLeft: 5,
    marginTop: 5,
  },
  button1: {
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 35,
    height: 35,
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    backgroundColor: "#0A5585",
  },
  button2: {
    marginTop: 3,
    marginLeft: 3,
    width: 58,
    height: 35,
    backgroundColor: "#0A5585",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  text1: {
    fontSize: 32,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "90%",
    marginLeft: 20,
    marginVertical: 10,
    backgroundColor: "#9BD9BB",
  },

  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
});
