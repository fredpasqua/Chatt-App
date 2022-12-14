import React from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import CustomActions from "./CustomActions";
import MapView, { Marker } from "react-native-maps";
const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBYDsu93VfkkUy_a3F5OdxL0HvOL-NiU_w",
  authDomain: "chatapp-de0a1.firebaseapp.com",
  projectId: "chatapp-de0a1",
  storageBucket: "chatapp-de0a1.appspot.com",
  messagingSenderId: "485930190039",
  appId: "1:485930190039:web:77ae48a7d82a4fff1cdc92",
};

//INITIALIZE FIRESTORE DB
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: 0,
      name: "",
      isConnected: false,
      image: null,
    };
  }
  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
      console.log(messages + "test Async Storage getMessages setState");
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    //create reference to messages:
    this.referenceChatMessages = firebase.firestore().collection("messages");

    //Authenticate user using anonymous
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }

      //NetInfo checks for user online status:
      NetInfo.fetch().then((connection) => {
        if (connection.isConnected) {
          this.setState({ isConnected: true });
        } else {
          console.log("offline");
          this.getMessages();
        }
      });

      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        name: name,
      });
    });

    this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  addMessage = (message) => {
    console.log(message);
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      user: message.user,
      createdAt: message.createdAt,
      location: message.location || "",
      image: message.image || "",
    });
  };

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage(this.state.messages[0]);
        this.saveMessages();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        location: data.location,
        image: data.image,
      });
      this.setState({
        messages,
      });
    });
  };

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 200, height: 200, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
            }}
          />
        </MapView>
      );
    }
    return null;
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: this.props.route.params.color,
      },
    });
    let name = this.props.route.params.name;
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          onSend={(messages) => this.onSend(messages)}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: "white",
                  },
                  left: {
                    color: "#24204F",
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: "#E6F5F3",
                  },
                  right: {
                    backgroundColor: "#3A13C3",
                  },
                }}
              />
            );
          }}
          user={{ _id: this.state.uid, name: name }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}