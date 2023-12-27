import { StatusBar } from "expo-status-bar";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";

function HomeScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [docHash, setDocHash] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>
        Scan the document's QR Code to verify its authenticity
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (!permission || !permission.granted)
            requestPermission().then(() => setModalVisible(true));
          else setModalVisible(true);
        }}
        style={styles.button}
      >
        <MaterialCommunityIcons name="qrcode-scan" size={72} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <Camera
            ratio="16:9"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={({ type, data }) => {
              setDocHash(data);
              setModalVisible(false);
              alert(data);
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#22272C",
                alignSelf: "flex-end",
                marginBottom: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 9999,
              }}
            >
              <Entypo name="cross" size={28} color="white" />
            </TouchableOpacity>
            <BarcodeMask
              width={250}
              height={250}
              lineAnimationDuration={1000}
            />
          </Camera>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(14 165 233)",
    padding: 40,
    borderRadius: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: "serif",
    marginBottom: 20,
    color: "#6a6b6d",
  },
});

export default HomeScreen;
