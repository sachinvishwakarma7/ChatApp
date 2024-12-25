import {Platform, Alert} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
  requestNotifications,
  openSettings,
} from 'react-native-permissions';

export type PermissionType = 'camera' | 'location' | 'storage' | 'notification';

const RequestPermission = async (
  permissionType: PermissionType,
): Promise<boolean> => {
  try {
    let permission: Permission | null = null;

    if (Platform.OS === 'ios') {
      switch (permissionType) {
        case 'camera':
          permission = PERMISSIONS.IOS.CAMERA;
          break;
        case 'location':
          permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
          break;
        case 'storage':
          permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
          break;
        case 'notification':
          const iosNotificationResult = await requestNotifications([
            'alert',
            'sound',
            'badge',
          ]);
          if (iosNotificationResult.status === 'granted') {
            console.log('Notification permission granted');
            return true;
          } else {
            console.log('Notification permission denied');
            return false;
          }
        default:
          permission = null;
      }
    } else if (Platform.OS === 'android') {
      switch (permissionType) {
        case 'camera':
          permission = PERMISSIONS.ANDROID.CAMERA;
          break;
        case 'location':
          permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
          break;
        case 'storage':
          permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
          break;
        case 'notification':
          // Check if the Android version is API 33+ (Android 13) for explicit notification permission
          if (Platform.Version >= 33) {
            permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
          } else {
            // For Android 12 and below, notification permission is granted automatically
            console.log(
              'Notification permission is automatically granted on Android versions below 13',
            );
            return true;
          }
          break;
        default:
          permission = null;
      }
    }

    if (permission) {
      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        console.log(`${permissionType} permission granted`);
        return true;
      } else if (result === RESULTS.DENIED) {
        console.log(`${permissionType} permission denied`);

        // Show alert to the user, asking them to manually grant permission from settings
        Alert.alert(
          `${permissionType} permission denied`,
          `To use the ${permissionType} feature, you need to enable the permission in the app settings.`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => {
                openSettings().catch(() => {
                  console.warn('Failed to open settings');
                });
              },
            },
          ],
        );
        return false;
      } else if (result === RESULTS.BLOCKED) {
        console.log(`${permissionType} permission blocked`);

        // Permission is permanently blocked, show alert to open settings
        Alert.alert(
          `${permissionType} Permission Blocked`,
          `It seems like you have permanently blocked the ${permissionType} permission. Please open the app settings and enable it manually.`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => {
                openSettings().catch(() => {
                  console.warn('Failed to open settings');
                });
              },
            },
          ],
        );
        return false;
      } else {
        console.log(`${permissionType} permission unavailable`);
        return false;
      }
    } else {
      console.warn('Invalid permission type');
      return false;
    }
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

export default RequestPermission;
