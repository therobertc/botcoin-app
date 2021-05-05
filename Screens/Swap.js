import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Share,
  Image,
  TextInput,
  LogBox
} from "react-native";
import { Icon, Header, Left, Right, Body, Button } from "native-base";

import { Feather, AntDesign } from "@expo/vector-icons";

export default class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount(){
    LogBox.ignoreAllLogs()

  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Header
            style={{
              backgroundColor: "#282c34",
              borderBottomWidth: 0.2,
              borderBottomColor: "#282c34"
            }}
          >
            <Left>
              <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Feather name="chevron-left" color="#FFF" size={30} />
              </TouchableOpacity>
            </Left>

            <Body>
              <Image
                source={require("../assets/botcoin.png")}
                style={{ width: 200, height: 40 }}
              />
            </Body>
            <Right>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  style={styles.qr}
                  // onPress={() => props.navigation.navigate("Activity")}
                >
                  <AntDesign
                    //style={{ paddingRight: 10 }}
                    name="qrcode"
                    size={20}
                    color="#FFF"
                  />
                </TouchableOpacity>
              </View>
            </Right>
          </Header>
        </View>

        <ScrollView style={styles.col2}>
          {/* <TextInput
          style={styles.inputStyle}
          placeholderTextColor="grey"
          placeholder="Search for stocks, groups, or chats"
          // value={email}
          // onChangeText={val => setEmail(val)}
        /> */}

          <View
            style={{
              paddingVertical: 10,
              marginHorizontal: 10,
              // justifyContent: "center",
              // alignItems: "center",
              backgroundColor: "#383c4a",
              borderRadius: 30,
              //height: 300

              shadowOffset: { width: 0.8, height: 0.8 },
              shadowRadius: 1,
              shadowColor: "black",
              elevation: 5,
              shadowOpacity: 2,
              // backgroundColor: "transparent",
              backgroundColor: "#383c4a"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "600",
                color: "#FFF",
                paddingTop: 10
              }}
            >
              Swap
            </Text>
            <View
              style={{
                //paddingVertical: 10,
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
                //backgroundColor: "#282c34",
                borderRadius: 10,
                //height: 100,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TextInput
                style={styles.inputStyle}
                placeholderTextColor="grey"
                placeholder="0"
                // value={email}
                // onChangeText={val => setEmail(val)}
              />

              <Button
                // onPress={() => props.navigation.navigate("CoinSearch")}
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  backgroundColor: "#657786",
                  borderRadius: 30,
                  flexDirection: "row",
                  padding: 20,
                  alignSelf: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#FFF",
                    paddingLeft: 10
                  }}
                >
                  BOTS
                </Text>
                <Feather
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    //paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    fontSize: 20
                  }}
                  name="chevron-right"
                />
              </Button>
            </View>

            <View
              style={{
                //paddingVertical: 10,
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
                //backgroundColor: "#282c34",
                borderRadius: 10,
                //height: 100,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TextInput
                style={styles.inputStyle}
                placeholderTextColor="#657786"
                placeholder="0"
                // value={email}
                // onChangeText={val => setEmail(val)}
              />

              <Button
                // onPress={() => props.navigation.navigate("CoinSearch")}
                style={{
                  // borderWidth: 1,
                  // borderColor: "rgba(0,0,0,0.2)",

                  shadowOffset: { width: 0.8, height: 0.8 },
                  shadowRadius: 1,
                  shadowColor: "black",
                  shadowOpacity: 2,
                  backgroundColor: "#ed6ac3",
                  borderRadius: 30,
                  flexDirection: "row",
                  padding: 10,
                  alignSelf: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#FFF",
                    paddingLeft: 10
                  }}
                >
                  Choose Token
                </Text>
                <Feather
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    //paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    fontSize: 20
                  }}
                  name="chevron-right"
                />
              </Button>
            </View>
          </View>

          {/* <View style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 10 }}>
          <Feather
            style={{
              color: "#FFF",
              fontWeight: "bold",
              //paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
              fontSize: 20
            }}
            name="repeat"
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#FFF",
              paddingLeft: 10
            }}
          >
            Flip
          </Text>
        </View> */}
        </ScrollView>

        {/* <TouchableOpacity
        onPress={() => props.navigation.navigate("AddGroup")}
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          width: 200,
          position: "absolute",
          bottom: 10,
          right: 110,
          height: 50,
          backgroundColor: "#ed6ac3",
          borderRadius: 100,
          flexDirection: "row"
        }}
      >
        <Feather
          style={{
            color: "#FFF",
            fontWeight: "bold",
            //paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
            fontSize: 20
          }}
          name="plus"
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
            color: "#FFF",
            paddingLeft: 10
          }}
        >
          Start Group
        </Text>
      </TouchableOpacity> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  btn: {
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#FFF",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 20,
    marginHorizontal: 10
  },
  seperator: {
    borderColor: "lightgrey",
    borderWidth: 0.5,
    marginLeft: 30,
    marginVertical: 10,
    width: "100%"
  },

  container: {
    height: "100%",
    backgroundColor: "#282c34"
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingBottom: 30
    //paddingHorizontal: 20,
    //paddingTop: 10
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 10
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    //paddingTop: 0,
    paddingHorizontal: 20
  },
  header: {
    fontFamily: "Montserrat_700Bold",
    color: "#FFF",
    flex: 1,
    fontSize: 20
  },
  logotext: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    fontSize: 22,
    paddingLeft: 10,
    width: 300
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20
    //paddingVertical: 10
  },

  balance: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#657786",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  qr: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#657786",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10
  },

  inputStyle: {
    width: "50%",
    //marginBottom: 15,
    //paddingBottom: 15,
    //paddingVertical: 10,
    height: 80,
    paddingLeft: 15,
    alignSelf: "flex-start",
    //borderColor: "grey",
    //borderWidth: 1,
    borderRadius: 20,
    //marginHorizontal: 20,
    paddingRight: 20,
    fontSize: 30,
    //backgroundColor: "#282c34",
    //flex: 1,
    color: "#FFF"
  },
  orderForm: {
    width: "20%",
    //marginBottom: 15,
    //paddingBottom: 15,
    paddingVertical: 10,
    paddingLeft: 15,
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    //marginHorizontal: 20,
    paddingRight: 20,
    fontSize: 20,
    backgroundColor: "#282c34",
    flex: 1,
    color: "#FFF"
  }
});
