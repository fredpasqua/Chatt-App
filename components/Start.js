import React from "react";
import BackgroundImage from "../assets/Backgroundimage.png";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";

export default class Screen1 extends React.Component {
  constructor(props) {
    super(props);
    //State to hold name of user and the background color of the chat screen
    this.state = { name: "", color: "" };
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground source={BackgroundImage} style={styles.image}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleText}>Chatter</Text>
          </View>

          <View style={styles.userInterfaceWrapper}>
            <View style={styles.textInputContainer}>
              <Image source={require("../assets/chatIcon.jpeg")}></Image>
              <TextInput
                style={styles.textInput}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your name:"
              />
            </View>

            <View style={styles.colorChoiceWrapper}>
              <Text style={styles.circle.colorText}>
                Choose Background Color:
              </Text>

              <View style={styles.colorPicker}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Background color"
                  accessibilityHint="Lets you choose the color of the chat background."
                  accessibilityRole="button"
                  onPress={() => {
                    this.setState({ color: "#090C08" });
                  }}
                >
                  <View style={[styles.circle, styles.color1]}></View>
                </TouchableOpacity>

                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Background color"
                  accessibilityHint="Lets you choose the color of the chat background."
                  accessibilityRole="button"
                  onPress={() => {
                    this.setState({ color: "#474056" });
                  }}
                >
                  <View style={[styles.circle, styles.color2]}></View>
                </TouchableOpacity>

                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Background color"
                  accessibilityHint="Lets you choose the color of the chat background."
                  accessibilityRole="button"
                  onPress={() => {
                    this.setState({ color: "#8A95A5" });
                  }}
                >
                  <View style={[styles.circle, styles.color3]}></View>
                </TouchableOpacity>

                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Background color"
                  accessibilityHint="Lets you choose the color of the chat background."
                  accessibilityRole="button"
                  onPress={() => {
                    this.setState({ color: "#B9C6AE" });
                  }}
                >
                  <View style={[styles.circle, styles.color4]}></View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonwrapper}>
              <Pressable
                style={styles.pressable}
                onPress={() =>
                  this.props.navigation.navigate("Chat", {
                    name: this.state.name,
                    color: this.state.color,
                  })
                }
                accessible={true}
                accessibilityLabel="Start chatting"
                accessibilityHint="Enters
                the chat with your selected username and background color"
              >
                <Text style={styles.pressableText}>Start Chatting</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  titleWrapper: {
    flex: 1,
    padding: 50,
  },
  pressable: {
    flex: 0.75,
    backgroundColor: "#757083",
    position: "relative",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonwrapper: {
    width: "88%",
    flex: 0.33,
  },
  userInterfaceWrapper: {
    flex: 1,
    width: "88%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: "44%",
    marginBottom: 10,
    borderRadius: 2,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "600",
    textAlign: "center",
  },
  textInputContainer: {
    flex: 0.2,
    flexDirection: "row",
    width: "88%",
    height: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#757083",
    margin: 10,
    marginBottom: 30,
  },
  colorText: {
    color: "#757083",
  },
  colorChoiceWrapper: {
    flex: 0.4,
    width: "88%",
  },
  colorPicker: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  color1: {
    backgroundColor: "#090C08",
  },
  color2: {
    backgroundColor: "#474056",
  },
  color3: {
    backgroundColor: "#8A95A5",
  },
  color4: {
    backgroundColor: "#B9C6AE",
  },
});
