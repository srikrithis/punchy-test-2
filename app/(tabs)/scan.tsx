import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { QrCode, Flashlight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [flashOn, setFlashOn] = useState(false);

  if (!permission) {
    return (
      <LinearGradient colors={['#f1eee6', '#faefea']} locations={[0.7, 1]} style={styles.container} />
    );
  }

  if (!permission.granted) {
    return (
      <LinearGradient colors={['#f1eee6', '#faefea']} locations={[0.7, 1]} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.permissionContainer}>
            <View style={styles.iconContainer}>
              <QrCode color="#2D1B69" size={80} strokeWidth={2} />
            </View>
            <Text style={styles.permissionTitle}>Camera Access Required</Text>
            <Text style={styles.permissionText}>
              We need camera access to scan QR codes and add new punch cards to your wallet.
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
              <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    Alert.alert(
      'QR Code Scanned',
      `Scanned data: ${data}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add Card', onPress: () => console.log('Adding card...') },
      ]
    );
  };

  return (
    <View style={styles.cameraScreenContainer}>
      <SafeAreaView style={styles.cameraScreenSafeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Scan QR Code</Text>
            <Text style={styles.subtitle}>Point at a business QR code</Text>
          </View>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => setFlashOn(!flashOn)}
          >
            <Flashlight color={flashOn ? '#FFD700' : '#FFFFFF'} size={24} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing={facing}
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          >
            <View style={styles.overlay}>
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
          </CameraView>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Align the QR code within the frame to scan
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  cameraScreenContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraScreenSafeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#CCCCCC',
  },
  flashButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    backgroundColor: 'rgba(45, 27, 105, 0.1)',
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 28,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#2D1B69',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#2D1B69',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#2D1B69',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#FFD700',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  instructions: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 22,
  },
});