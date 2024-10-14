import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { selectNotificate } from "../../redux/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import { notificationType } from "../../constant/notificationType";
import { ScrollView } from "react-native-gesture-handler";
import { formatDate, formatDateMonthYear, formatTime } from "../../utils/utils";
import { setNotificateList } from "../../redux/reducers/notificationReducer";
import {
  deleteNotificate,
  deleteNotificateAll,
  updateNotificateRead,
  updateNotificateReadAll,
  updateNotificateSeenAll,
} from "../../api/notifications";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function NotificationModal({ visible, onCancle }) {
  const dispatch = useDispatch();
  const notificationRedux = useSelector(selectNotificate);
  const [notificationList, setNotificationList] = useState(
    notificationRedux?.notificateList || []
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setNotificationList(notificationRedux?.notificateList || []);
  }, [notificationRedux?.notificateList]);

  const seenAllNotification = async () => {
    const responsive = await updateNotificateSeenAll();
    if (responsive.status >= 200 && responsive.status < 300) {
      dispatch(
        setNotificateList(
          notificationList.map((item) => {
            return { ...item, is_new: false };
          })
        )
      );
    }
  };

  const readAllNotification = async () => {
    const responsive = await updateNotificateReadAll();
    if (responsive.status >= 200 && responsive.status < 300) {
      dispatch(
        setNotificateList(
          notificationList.map((item) => {
            return { ...item, is_read: true };
          })
        )
      );
    }
  };

  const readNotification = async (id) => {
    const responsive = await updateNotificateRead(id);
    if (responsive.status >= 200 && responsive.status < 300) {
      dispatch(
        setNotificateList(
          notificationList.map((item) => {
            return { ...item, is_read: item._id === id ? true : item?.is_read };
          })
        )
      );
    }
  };

  const deleteNotification = async (id) => {
    const response = await deleteNotificate(id);
    console.log(id);

    if (response.status >= 200 && response.status < 300) {
      dispatch(
        setNotificateList(
          notificationList.filter((item) => {
            return item._id !== id;
          })
        )
      );
    } else {
      console.log(response?.response?.data);
    }
  };

  const deleteAllNotification = async () => {
    const responsive = await deleteNotificateAll();
    if (responsive.status >= 200 && responsive.status < 300) {
      dispatch(setNotificateList([]));
    }
  };

  const renderNotificainCard = (item, key) => {
    const notifitcationTypeItem = notificationType[item?.type || "default"];
    return (
      <TouchableOpacity key={key} style={styles.notificateCard}>
        <View style={styles.notificainCardImageContainer}>
          <Image
            source={notifitcationTypeItem?.image}
            resizeMode="stretch"
            style={styles.notificainCardImage}
          />
        </View>
        <View style={styles.notificainCardInfoContainer}>
          <Text style={styles.notificainCardInfoTitle}>
            {item.is_new && (
              <Text
                style={{ ...styles.notificainCardInfoTitle, color: "#FF453A" }}
              >
                News:{" "}
              </Text>
            )}
            {notifitcationTypeItem.title}
          </Text>
          <Text
            style={{ ...styles.notificainCardInfoTitle, fontWeight: "normal" }}
          >
            Create: {formatDateMonthYear(item.updatedAt)}
          </Text>
          <Text style={styles.notificainCardInfoTitle}>
            Time: {formatTime(item.updatedAt)}
          </Text>
        </View>
        <View style={styles.deleteContainer}>
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={() => {
              deleteNotification(item._id);
            }}
          >
            <Icon name="delete-forever-outline" size={22} color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const handleCancel = async () => {
    if (onCancle) {
      onCancle();
      await seenAllNotification();
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableOpacity style={styles.layout} onPress={handleCancel} />
      <ScrollView style={styles.container}>
        <View
          style={{
            ...styles.flexRow,
            paddingHorizontal: "5%",
            marginBottom: 24,
          }}
        >
          <TouchableOpacity
            style={styles.threeDots}
            activeOpacity={1}
            onPress={() => setDropdownVisible(true)}
          >
            <Icon name="dots-horizontal" size={22} color="black" />
            {dropdownVisible && (
              <View style={styles.dropdownAction}>
                <TouchableOpacity
                  style={{
                    ...styles.flexRow,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                  onPress={async () => {
                    setDropdownVisible(false);
                    await seenAllNotification();
                  }}
                >
                  <Icon name="delete-forever-outline" size={22} color="black" />
                  <Text>Delete all</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.flexRow,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                  onPress={async () => {
                    setDropdownVisible(false);
                    await deleteAllNotification();
                  }}
                >
                  <Icon name="check-all" size={22} color="black" />
                  <Text>Mark read all</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleCancel();
            }}
          >
            <Icon name="close" size={22} color="black" />
          </TouchableOpacity>
        </View>
        {notificationList.map((item, key) => renderNotificainCard(item, key))}
        {!notificationList[0] && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "rgba(0,0,0,0.5)" }}>Empty</Text>
          </View>
        )}
        <View style={{ height: HEIGHT * 0.05 }}></View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: HEIGHT * 0.15,
    bottom: HEIGHT * 0.15,
    left: WIDTH * 0.1,
    right: WIDTH * 0.1,
    paddingVertical: 20,
    borderRadius: 6,
    backgroundColor: "white",
  },
  layout: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  threeDots: {
    position: "relative",
  },
  dropdownAction: {
    position: "absolute",
    width: WIDTH * 0.4,
    top: "100%",
    left: "50%",
    padding: 8,
    borderRadius: 6,
    gap: 12,

    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    zIndex: 999,
  },

  notificateCard: {
    flexDirection: "row",
    width: "90%",
    height: HEIGHT * 0.1,
    gap: 12,
    padding: "2.5%",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.1)",
    marginHorizontal: "5%",
    marginBottom: 12,
  },
  notificainCardImageContainer: {
    width: HEIGHT * 0.08,
    height: HEIGHT * 0.08,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificainCardImage: {
    width: "90%",
    height: "90%",
  },
  notificainCardInfoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  notificainCardInfoTitle: {
    width: "100%",
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteContainer: {
    width: "auto",
  },
  deleteIcon: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEE4E2",
    padding: 3,
    borderRadius: 50,
  },

  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
});
